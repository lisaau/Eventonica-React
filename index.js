const express = require('express');
const { EventRecommender, User,  Event}  = require('./src/EventRecommender');
const er = new EventRecommender();

// some data to work with!
er.addEvent({'eventName': "Some Magical Event", 'eventDate': {'year': 2020, 'month': 01, 'day': 01}, 'eventCategory': "Arts & Theatre", 'eventLocation': "A Magical World Somewhere", 'eventID': 11111});
er.addEvent({'eventName': "Corgi Con", 'eventDate': {'year': 2019, 'month': 10, 'day': 19}, 'eventCategory': "Sports", 'eventLocation': "San Francisco", 'eventID': 22222});
er.addUser("Lisa", 12345);
er.addUser("Kim", 12346); 
// er.saveUserEvent(12345, 11111);

const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(morgan('tiny'));


// serve static files
app.use(express.static('public'))
    
// gets array of all users (each user is an object). returns an array
app.get('/users', (req, res) => {
    res.json(er.users); // is a json string of an array
})

// adds one user (key = 'username', value = name of user as a string)
// input taken from body
// userID is optional
// does not return anything
app.post('/user', (req, res) => {
    const userName = req.body.userName;
    const userID = parseInt(req.body.userID);
    er.addUser(userName, userID)

    res.status(200).send('User is added to the "database"');
});

// deletes one user by userID (number)
app.delete('/user', (req, res) => {
    const user = parseInt(req.body.userID);
    
    if(er.users.includes(er.getUserByID(user))) {
        er.deleteUser(user);
        res.status(200).send('User is deleted from the "database"');
    } else {
        res.status(400).send('User was not found');
    }
})

// gets array of all event objects
app.get('/events', (req, res) => {
    res.json(er.events) // is a json string of an array
})

// adds one event, does not return anything 
// required parameter: eventDate ({'year': number, 'month': number, 'day': number}), eventName (string), eventCategory (string), eventLocation (string))
// eventID (number) is optional. will randomly assign ID if none is provided
app.post('/event', (req, res) => {
    // Works for now but would be a pain to add more parameters 
    let {eventID, eventName, eventCategory, eventLocation, eventDate} = req.body;

    // year, month, day come in as strings, change to number
    let {year, month, day} = eventDate;
    year = parseInt(year);
    month = parseInt(month);
    day = parseInt(day);
    eventDate = {'year': year, 'month': month, 'day': day};

    er.addEvent({'eventID': parseInt(eventID), 'eventDate': eventDate, 'eventName': eventName, 'eventCategory': eventCategory, 'eventLocation': eventLocation});
    
    // er.addEvent(req.body); // would be better this way but would need to change the code that creates the random ID otherwise NaN will be displayed. But I don't want to do that right now
    res.status(200).send('Event is added to the "database"');
});

// deleted one event by eventID (number)
// does not return anything
app.delete('/event/', (req, res) => {
    const event = parseInt(req.body.eventID);
    if (er.events.includes(er.getEventByID(event))) {
        er.deleteEvent(event);
        res.status(200).send('Event is deleted from the "database"');
    } else {
        res.status(400).send('Event was not found');
    }
})

// get array of events by date 
// inputs are from params
// returns an array
app.get('/events-by-date/', (req, res) => {
    const year = parseInt(req.query.year); 
    const month = parseInt(req.query.month);
    const day = parseInt(req.query.day);
    
    res.json(er.findEventsByDate({'year': year, 'month': month, 'day': day}));
})

// get array of events by category 
// inputs are from params
// returns an array
app.get('/events-by-category/', (req, res) => {
    res.json(er.findEventsByCategory(req.query.eventCategory))
})


// Saves eventID for for userID in bookmarkedEvents in EventRecommender
// checks if both eventID and userID already exist in Event Recommender
// does not return anything
// accepts userID and eventID in query params
app.put('/bookmarked', (req, res) => {
    const userID = parseInt(req.query.userID);
    const eventID = parseInt(req.query.eventID);

    if (er.getEventByID(eventID) && er.getUserByID(userID)) {
        er.saveUserEvent(userID, eventID);
        
        res.status(200).send(`Saved event (${eventID}, ${er.getEventByID(eventID).eventName}) for user (${userID}, ${er.getUserByID(userID).userName})`);
    } else {
        res.status(400).send('Event or user was not found'); // TO DO: maybe split up the error so we can tell if it's the event or user doesn't exist
    }
})

// gets all bookmarked events 
// converts value from Set to array (sets don't send well over network)
app.get('/bookmarked', (req, res) => {
    // console.log({...er.bookmarkedEvents});
    let bookmarkedEvents = {...er.bookmarkedEvents};
    for (let user in bookmarkedEvents) {
        bookmarkedEvents[user] = Array.from(bookmarkedEvents[user]);
    }
    
    res.json(bookmarkedEvents) // json string of object where key is userID and value is Set of eventID
})

// add custom error page
app.get('/*', (req,res) => {
    res.sendFile(path.join(__dirname+'/public/404.html'));
  });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})