#!/bin/bash

# pull the latest repo
git pull

# build the project
npm run build
pushd backend2
npm run build
popd

# restart the server
sudo systemctl restart project3_zeta
