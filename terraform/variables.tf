variable "project" {
  description = "the GCP project to deploy this demo into"
  type        = "string"
}

variable "region" {
  description = "the region in which to create the Kubernetes cluster"
  type        = "string"
}

variable "cluster_name" {
  description = "the name to use when creating the GKE cluster"
  type        = "string"
}

variable "domain" {
  description = "the name to domain that will be used"
  type        = "string"
}

variable "managed_zone" {
  description = "managed zone to use to create domain name"
  type        = "string"
}