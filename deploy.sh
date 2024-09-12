#!/bin/bash

npm run build || exit

gsutil -m rsync -d -r ./dist gs://k-morita-static/nanikiru
