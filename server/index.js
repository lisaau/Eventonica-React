const express = require('express');
const { EventRecommender }  = require('./src/EventRecommender');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const er = new EventRecommender();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(express.static('public')) // serve static files


// gets array of all users (each user is an object). returns an array
app.get('/users', (req, res) => {
    er.getAllUsers().then( transformedData => res.status(200).send(transformedData));
})

// adds one user (key = 'username', value = name of user as a string)
// input taken from body
// does not return anything
app.post('/user', (req, res) => {
    const userName = req.body.userName;
    console.log('Got body:', req.body);
    er.addUser(userName).then(transformedData => res.status(200).send(transformedData));
});

// deletes one user by userID (number)
app.delete('/user', async (req, res) => {
    const user = parseInt(req.body.userID);
    await er.deleteUser(user);
    res.sendStatus(200);
})

// gets array of all event objects
app.get('/events', (req, res) => {
    er.getAllEvents().then( transformedData => res.json(transformedData));
})

// adds one event, does not return anything 
// required parameter: eventDate (string as YYYY-MM-DD), eventName (string), eventCategory (string), eventLocation (string))
app.post('/event', (req, res) => {
    let {eventName, eventCategory, eventLocation, eventDate} = req.body;
    er.addEvent({'eventName': eventName, 'eventDate': eventDate, 'eventCategory': eventCategory, 'eventLocation': eventLocation}).then(event => res.status(200).send(event));
});

// deleted one event by eventID (number)
// does not return anything
app.delete('/event/', async (req, res) => {
    const event = parseInt(req.body.eventID);
    await er.deleteEvent(event);
    res.sendStatus(200);
})

// get array of events by date 
// inputs are from params
// returns an array
app.get('/events-by-date/', (req, res) => {
    er.findEventsByDate(req.query.dateString).then(transformedData => res.json(transformedData));
})

// get array of events by category 
// inputs are from params
// returns an array
app.get('/events-by-category/', (req, res) => {
    er.findEventsByCategory(req.query.eventCategory).then( transformedData => res.json(transformedData));
})

// does not return anything
// accepts userID and eventID in query params
app.put('/bookmarked', async (req, res) => {
    const userID = parseInt(req.query.userID);
    const eventID = parseInt(req.query.eventID);
    
    await er.saveUserEvent(userID, eventID);
    res.status(200).send(`Event ${eventID} is saved for user ${userID}`);
})

// gets all bookmarked events 
app.get('/bookmarked', (req, res) => {
    er.getUserEvents().then(data => res.status(200).send(data));
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
})