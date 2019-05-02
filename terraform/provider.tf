provider "google" {
  credentials = "${file("credentials.json")}"
  project = "${var.project}"
  region  = "${var.region}"
  version = "~> 1.20"
}

provider "google-beta" {
  credentials = "${file("credentials.json")}"
  project = "${var.project}"
  region  = "${var.region}"
  version = "~> v2.1.0"
}