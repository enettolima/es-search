<?php

	require_once('../bootstrap.php');
	require_once('../vendor/autoload.php');

	$url             = ELASTICSEARCH_URL.'/mydocs/folder/_search';
	//$url             = ELASTICSEARCH_URL;

	//$selected_path =  $_GET['id'];
	//print_r($_GET);
	//echo $selected_path;
	/*$query = '{
		"_source" :   ["virtual","name"],
		"query": {
			"bool": {
				"must": [{
						"regexp": {
							"virtual": "Guides/[^/]*"
						}
					}]
				}
		}
	}';*/
 $query = '{
		"_source": [
			"virtual",
			"name"
		],
		"query": {
			"bool": {
				"must": [
					{
						"regexp": {
							"virtual": "/Guides/[^/]*"
						}
					}
				]
			}
		}
	}';

	$params2 = array();
	$params2['hosts'] = array("192.168.2.154:9200");
	$client = new Elasticsearch\Client($params2);
	$params['index'] = 'dir';
	$params['type'] = 'folder';
	$params['body'] = $query = trim(preg_replace('/\s+/', ' ', $query));
	$results = $client->search($params);
	$result['data'] = $results['hits']['hits'];
	//$res=[];
	foreach($results['hits']['hits'] as $key => $hit){
		$res[$key]['id']=$hit['_source']['virtual'];
		$res[$key]['text']=$hit['_source']['name'];
		$res[$key]['children']=true;
	}

	//print_r($results);
	$response = json_encode($res);
	print $response;
?>
