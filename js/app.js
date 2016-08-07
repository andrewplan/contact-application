var allContacts = [];

var Contact = {
    "Names": [] ,
    // names[0] = first name, names[1] = last name
    "Phones": { "personal": [], "work": [] }, 
    "Emails": { "personal": [], "work": [] }, 
    "Addresses": {
        "home": [{
            "streetLine1": "",
            "streetLine2": "",
            "city": "",
            "state": "",
            "zip": "",
            "country": ""
        }],
        "work": [{
            "streetLine1": "",
            "streetLine2": "",
            "city": "",
            "state": "",
            "zip": "",
            "country": ""
        }]
    }
};

function getValuesFromInputClass(theClass) {
    var theItems = $("." + theClass).tagsinput('items');
    console.log(theItems);
    return theItems;
}

function addNamesToContact(currentContact) {
    currentContact.Names = getValuesFromInputClass("name");
}
    
function addContactMethodsToContact(currentContact) {
    currentContact.Phones.personal = getValuesFromInputClass("personal-phones");
    currentContact.Phones.work = getValuesFromInputClass("work-phones");
    currentContact.Emails.personal = getValuesFromInputClass("personal-emails");
    currentContact.Emails.work = getValuesFromInputClass("work-emails");
}

function addAddressesToContact(currentContact) {
    var homeAddress = getValuesFromInputClass("home-address");
    currentContact.Addresses.home.streetLine1 = homeAddress[0];
    currentContact.Addresses.home.streetLine2 = homeAddress[1];
    currentContact.Addresses.home.city = homeAddress[2];
    currentContact.Addresses.home.state = homeAddress[3];
    currentContact.Addresses.home.zip = homeAddress[4];
    currentContact.Addresses.home.country = homeAddress[5];
    
    var workAddress = getValuesFromInputClass("work-address");
    currentContact.Addresses.work.streetLine1 = workAddress[0];
    currentContact.Addresses.work.streetLine2 = workAddress[1];
    currentContact.Addresses.work.city = workAddress[2];
    currentContact.Addresses.work.state = workAddress[3];
    currentContact.Addresses.work.zip = workAddress[4];
    currentContact.Addresses.work.country = workAddress[5];
    
    //code for loop that adds other addresses to Addresses object
    /* var arrayOfOtherAddressses = getValuesFromInputClass("other-address");
    console.log(arrayOfOtherAddressses);
    for (var i = 0; i < arrayOfOtherAddressses.length; i++) {
        currentContact.Addresses.other.streetLine1 = arrayOfOtherAddress[i][0];
        currentContact.Addresses.other.streetLine2 = arrayOfOtherAddress[i][1];
        currentContact.Addresses.other.city = arrayOfOtherAddress[i][2];
        currentContact.Addresses.other.state = arrayOfOtherAddress[i][3];
        currentContact.Addresses.other.zip = arrayOfOtherAddress[i][4];
        currentContact.Addresses.other.country = arrayOfOtherAddress[i][5];
    } 
    return itemValues;
    console.log(itemValues); */
    
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
    
    $("#contacts-list").show();
    $("#contacts-list").append("<li>" + newContact.Names[0] + " " + newContact.Names[1] + "</li>");
}

// code for adding additional properties of vCard (begin, version, rev, end) to contact object 
    
//clears fields for additional contact input(s)
    $(".all-inputs").val("");

//function that adds as many "other" address fields as the user desires
function addAddressField() {
    event.preventDefault();
    $("#addresses-container").append("<div><label for=\"other-address\"> Enter other address in the following format: <ul><li>street line 1, street line 2, city, state, zip, country</li><li>type \"none\" for any fields that don't apply</li></ul></label><br /><input type=\"text\" class=\"other-address all-inputs bootstrap-tagsinput tag\" name=\"other-address\" data-role=\"tagsinput\"/></div>")
}

function hideContactDisplay() {
    event.preventDefault();
    $("#contact-display").hide();
}

//identify additional addresses and phone numbers by index number in array of addresses, array of phone numbers
function fillInContactDisplay(currentContact) {
    $("#full-name-display").text(currentContact.Names[0] + " " + newContact.Names[1]);
    
    ("#first-name-display").text(currentContact.Names[0]);
    $("#last-name-display").text(currentContact.Names[1]);
}

$("#contacts-list").on('click', 'li', function(event){
    $("#contact-display").show();
    //function that fills in the values of the contact display with the array element corresponding to the li
    var selectedContact = allContacts.this;
    fillInContactDisplay(selectedContact);
});