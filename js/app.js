var allContacts = [];

var Contact = {
    "Names": [] ,
    // names[0] = first name, names[1] = last name
    "Phones": { "personal": [], "work": [] }, 
    "Emails": { "personal": [], "work": [] }, 
    "Addresses": {
        "home":[{
            "streetLine1": "",
            "streetLine2": "",
            "city": "",
            "state": "",
            "zipcode": "",
            "country": ""
        }],
        "work": [{
            "streetLine1": "",
            "streetLine2": "",
            "city": "",
            "state": "",
            "zipcode": "",
            "country": ""
        }]
    }
};

function getValuesFromInputClass(theClass) {
    var theItems = $("." + theClass).tagsinput('items');
    console.log(theItems);
    return theItems;
}

function addNamesToContact(theContact) {
    theContact.Names = getValuesFromInputClass("name");
}
    
function addContactMethodsToContact(theContact) {
    theContact.Phones.personal = getValuesFromInputClass("personal-phones");
    theContact.Phones.work = getValuesFromInputClass("work-phones");
    theContact.Emails.personal = getValuesFromInputClass("personal-emails");
    theContact.Emails.work = getValuesFromInputClass("work-emails");
}

function addAddressesToContact(theContact) {
    var homeAddress = getValuesFromInputClass("home-address");
    theContact.Addresses.home.streetLine1 = homeAddress[0];
    theContact.Addresses.home.streetLine2 = homeAddress[1];
    theContact.Addresses.home.city = homeAddress[2];
    theContact.Addresses.home.state = homeAddress[3];
    theContact.Addresses.home.zipcode = homeAddress[4];
    theContact.Addresses.home.country = homeAddress[5];
    
    var workAddress = getValuesFromInputClass("work-address");
    theContact.Addresses.work.streetLine1 = workAddress[0];
    theContact.Addresses.work.streetLine2 = workAddress[1];
    theContact.Addresses.work.city = workAddress[2];
    theContact.Addresses.work.state = workAddress[3];
    theContact.Addresses.work.zipcode = workAddress[4];
    theContact.Addresses.work.country = workAddress[5];
}

//function that pushes data entered into new contact object that is pushed to contacts array
function storeContactInfo() {
    event.preventDefault();
    var newContact = Object.create(Contact);
    
    addNamesToContact(newContact);
    addContactMethodsToContact(newContact);
    addAddressesToContact(newContact);
    
    allContacts.push(newContact);
    console.log(allContacts);
    
    //$("#contacts-list").show();
    //$("#contacts-list").append("<li>" + newContact.Names[0] + " " + newContact.Names[1] + "</li>");
}

// code for adding additional properties of vCard (begin, version, rev, end) to contact object 
    
//clears fields for additional contact input(s)
    $(".all-inputs").val("");

function searchContacts() {
    for (var i = 0; i < allContacts.length; i++) {
        for (var prop in allContacts[i]) {
            console.log(allContacts[i][prop]);
            
            if (allContacts[i][prop] === $(".search-input").val()) {
                $("#contacts-list").show();
                $("#contacts-list").append("<li>" + allContacts[i][Names][0] + " " + allContacts[i][Names][1] + "</li>");
            }
            else {
                alert("No match found!");
                break;
            }
        }
    }
}

//function that adds as many "other" address fields as the user desires
function addAddressField() {
    event.preventDefault();
    $("#addresses-container").append("<div><label for=\"other-address\"> Enter other address in the following format: <ul><li>street line 1, street line 2, city, state, zip, country</li><li>type \"none\" for any fields that don't apply</li></ul></label><br /><input type=\"text\" class=\"other-address all-inputs bootstrap-tagsinput tag\" name=\"other-address\" data-role=\"tagsinput\"/></div>")
}

function hideContactDisplay() {
    event.preventDefault();
    $("#contact-display").hide();
}

function displayContactMethods(contactMethodArrayPath, displayId) {
    if (contactMethodArrayPath === "") {
        $("#" + displayId).hide();
    }
    else { 
        for (var i = 0; i < contactMethodArrayPath.length; i++) {
            $("#" + displayId).append("<li>" + contactMethodArrayPath[i] + "</li>");
        }   
    }
}

function displayAddress(displayId, contactAddressArrayPath, streetLine1, streetLine2, city, state, zip, country) {
    for (var i = 0; i < contactAddressArrayPath.length; i++) {
        $("#" + displayId).show();
        $("#" + displayId + " .streetLine1").append(" " + streetLine1);
        
        if (streetLine2 === "none") {
            $("#" + displayId + " .streetLine2").hide();
        }
        else {
            $("#" + displayId + " .streetLine2").append(" " + streetLine2);
        }
        
        $("#" + displayId + " .city-state-zipcode").append(" " + city + ", " + state + " " + zip);
        $("#" + displayId + " .country").append(" " + country);
    }
}

function fillInContactDisplay(theContact) {
    event.preventDefault();
    $("#full-name-display").text(theContact.Names[0] + " " + theContact.Names[1]);
    
    //display first and last names
    $("#first-name-display").text(theContact.Names[0]);
    $("#last-name-display").text(theContact.Names[1]);
    
    //display contact methods
    displayContactMethods(theContact.Phones.personal, "personal-phone-numbers-display");
    displayContactMethods(theContact.Phones.work, "work-phone-numbers-display");
    displayContactMethods(theContact.Emails.personal, "personal-emails-display");
    displayContactMethods(theContact.Emails.work, "work-emails-display");
    
    displayAddress("personal-address-display", theContact.Addresses.home, theContact.Addresses.home.streetLine1, theContact.Addresses.home.streetLine2, theContact.Addresses.home.city, theContact.Addresses.home.state, theContact.Addresses.home.zipcode, theContact.Addresses.home.country );
    displayAddress("work-address-display", theContact.Addresses.work, theContact.Addresses.work.streetLine1, theContact.Addresses.work.streetLine2, theContact.Addresses.work.city, theContact.Addresses.work.state, theContact.Addresses.work.zipcode, theContact.Addresses.work.country);

}

$("#contacts-list").on('click', 'li', function(event){
    $("#contact-display").show();
    //function that fills in the values of the contact display with the array element corresponding to the li
    for (var i = 0; i < allContacts.length; i++) {
        if ($(this).html() === allContacts[i].Names[0] + " " + allContacts[i].Names[1]) {
            fillInContactDisplay(allContacts[i]);
        }
        else {
            alert("Not found!");
        }
    }
});