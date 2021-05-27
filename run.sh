#!/bin/bash
echo "------------------------------"
echo "INSTALLING: Production Dependencies!"
echo "------------------------------"
echo "                              "
yarn --production
echo "                              "
echo "------------------------------"
echo "INSTALLING: Complete!"
echo "------------------------------"
echo "                              "
echo "LAUNCHING: Bean-Dashboard."
echo "                              "
echo "------------------------------"

yarn start