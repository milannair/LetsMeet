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
    echo 'DB_USERNAME=default' >> .env
    echo 'DB_PW=readOnly' >> .env
    #npm install
    cd ../frontend
    #npm install
    cd ..
    echo ''
    echo 'Remember to replace DB_USERNAME and DB_PW placeholders in api/.env with your unique DB Credentials. 
Then, run this script again (bash init.sh) to get your unique connection string. 
(WARNING: If you do not replace credentials you will have read-only access; only GET requests will work)'
    open api/.env
    echo ''
    echo 'To install React Native expo-cli globally, run: 
    sudo npm install -g expo-cli' 
    echo ''
fi