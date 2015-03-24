<?PHP
Header('Content-type: text/xml');

$url = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=a3da90a8f09e423fb3084498e9889227&mapid=';

$stop = $_GET['stop'];
$rt = $_GET['rt'];

$url = $url . $stop;

if($rt) {
  if($rt == 'blue') {
    $rt = 'Blue';
  } elseif($rt == 'brown') {
    $rt = 'Brn';
  } elseif($rt == 'green') {
    $rt = 'G';
  } elseif($rt == 'orange') {
    $rt = 'Org';
  } elseif($rt == 'purple') {
    $rt = 'P';
  } elseif($rt == 'yellow') {
    $rt = 'Y';
  } elseif($rt == 'pink') {
    $rt = 'Pink';
  } elseif($rt == 'red') {
    $rt = 'Red';
  }
  $url = $url . '&rt=' . $rt;
}


$xml = new SimpleXMLElement(file_get_contents($url));

print($xml->asXML());


?>
