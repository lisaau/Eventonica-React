# Eventonica with React

Eventonica is a web app to manage events from [Techtonica's curriculum](https://github.com/Techtonica/curriculum/tree/master/projects/eventonica). This repo includes part 7 listed in the [Overview](#overview).



## Overview

The project is split into seven phases covering various topics, some of which are in a different GitHub repo.

| Project Outline                                              | Project Repo                                                 |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| [Part 1 - Object-Oriented Programming](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part1-objects.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 2 - Testing](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part2-testing.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 3 - jQuery UI](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part3-jquery-ui.md) | [Eventonica](https://github.com/lisaau/Eventonica)           |
| [Part 4 - API's](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part4-apis.md) | [Eventonica-API](https://github.com/lisaau/Eventonica-API)   |
| [Part 5 - Express Backend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part5-express-backend.md) | [Eventonica-With-Express](https://github.com/lisaau/Eventonica-Express) |
| [Part 6 - Postgres Database](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part6-postgres.md) | [Eventonica-Postgres](https://github.com/lisaau/Eventonica-Postgres) |
| [Part 7 - React Frontend](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part7-react.md) | [Eventonica-React](https://github.com/lisaau/Eventonica-React) |



### Part 7

The project builds on part 1-6. This part focuses on implementing the frontend in React. The backend is mainly the same as part 6.



## Running the app

1. Clone this project 

```bash
git clone https://github.com/lisaau/Eventonica-React.git
cd Eventonica-React
```

2. Install dependencies for both the frontend and backend. Specific instructions are in the respective directory but the summarized version is shown below:

   Setting up backend:

   ```bash
   cd server
   npm install
   
   createdb eventonica
   psql eventonica < eventonica.sql
   
   node index.js
   ```

   Setting up frontend:

   ```bash
   cd ..
   cd client
   npm install
   npm start
   ```

