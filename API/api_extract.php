<?php 

$url = "https://www.fruityvice.com/api/fruit/all";
$ch = curl_init($url);

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);

curl_close($ch);

echo $response;

?>