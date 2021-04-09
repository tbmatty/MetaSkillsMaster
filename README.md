# How to run

Requirements: Node.js LTS release or greater
              Git
              Watchman for macOS users

*Install yarn*
*Use VSCode to open the MetaSkillsMaster folder* - this is recommended as VSCode has a terminal at the bottom so you can run it from the one screen

*Install expo-cli*: npm install --global expo-cli

*install dependencies* - expo install in the terminal on VSCode, or just with a command shell in the project directory

*To run the app* - expo start in the terminal on VSCode, or just with a command shell in the project directory

Either run on an android emulator, or use an android phone - this will require you to download Expo's app from the play store. You will have to sign in on your PC and phone to do this.

*to build the app* - expo build:android -t apk for apk, or expo build:android -t app-bundle


Directory Structure: App.js contains code related to processes happening in the background of the application, as well as defining the Navigation structure,
                     The remaining JavaScript files are for each of the screens, this is where the majority of the code is
