$(document).ready( () => {
    function displayUsers() {
        let request = $.ajax( {
            method: "GET",
            url: '/users', 
        });

        request.done( () => {
            let displayUserText = '';
            for (let user of request.responseJSON) {
                
                displayUserText += `<li>${user.userName}, ID: ${user.userID}</li>`;
            }
            $("#all-users").html(displayUserText);
        })
    }
    
    displayUsers();
        
        
    $("#add-user").submit((e) => {
        e.preventDefault();
        let name = $("#add-user-name").val();
        let id = parseInt($("#add-user-id").val());
        
        let request = $.ajax( {
            method: "POST",
            url: '/user', 
            data: {'userID': id, 'userName': name},
            contentType: 'application/x-www-form-urlencoded',
        });

        request.done( () => console.log("success"))
        request.fail( () => console.log("failed"))
        
        displayUsers()
    })
        
    $("#delete-user").submit((e) => {
        e.preventDefault();
        let id = parseInt($("#delete-user-id").val());

        let request = $.ajax( {
            method: "DELETE",
            url: '/user', 
            data: {'userID': id}
        });

        request.done( () => console.log("success"))
        request.fail( () => console.log("failed"))
        displayUsers();
    })
        
    function displayEvents() {
        let request = $.ajax( {
            method: "GET",
            url: '/events', 
        });

        request.done( () => {
            let displayEventText = '';
            for (let event of request.responseJSON) {
                
                displayEventText += `<li>${event.eventID} - <em>${event.eventName}</em> - ${moment(event.eventDate).format('MMM Do YYYY')} - ${event.eventCategory} - ${event.eventLocation}</li>`;
            }
            $("#all-events").html(displayEventText);
        })
    }

    displayEvents();
    
    $("#add-event").submit((e) => {
        e.preventDefault();
        let id = parseInt($("#add-event-id").val());
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val().split("-"); // SPLIT INTO YEAR, MONTH, DAY
        let category = $("#add-event-category").val();
        let location = $("#add-event-location").val();
        let eventDate = {'year': parseInt(date[0]), 'month': parseInt(date[1]) - 1, 'day': parseInt(date[2])};
        

        let request = $.ajax( {
            method: "POST",
            url: '/event', 
            data: {'eventID': id, 'eventName': name, 'eventCategory': category, 'eventLocation': location, 'eventDate': eventDate},
            contentType: 'application/x-www-form-urlencoded',
        });

        request.done( () => console.log("success"))
        request.fail( () => console.log("failed"))

        displayEvents()
    })
    
    $("#delete-event").submit((e) => {
        e.preventDefault();
        let id = parseInt($("#delete-event-id").val());
        let request = $.ajax( {
            method: "DELETE",
            url: '/event',
            data: {'eventID': id}
        })

        displayEvents();
    })
    
        
        // JQUERY FOR HANDLING TICKETMASTER SECTION
        // Search Ticketmaster for events by keyword and/category, displays top 5 events that match with a check box that can be checked. Save Events button is created which can save the checked events
        $("#event-search").submit( (e) => {
            event.preventDefault();
            
            let keyword = $("#tm-event-keyword").val();
            let category = $("#tm-event-category").val();

            if (category === 'arts & theatre') {
                category = 'Arts%20%26%20Theatre';
            }
            
            // fetch syntax
            let requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            // fetches event in the US by keyword and displays top 5 events (size = 5). Converts to json and extract event array. Get name, date, category, and location (since there is no description). 
            fetch(`https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&size=5&keyword=${keyword}&segmentName=${category}`, requestOptions)
            .then(response => response.json())
            .then(result => result._embedded.events)
            .then(events => {
                let message = ''
                for (let [i, event] of events.entries()) {
                    let TMeventName = event.name;
                    let TMeventDate = event.dates.start.localDate.split("-"); //SPLIT THIS OUT INTO YEAR, MONTH, DAY
                    let TMeventCategory = event.classifications["0"].segment.name;
                    let TMeventLocation = event._embedded.venues["0"].name;
    
                    // event info that will then get serialized to JSON, encoded, and passed into the data attribute of checkbox.
                    // normally would just pass in Ticketmaster eventID but given that there's not a lot of parameters and we had set it up this way, in this case we will proceed with hardcoding event info 
                    let dataEventJSON = {'eventName': TMeventName, 'eventCategory': TMeventCategory, 'eventLocation': TMeventLocation, 'eventDate': {'year': parseInt(TMeventDate[0]),'month': parseInt(TMeventDate[1]), 'day': parseInt(TMeventDate[2])}};

                    let results = 
                    `<li class="TM-event-search-result">
                    
                    <label for='event${i}'> 
                    ${TMeventName} - ${moment(TMeventDate).format('MMM Do YYYY')} - ${TMeventCategory} - ${TMeventLocation}
                    </label>

                    <input type="checkbox" id="event${i}" name="event${i}" data-eventJSON='${encodeURIComponent(JSON.stringify(dataEventJSON))}'>
                    </li>`
                
                    message += results;
                }
                $("#event-search-result").html(message)
    
                // add a save all button below if it's not already there (ie. no children in div)
                if (document.getElementById("btn").children.length === 0) {
                    let newButton = document.createElement("BUTTON");
                    newButton.innerHTML = "Save Events"
                    document.getElementById("btn").appendChild(newButton);

                    // iterate over all checked events, decode JSON and pass that eventInfo to POST request. Add each event to EventRecommender and display
                    document.getElementById("btn").addEventListener("click", () => {                        
                        for (let event of $("#event-search-result input:checked")) {
                            let eventInformation = JSON.parse(decodeURIComponent(event.dataset.eventjson))
                            
                            let request = $.ajax( {
                                method: "POST",
                                url: '/event', 
                                data: eventInformation,
                                contentType: 'application/x-www-form-urlencoded',
                            });
                            request.done( () => {
                                console.log("Added TM event");
                                
                            })
                        }
                        displayEvents()
                    })
                }
            })
            .catch(error => {
                console.log('error', error);
                $("#event-search-result").html("No events found")
            });
        })
        
        $("#date-search").submit((e) => {
            e.preventDefault();
            let year = parseInt($("#date-search-year").val());
            let month = parseInt($("#date-search-month").val()) - 1;
            let day = parseInt($("#date-search-day").val());
            
            let request = $.ajax( {
                method: "GET",
                url: `/events-by-date?year=${year}&month=${month}&day=${day}`
            });
            
            request.done( () => {               
                let message = '';
        
                for (let event of request.responseJSON) {
                    message += `<li>${event.eventID} - ${event.eventName} - ${moment(event.eventDate).format('MMM Do YYYY')} - ${event.eventCategory} - ${event.eventLocation}</li>`;
                }
        
                if (message === '') {
                    $("#date-search-result").html("No events found")
                } else {
                    $("#date-search-result").html(message);    
                }
            })
        })
    
        $("#category-search").submit((e) => { 
            e.preventDefault();
            let eventCategory = $("#category-search-id").val(); 
            if (eventCategory === 'arts & theatre') {
                eventCategory = 'Arts%20%26%20Theatre';
            }

            let request = $.ajax( {
                method: "GET",
                url: `/events-by-category?eventCategory=${eventCategory}`
             });

            request.done( () => {
                if (request.responseJSON.length === 0) {
                    $("#category-search-result").html("No events found");
                } else {
                    let categoryMessage = '';
                    for (let event of request.responseJSON) {
                        categoryMessage += `<li>${event.eventID} - ${event.eventName} - ${moment(event.eventDate).format('MMM Do YYYY')} - ${event.eventLocation}</li>`;
                    }
                    $("#category-search-result").html(categoryMessage);
                }
            })
        })
    
        // Only displays userID and eventID. eventIDs are not formatted nicely. Will get userName and event names another time. 
        // Options(?):
        // create new endpoint in index.js where I get the entire EventRecommender object but that's a lot and not ideal but I will have access to Users and Events 
        // otherwise I can make 2 more ajax calls with the APIs I've already created to get the Users and Events but may have to next some request.done and that's too much for my brain right now at 1am
        function displayBookmarkedEvents() {
            let requestBookmarked = $.ajax( {
                method: "GET",
                url: '/bookmarked', 
            });

            requestBookmarked.done( () => {
                let displayBookmarkedEventsText = '';

                for (let userID in requestBookmarked.responseJSON) {
                    displayBookmarkedEventsText += `<li> ${userID} - ${requestBookmarked.responseJSON[userID]}</li>`;
                }
                $("#saved-events-users").html(displayBookmarkedEventsText);
            })
         }
     
        // Would normally display all the pre-loaded bookmarked events but since it's not very pretty right now, let's leave it out
        //  displayBookmarkedEvents();
    
        $("#save-user-event").submit( (e) => {
            e.preventDefault();
            let userID = parseInt($("#save-user-id").val());
            let eventID = parseInt($("#save-event-id").val());

            let request = $.ajax( {
                method: "PUT",
                url: `/bookmarked?userID=${userID}&eventID=${eventID}`, 
            });
             
            displayBookmarkedEvents()
        })    
})