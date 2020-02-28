if (!moment) {
    var moment = require('moment');
    moment().format();   
}

// DATABASE
const pgp = require('pg-promise')(/* options */)
const db = pgp('postgres://tpl619_2@localhost:5432/eventonica')

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
        this.bookmarkedEvents = {}
    }

    // return promise of users from users table in DB
    getAllUsers() {
        return db.any('SELECT * FROM users')
        .then(function(data) {
            // transforming users in DB with correct key;
            let transformedData = data.map( row => {
                return new User(row.user_name, row.user_id)
            })
            return transformedData;
        })
    }

    // eventDate is {'year': YYYY, 'month': MM, 'day': DD}
    addEvent({eventID, eventDate, eventName, eventCategory, eventLocation}) {
    // Adds a new Event to the System
        for(let event of this.events) {
            if(event.eventID === eventID) {
                return "This event already exists";
            }
        }
        this.events.push(new Event(eventID, eventDate, eventName, eventCategory, eventLocation));
    }

    // FIX THEN SECTION. CHECK IF PROMISE IS ACTUALLY HANDLED
    addUser(userName, userID) {
    // Adds a new User to the System if the user doesn't exist already
        // for(let user of this.users) {
        //     if(user.userID === userID) {
        //         return "This user already exists";
        //     }
        // }
        // this.users.push(new User(userName, userID));
        return db.one('INSERT INTO users (user_name, user_id) VALUES($1, $2)', [userName, userID])
        .then(function(data) {
            console.log(data);    
        })
    }

    // expects numbers for the ID's
    // initialize new Set if user never saved an event
    // add eventID to the Set for the user
    saveUserEvent(userID, eventID){
        // checks if user and event exists already
        let user = this.getUserByID(userID); // user object
        let event = this.getEventByID(eventID); // event object
        
        if (!this.bookmarkedEvents[user.getUserID()]) {
            this.bookmarkedEvents[user.getUserID()] = new Set();
        }
        this.bookmarkedEvents[user.getUserID()].add(eventID);
    }

    // returns user object
    getUserByID(userID) {
        return this.users.filter(user => user.userID === userID)[0];
    }
    
    // returns event object
    getEventByID(eventID) {
        return this.events.filter(event => event.eventID === eventID)[0];
    }

    deleteUser(userID) {
        this.users = this.users.filter(user => user.userID !== userID);

        // TO DO LATER: CHECK BOOKMARKED EVENTS AND DELETE THAT RECORD IF THE USER IS DELETED
    }
   
    deleteEvent(eventID) {
        this.events = this.events.filter(event => event.eventID !== eventID);
         
        // TO DO LATER CHECK BOOKMARKED EVENTS AND DELETE THAT EVENT FOR ALL USERS
    }

    // return array of events that match 
    // pass in object of numbers since input fields take in year, month, day separately
    findEventsByDate({year, month, day}){
        const result = [];
        
        for (let event of this.events) {                    
            if (year === event.eventDate.year || month + 1 === event.eventDate.month + 1 || day === event.eventDate.day) {
                result.push(event);
            }
        }
        
        return result;
    }
    
    // Returns all events in a given category
    findEventsByCategory(eventCategory){
        return this.events.filter(event => {
            return event.eventCategory.toLowerCase() === eventCategory.toLowerCase();
        });
    }
}

class Event {
    constructor(eventID, eventDate, eventName, eventCategory, eventLocation) {
        this.eventID = eventID || Math.floor(Math.random() * 100000);
        this.eventDate = eventDate; // expect date string object in input {yyyy, mm, dd}
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
    
    getUserID() {
        return this.userID;
    }
}

// const er = new EventRecommender();
// er.addEvent({'eventName': "Some Magical Event", 'eventDate': {'year': 2020, 'month': 01, 'day': 01}, 'eventCategory': "Arts & Theatre", 'eventLocation': "A Magical World Somewhere", 'eventID': 11111});
// console.log(er.findEventsByDate({'year': 2020}));

if (typeof module != 'undefined'){
    module.exports = { EventRecommender, User,  Event} 
}