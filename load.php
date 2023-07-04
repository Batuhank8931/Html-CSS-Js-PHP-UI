<?php

$filePath = "data.json";

$fileContents = file_get_contents($filePath);
$data = json_decode($fileContents , JSON_PRETTY_PRINT);

echo(json_encode($data, $depth=147483647));

?>


