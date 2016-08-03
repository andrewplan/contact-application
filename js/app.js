var allContacts = [];

function getFirstName() {
    var firstName = document.getElementById("first-name").value;
    return firstName;
}

function getLastName() {
    var lastName = document.getElementById("last-name").value;
    return lastName; 
}

function getHomePhone() {
    var homePhone = document.getElementById("home-phone").value;
    return homePhone;
}

function getWorkPhone() {
    var workPhone = document.getElementById("work-phone").value;
    return workPhone;
}

function getMobilePhone() {
    var mobilePhone = document.getElementById("mobile-phone").value;
    return mobilePhone;
}

function getOtherPhoneNumbers() {
    var allOtherPhoneNumbers = [];
    for (var i = 0; i < allOtherPhoneNumbers.length; i++) {
        allOtherPhoneNumbers[i] = document.getElementsByClassName("other-phone-number")[i].value;
    }
    return allOtherPhoneNumbers;
}

function getHomeEmail() {
    var homeEmail = document.getElementById("home-email").value;
    return homeEmail;
}

function getWorkEmail() {
    var workEmail = document.getElementById("work-email").value;
    return workEmail;
}

function getOtherEmailAddresses() {
    var allOtherEmailAddresses = [];
    for (var i = 0; i < allOtherEmailAddresses.length; i++) {
        allOtherEmailAddresses[i] = document.getElementsByClassName("other-email-address")[i].value;
    }
    return allOtherEmailAddresses;
}

function getAddressType() {
    var addressType = [];
    for (var i = 0; i < addressType.length; i++) {
        addressType[i] = document.getElementsByClassName("address-type")[i].value;
    }
    return addressType;
}

function getStreetLine1() {
    var streetLine1 = [];
    for (var i = 0; i < streetLine1.length; i++) {
        streetLine1[i] = document.getElementsByClassName("street-line1")[i].value;
    }
    return streetLine1;
}

function getStreetLine2() {
    var streetLine2 = [];
    for (var i = 0; i < streetLine2.length; i++) {
        streetLine2[i] = document.getElementsByClassName("street-line2")[i].value;
    }
    return streetLine2;
}

function getState() {
    var state = [];
    for (var i = 0; i < state.length; i++) {
        state[i] = document.getElementsByClassName("state")[i].value;
    }
    return state;
}

function getCity() {
    var city = [];
    for (var i = 0; i < city.length; i++) {
        city[i] = document.getElementsByClassName("city")[i].value;
    }
    return city;
}

function getCountry() {
    var country = [];
    for (var i = 0; i < country.length; i++) {
        country[i] = document.getElementsByClassName("country")[i].value;
    }
    return country;
}

//code that adds as many "other" phone fields as the user desires, with additional accompanying contact.contact object to contact (creates contact.contact array)
function addOtherPhoneNumberField() {
    event.preventDefault();
    $("#phone-numbers-container").append("<div class=\"other-phone-number-form\"><label for=\"other-phone-number\">Other phone number</label><br /><input type=\"tel\" class=\"other-phone-number\" class=\"all-inputs\" name=\"other-phone-number\" /></div>");
    console.log("It works!");
}

function addOtherEmailAddressField() {
    event.preventDefault();
    $("#email-addresses-container").append("<div class=\"other-email-address-form\"><label for=\"other-email-address-form\">Other email address</label><br /><input type=\"text\" class=\"other-email-address\" class=\"all-inputs\" name=\"other-email\"></div>");
    console.log("it works!")
}

//function that adds as many "other" address fields as the user desires, with additional accompanying address object to contact (creates address array)
function addAddressField() {
    event.preventDefault();
    $("#addresses-container").append("<div class=\"address-form\"><div><label for=\"address-type\">Address type</label><br /><input type=\"text\" class=\"address-type all-inputs\" name=\"address-type\" /></div><div><label for=\"street-line1\">Street line 1</label><br /><input type=\"text\" class=\"street-line1 all-inputs\" name=\"street-line1\" /></div><div><label for=\"street-line2\">Street line 2</label><br /><input type=\"text\" class=\"street-line2 all-inputs\" name=\"street-line2\" /></div><div><label for=\"city\">City</label><br /><input type=\"text\" class=\"city all-inputs\" name=\"city\" /></div><div><label for=\"state\">State</label><br /><input type=\"text\" class=\"state all-inputs\" name=\"state\" /></div><div><label for=\"country\">Country</label><br /><input type=\"text\" class=\"country all-inputs\" name=\"country\" /></div></div>")
}
    
