<?php
$filePath = "data.json";

$fileContents = file_get_contents($filePath);
$data = json_decode($fileContents, true);


$IdN=(count($data)+1);
$Username=$_POST['Usernamephp'];
$DisplayName=$_POST['Displaynamephp'];
$Phone=$_POST['Phonephp'];
$Email=$_POST['Emailphp'];
$UserRole=$_POST['Userrolephp'];
$Enabled = filter_var($_POST['Enabledphp'], FILTER_VALIDATE_BOOLEAN);

$NewUser=array( 
    "Username"=> $Username,
    "DisplayName"=> $DisplayName, 
    "Phone"=> $Phone,
    "Email"=> $Email, 
    "UserRole"=> $UserRole, 
    "Enabled"=> $Enabled
);


$data[$IdN] = $NewUser;
$jsonData = json_encode($data, JSON_PRETTY_PRINT);
$file = fopen($filePath, "w");
fwrite($file, $jsonData);
fclose($file);





?>


