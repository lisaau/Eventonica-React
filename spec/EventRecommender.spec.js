const { EventRecommender, User, Event } = require('../src/EventRecommender.js'); // Update with your class names and file name
let er; 

describe("EventRecommender", () => {
  
    beforeEach(() => {
      er = new EventRecommender();
      er.addEvent("Event 1", new Date(2020, 01, 03), "Concert",  "Description on Event 1", 11111);
      er.addEvent("Event 2", new Date(2020, 02, 03), "Concert", "Description on Event 2", 22222);
      er.addEvent("Event 3", new Date(2020, 04, 03), "Sport", "Description on Event 3", 33333);
      er.addEvent("Event 4", new Date(2020, 05, 03), "Art and Theater", "Description on Event 4", 44444);
    });
  
    describe("addEvent", () => {
      it("adds a new Event to the system", () => {
        er.addEvent("New Event's Name");
        expect(er.events.length).toEqual(5);
        expect(er.events[er.events.length - 1].eventName).toEqual("New Event's Name"); 
      });
    });
  
    describe("addUser", () => {
      it("adds a new User to the system", () => {
        er.addUser("User's Name", 12345);
        expect(er.users.length).toEqual(1);
      });
    });
  
    describe("saveUserEvent", () => {
      it("adds an event to a user's personal event array by inputting the user and event ID", () => {
        er.addUser("name", 12346);
        er.saveUserEvent(12346, 11111);
        expect(er.bookmarkedEvents[12346].length).toEqual(1);
        er.saveUserEvent(12346, 22222);
        expect(er.bookmarkedEvents[12346].length).toEqual(2);
      });
    });
  
    describe("getUserByID", () => {
      it("returns an array with a user given an ID", () => {
        er.addUser("User's Name", 12345);
        expect(typeof er.getUserByID(12345)).toEqual("object");
        expect(er.getUserByID(12345).userID).toEqual(12345);
        expect(er.getUserByID("notaRealID")).toEqual(undefined)
      })
    })

    describe("getEventByID", () => {
      it("returns an array with an event given an ID", () => {
        expect(typeof er.getEventByID(11111)).toEqual("object");
        expect(er.getEventByID(11111).eventID).toEqual(11111);
        expect(er.getEventByID("notaRealID")).toEqual(undefined);
      })
    })

    describe("deleteUser", () => {
      it("removes a User from the system", () => {
        er.addUser("User's Name", 12345);
        er.deleteUser(12345);
        // expect(er.users.length).toEqual(0);
      });
    });
  
    describe("deleteEvent", () => {
      it("removes the event from the system", () => {
        er.addEvent("Event's Name", new Date(), "category", "description", 12345);
        er.deleteEvent(12345);
        expect(er.events.length).toEqual(4);
      });
    });


    describe("findEventsByCategory", () => {
      it("returns array of events with the specified category", () => {
        // check that the result is an array
        expect(Array.isArray(er.findEventsByCategory("Concert"))).toBe(true);

        // has the correct length
        expect(er.findEventsByCategory("Concert").length).toEqual(2);

        // check that each event in the resulting array is of the specified category
        for (let event of er.findEventsByCategory("Concert")) {
          expect(event.category).toEqual("Concert");
        }
      });
    });

    describe("findEventsByDate", () => {
      it("returns array of events with the specified date", () => {

        // check that the result is an array
        expect(Array.isArray(er.findEventsByDate(new Date(2020, 02, 03)))).toBe(true);

        expect(er.findEventsByDate(new Date(2020, 02, 03)).length).toEqual(1);

        // check that each event in the resulting array is of the specified category
        for (let event of er.findEventsByDate(new Date(2020, 02, 03))) {
          expect(event.date).toEqual(new Date(2020, 02, 03));
          expect(event.eventName).toEqual("Event 2");
        }
      })
    });

    describe("getFormattedDate", () => {
      it("should check that the date is formatted correctly", () => {
        expect(er.events[0].getFormattedDate()).toEqual('Feb 3rd 2020');
      })
    })
});