resource "google_compute_global_address" "ingress_ip" {
  name = "nodejs-static-ip"
}

resource "google_dns_record_set" "dns" {
  name         = "${var.domain}."
  type         = "A"
  ttl          = 300
  managed_zone = "${var.managed_zone}"

  rrdatas = ["${google_compute_global_address.ingress_ip.address}"]
}

data "google_compute_zones" "available" {}

data "google_container_engine_versions" "gke_version" {
    zone = "${data.google_compute_zones.available.names[0]}"
}

resource "google_container_cluster" "primary" {
  name               = "${var.cluster_name}"
  zone               = "${data.google_compute_zones.available.names[0]}"
  node_version       = "${data.google_container_engine_versions.gke_version.latest_node_version}"
  min_master_version = "${data.google_container_engine_versions.gke_version.latest_master_version}"
  initial_node_count = 1
  remove_default_node_pool = true

  node_config {
    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}

resource "google_container_node_pool" "primary_preemptible_nodes" {
  name       = "my-node-pool"
  cluster    = "${google_container_cluster.primary.name}"
  zone       = "${data.google_compute_zones.available.names[0]}"
  node_count = 2

  node_config {
    preemptible  = true
    machine_type = "n1-standard-1"

    metadata {
      disable-legacy-endpoints = "true"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}