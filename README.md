[![Build Status](https://travis-ci.org/EmaEvidence/PostIt.svg?branch=Refactor-Model)](https://travis-ci.org/EmaEvidence/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/EmaEvidence/PostIt/badge.svg?branch=Refactor-Model)](https://coveralls.io/github/EmaEvidence/PostIt?branch=Refactor-Model)
[![Code Climate](https://codeclimate.com/github/EmaEvidence/PostIt/badges/gpa.svg)](https://codeclimate.com/github/EmaEvidence/PostIt)
# PostIt
## Introduction.
PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want. The App exist in two parts; the PostIt API and the PostIt front end.

## Dependencies.

The functionality of this web app being a node.js app depends on the following node modules.

**Express.js**: A Fast, opinionated, minimalist web framework for node which was used in routing this application.  
**BodyParser**: This module was used to collect search data sent from the client side to the routing page.   
**Gulp**: This allows the automation of all processes.  
**Babel**: This project is written in ES6, babel transpiles the code to ES5.  
**Coveralls**:  
**Sequelize**: Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the APP . It features solid transaction support, relations, read replication and more.  
**Webpack**: webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in browser, it is also used for transpiling scss to css.  
**React**:  
**Redux**:  
**Bcryptjs**: It is the encryption middle used for hashing user password.


## To install this project to your local machine follow the flowing steps;

1. Click Clone or download button Under the repository name or copy the url below;

      ```https://github.com/EmaEvidence/PostIt.git```

2. Click to copy the clone URL for the repository.

3. Open Git Bash on your system.

4. Change the current working directory to the location where you want the project to be made.

5. Type git clone, and then paste the URL you copied in Step 2.

6. Press Enter. Your local clone will be created.

7. Checkout to the develop branch.

     ```npm test``` or ```gulp``` runs all tests and gives a coverage report based on the tests for the API. 
     ```npm start``` starts the API.  

The API exposes the following endpoints for consumption:
  1. ```/api/user/signup``` (For registering a new user) . 
    The API takes the following parameters sent via a post request.  
      name  
      username  
      email  
      password  
  2. ```/api/user/signin``` (For user authentication)  
    The API takes the following parameters sent via a post request.  
      username  
      password  
  3. ```/api/group``` (For creating a group)  
    The API takes the following parameters sent via a post request.  
      gpname  
  4. ```/api/group/:groupid/user``` (For adding users to a group)  
    The API takes the following parameters sent via a post request.  
      groupid  
      user(id of the User)  
  5. ```/api/group/:groupid/message``` (For posting messages to  group)  
    The API takes the following parameters sent via a post request.  
      groupid  
      message  
      priority  
  6. ```/api/group/:groupid/messages``` (For retrieving messages for a particular group)  
    The API takes the following parameters sent via a get request.  
      groupid  

To Test with POSTMAN follow the steps below;

Enter this link to the URL of POSTMAN to hit the endpoints;

Locally: ```localhost:3000/the API you want to hit```

Remotely: ```https://postitapi.herokuapp.com/the API you want to hit```
