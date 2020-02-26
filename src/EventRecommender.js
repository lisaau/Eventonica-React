if (!moment) {
    var moment = require('moment');
    moment().format();   
}

class EventRecommender {
    constructor() {
    // All main properties should go here.
        this.events = [];
        this.users = [];
        this.bookmarkedEvents = {}
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

    addUser(userName, userID) {
    // Adds a new User to the System if the user doesn't exist already
        for(let user of this.users) {
            if(user.userID === userID) {
                return "This user already exists";
            }
        }
        this.users.push(new User(userName, userID));
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