#!/usr/bin/env bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CLUSTER_NAME=`cat $ROOT/terraform/terraform.tfvars | grep cluster_name | awk '{print $3}' | sed -e 's/^"//' -e 's/"$//'`
PROJECT=`cat $ROOT/terraform/terraform.tfvars | grep project | awk '{print $3}' | sed -e 's/^"//' -e 's/"$//'`

echo "Checking for credentials.json in terraform directory...";
if [ ! -f "$ROOT/terraform/credentials.json" ]; then
    echo "Credentials file not present! You can create one by creating a service account";
    exit 1;
fi

echo "Building out environment";
(cd "$ROOT/terraform"; terraform init -input=false)
(cd "$ROOT/terraform"; terraform apply -input=false -auto-approve)

echo "Generating Kubeconfig entry for the certificate"
certificate_region=$(gcloud container clusters list | grep $CLUSTER_NAME | awk '{print $2}')
gcloud container clusters get-credentials "${CLUSTER_NAME}" --region "${certificate_region}"  --project "${PROJECT}"

(cd "$ROOT/manifests/postgresql"; kubectl apply -f .)
(cd "$ROOT/manifests/nodejs"; kubectl apply -f .)

echo "Deployment Complete! Please note that the certs might take up to 20 mins to generate..."

# until [[ $(kubectl describe managedcertificate) == "" ]]; do
#   echo "Waiting for cert to become available..."
#   sleep 120
# done