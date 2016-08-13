var allContacts = [];

var Contact = {
    // names[0] = first name, names[1] = last name
    "Names": [] ,
    "Phones": { "personal": [], "work": [] }, 
    "Emails": { "personal": [], "work": [] }, 
    "Addresses": {
        //addresses passed in as array of values into another array
        "personal": [],
        "work": []
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

function addAddressToContact(theContact, theClass, addressType) {
    //creates array of all address inputs with values
    var address = $('.' + theClass).tagsinput('items');
    
    //pushes to personal or work address property array in contact object, depending on class selected
    if (theClass === 'personal-address') {
        theContact.Addresses.personal = address;    
    }
    else {
        theContact.Addresses.work = address;
    } 
    console.log(address);
    return address;
}

//function that pushes data entered into new contact object that is pushed to contacts array
function storeContactInfo() {
    event.preventDefault();
    var newContact = Object.create(Contact);
    
    addNamesToContact(newContact);
    addContactMethodsToContact(newContact);
    addAddressToContact(newContact, 'personal-address', 'personal');
    addAddressToContact(newContact, 'work-address', 'work');
    
    allContacts.push(newContact);
    console.log(allContacts);
    
    $("#contacts-list").show();
    $("#contacts-list").append("<li>" + newContact.Names[0] + " " + newContact.Names[1] + "</li>");
    
    var vCard = makevCard(newContact);
    $('#vcard-content').text(vCard);
    $('#vcard-display').slideDown(1000);
}

//resets app
function resetVCard() {
    event.preventDefault();
    $('#vcard-display').slideUp(1000);
    $('#vcard-content').html('');
    $('.all-inputs').tagsinput('removeAll');
}

//generates vCard
function makevCard(theContact) {
    var beginning = "BEGIN:VCARD\nVERSION:4.0";
    var ending = "END:VCARD";
    var vCardData = beginning + '\n';
    
    //takes array of 'Names'
    //converts it to string and sets to variable
    //replaces commas with semicolons, and //concatentates to "N:"
    //";" is tacked on end.  
    //adds result to vCardData.  
    //adds "\n" to vCardData.
    /* N:Forrest;Gump;;Mr.; */
    function getName(namePath){
        var Names = namePath;
        vCardData += 'N:' + namePath[0] + ';' + namePath[1] + ';';
        vCardData += '\n';
        console.log(vCardData);
    };
    getName(theContact.Names);
    
    //takes array of 'Names', concatenates first value (corresponds to first name) to "FN:".  Adds result to vCard Data.  Adds "\n" to vCardData  
    /* FN:Forrest Gump */
    function getFirstName(namePath){
        vCardData += 'FN:' + namePath[0];
        vCardData += '\n';
        console.log(vCardData)
    };
    getFirstName(theContact.Names);
    
    //takes array of 'Phones'[type] and sets to variable
    //runs for loop where each value of array is concatenated to either of the following: "TEL;TYPE=work,voice;VALUE=uri:tel:+1-" OR "TEL;TYPE=home,voice;VALUE=uri:tel:+1-"
    //adds result to vCardData. 
    //adds "\n" added to vCardData.   
    /* TEL;TYPE=work,voice;VALUE=uri:tel:+1-111-555-1212
    TEL;TYPE=home,voice;VALUE=uri:tel:+1-404-555-1212 */
    
    function getPhones(phonesPath){
        var vCardDataPhoneType = '';
        
        if (phonesPath === theContact.Phones.personal) {
            vCardDataPhoneType = 'TEL;TYPE=home,voice;VALUE=uri:tel:+1-';
        }
        else {
            vCardDataPhoneType = 'TEL;TYPE=work,voice;VALUE=uri:tel:+1-';
        }
        
        for (var i = 0; i < phonesPath.length; i++) {
            vCardData += vCardDataPhoneType + phonesPath[i];
            vCardData += '\n';
        }
        console.log(vCardData);
    }
    getPhones(theContact.Phones.personal);
    getPhones(theContact.Phones.work);

    //takes array of 'Addresses'[type]
    //converts it to string and sets to variable
    //replaces commas with semicolons.
    //replace asterick with comma if there is street line 2
    //sets result to variable. 
    //concatenates variable to "ADR;TYPE=WORK,PREF:;;" or "ADR;TYPE=HOME:;;" depending on address type.
    //add result to vCardData
    //add "\n" to vCardData
    /* ADR;TYPE=WORK,PREF:;;100 Waters Edge;Baytown;LA;30314;United States of Amer
     ica
    ADR;TYPE=HOME:;;42 Plantation St.;Baytown;LA;30314;United States of America */
    function getAddress(addressPath){
        var theAddress = addressPath;
        
        var street = theAddress[0];
        street = street.toString().replace('*','\,');
        console.log(street);
        
        var street1;
        var street2;
        
        var vCardAddressType = '';
        var vCardAddressLabel = '';
        
        if (addressPath === theContact.Addresses.personal) {
            vCardAddressType = 'ADR;TYPE=HOME:;;';
        }
        else {
            vCardAddressType = 'ADR;TYPE=WORK:;;';
        }
        
        vCardData += vCardAddressType + street + ';' + theAddress[1] + ';' + theAddress[2] + ';' + theAddress[3] + ';' + theAddress[4];
        vCardData += '\n';
        
        
        if (addressPath === theContact.Addresses.personal) {
            vCardAddressLabel = 'LABEL;TYPE=HOME:';
        }
        else {
            vCardAddressLabel = 'LABEL;TYPE=WORK:';
        }
        
        for (var i = 0; i < street.length; i++) {
            if (street.slice(i, (i + 1)) === ',') {
                street1 = street.slice(0, i);
                street2 = street.slice(i + 1);
                console.log(street1, street2);
                break;
            }
            else {
                street1 = street;
                street2 = ' ';
                console.log(street1, street2);
                break;
            }
        }
        
        if (street2 === ' ') {
            vCardData += vCardAddressLabel + street1 + '\n' + theAddress[1] + '\, ' + theAddress[2] + ' ' + theAddress[3] + '\n' + theAddress[4];
        }
        else {
            vCardData += vCardAddressLabel + street1 + '\n' + street2 + '\n' + theAddress[1] + '\, ' + theAddress[2] + ' ' + theAddress[3] + '\n' + theAddress[4];
        }
        
        console.log(vCardData);
    }
    getAddress(theContact.Addresses.personal);
    getAddress(theContact.Addresses.work);
    
    //takes array of 'Emails'[type] and sets to variable
    //runs for loop where each value of array is concatenated to either of the following: "EMAIL;TYPE=home:" OR "EMAIL;TYPE=work"
    //adds result to vCardData. 
    //adds "\n" added to vCardData.   
    /* EMAIL;TYPE=home:forrestgump@example.com
    EMAIL;TYPE=work:forrestgump@example.com */
        
    //pass variables into functions and invoke them    
    //var get = start + '\n' + data + '\n' end;
    //return get
    
    function getEmails(emailPath){
        var theEmails = emailPath;
        var vCardDataEmailType = '';
        
        if (emailPath === theContact.Emails.personal) {
            vCardDataEmailType = 'EMAIL;TYPE=home:';
        }
        else {
            vCardDataEmailType = 'EMAIL;TYPE=work:';
        }
        
        for (var i = 0; i < theEmails.length; i++) {
            vCardData += vCardDataEmailType + theEmails[i];
            vCardData += '\n';
        }
        
    }
    getEmails(theContact.Emails.personal);
    getEmails(theContact.Emails.work);
    
    vCardData += '\n' + ending;
    
    console.log(vCardData);
    return vCardData;
}
    
//clears fields for additional contact input(s)

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

//adds as many address fields as the user desires  
function addAddressField() {
    event.preventDefault();
    //use clone() instead!
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
            //trigger vCard function
        }
        else {
            alert("Not found!");
        }
    }
});