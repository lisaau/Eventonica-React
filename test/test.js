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
            res.status.should.equal(404);
            done();
        });
    });

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
        let data = {userName: 'test', userID: 10};
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
                res.body[2].userID.should.equal(data.userID); // look at the third User in the array since there are currently 2 hardcoded users set in EventRecommender
                done()
            })
        })
       
      });
});


describe("PUT", function() {
    it("PUT/bookmarked should update bookmarked events for user",function(done){
        server
        .put('/bookmarked')
        .query({userID : 12345, eventID : 11111})
        .expect("Content-type",/text\/html/)
        .expect(200)
        .then( () => {
            server
            .get('/bookmarked')
            .end(function(err, res) {
                console.log(res.body);
                res.body['12345'][0].should.equal(11111);
                done()
            })
        })
      });
});

describe("DELETE", function() {
    it("DELETE/event should delete an event",function(done){
        server
        .delete('/event')
        .set('Content-type', "application/x-www-form-urlencoded")
        .send({eventID : 22222})
        .expect("Content-type",/text\/html/)
        .expect(200)
        .end(function(err,res){
          res.status.should.equal(200);
          done();
        });
      });
});
