#!/bin/sh
# For dev purposes: run this command the get a Chrome instance that will treat
# our insecure self-signed cert as secure, so that service workers can be registered
# and tested and worked on in a dev environment
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --user-data-dir=/tmp/foo --ignore-certificate-errors --unsafely-treat-insecure-origin-as-secure=https://apmgo.dev
