#!/bin/sh\n\n

destdir=$1
pcsd_webui_dir=$2
cockpit_dir=$2

if [ "$pcsd_webui_dir" = "" ] && [ "$cockpit_dir" = "" ]; then
  echo "No install location found, skipping installation"
  exit 0
fi

if [ ! "$pcsd_webui_dir" = "" ]; then
  standalone_dir="$destdir"/"$pcsd_webui_dir"
	mkdir -p "$standalone_dir"
	cp -r build/for-standalone/* "$standalone_dir"
fi

if [ ! "$cockpit_dir" = "" ]; then
  cockpit_ha_cluster_dir="$destdir"/"$cockpit_dir"/ha-cluster
	mkdir -p "$cockpit_ha_cluster_dir"
	cp -r build/for-cockpit/* "$cockpit_ha_cluster_dir"
fi
