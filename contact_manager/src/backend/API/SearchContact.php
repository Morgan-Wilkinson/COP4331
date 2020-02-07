<?php
	$inData = getRequestInfo();
	
	$searchCount = 0;
	$searchResults = "";
	
	$conn = new mysqli("localhost", "group5", "JavascriptPhpMysql", "contact_manager");
	if ($conn->connect_error)
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$sql = "SELECT firstName, lastName, email, phoneNumber, ID FROM contacts WHERE userID = " . $inData["userID"] . " AND (firstName LIKE '%" . $inData["input"] . "%' OR lastName LIKE '%" . $inData["input"] . "%' OR email LIKE '%" . $inData["input"] . "%' OR phoneNumber LIKE '%" . $inData["input"] . "%')";
		$result = $conn->query($sql);
		
		if ($result == TRUE)
		{
			while ($row = $result->fetch_assoc())
			{
				if ($searchCount > 0)
				{
					$searchResults .= ",";
				}
				$searchCount++;
				$searchResults .= '["' . $row["firstName"] . '", "' . $row["lastName"] . '", "' . $row["email"] . '", "' . $row["phoneNumber"] . '", "' . $row["ID"] . '"]';
			}
		}
		else
		{
			returnWithError( "No Records Found ");
		}
		$conn->close();
	}
	
	returnWithInfo( $searchResults );
	
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
		$retValue = '{"results": [], "error": "'. $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults )
	{
		$retValue = '{"results":[' . $searchResults . '],"error": ""}';
		sendResultInfoAsJson( $retValue );
	}
	
?>