var urlBase = 'http://cop4331-project.com/API';
var extension = 'php';

var userID = 0;
var firstName = "";
var lastName = "";
var contactIDs;

// Completed
function doLogin()
{
	userID = 0;
	firstName = "";
	lastName = "";
	
	var login = document.getElementById("loginName").value;
	var password = document.getElementById("loginPassword").value;
	var hash = md5( password );
	
	document.getElementById("loginResult").innerHTML = "";
	
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
			document.getElementById("loginResult").innerHTML = "User/Password combination incorrect";
			return;
		}
		
		firstName = jsonObject.firstName;
		lastName = jsonObject.lastName;
		
		saveCookie();
		
		window.location.href = "newPage.html";
	}
	catch(err)
	{
		document.getElementById("loginResult").innerHTML = err.message;
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
		window.location.href = "index.html";
	}
	else
	{
		document.getElementById("userName").innerHTML = "Logged in as " + firstName + " " + lastName;
	}
}

// Completed
function doLogout()
{
	userID = 0;
	firstName = "";
	lastName = "";
	document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
	window.location.href = "index.html";
}

// Completed
function signUp()
{
	var firstName = document.getElementById("firstName").value;
	var lastName = document.getElementById("lastName").value;
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	var hash = md5( password );
	
	document.getElementById("signUpResult").innerHTML = "";
	
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
			document.getElementById("signUpResult").innerHTML = "Username already taken";
			return;
		}
		else if (success === 1)
		{
			document.getElementById("signUpResult").innerHTML = "Account created";
			return;
		}
	}
	catch(err)
	{
		document.getElementById("signUpResult").innerHTML = err.message;
	}
}

// Completed
function addContact()
{
	var firstName = document.getElementById("firstNameContact").value;
	var lastName = document.getElementById("lastNameContact").value;
	var email = document.getElementById("emailContact").value;
	var phoneNumber = document.getElementById("phoneNumberContact").value;
	
	if (firstName == "" || lastName == "" || email == "" || phoneNumber == "")
	{
		document.getElementById("contactAddResult").innerHTML = "One or more field is blank";
		return;
	}
	else if (phoneNumber.length > 10)
	{
		document.getElementById("contactAddResult").innerHTML = "Phone number is too long";
		return;
	}
	
	document.getElementById("contactAddResult").innerHTML = "";
	
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
				document.getElementById("contactAddResult").innerHTML = "Contact has been added";
			}
		};
		xhr.send(jsonPayload);
	}
	catch(err)
	{
		document.getElementById("contactAddResult").innerHTML = err.message;
	}
}

// Completed
function searchContact()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("contactSearchResult").innerHTML = "";
	
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
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) have been retrieved";
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
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function searchAll()
{
	document.getElementById("contactSearchResult").innerHTML = "";
	
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
				document.getElementById("contactSearchResult").innerHTML = "Contact(s) have been retrieved";
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
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		document.getElementById("contactSearchResult").innerHTML = err.message;
	}
}

function updateContact()
{
	// To be completed
}

function searchForDeletion()
{
	var srch = document.getElementById("searchText").value;
	document.getElementById("searchDeleteResult").innerHTML = "";
	
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
				document.getElementById("searchDeleteResult").innerHTML = "Contact(s) have been retrieved";
				var jsonObject = JSON.parse(xhr.responseText);
				
				contactIDs.length = jsonObject.results.length;
				
				for (var i = 0; i < jsonObject.results.length; i++)
				{
					contactList += '<input type="checkbox" id="' + jsonObject.results[i][4] + '">';
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
				contactList += '<button type="button" id="deleteContacts" class="buttons" onclick="deleteContact();"> Delete Contacts </button>';
				contactList += '<span id="deleteResult"></span>';
				document.getElementsByTagName("p")[0].innerHTML = contactList;
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		document.getElementById("searchDeleteResult").innerHTML = err.message;
	}
}

function deleteContact()
{
	if (!confirm("You are about to permanently delete these contacts. Continue?"))
		return;
	
	document.getElementById("deleteResult").innerHTML = "";
	
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
			document.getElementById(contactIDs[i]).remove();
			document.getElementById("contact" + contactIDs[i]).remove();
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
				document.getElementById("deleteResult").innerHTML = "Contact(s) have been deleted";
			}
		};
		xhr.send(jsonPayload);
	}
	catch (err)
	{
		document.getElementById("deleteResult").innerHTML = err.message;
	}
}