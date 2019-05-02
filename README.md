# DevOps assignment

I have deployed a simple Node.js application in Kubernetes with separate deployments for Node.js and PostgreSQL database. The code for the same resides in `app` directory. This app basically provides you random strips of various comics through web scraping (List available at `/api` endpoint).

## Pre-requisites

* You should have `credentials.json` handy and it must be placed in `terraform` directory.
* An image of the app must be created in GCR (which is made easy by running `deploy.sh` in `app` directory)
* You must have a domain and that must be managed by GCP (i.e. a Hosted Zone must be present in Cloud DNS)

## Setting up the cluster

* The setup of the cluster is made easy by using `configure.sh` present in the root.
* The terraform part of this script will deploy a GKE cluster of 2 nodes, create a static IP address and add that as an A record in the hosted zone and configure the kubectl for the cluster.
* The kubectl part of the script will deploy a 3-pod deployment of the Node.js app with a Load Balancer DNS & SSL certs for the domain (managed by Google and CA is **letsencrypt**) and a single pod deployment of the PostgreSQL DB (which is deployed using the official image). Please note that it may take up to 20 minutes for the certs to become available.
* Deployment manifests are available at `manifests` directory.

## Cleaning up

* Run the `cleanup.sh` script for tearing down the environment.