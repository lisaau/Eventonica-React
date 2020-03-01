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

        request.done( () => {
            console.log("successfully added user");
            displayUsers();
        })
        request.fail( () => console.log("failed to add user"));
    });
        
    $("#delete-user").submit((e) => {
        e.preventDefault();
        let id = parseInt($("#delete-user-id").val());
        
        let request = $.ajax( {
            method: "DELETE",
            url: '/user', 
            data: {'userID': id}
        });

        request.done( () => {
            console.log("successfully deleted user");
            displayUsers();
            displayBookmarkedEvents(); // re-renders in case a user who has saved events is deleted
        });
        request.fail( () => console.log("failed to delete user"));
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
        let eventDate = $("#add-event-date").val(); // create date string YYY-MM-DD to fit DB format
        let category = $("#add-event-category").val();
        let location = $("#add-event-location").val();

        let request = $.ajax( {
            method: "POST",
            url: '/event', 
            data: {'eventID': id, 'eventName': name, 'eventCategory': category, 'eventLocation': location, 'eventDate': eventDate},
            contentType: 'application/x-www-form-urlencoded',
        });

        request.done( () => {
            console.log("success");
            displayEvents()
        })
        request.fail( () => console.log("failed"))
    })
    
    $("#delete-event").submit((e) => {
        e.preventDefault();
        let id = parseInt($("#delete-event-id").val());
        let request = $.ajax( {
            method: "DELETE",
            url: '/event',
            data: {'eventID': id}
        })

        request.done( () => {
            console.log("successfully deleted event");
            displayEvents();
            displayBookmarkedEvents(); // re-renders in case event that had been saved by any user and the event is deleted
        })
        request.fail( () => console.log("failed to delete event"))
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
                    let TMeventDate = event.dates.start.localDate; 
                    let TMeventCategory = event.classifications["0"].segment.name;
                    let TMeventLocation = event._embedded.venues["0"].name;
                    
                    let dataEventJSON = {'eventName': TMeventName, 'eventCategory': TMeventCategory, 'eventLocation': TMeventLocation, 'eventDate': TMeventDate};

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
                                displayEvents()
                            })
                        }
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
            let dateString = $('#search-event-date').val();
            
            let request = $.ajax( {
                method: "GET",
                url: `/events-by-date?dateString=${dateString}`
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
            // the & sign doesn't convert correctly. added if statement to handle that case
            if (eventCategory === 'Arts & Theatre') {
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
    
        function displayBookmarkedEvents() {
            let requestBookmarked = $.ajax( {
                method: "GET",
                url: '/bookmarked', 
            });

            requestBookmarked.done( () => {
                // creates string of HTML where users are in an unordered list and the events are in a sub unordered list
                let displayBookmarkedEventsText = `<li>${requestBookmarked.responseJSON[0].user_name}<ul>`;
                let currUser = requestBookmarked.responseJSON[0].user_id; 
                for (let userEvent of requestBookmarked.responseJSON) {
                    if (currUser === userEvent.user_id) {
                        displayBookmarkedEventsText += ` <li>${userEvent.event_name}</li>`;
                        
                    } else {
                        displayBookmarkedEventsText += `</ul></li><li> ${userEvent.user_name}<ul><li>${userEvent.event_name}`;
                        currUser = userEvent.user_id;
                    }
                }
                $("#saved-events-users").html(displayBookmarkedEventsText);
            })
         }
     
         displayBookmarkedEvents();
    
        $("#save-user-event").submit( (e) => {
            e.preventDefault();
            let userID = parseInt($("#save-user-id").val());
            let eventID = parseInt($("#save-event-id").val());

            let request = $.ajax( {
                method: "PUT",
                url: `/bookmarked?userID=${userID}&eventID=${eventID}`, 
            });
             
            request.done( () => {
                displayBookmarkedEvents();
            });
        })    
})