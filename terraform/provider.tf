provider "google" {
  project = "${var.project}"
  region  = "${var.region}"
  version = "~> 1.20"
}

provider "google-beta" {
  project = "${var.project}"
  region  = "${var.region}"
  version = "~> v2.1.0"
}