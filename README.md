[![Build Status](https://travis-ci.org/EmaEvidence/PostIt.svg?branch=Refactor-Model)](https://travis-ci.org/EmaEvidence/PostIt)
[![Coverage Status](https://coveralls.io/repos/github/EmaEvidence/PostIt/badge.svg?branch=Refactor-Model)](https://coveralls.io/github/EmaEvidence/PostIt?branch=Refactor-Model)
[![Code Climate](https://codeclimate.com/github/EmaEvidence/PostIt/badges/gpa.svg)](https://codeclimate.com/github/EmaEvidence/PostIt)
# PostIt
```PostIt``` is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. The application allows people create accounts, create groups and add registered users to the groups, and then send messages out to these groups whenever they want. The App exist in two parts; the PostIt API and the PostIt front end.

## Dependencies
The functionality of this web app being a node.js app depends on the following technologies.

[**Express.js**](https://expressjs.com/): A Fast, opinionated, minimalist web framework for node which was used in routing this application.  
[**BodyParser**](https://babeljs.io/): This module was used to collect search data sent from the client side to the routing page.   
[**Babel**](https://babeljs.io/): This project is written in ES6, babel transpiles the code to ES5.  
[**Sequelize**](https://www.sequelizejs.com): Sequelize is a promise-based Node.js ORM for Postgres Server which is the database server for the APP . It features solid transaction support, relations, read replication and more.   
[**Postgresql**](https://www.postgresql.org/): PostgreSQL is a powerful, open source object-relational database system.  
[**Webpack**](https://webpack.js.org/): webpack is a module bundler. Its main purpose is to bundle JavaScript files for usage in browser, it is also used for transpiling scss to css.  
[**React**](https://facebook.github.io/react/): A javascript library for building user interfaces.  
[**Redux**](http://redux.js.org/): Redux is a predictable state container for JavaScript apps.  


## Installation

1. Install nodejs and postgresql if not installed.
2. Navigate to the directory you want it installed to. cd your folder
3. Clone the repository ``` https://github.com/EmaEvidence/PostIt.git ```.
4. Create a database with PostgreSQL.
5. Open the PostIt folder.
6. Create a .env file using the .envexample as a guide.
7. ``` npm install ``` to install all dependencies.
8. ``` npm run dev-build ``` to build the app.
9. ``` npm start ``` starts the app.
10. The app runs on port 3300
11. ``` npm run test ``` runs the server test.
12. ``` npm run client-test ``` runs the client-side test
13. The API can be consumed with postman.

## The API.
The API exposes the following endpoints for consumption:  
  1. ```POST``` /api/v1/user/signup. The API takes the following parameters name, username, email, password, phone.  
    Registers a new user.  
  2. ```POST``` /api/v1/user/signin. The API takes the following parameters username, password.  
    Signs In a registered user.  
  3. ```POST``` /api/v1/group. The API takes the following parameters groupName, users.  
    Creates a group.  
  4. ```POST``` /api/v1/group/:groupid/user. The API takes the following parameters groupId(url query), userId.  
    Adds a user to a group.  
  5. ```POST``` /api/group/:groupid/message. The API takes the following parameters groupId, message, priority.   
    Sends a message to a group  
  6. ```GET``` /api/group/:groupid/messages. The API takes groupId as parameter.  
    Retrieves Messages of a Group.  
  7. ```GET``` /api/v1/user/all. The API takes no parameter.  
    Gets all users in the application.  
  8. ```POST``` /api/v1/users/delete. The API takes the following parameters groupId, message, priority.  
    Deletes a member from the apllication.  
  9. ```POST``` /api/v1/user/message/read. The API takes the following parameters groupId, message, priority.  
    Marks a message as read.  
  10. ```POST``` /api/v1/users/search. The API takes the following parameters searchTerm, offset, groupId.  
    Searches the application for a search term  
  11. ```POST``` /api/v1/user/google. The API takes the following parameters name and email.  
    Registers a User with google+  
  12. ```POST``` /api/v1/user/forgotpassword. The API takes email as the parameter.  
    For Requesting for a change of password  
  13. ```POST``` /api/v1/user/newpassword. The API takes the following parameters newPassword and userKey.  
    For resetting password  
  14. ```GET``` /api/v1/user/messages. The API takes no parameter just JSON web token.  
    For getting every message of a user  
  15. ```GET``` /api/v1/user/messages/archived. The API takes no parameter just JSON web token.  
    For getting every message a user has read  
  16. ```GET``` /api/v1/user/groups. The API takes no parameter just JSON web token.  
    For getting every group a user belongs to  
  17. ```GET``` /api/v1/group/:groupId/users. The API takes groupId as parameter.  
    For getting members of a group  
# The Application uses JSON web token. Ensure you send it in the header request.  
The API documentation for this project can be found [here](http://docs.postit9.apiary.io/#)
## Test  
API test is written with ``` jasmine ``` and ``` supertest ```.
Frontend tests is written with ``` jest ``` and ``` enzyme ```.

## Limitations.
The Notification system of this project is not real time.
Users can't be removed from a group Yet.
Messages can't be edited or deleted.


## How to Contribute
The project is open for contribution. You can start by making the Notifcation system real time using socket.io. If you have other improvements you want to add, feel free to do so. Ensure you follow style guide and visit the wiki page for a guide as regards project convention
[wiki](https://github.com/EmaEvidence/PostIt/wiki)

## FAQ
#### To which branch should I raise a PR?   
``` Every PR is to be raised against development branch. ```   
