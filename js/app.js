var i = 0;
var contacts = [];

function showPhoneNumber2Fields () {
    event.preventDefault();
    $("#show-phone-number-2-fields").hide();
    $("#remove-phone-number-2-fields").show();
    $("#input-phone-number-2").show();
}

function removePhoneNumber2Fields () {
    event.preventDefault();
    $("#phone-number-2").val("");
    $("#input-phone-number-2").hide();
    $("#remove-phone-number-2-fields").hide();
    $("#show-phone-number-2-fields").show();
}

function showAddress2Fields () {
    event.preventDefault();
    $("#show-address-2-fields").hide();
    $("#remove-address-2-fields").show();
    $(".input-address-2").show();
}

function removeAddress2Fields () {
    event.preventDefault();
    $(".address-2-inputs").val("");
    $(".input-address-2").hide();
    $("#remove-address-2-fields").hide();
    $("#show-address-2-fields").show();
}

function Address (street_value, city_value, state_value) {
    this.street = street_value;
    this.city = city_value;
    this.state = state_value;
}

function PhoneNumber (phone_number_value) {
    this.phone_number = phone_number_value;
}

function Contact (first_name_value, last_name_value, phone_number_object_1, phone_number_object_2, address_object_1, address_object_2) {
    this.first_name = first_name_value;
    this.last_name = last_name_value;
    this.phone_numbers = [phone_number_object_1, phone_number_object_2];
    this.addresses = [address_object_1, address_object_2];
}

function storeContactInfo () {
    event.preventDefault();
    var personFirstName = document.getElementById("first-name").value;
    var personLastName = document.getElementById("last-name").value;
    var personPhoneNumber1 = document.getElementById("phone-number-1").value;
    var personPhoneNumber2 = document.getElementById("phone-number-2").value;
    var personStreet1 = document.getElementById("street-1").value;
    var personCity1 = document.getElementById("city-1").value;
    var personState1 = document.getElementById("state-1").value; 
    var personStreet2 = document.getElementById("street-2").value;
    var personCity2 = document.getElementById("city-2").value;
    var personState2 = document.getElementById("state-2").value; 
    
    if(personLastName === "" || personFirstName === "" || personPhoneNumber1 === "") {
        alert("Please enter at least a first name, last name and phone number!")
    }
    
    var PhoneNumber1 = new PhoneNumber(personPhoneNumber1);
    var PhoneNumber2 = new PhoneNumber(personPhoneNumber2);
    
    var Address1 = new Address(personStreet1, personCity1, personState1);
    var Address2 = new Address(personStreet2, personCity2, personState2);
    
    var NewContact = new Contact(personFirstName, personLastName, PhoneNumber1, PhoneNumber2, Address1, Address2);
    
    contacts.push(NewContact);
    console.log(contacts);
        
    $("#contacts-list").show();
    $("#contacts-list").append("<li id='" + i + "'>" + personFirstName + " " + personLastName + "</li>");
    
    i++;
    
    $(".all-inputs").val("");
}

function hideContactDisplay() {
    event.preventDefault();
    $("#contact-display").hide();
}

function fillInContactDisplay (currentContact) {
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
    fillInContactDisplay (selectedContact)
});