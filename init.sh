#!/bin/bash
FILE=api/.env
if [ -f "$FILE" ]; then
    echo "
.env has already been created
    "    
    sh scripts/dbString.sh
    echo ''
else
    cd api
    touch .env
    echo 'DB_USERNAME=dev' >> .env
    echo 'DB_PW=devpass' >> .env
    echo 'USE_LOCAL_DB=false' >> .env
    echo 'privateKey=peerKey' >> .env
    echo 'jwtPrivateKey=' >> .env
    npm install
    cd ../frontend
    npm install
    cd ..
    echo ''
    sh scripts/dbString.sh
    echo ''
    echo 'To install React Native expo-cli globally, run: 
    sudo npm install -g expo-cli' 
    echo ''
fi