 <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('Net/SSH2.php');
include('../lib/conexao.php');


$srv = $conn -> query("SELECT `servidores`.`id`, count(`user`.`id`) as count, `servidores`.`host`, `servidores`.`user`, `servidores`.`senha`
FROM `servidores`
LEFT JOIN `user` ON `servidores`.`id` = `user`.`server_id` 
GROUP BY `id`
ORDER BY `count` ASC") or die(mysql_error());
$linha = $srv->fetchAll(PDO::FETCH_ASSOC);
$server = $linha[0];
$server_id = $server['id'];



$host = $server['host'];
$user = $server['user'];
$pass = $server['senha'];
$token = $_GET['token'];
$email = $_GET['email'];


//Gerar senha randomica de 6 dígitos
$rand = substr(md5(uniqid(rand(1,6))), 0, 6);


//Verificar tamanho do usuário
if (strlen($email) > 32) {
 	$user_con = explode("@", $email)[0];
 } else {
 	$user_con = $email;
 }

$connection = new Net_SSH2($host, 22);
$connection->login($user, $pass);


$connection->write("criarusuario".PHP_EOL);
sleep(1);
$connection->write($user_con.PHP_EOL);
sleep(1);
$connection->write($rand.PHP_EOL);
sleep(1);
$connection->write("2".PHP_EOL);
sleep(1);
$connection->write("1".PHP_EOL);
sleep(1);


$date = date('Y-m-d');
$date = date('Y-m-d', strtotime($date. ' + 2 days'));
$conn -> exec("UPDATE `user` SET `senha_con`='$rand', `user_con`='$user_con', `server_id`='$server_id', `vencimento`='$date' WHERE `token` = '$token'") or die(mysql_error());

$response = array('user_con' => $user_con, 'senha_con' => $rand, 'vencimento' => $date);
echo $_GET['callback'] . '(' . json_encode($response) . ')';
?>

