A simple Weather App using React Js 

React is very simple and powerful Javscript library .

I use  [Apiux](http://apixu.com) to fetch data 

### deploying to heroku 

Heroku doesn't allow static files deployment , so I needed to change the project to a php project by these simple steps 

1. Adding a  *composer.json* file  to the root directory of the project and putting this line there `{}` .
2. Adding an *index.php* file  to the root directory and adding this line `<?php include_once("home.html"); ?>` in it .
3. Renaming the main file  (index.html) to *home.html*
4. Run `git push heroku master` :D 

