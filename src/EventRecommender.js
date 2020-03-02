if (!moment) {
    var moment = require('moment');
    moment().format();   
}
require('dotenv').config()
// DATABASE
const pgp = require('pg-promise')(/* options */)
const db = pgp(process.env.DB_URL);

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
    }

    // USERS
    // return promise of users from users table in DB
    getAllUsers() {
        return db.any('SELECT * FROM users')
        .then(function(data) {
            // transforming users in DB with correct key;
            let transformedData = data.map( row => {
                return new User(row.user_name, row.user_id)
            })
            return transformedData;
        });
    }
    
    addUser(userName) {
        return db.none('INSERT INTO users (user_name) VALUES($1)', [userName])
        .then(function() {
            console.log("User is added to the database");    
        })
        .catch( error => {
            console.log(error);
        })
    }
    
    deleteUser(userID) {
        return db.result('DELETE FROM users WHERE user_id = $1', userID)
        .then( function() {
            console.log('User is deleted')
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
    }
    
    // EVENTS
    // return promise of events from events table in DB
    getAllEvents() {
        return db.any('SELECT * FROM events')
        .then(function(data) {
            // transforming users in DB with correct key;
            let transformedData = data.map( row => {
                return new Event(row.event_id, row.event_date, row.event_name, row.event_category, row.event_location)
            })
            return transformedData;
        })
    }

    addEvent({eventDate, eventName, eventCategory, eventLocation}) {
        return db.none('INSERT INTO events (event_date, event_name, event_category, event_location) VALUES($1, $2, $3, $4)', [eventDate, eventName, eventCategory, eventLocation])
        .then(function() {
            console.log("Event is added to the database");    
        })
        .catch( error => {
            console.log(error);
        })

    }

    deleteEvent(eventID) {
        return db.result('DELETE FROM events WHERE event_id = $1', eventID)
        .then(result =>  {
            console.log(result)
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
    }
    

    // SAVE/SEARCH EVENTS
    // IDs are numbers
    saveUserEvent(userID, eventID){
        return db.none('INSERT INTO user_events (user_id, event_id) VALUES($1, $2)', [userID, eventID])
        .then(result =>  {
            console.log(result)
        })
        .catch(error => {
            console.log('ERROR:', error);
        });
    }
    
    // gets events saved by users. table includes user's id, name, and event's name. table sorted by user id
    getUserEvents() {
        return db.any('SELECT user_events.user_id, events.event_name, users.user_name FROM user_events INNER JOIN events ON events.event_id = user_events.event_id INNER JOIN users ON users.user_id = user_events.user_id ORDER BY user_events.user_id')
    }

    // return array of events that match 
    findEventsByDate(dateString){
        return db.any('SELECT * FROM events WHERE event_date = $1', dateString)
        .then(function(data) {
            // transforming users in DB with correct key;
            let transformedData = data.map( row => {
                return new Event(row.event_id, row.event_date, row.event_name, row.event_category, row.event_location)
            })
            return transformedData;
        })
    }
    
    // Returns all events in a given category
    findEventsByCategory(eventCategory){
        return db.any('SELECT * FROM events WHERE event_category = $1', eventCategory)
        .then(function(data) {
            // transforming users in DB with correct key;
            let transformedData = data.map( row => {
                return new Event(row.event_id, row.event_date, row.event_name, row.event_category, row.event_location)
            })
            return transformedData;
        })
    }
}

class Event {
    constructor(eventID, eventDate, eventName, eventCategory, eventLocation) {
        this.eventID = eventID || Math.floor(Math.random() * 100000);
        this.eventDate = eventDate; // expect date string 'YYYY-MM-DD'
        this.eventName = eventName;
        this.eventCategory = eventCategory;
        this.eventLocation = eventLocation;
    }
}

class User {
    constructor(userName, userID) {
        this.userName = userName;
        this.userID = userID || Math.floor(Math.random() * 100000);
    }
}

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}