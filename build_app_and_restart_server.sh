#!/bin/bash

# pull the latest repo
git pull


# build the frontend
npm run build

# build the backend
{ cd backend2; npx tsc; }

# restart the server
sudo systemctl restart project3_zeta
