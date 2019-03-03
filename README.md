# ScoutingSpreadsheet2018
Scouting Spreadsheet 2018

This uses JavaScript and HTML5.
You can use nwjs.io (recommended) or you can open and serve the spreadsheet in a browser.
This will grab the teamData and matchData JSON files from http://192.168.1.2/<team|match>Data.json from the server by default. You can change this in  getData.js as your server's ip may be set up differently.
In our setup, we used our server to collect data from the scouting app via bluetooth, and serve this spreadsheet as well as the data with a web server.
Please note that in the 2018 powerup season, you shouldn't use wifi where the game takes place, you will need to use wired connections for the webserver only, use the spreadsheet only on the Pi, or serve over wifi somewhere else (such as the pit).
Feel free to post any bugs or clarifications in the issues section.
