#!/bin/bash

# v1: https://drive.google.com/open?id=1aaQiJByEcAcY_dEpYbLN9tFUmtza80_k
echo "started"

########
# START
########
# Project root
mkdir /var/www
cp -r ~/Desktop/musiikki /var/www/musiikki
cd /var/www/musiikki

# Basics
apt-get update
apt-get install curl

# Node
snap install --edge node --classic
npm install passport
npm install -g marked
npm install insain --save
npm install uuid
npm install stripe --save
npm install v8 -g
npm init
npm install express --save


# Couch
snap install couchdb
# curl -X GET http://admin@password@127.0.0.1:5984/_all_dbs
# curl http://admin:password@127.0.0.1:5984
# couchdb -c

# ctags
apt-get install ctags

# Sublime
wget -qO - https://download.sublimetext.com/sublimehq-pub.gpg | s$
echo "deb https://download.sublimetext.com/ apt/stable/" | sudo t$
apt-get update
apt-get install sublime-text

# Cli Browser
# broken apt-get install lynx-cur