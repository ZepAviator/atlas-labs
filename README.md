# Experimenting with Tech

This project is experimenting with Polymer 2.0 and the new Firebase Functions.

Firebase is interesting as it is extremely accesable. Very easy to set up auth.
And although limited, the realtime database can solve a lot of issues around
limited connectivity on mobile apps. 




### Setup

##### Prerequisites

If you want to serve the project locally, you need to install [Polymer CLI](https://github.com/Polymer/polymer-cli) using
[npm](https://www.npmjs.com) (we assume you have pre-installed [node.js](https://nodejs.org)).

    npm install -g polymer-cli

You will also need to install the dependances both from bower and npm.

    npm install
    bower install

### Start the development server

This command serves the app at `http://localhost:8080` and provides basic URL
routing for the app:

    polymer serve --open

##### NOTE:
This project is configured to use my test firebase server - which may change to
not exist. To really take advatage of the Firebase Functions, spin up your own
Firebase project. 

For ease, I placed the firebase configuration data in [index.html](index.html)

    npm install -g firebase-tools
    firebase login
    firebase deploy