var Contact = {
    "Person": 
    {
        "firstName": "", 
        "lastName": ""
    },
    "ContactMethod":
    {
        "homePhone": "",
        "workPhone": "",
        "mobilePhone": "",
        "otherPhoneNumbers": [], 
        "homeEmail": "",
        "workEmail": "",
        "otherEmailAddresses": []
    }, 
    "Addresses": [] 
};

var Address = {
    "addressType": "",
    "streetLine1": "",
    "streetLine2": "",
    "city": "",
    "state": "",
    "country": "",
}; 
    
function addContactMethodToContact(currentContact) {
    currentContact.ContactMethod.homePhone = getHomePhone();
    currentContact.ContactMethod.workPhone = getWorkPhone();
    currentContact.ContactMethod.mobilePhone = getMobilePhone();
    currentContact.ContactMethod.homeEmail = getHomeEmail();
    currentContact.ContactMethod.workEmail = getWorkEmail();
    
    var otherPhoneNumbers = getOtherPhoneNumbers();
    var otherEmailAddresses = getOtherEmailAddresses();
    
    for (var i = 0; i < otherPhoneNumbers.length; i++) { 
        currentContact.ContactMethod.otherPhoneNumbers.push(otherPhoneNumbers[i]);  
    } 
    
    for (var i = 0; i < otherEmailAddresses.length; i++) {              
        currentContact.ContactMethod.otherEmailAddresses.push(otherEmailAddresses[i]);
    }
}

function addAddressesToContact(currentContact) {
    var addressTypeArray = getAddressType();
    var streetLine1Array = getStreetLine1();
    var streetLine2Array = getStreetLine2();
    var cityArray = getCity();
    var stateArray = getState();
    var countryArray = getCountry();
    
    var listOfAddresses = [];
    
    for (var i = 0; i < listOfAddresses.length; i++) {
        var newAddress = Object.create("Address");
        
        newAddress.addressType = addressTypeArray[i];
        newAddress.streetLine1 = streetLine1Array[i];
        newAddress.streetLine2 = streetLine2Array[i];
        newAddress.country = countryArray[i];
        newAddress.state = stateArray[i];
        newAddress.city = cityArray[i];
        
        listOfAddresses.push(newAddress);
        currentContact.Addresses.push(newAddress);
    };
}

//function that pushes data entered into new contact object that is pushed to contacts array
function storeContactInfo() {
    event.preventDefault();
    var newContact = Object.create(Contact);
    
    //grab values from form and store in new object "newContact.person"
    newContact.Person.firstName = getFirstName();
    newContact.Person.lastName = getLastName();
    
    //grab values from form and store in new object "newContact.contact"
    addContactMethodToContact(newContact);
    
    //grab values from form and store in new object "newContact.address"
    addAddressesToContact(newContact);
    
    //push newContact object to allContacts array
    allContacts.push(newContact);
    console.log(allContacts);
}

// code for adding additional properties of vCard (begin, version, rev, end) to contact object
        
/* $("#contacts-list").show();
$("#contacts-list").append("<li id='" + i + "'>" + personFirstName + " " + personLastName + "</li>");

i++; */
    
//clears fields for additional contact input(s)
    $(".all-inputs").val("");


function hideContactDisplay() {
    event.preventDefault();
    $("#contact-display").hide();
}

//identify additional addresses and phone numbers by index number in array of addresses, array of phone numbers
function fillInContactDisplay(currentContact) {
    $("#full-name-display").text(currentContact.first_name + " " + currentContact.last_name);
    $("#first-name-display").text(currentContact.first_name);
    $("#last-name-display").text(currentContact.last_name);
    
    $("#phone-number-1-display").text(currentContact.phone_numbers[0].phone_number);
    
    if (currentContact.phone_numbers[1].phone_number !== "") {
        $("#phone-number-2-display").text(currentContact.phone_numbers[1].phone_number).show();
    }
    
    $("#address-1-display").text(currentContact.addresses[0].street + ", " + currentContact.addresses[0].city + ", " + currentContact.addresses[0].state)
    
    if (currentContact.addresses[1].street !== "" ||  currentContact.addresses[1].city !== "" || currentContact.addresses[1].state !== "") {
        $("#address-2-display").text(currentContact.addresses[1].street + ", " + currentContact.addresses[1].city + ", " + currentContact.addresses[1].state).show();
    }   
}

$("#contacts-list").on('click', 'li', function(event){
    $("#contact-display").show();
    //function that fills in the values of the contact display with the array element corresponding to the li
    var selectedID = event.target.id;
    var selectedContact = contacts[selectedID];
    fillInContactDisplay(selectedContact);
});