#!/bin/sh

package_dir=$(realpath "$(dirname "$0")"/../..)
dev_dir=$(realpath "$(dirname "$0")"/../../../.dev)
dev_config="$dev_dir"/cluster-test-conf.sh

run_jest=$(dirname "$0")/run-jest.sh
if [ -z ${PCS_WUI_TEST_TYPE+x} ]; then
  export PCS_WUI_TEST_TYPE="mocked"
fi

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

  echo Launching "$PCS_WUI_TEST_TYPE" tests
  case "$PCS_WUI_TEST_TYPE" in
    mocked)
      "$run_jest" -p "$(scenes_path_pattern)"
      ;;
    *)
      "$run_jest" -s -p src/test/realBackend
      ;;
  esac
}

if [ -x "$(command -v inotifywait)" ]; then
  run
  while inotifywait -r -e MODIFY -e CREATE -e MOVE -e DELETE \
    "$package_dir"/app/src/ \
    "$package_dir"/dev-backend/src/ \
    "$package_dir"/test/src/ \
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
