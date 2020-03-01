const express = require('express');
const { EventRecommender, User,  Event}  = require('./src/EventRecommender');
const er = new EventRecommender();

// some data to work with!
// er.addEvent({'eventName': "Some Magical Event", 'eventDate': {'year': 2020, 'month': 01, 'day': 01}, 'eventCategory': "Arts & Theatre", 'eventLocation': "A Magical World Somewhere", 'eventID': 11111});
// er.addEvent({'eventName': "Corgi Con", 'eventDate': {'year': 2019, 'month': 10, 'day': 19}, 'eventCategory': "Sports", 'eventLocation': "San Francisco", 'eventID': 22222});
// er.addUser("Lisa", 12345);
// er.addUser("Kim", 12346); 
// er.saveUserEvent(12345, 11111);

// MIDDLEWARE
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(morgan('tiny'));


// DATABASE moved to EventRecommender.js
// const pgp = require('pg-promise')(/* options */)
// const db = pgp('postgres://tpl619_2@localhost:5432/eventonica')

// serve static files
app.use(express.static('public'))
    
// test db query
// db.any('SELECT * FROM users')
//     .then(function(data) {
//         // users in DB;
//         console.log(data);
        
//     })
//     .catch(function(error) {
//         // error;
//         console.log("failed");
        
//     });
// console.log(er.users); // users in ER


// gets array of all users (each user is an object). returns an array
app.get('/users', (req, res) => {
    er.getAllUsers().then( transformedData => res.status(200).send(transformedData));
})

// adds one user (key = 'username', value = name of user as a string)
// input taken from body
// does not return anything
app.post('/user', async (req, res) => {
    const userName = req.body.userName;
    // const userID = parseInt(req.body.userID);
    await er.addUser(userName);
    res.status(200).send('User is added to the "database"');
});

// deletes one user by userID (number)
app.delete('/user', async (req, res) => {
    const user = parseInt(req.body.userID);
    await er.deleteUser(user);
    res.sendStatus(200);
})

// gets array of all event objects
app.get('/events', (req, res) => {
    // res.json(er.events) // is a json string of an array
    er.getAllEvents().then( transformedData => res.json(transformedData));
})

// adds one event, does not return anything 
// required parameter: eventDate ({'year': number, 'month': number, 'day': number}), eventName (string), eventCategory (string), eventLocation (string))
// eventID (number) is optional. will randomly assign ID if none is provided
app.post('/event', async (req, res) => {
    // Works for now but would be a pain to add more parameters 
    // let {eventID, eventName, eventCategory, eventLocation, eventDate} = req.body;
    let {eventName, eventCategory, eventLocation, eventDate} = req.body;
    console.log("/event req.body: ", req.body);

    // year, month, day come in as strings, change to number
    // let {year, month, day} = eventDate;
    // year = parseInt(year);
    // month = parseInt(month);
    // day = parseInt(day);
    // eventDate = {'year': year, 'month': month, 'day': day};

    // er.addEvent({'eventID': parseInt(eventID), 'eventDate': eventDate, 'eventName': eventName, 'eventCategory': eventCategory, 'eventLocation': eventLocation});
    await er.addEvent({'eventName': eventName, 'eventDate': eventDate, 'eventCategory': eventCategory, 'eventLocation': eventLocation});
    
    // er.addEvent(req.body); // would be better this way but would need to change the code that creates the random ID otherwise NaN will be displayed. But I don't want to do that right now
    res.status(200).send('Event is added to the "database"');
});

// deleted one event by eventID (number)
// does not return anything
app.delete('/event/', async (req, res) => {
    const event = parseInt(req.body.eventID);
    await er.deleteEvent(event);
    res.sendStatus(200);
    // if (er.events.includes(er.getEventByID(event))) {
    //     er.deleteEvent(event);
    //     res.status(200).send('Event is deleted from the "database"');
    // } else {
    //     res.status(400).send('Event was not found');
    // }
})

// get array of events by date 
// inputs are from params
// returns an array
app.get('/events-by-date/', (req, res) => {
    // const year = parseInt(req.query.year); 
    // const month = parseInt(req.query.month);
    // const day = parseInt(req.query.day);
    // const dateString = Object.keys(req.query)[0] // date string is stored in the key of the req.query object
    // const {dateString} = req.query // date string is stored in the key of the req.query object
    // console.log('req.query from events-by-date:req.query', Object.keys(req.query)[0]);
    
    // res.json(er.findEventsByDate({'year': year, 'month': month, 'day': day}));
    // er.findEventsByDate({'year': year, 'month': month, 'day': day}).then(transformedData => res.json(transformedData));
    er.findEventsByDate(req.query.dateString).then(transformedData => res.json(transformedData));
})

// get array of events by category 
// inputs are from params
// returns an array
app.get('/events-by-category/', (req, res) => {
    // console.log(req.query, req.query.eventCategory);
    
    er.findEventsByCategory(req.query.eventCategory).then( transformedData => res.json(transformedData));
})


// Saves eventID for for userID in bookmarkedEvents in EventRecommender
// checks if both eventID and userID already exist in Event Recommender
// does not return anything
// accepts userID and eventID in query params
app.put('/bookmarked', async (req, res) => {
    const userID = parseInt(req.query.userID);
    const eventID = parseInt(req.query.eventID);
    
    await er.saveUserEvent(userID, eventID);
    res.status(200).send(`Event ${eventID} is saved for user ${userID}`);


    // if (er.getEventByID(eventID) && er.getUserByID(userID)) {
    //     er.saveUserEvent(userID, eventID);
        
    //     res.status(200).send(`Saved event (${eventID}, ${er.getEventByID(eventID).eventName}) for user (${userID}, ${er.getUserByID(userID).userName})`);
    // } else {
    //     res.status(400).send('Event or user was not found'); // TO DO: maybe split up the error so we can tell if it's the event or user doesn't exist
    // }
})

// gets all bookmarked events 
// converts value from Set to array (sets don't send well over network)
app.get('/bookmarked', (req, res) => {
    // console.log({...er.bookmarkedEvents});
    // let bookmarkedEvents = {...er.bookmarkedEvents};
    // for (let user in bookmarkedEvents) {
    //     bookmarkedEvents[user] = Array.from(bookmarkedEvents[user]);
    // }
    
    // res.json(bookmarkedEvents) // json string of object where key is userID and value is Set of eventID
    er.getUserEvents().then(data => res.status(200).send(data));
})

// add custom error page
app.get('*', (req,res) => {
    res.status(404).sendFile(__dirname+'/public/404.html');
  });


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})