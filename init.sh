#!/bin/bash
FILE=api/.env
if [ -f "$FILE" ]; then
    echo ".env file already exists
    To view Cluster connection string run:
    bash scripts/dbString.sh"
else
    cd api
    touch .env
    echo 'DB_USERNAME=<username>' >> .env
    echo 'DB_PW=<password>' >> .env
    npm install
    cd ../frontend
    npm install
    cd ..
    echo ''
    sh ./scripts/dbString.sh
    echo ''
    echo 'To install React Native expo-cli globally, run: 
    sudo npm install -g expo-cli' 
fi