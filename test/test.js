const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is running.

const server = supertest.agent("http://localhost:3000");

// responses are currently only sending HTTP statuses. will update once database is set up

describe("GET", function() {
    it("should return home page",function(done){
        // calling home page api
        server
        .get("/")
        .expect("Content-type",/html/)
        .expect(200) // This is HTTP response
        .end(function(err,res){
            res.status.should.equal(200);
            res.text.should.match(/Eventonica/);
            done();
        });
    });

    it("GET/non-existent-page should return 404 custom HTML page",function(done){
        server
        .get("/random")
        .expect("Content-type",/html/)
        .expect(404)
        .end(function(err,res){
            if (err) return done(err);
            res.text.should.match(/Sorry/)
            done();
        });
    });

    // doesn't actually check if it returns an array yet..
    it("GET/users should return an array of users",function(done){
        server
        .get("/users")
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            if (err) return done(err);
            res.status.should.equal(200);
            done();
        });
    });

    it("GET/events should return an array of events",function(done){
        server
        .get("/events")
        .expect("Content-type",/json/)
        .expect(200)
        .end(function(err,res){
            if (err) return done(err);
            res.status.should.equal(200);
            done();
        });
    });
});

describe("POST", function() {
    it("POST/user should add a user",function(done){
        let data = {userName: 'test'};
        server
        .post('/user')
        .set('Content-type', "application/x-www-form-urlencoded")
        .send(data)
        .expect("Content-type",/text\/html/)
        .expect(200)
        .then( () => {
            server
            .get('/users')
            .end(function(err, res) {
                res.body[res.body.length - 1].userName.should.equal(data.userName); 
                done()
            })
        })
       
      });
});

// need to change so that it posts a new user and event id, then add event for that user, then check if it was added
describe("PUT", function() {
    it("PUT/bookmarked should update bookmarked events for user",function(done){
        let data = {userID: 17, eventID: 1};
        server
        .put('/bookmarked')
        .set('Content-type', "application/x-www-form-urlencoded")
        .send(data)
        .query({userID : 1, eventID : 1})
        .expect("Content-type",/text\/html/)
        .expect(200)
        .then( () => {
            server
            .get('/bookmarked')
            .end(function(err, res) {
                res.body[0].user_id.should.equal(17);
                done()
            })
        })
      });
});


// need to change so that it checks if the eventID is gone
// need a more general way to check
describe("DELETE", function() {
    it("DELETE/user should delete a user",function(done){
        server
        .delete('/user')
        .set('Content-type', "application/x-www-form-urlencoded")
        .send({userID : 47})
        .expect("Content-type",/text\/html/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });
});
