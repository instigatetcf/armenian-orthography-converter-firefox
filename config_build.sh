#!/bin/bash

# Build config for the build script, build.sh. Look there for more info.

APP_NAME=mashtots
CHROME_PROVIDERS="content locale skin"
CLEAN_UP=1
ROOT_FILES="readme.txt install.rdf chrome.manifest"
ROOT_DIRS=
BEFORE_BUILD="cd dest/"
AFTER_BUILD="mv $APP_NAME.xpi ../$APP_NAME.xpi"
