provider "google" {
  credentials = "${file("terraform-user.json")}"
  project = "${var.project}"
  region  = "${var.region}"
  zone = "${var.region}-f"
  version = "~> 1.20"
}

provider "google-beta" {
  credentials = "${file("terraform-user.json")}"
  project = "${var.project}"
  region  = "${var.region}"
  zone = "${var.region}-f"
  version = "~> v2.1.0"
}