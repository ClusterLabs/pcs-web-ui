#!/bin/sh

usage() {
  cat << END_OF_USAGE
Usage: $0 [ -t <mocked|standalone|cockpit>] [ -c <path>]
  -t      test type: mocked (default) or with real cluster: standalone or
          cockpit
  -c      config file; will be watched and sourced before each run
END_OF_USAGE
}

dev_dir=$(realpath "$(dirname "$0")"/../../../.dev)
dev_config="$dev_dir"/cluster-test-conf.sh

run_jest=$(dirname "$0")/run-jest.sh
test_type="mocked"

while getopts c:t: name; do
  case $name in
    c)
      dev_config=${OPTARG}
      ;;
    t)
      test_type=${OPTARG}
      ;;
    *)
      usage
      exit 1
      ;;
  esac
done

echo Launching jest, please wait for a while...

scenes_path_pattern() {
  scenes=src/test/scenes
  if [ -z ${PCS_WUI_TESTS+x} ]; then
    echo "$scenes"
  else
    echo "$scenes/($(echo "$PCS_WUI_TESTS" | tr ' ' '|'))"
  fi
}

run() {
  if [ -f "$dev_config" ]; then
    # In POSIX sh, source in place of . is undefined.
    # shellcheck source=/dev/null
    . "$dev_config"
  fi

  case "$test_type" in
    standalone)
      "$run_jest" -s -p src/test/clusterBackend
      ;;
    cockpit)
      "$run_jest" -s -p src/test/cockpitBackend
      ;;
    *)
      "$run_jest" -p "$(scenes_path_pattern)"
      ;;
  esac
}

if [ -x "$(command -v inotifywait)" ]; then
  run
  while inotifywait -r -e MODIFY -e CREATE -e MOVE -e DELETE \
    src/ \
    "$dev_dir"/ \
    "$dev_config" \
    ; do
    run
  done
else
  echo "inotifywait is not installed; running just onetime jest"
  echo "Tip: install inotifywait." \
    "Then you get a possibility to watch changes in config specified by -c"
  run
fi
