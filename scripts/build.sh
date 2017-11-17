#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

function doBuild {
  npm install
  gulp make-site
}