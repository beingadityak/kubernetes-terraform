#!/usr/bin/env bash

PROJECT_ID="zuru-tech-hiring"

docker build -t gcr.io/${PROJECT_ID}/nodejs .
gcloud docker -- push gcr.io/${PROJECT_ID}/nodejs