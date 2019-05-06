#!/usr/bin/env bash

ROOT="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

CLUSTER_NAME=`cat $ROOT/terraform/terraform.tfvars | grep cluster_name | awk '{print $3}' | sed -e 's/^"//' -e 's/"$//'`
PROJECT=`cat $ROOT/terraform/terraform.tfvars | grep project | awk '{print $3}' | sed -e 's/^"//' -e 's/"$//'`

(cd "$ROOT/manifests/postgresql"; kubectl delete -f .)
(cd "$ROOT/manifests/nodejs"; kubectl delete -f .)

# Wait for Kubernetes resources to be deleted before deleting the cluster
# Also, filter out the resources to what would specifically be created for
# the GKE cluster
until [[ $(gcloud compute forwarding-rules list --filter "name ~ nodejs") == "" ]]; do
  echo "Waiting for cluster to become ready for destruction..."
  sleep 10
done

until [[ $(gcloud compute target-https-proxies list --filter "name ~ nodejs") == "" ]]; do
  echo "Waiting for cluster to become ready for destruction..."
  sleep 10
done

# Remove States
cd "$ROOT/terraform" || exit; terraform destroy -input=false -auto-approve
rm -f "$ROOT/terraform/terraform.tfstate"
rm -f "$ROOT/terraform/terraform.tfstate.backup"
rm -rf "$ROOT/terraform/.terraform"

# Remove cluster config from kubectl
CONTEXT=$(kubectl config get-contexts -o=name | grep "${CLUSTER_NAME}")
if [[ -n $CONTEXT ]]; then
  kubectl config delete-context "$CONTEXT"
  kubectl config delete-cluster "$CONTEXT"
  kubectl config unset "users.$CONTEXT"
  # unset current context if it's us
  CURRENT=$(kubectl config current-context)
  if [ "$CURRENT" == "$CONTEXT" ]; then
    kubectl config unset current-context
  fi
  echo "Removed demo from kubectl config."
else
  echo "No kubectl contexts to destroy."
fi

echo "Cleanup Complete!"