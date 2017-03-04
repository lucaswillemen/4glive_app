 <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('Net/SSH2.php');

$host = "192.95.54.31";
$user = "root";
$pass = "102030@!";
$token = $_GET['token'];

$rand = substr(md5(uniqid(rand(1,6))), 0, 6);


$connection = new Net_SSH2($host, 22);
$connection->login($user, $pass);


$connection->write("criarusuario".PHP_EOL);
sleep(1);
$connection->write("lucaswillemen@gmail.com".PHP_EOL);
sleep(1);
$connection->write($rand.PHP_EOL);
sleep(1);
$connection->write("1".PHP_EOL);
sleep(1);
$connection->write("1".PHP_EOL);
sleep(1);


?>

