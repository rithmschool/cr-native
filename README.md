# coursereport-native
React Native App for Course Report

# Table of Contents
1. [Getting Started](#getting-started) 
2. [Get Proxy Server Running](#get-proxy-server-running) 
3. [TODO](#todo)

# Getting Started
1. Install expo with `npm install -g expo-cli`
1. Install packages with 
`npm install`  
1. Make sure PROXY_URL in config.js is pointing to internal ip of computer that is running the proxy server. Make sure the port is correct. To find the internal ip of your computer run `ifconfig | grep broadcast`. For this response, `inet 192.168.1.82 netmask 0xffffff00 broadcast 192.168.1.255` the internal ip is 192.168.1.82.
1. Run `expo start`

# Get Proxy Server Running
1. Clone proxy server from this repo: `https://github.com/rithmschool/coursereport-proxy`
1. Run `npm install`
1. Make sure BASE_URL in config.js is pointing to rails server
1. Run `node runCache.js` to send data to redis server

Reference README at proxy server repo for more information.

# TODO

### Add Sort by Current Location Button
The schools screen currently sorts by location automatically but we would like to add a button that activates this functionality.

### Add Tests 
We tests would be helpful for understanding what is going wrong when things go wrong. 