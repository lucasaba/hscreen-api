#!/bin/bash

echo 'Creating Application User'

mongo $MONGO_INITDB_DATABASE \
    --host localhost \
    -u $MONGO_INITDB_ROOT_USERNAME \
    -p $MONGO_INITDB_ROOT_PASSWORD \
    --authenticationDatabase admin \
    --eval "db.createUser({user: '${MONGODB_USER}', pwd: '${MONGODB_PASSWORD}', roles:[{role:'dbOwner', db: '${MONGO_INITDB_DATABASE}'}]});"