<?php
	$inData = getRequestInfo();
	
	$conn = new mysqli("localhost", "group5", "JavascriptPhpMysql", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "INSERT INTO contacts (firstName, lastName, email, phoneNumber, userID) VALUES ('". $inData["firstName"] . "','" . $inData["lastName"] . "', '" . $inData["email"] . "', '" . $inData["phoneNumber"] . "', " . $inData["userID"] . ")";
		$result = $conn->query($sql);
		
		if ($result == FALSE)
		{
			returnWithError( "Unable to update contact" );
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
		$retValue = '{"success": 0, "error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithSuccess()
	{
		$retValue = '{"success": 1, "error":""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>