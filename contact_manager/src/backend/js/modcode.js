var urlBase = 'http://cop4331-project.com/API';
var extension = 'php';

var userID = 0;
var firstName = "";
var lastName = "";
var contactIDs;

// Completed
function doLogin()
{
	var login = document.getElementById(/*Input tag*/).value;
	var password = document.getElementById(/*Input tag*/).value;
	var hash = md5( password );
	
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var jsonPayload = '{"login" : "' + login + '", "password" : "' + hash + '"}';
	var url = urlBase + '/Login.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);
		
		var jsonObject = JSON.parse( xhr.responseText );
		
		userID = jsonObject.ID;
		
		if ( userID < 1)
		{
			// Throw incorrect error code to front
			// document.getElementById(/*Output tag*/).innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		
		saveCookie();
		
		// Redirect to home page
		// window.location.href = "newPage.html";
	}
	catch(err)
	{
		// Throw error code to front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

// Completed
function saveCookie()
{
	var minutes = 20;
	var date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userID=" + userID + ";expires=" + date.toGMTString();
}

// Completed
function readCookie()
{
	userID = -1;
	var data = document.cookie;
	var splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		var thisOne = splits[i].trim();
		var tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userID" )
		{
			userID = parseInt( tokens[1].trim() );
		}
	}
	
	if( userID < 0 )
	{
		// Redirect to login if illegal login attempt was made
		// window.location.href = "index.html";
	}
	else
	{
		// "Logged in as [NAME]" Header
		// document.getElementById(/*Output tag*/).innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

// Completed
function doLogout()
{
	userID = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	
	// Go back to login page
	// window.location.href = "index.html";
}

// Completed
function signUp()
{
	var firstName = document.getElementById(/*Input tag*/).value;
	var lastName = document.getElementById(/*Input tag*/).value;
	var username = document.getElementById(/*Input tag*/).value;
	var password = document.getElementById(/*Input tag*/).value;
	var hash = md5( password );
	
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName" : "' + lastName + '", "username" : "' + username + '", "hashPass" : "' + hash + '"}';
	var url = urlBase + '/SignUp.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, false);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.send(jsonPayload);

		var jsonObject = JSON.parse( xhr.responseText );

		success = jsonObject.success;

		if ( success === 0 )	
		{
			// No Duplicate Username error
			// document.getElementById(/*Output tag*/).innerHTML = "Username already taken";
			return;
		}
		else if (success === 1)
		{
			// Successful account creation
			// document.getElementById(/*Output tag*/).innerHTML = "Account created";
			return;
		}
	}
	catch(err)
	{
		// Throw error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

// Completed
function addContact()
{
	var firstName = document.getElementById(/*Input tag*/).value;
	var lastName = document.getElementById(/*Input tag*/).value;
	var email = document.getElementById(/*Input tag*/).value;
	var phoneNumber = document.getElementById(/*Input tag*/).value;
	
	if (firstName == "" || lastName == "" || email == "" || phoneNumber == "")
	{
		// Incomplete values
		// document.getElementById(/*Output tag*/).innerHTML = "One or more field is blank";
		return;
	}
	else if (phoneNumber.length > 10)
	{
		// Check phone # length (length <= 10)
		// document.getElementById(/*Output tag*/).innerHTML = "Phone number is too long";
		return;
	}
	
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var jsonPayload = '{"firstName" : "' + firstName + '", "lastName": "' + lastName + '", "email":"' + email + '", "phoneNumber":"' + phoneNumber + '", "userID" : ' + userID + '}';
	var url = urlBase + '/AddContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Return success
				// document.getElementById(/*Output tag*/).innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		// Throw Error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

// Completed
function searchContact()
{
	var srch = document.getElementById(/*Input text*/).value;
	
	// document.getElementById(/*Output text*/).innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"input" : "' + srch + '", "userID" : ' + userID + '}';
	var url = urlBase + '/SearchContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Parse through JSON package into output
				/*
				// document.getElementById(Output Text).innerHTML = "Contact(s) have been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);
				
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					for (var j = 0; j < 4; j++)
					{
						contactList += jsonObject.results[i][j];
						if (j == 0)	
						{
							contactList += " ";
							continue;
						}
						if (j != 3)
							contactList += ", ";
					}
					if (i < jsonObject.results.length - 1)
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
				*/
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		// Throw error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

function searchAll()
{
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var contactList = "";
	
	var jsonPayload = '{"userID" : ' + userID + '}';
	var url = urlBase + '/SearchAll.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Format JSON package as output result
				/*
				document.getElementById(Output tag).innerHTML = "Contact(s) have been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);
				
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					for (var j = 0; j < 4; j++)
					{
						contactList += jsonObject.results[i][j];
						if (j == 0)	
						{
							contactList += " ";
							continue;
						}
						if (j != 3)
							contactList += ", ";
					}
					if (i < jsonObject.results.length - 1)
					{
						contactList += "<br />\r\n";
					}
				}
				
				document.getElementsByTagName("p")[0].innerHTML = contactList;
				*/
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		// Throw error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

function updateContact()
{
	// To be completed
}

function searchForDeletion()
{
	var srch = document.getElementById(/*Input tag*/).value;
	
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var contactList = "";
	contactIDs = [];
	
	var jsonPayload = '{"input" : "' + srch + '", "userID" : ' + userID + '}';
	var url = urlBase + '/SearchContact.' + extension;
	
	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Parse through JSON package as output with checkbox for deletion
				/*
				document.getElementById(Output tag).innerHTML = "Contact(s) have been retrieved";
				
				var jsonObject = JSON.parse(xhr.responseText); // Parse JSON
				
				contactIDs.length = jsonObject.results.length;
				
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					contactList += '<input type="checkbox" id="' + jsonObject.results[i][4] + '">'; // deleteContact() reads IDs here
					contactList += '<label for="' + jsonObject.results[i][4] + '" id="contact' + jsonObject.results[i][4] + '">';
					contactIDs[i] = jsonObject.results[i][4];
					for (var j = 0; j < 4; j++)
					{
						contactList += jsonObject.results[i][j];
						if (j == 0)	
						{
							contactList += " ";
							continue;
						}
						if (j != 3)
							contactList += ", ";
					}
					if (i < jsonObject.results.length - 1)
					{
						contactList += "<br />\r\n";
					}
					contactList += '</label>';
				}
				
				// Create button for deleteContact();
				contactList += '<button type="button" id="deleteContacts" class="buttons" onclick="deleteContact();"> Delete Contacts </button>';
				
				// Output Result tag
				contactList += '<span id="deleteResult"></span>';
				document.getElementsByTagName("p")[0].innerHTML = contactList;
				*/
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		// Throw error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}

// Requires SearchForDeletion()
function deleteContact()
{
	// Alert function
	/*
	if (!confirm("You are about to permanently delete these contacts. Continue?"))
		return;
	*/
	
	// document.getElementById(/*Output tag*/).innerHTML = "";
	
	var multipleIDs = false;
	var jsonPayload = '{"input" : [';
	for (var i = 0; i < contactIDs.length; i++)
	{
		if (document.getElementById(contactIDs[i]).checked == true)
		{
			if (multipleIDs == true)
			{
				jsonPayload += ', ';
			}
			else if (multipleIDs == false)
			{
				multipleIDs = true;
			}
			jsonPayload += contactIDs[i];
			
			// Remove Contact from front 
			/*
			document.getElementById(contactIDs[i]).remove();
			document.getElementById("contact" + contactIDs[i]).remove();
			*/
		}
	}
	jsonPayload += '], "userID" : ' + userID + '}';
	var url = urlBase + '/DeleteContact.' + extension;

	var xhr = new XMLHttpRequest();
	xhr.open("POST", url, true);
	xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
	try
	{
		xhr.onreadystatechange = function()
		{
			if (this.readyState == 4 && this.status == 200)
			{
				// Successful deletion result
				// document.getElementById(/*Output tag*/).innerHTML = "Contact(s) have been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		// Throw error at front
		// document.getElementById(/*Output tag*/).innerHTML = err.message;
	}
}