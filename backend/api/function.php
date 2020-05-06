<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

$mysqli = new mysqli("mysql32.unoeuro.com","codeplanne_net","Sedelel4","codeplanner_net_db4");
if($mysqli->connect_error){ throw new Exception($mysqli->connect_error); }

$jsonString = file_get_contents('php://input');
$json = json_decode($jsonString);

$start = dv('start', 0);
$limit = dv('limit', 100);
$order = dv('orderby', 'name');
$name = dv('name', '');

function dv(string $name, $de){
   global $json, $mysqli;
   return isset($json->$name) ? $mysqli->real_escape_string($json->$name) : $de; 
}
function get(string $sql, string $field = null){
   global $mysqli;
   $result = $mysqli->query($sql);
   $result_assoc = [];
   while($data = $result->fetch_assoc()){
      $result_assoc[] = $field ? $data[$field] :$data;
   }
   $result->free_result();
   return $result_assoc;
}

$functions = get("SELECT id, pure, name, description FROM function_search AS f 
   WHERE name LIKE '%$name%'
   GROUP BY id
   ORDER BY $order
   LIMIT $start, $limit
");
foreach ($functions as &$f) {
   $id = $f['id'];
   $f['bodies'] = get("SELECT body, lang FROM function_search AS f 
      WHERE id = $id
      GROUP by id, lang
      ORDER BY lang
   ");
   $f['tags'] = get("SELECT tag FROM function_search AS f 
      WHERE id = $id
      GROUP by tag
      ORDER BY tag
   ","tag");
   $f['arguments'] = get("SELECT io_name as name, io_type as type, is_input FROM function_search AS f 
      WHERE id = $id
      GROUP by io_name, io_type
      ORDER BY io_name
   ");
   $f['tests'] = get("SELECT id, code, name, description FROM function_test AS f 
      WHERE id = $id
      ORDER BY name
   ");
}

header('Content-Type: application/json');
echo json_encode($functions);
