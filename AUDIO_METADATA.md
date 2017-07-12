# Audio Metadata Hook

This Javascript uses schema.org metadata for AudioObject implemented with JSON-LD.

A typical JSON-LD block will look like this:

```json
{
  "@type": "AudioObject",
  "contentUrl": "//example.org/example.mp3",
  "description": "Sample description",
  "duration": "PT00H35M12S",
  "encodingFormat": "mp3",
  "name": "Sample Title",
  "identifier": "S0M3_UN1QU3_1D3NT1F13R",
  "uploadDate": "2017-06-23T00:00:00-05:00",
  "isPartOf": {
    "@type": "Article",
    "url": "//example.org/story/2017/06/23/sample-title",
    "headline": "Sample Title"
  },
  "creator": {
    "@type": "Organization",
    "name": "Sample Organization",
    "url": "//example.org"
  }
}
```

The hook will parse this metadata and craft a POST request to the API server.