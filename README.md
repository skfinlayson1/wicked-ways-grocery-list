>Problem

Create a grocery list web-application that can be shared in real-time by multiple people.

1. Save, Update, and Delete items to/from a database of your choosing.

2. Authenticate users - allowing the same user to be signed in from multiple devices.

3. Allow add, edit, delete, “mark as purchased”, and “unmark as purchased” on each item.

4. Keep the list synced in real time from each device.

>My Solution

**Main Frame-works and Libraries**

    1. Front-end-framework: React

    2. Back-end: Nodejs

    3. Server-side-framework: Express.js

    4. Database: Postgres

    5. ORM: Sequelize

    6. Authentication: Passport

    7. Web-host: Heroku

>**Overview**

I decided to user React for my front end framework, due to wanting to stay with the PERN stack I was taught while learning web development at Bloc.

I chose to use Nodejs, Express.js and Postgres to handle the server side functionality, for it's simplicity and my familiarity with its use.

To keep the user up to date with changes to the database, I set an interval on the Landing and GroceryList components that sends a request to the server. It simply queues the database every fifteen seconds and sets the state of the components to the values returned.

Passport allows multiple devices to be signed into one user profile which made programming this functionality relatively easy.

Creation of grocery lists and grocery items are simple CRUD commands that all have validations to make sure all values are valid. I have added error messages to the front-end that allow users the ability to see what text they may have inputed incorrectly or possible errors that may occur on the server-side.

>**Trade-offs**

My largest trade-off was deciding on how I wanted to handle data and user sessions. I fluctuated between using Firebase and Postgres. Firebase was my first choice for it's ability to update users when data has changed inside the database and could keep track of users as well. I decided to use Postgres though, one of my current websites is already using it and I wanted to get some more practice using Postgres, Passport and React together before I continue developing it.

>**App Short Comings and Issues**

The largest problem with my application is testing, due to my lack of knowledge of testing a React based SPA I was unable to write a proper testing suite. I did not have enough time to create the app and learn the complex testing frameworks needed to test the front-end and back-end correctly. This lengthened my creation time due to having to manually test all refactoring and new functionality added to my application.

Another issue my grocery list application suffers from is CSS, overall styling and flexibility are lacking and are definitely something I will need to spend more time working on.

Other small tasks do need to be handled, such as, more thorough validations and authorizations, refactoring to reduce the amount of code and make it more consistent throughout the program.

>**If I had more time**

If I had more time to work on this project I would make numerous improvements on this application here are a few

    1. I would definitely spend more time learning Enzyme so I could properly test my application, I also would make the currently existing tests more precise and focus on edge cases

    2. Refactoring would be my next step, due to the short amount of time I had to work on this project some of my code isn't very consistent and could be reduced and perfected. You can see this mostly in the route handling and with variable names that aren't very clear.

    3. CSS is a problem that would take some more of my time to fix. It's not very responsive and is aimed for a cellphone experience. Taking sometime to make the application more flexible would greatly improve it.

    4. Validations and authorizations are lacking, more time needed to be spent on making sure users can't access other users data and tamper with it. Protecting the end points with user authorization would go a long way.

    5. Info messages from the server to convey information other than error messages. The InfoMessages component is structured in a way that would allow different types of messages to be displayed but I didn't have enough time to fully exploit that feature.

    6. New features are needed to make a more well rounded application, I didn't focus too much on this during the design process. I wanted to make sure the simple features were done correctly and worked the way I wanted them too. So taking some time to create some more features would be great.

**If you install this app to your local machine**

I just wanted to include some instructions to make your life easier and not waste your time.

    1. Download project

    2. cd into "server-side" and run npm install

    3. cd into "client-side" and run npm install

    4. If you want to run this on your local machine you will have to look in the src/config/url_config.js and comment out the correct export (I explain why down below). Also run "npm run build".

    5. create postgres databases "grocery-list-dev" and "grocery-list-test" and set SESSION_SECRET or just manually set it in the server-side config

    6. cd into the root directory of the application and type "npm start"

    7. Except my apology if I forgot a step! :)



 The reason why you must comment out one of the exports, is when you run it from the root directory the application believes it's in a production build and sets the environment accordingly, messing up the url. DON'T try to run "npm start" on the client-side and server-side. The two localhost's (port 8080 & 3000) will communicate with each other BUT the cookie will NOT be set on the client side. Creating a whole heap of issues and if you're like me, make your cry a little.

 If the tests on the client-side don't run, try editing each "test.js" file (I just simply added a space to each file). I'm guessing I am doing something wrong and not typing in the correct command. It was the only way I could get the tests to execute though.
 
 Thank you for your time, I hope you enjoy my little application!
