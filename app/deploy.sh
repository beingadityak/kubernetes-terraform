#!/usr/bin/env bash

PROJECT_ID="YOUR_PROJECT_ID"

docker build -t gcr.io/${PROJECT_ID}/nodejs .
gcloud docker -- push gcr.io/${PROJECT_ID}/nodejs
