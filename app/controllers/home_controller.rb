require 'json'
require 'meekerclient'
require 'faraday'
require 'faraday_middleware'
require 'pry'

class HomeController < ApplicationController
  def show
  end

  def add_audio
    @entries = Rails.cache.fetch("mprnews_audio_collection", expires_in: 1.hours) do
      flatten_stories
    end
  end

  private

  def flatten_stories(expected = 20, page = 1)
    @entries = []
    while @entries.length < expected
      page += 1
      collection = new_collection(page)
      process_items(collection.items)
    end
    @entries.sort! { |a, b| a.pubDate <=> b.pubDate  }
  end

  def process_items(items)
    slugs = items.map { |item| item.json[:slug]  }

    conn = Faraday.new(url: 'http://mprstory.publicradio.org') do |faraday|
      #faraday.use FaradayMiddleware::Gzip
      faraday.request :json
      faraday.use FaradayMiddleware::Mashify
      faraday.use FaradayMiddleware::ParseJson, :content_type => /\bjson$/
      faraday.adapter :net_http
    end
    stories = []
    slugs.each do |slug|
      stories << conn.get("/itasca/#{slug}")
    end
    stories.each do |item|
      next if item.body.respond_to?(:error)
      next if item.body.audio.empty? or item.body.audio.first.apm_api.nil?
      json = cleanup_item(item.body)
      @entries << json
    end
  end

  def cleanup_item(json)
    json.delete 'driver'
    json.delete 'author'
    json.delete 'episodes'
    # TODO: get rid of all except needed aspect ratio
    # TODO: only first image?
    json.images.map!(&:apm_api)
    # TODO: REMOVE! Generate random date for story
    # json.pubDate = rand(DateTime.civil(1967, 1, 22, 0, 0, 0, '-6')..DateTime.civil(2017, 1, 1, 0, 0, 0, '-6')).to_s
    json
  end

  def new_collection(page)
    MeekerClient::MeekerCollection.new(
      'http://meeker.publicradio.org/mprnews/homepage-main.json',
      story_endpoint: 'http://mprstory.publicradio.org/mprstory',
      page: page,
      page_size: 20
    )
  end
end
