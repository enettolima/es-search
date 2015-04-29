<?php

require_once('../bootstrap.php');

$url             = ELASTICSEARCH_URL.'/mydocs/folder/_search';
$content         = json_encode($_GET);
$ch              = curl_init($url);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
//curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 0);
curl_setopt($ch, CURLOPT_TIMEOUT, 5000);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
	'Content-Type: application/json'
));

$result          = curl_exec($ch);
echo $result;
/*$arr = json_decode($result);

//print_r($arr);
$hits = $arr->hits->hits;
$folders = array();
//print_r($hits);
for($i=0; $i<count($hits); $i++){
	//echo "virtual is ".$arr->$i->hits->hits->_source->virtual;
	//echo "virtual is ".$hits[$i]->_source->virtual;
	if(strlen($hits[$i]->_source->virtual)>0){
		$exp = explode("/",$hits[$i]->_source->virtual);
		$folder = $exp[1];
		if(!in_array($folder, $folders)){
			$folders[] = $folder;
		}
	}
}

$ct = 0;
asort($folders);
foreach($folders as $k => $v){
	$fd[$ct]["id"]       = $v;
	$fd[$ct]["text"]     = $v;
	$fd[$ct]["children"] = true;
	$fd[$ct]["type"]     = "root";
	$ct++;
}
$root_dir = array();

$response = json_encode($fd);

header('Content-Type: application/json');
echo $response;*/
/*foreach($arr->hits->hits as $k => $v){
	echo "virtual is ".$k ." -- ".$v;
}*/
//echo $result;

/*[
  {
		"id" : "demo_root_1",
		"text" : "Root 1",
		"children" : true,
		"type" : "root"
	},
	{
		"id" : "demo_root_2",
		"text" : "Root 2",
		"type" : "root"
	}
]*/
/*[
{
	"id":"\/Recipies\/Chinese",
	"text":"\/Recipies\/Chinese",
	"children":true,
	"type":"root"
},
{
	"id":"\/Guides",
		"text":"\/Guides",
		"children":true,
		"type":"root"
},
{"id":"\/Recipies\/Soups","text":"\/Recipies\/Soups","children":true,"type":"root"},{"id":"\/Guides\/Development\/Android","text":"\/Guides\/Development\/Android","children":true,"type":"root"},{"id":"\/Guides\/TV","text":"\/Guides\/TV","children":true,"type":"root"},{"id":"\/Guides\/Development\/IOS","text":"\/Guides\/Development\/IOS","children":true,"type":"root"},{"id":"\/Guides\/Iphone","text":"\/Guides\/Iphone","children":true,"type":"root"},{"id":"\/Guides\/Motorola","text":"\/Guides\/Motorola","children":true,"type":"root"},{"id":"\/Recipies","text":"\/Recipies","children":true,"type":"root"}]*/
?>
