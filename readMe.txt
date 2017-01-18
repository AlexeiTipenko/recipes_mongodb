COMP 2406 - Assignment 5
Name: Alexei Tipenko (100995947)
Date: Friday, December 9th, 2016

* Developed in MacOS *
* Tested with Chrome browser *


Program: This is a database-backed web app that uses Node.js,
         Express, Pug, and Mongo. The app is for dispaying
         and updating recipes using Pug templating in the front end
         and MongoDB for storage on the back end.

Files (in folder a5):

1) app.js (server)
2) public_html folder
      - recipePage.js (The javascript that makes changes to html file)
      - 404.html (Error html page displayed when page does not exit)
      - style.css (styling sheet for html elements)
3) package.json
4) views folder
      - index.pug
3) node_module folder
4) readMe.txt


Usage:

1) Navigate to proper directory/folder of the app.js file inside the terminal (a5).
2) type 'node' and enter (make sure node is installed on your computer)
3) type the following, then press enter:

    node app.js

(The console will display a message that the server is running)

4) Go to your browser (preferably Chrome) and type in "http://localhost:2406/"
   into the url bar. Press enter.

5) To view a specific recipe, type in "http://localhost:2406/recipe/" + <recipe name here>.


Notes:

If the name of the recipe you are trying to post already exists, the program will
overwrite the previous recipe with the newly posted recipe.
