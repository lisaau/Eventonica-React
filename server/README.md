# Eventonica Express Backend

Serving Eventonica React client



## How to run the app

2. In this directory, install dependencies by running

   ```
   npm install
   ```

3. Set up the database using PostgreSQL. Make sure you have [PostgreSQL](https://wiki.postgresql.org/wiki/Homebrew) installed, which can be installed using [homebrew](https://brew.sh/). Take the eventonica.sql file and restore the database by running:

   ```
   createdb eventonica
   psql eventonica < eventonica.sql 
   ```

4. Create a .env file following the format in .env.example and change `USERNAME` to the username of your machine. 

4. Run the Express server by running:

   ```bash
   node index.js
   ```

   or with

   ```bash
   nodemon
   ```

6. The server is running on port 3000. View the app on http://localhost:3001/

7. Running Mocha tests/Supertest - integration tests to test REST API's written in ExpressJS

   - Use `mocha` to run integration tests. Make sure you have started up the server before running the tests.

   