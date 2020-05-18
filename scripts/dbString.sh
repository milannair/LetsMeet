#!/bin/bash
DB_USERNAME=$(grep DB_USERNAME api/.env | cut -d '=' -f 2-)
DB_PW=$(grep DB_PW api/.env | cut -d '=' -f 2-)
echo 'To view the MongoDB cluster, copy/paste following connection string in MongoDB Compass: 
    mongodb+srv://'$DB_USERNAME':'$DB_PW'@cluster0-kdglj.mongodb.net/LetsMeet'