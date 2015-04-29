<?php

require_once('../bootstrap.php');

$url                   = ELASTICSEARCH_URL.'/mydocs/doc/_search';
//var_dump($_POST);
$content               = file_get_contents('php://input');
//print_r($data);
//$content = json_encode($_POST);
$ch                    = curl_init($url);
curl_setopt($ch,       CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch,       CURLOPT_POSTFIELDS, $content);
curl_setopt($ch,       CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,       CURLOPT_CONNECTTIMEOUT, 0);
curl_setopt($ch,       CURLOPT_TIMEOUT, 5000);
curl_setopt($ch,       CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($content))
	);

$result                = curl_exec($ch);

//print_r($result);
echo $result;

?>
