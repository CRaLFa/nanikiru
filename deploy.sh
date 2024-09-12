#!/bin/bash

npm run build || exit

# gsutil rm -r gs://k-morita-static/nanikiru/assets
gsutil -m rsync -r ./dist gs://k-morita-static/nanikiru
