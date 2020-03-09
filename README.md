# Eventonica

NOTE: This version of Eventonica is the same as Eventonica-Postgres except some APIs were adjusted when creating the React frontend. The jQuery UI files are still included in this repo.

[Eventonica](https://github.com/Techtonica/curriculum/tree/master/projects/eventonica) is a web app to manage events from Techtonica's curriculum.

This builds on the [Eventonica project](https://github.com/lisaau/Eventonica) and includes [Part 6 - Postgres Database](https://github.com/Techtonica/curriculum/blob/master/projects/eventonica/eventonica-part6-postgres.md).



## How to run the app

1. Clone this directory/save files in this directory

2. Change into that directory and install dependencies:

   ```
   npm install
   ```

3. Set up the database using PostgreSQL. Make sure you have [PostgreSQL](https://wiki.postgresql.org/wiki/Homebrew) installed, which can be installed using [homebrew](https://brew.sh/). Take the eventonica.sql file and restore the database by running:

   ```
   createdb eventonica
   psql eventonica < eventonica.sql 
   ```

4. Create a .env file following the format in .env.example and change USERNAME to the username of your machine. 

5. Run the Express server by running:

   ```bash
   node index.js
   ```

6. View the site on http://localhost:3000/

7. Running Mocha tests/Supertest - integration tests to test REST API's written in ExpressJS

   - Use `mocha` to run integration tests

   