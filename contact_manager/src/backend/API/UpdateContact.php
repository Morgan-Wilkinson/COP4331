<?php

	$inData = getRequestInfo();

	$numItems = 0;
	
	$conn = new mysqli("localhost", "group5", "JavascriptPhpMysql", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "UPDATE contacts SET firstname='" . $inData["firstName"] . "', lastName='" . $inData["lastName"] . "', email='" . $inData["email"] . "', phoneNumber='" . $inData["phoneNumber"] . "' WHERE ID='" . $inData["ID"] . "'";
		$result = $conn->query($sql);
		
		if ($result == false)
		{
			$conn->close();
			returnWithError( "Error in Deleting Contacts" );
		}
		
		$conn->close();
		returnWithSuccess();
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
		$retValue = '{"error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess()
	{
		$retValue = '{"error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>