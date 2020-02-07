<?php

	$inData = getRequestInfo();
	
	$conn = new mysqli("localhost", "group5", "JavascriptPhpMysql", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		// $sql = "SELECT ID, firstName, lastName FROM contact_info WHERE username='" . $inData["login"] . "' and hashPass='" . $inData["password"] . "'";
		$sql = "SELECT ID FROM users WHERE username='" . $inData["username"] . "'";
		$result = $conn->query($sql);
		
		if ($result->num_rows === 0)
		{
			$newSql = "INSERT INTO users (firstName, lastName, username, hashPass) VALUES ('" . $inData["firstName"] . "', '" . $inData["lastName"] . "', '" . $inData["username"] . "', '" . $inData["hashPass"] . "')"; 
			$newResult = $conn->query($newSql);
			if ($newResult == TRUE)
			{
				returnWithSuccess();
			}
			else
			{
				returnWithError( "Unable to create user" );
			}
		}
		else
		{
			returnWithUsernameError();
		}
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}
	
	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithUsernameError()
	{
		$retValue = '{"success":0,"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"success": 2,"error": "' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess()
	{
		$retValue = '{"success": 1,"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>