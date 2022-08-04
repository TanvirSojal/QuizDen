# QuizDen

![qq](https://user-images.githubusercontent.com/14056189/90792874-d92ea380-e32c-11ea-855d-0c604f2ea20b.PNG)

## Introduction

A simple and minimalist quiz building and participating application. After building quiz, a quiz code will be generated for sharing. User can participate in the quiz with this code.

#### Live Demo: http://quizden-app.herokuapp.com/

![ezgif-7-58076e634990](https://user-images.githubusercontent.com/14056189/90800244-3c710380-e336-11ea-9747-56e2b2a7b627.gif)

## Technologies Used

### Back-end System

- ExpressJS (NodeJS web framework)
- Mongoose (MongoDB ODM)

### Front-end System

- ReactJS (Front-end Library)
- HTML
- CSS
- Bootstrap

### Other NPM Dependencies

- BCrypt (Password hashing)
- JSON Web Token - JWT (Authentication token)
- Axios (HTTP client)

### Database System

- MongoDB (NoSQL database, Mongoose ODM used for queries)

### UI Elements

- The Logo is an Icon from [IconScout](https://iconscout.com/icon/cube-1957280)
- The Emojis are from Emojipedia, Getemoji etc.
- Everything else is custom made

## Screenshots

### Landing Page

A minimal landing page

![image](https://user-images.githubusercontent.com/14056189/90796666-6a077e00-e331-11ea-9bd8-0f11fee7327a.png)

### Dashboard

List of quizzes created by the user is listed here with sharable codes. User can both build and attend quizzes. Can see statistics of him/herself and for every quizzes curated by him/her.

![image](https://user-images.githubusercontent.com/14056189/90793239-4cd0b080-e32d-11ea-9b53-5abeda39eacd.png)

### Quiz Builder

User can add questions and for every question, indefinite number of options can be added. One of the option has to be selected as correct answer.

![image](https://user-images.githubusercontent.com/14056189/90796903-be126280-e331-11ea-9143-8f88e3d393d3.png)

### Quiz Code

User will see this page after creating a quiz successfully.

![image](https://user-images.githubusercontent.com/14056189/90799507-244cb480-e335-11ea-99cb-0e0f07cd938c.png)

### Find Quiz

User can paste quiz code to find quiz. The quiz title and description will be shown if found.

![image](https://user-images.githubusercontent.com/14056189/90797055-ef8b2e00-e331-11ea-93c2-bbbe9020b60a.png)

### Quiz Taker

User can take the quiz after finding it using the code. Similar to the building interface, but nothing can be edited here. User can only select the options.

![image](https://user-images.githubusercontent.com/14056189/90797191-22cdbd00-e332-11ea-8486-92146ac15398.png)

## Quiz Result

User will see this page after taking a quiz successfully. The attendance count will increase by one. And the flawless count will be increased by one if they answer all correctly.

![image](https://user-images.githubusercontent.com/14056189/90799678-61b14200-e335-11ea-95a9-420f9b10c796.png)
