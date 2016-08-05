#!bin/bash
#
# Script used to install Kinesis Interface
#

if [ ! -d "./kinesis-interface" ]; then
  # Download directory
  git clone https://github.com/scup/kinesis-interface.git

  # Change directory
  cd kinesis-interface

  # Install dependencies
  npm install --production
fi
