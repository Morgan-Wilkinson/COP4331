<?php

	$inData = getRequestInfo();
	
	$ID = 0;
	$firstName = "";
	$lastName = "";
	
	$conn = new mysqli("localhost", "group5", "JavascriptPhpMysql", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT ID, firstName, lastName FROM users WHERE username='" . $inData["login"] . "' and hashPass='" . $inData["password"] . "'";
		$result = $conn->query($sql);
		
		if ($result->num_rows > 0)
		{
			$row = $result->fetch_assoc();
			$firstName = $row["firstName"];
			$lastName = $row["lastName"];
			$ID = $row["ID"];
			
			returnWithInfo($firstName, $lastName, $ID);
		}
		else
		{
			returnWithError( "No Records Found ");
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
	
	function returnWithError( $err )
	{
		$retValue = '{"ID":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $firstName, $lastName, $ID )
	{
		$retValue = '{"ID":' . $ID . ',"firstName":"' . $firstName . '","lastName":"' . $lastName . '","error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>