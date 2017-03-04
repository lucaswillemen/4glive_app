 <?php
include('lib/conexao.php');


//Consulta do usuário
$caixa = $conn -> query("SELECT sum(`caixa`.`valor`) as caixa FROM `caixa`")->fetch(PDO::FETCH_ASSOC);
$user = $conn -> query("SELECT count(`user`.`id`) as user FROM `user`")->fetch(PDO::FETCH_ASSOC);
$ativo = $conn -> query("SELECT count(`user`.`id`) as user FROM `user` WHERE `vencimento` > CURDATE()")->fetch(PDO::FETCH_ASSOC);
$saldo = $conn -> query("SELECT sum(`user`.`saldo`) as saldo, sum(`user`.`ponto`) as pontos FROM `user`")->fetch(PDO::FETCH_ASSOC);




$response = array(
	'users' => $user['user'], 
	'caixa' => $caixa['caixa'],
	'ativos' => $ativo['user'],
	'saldo' => $saldo['saldo'],
	'ponto' => $saldo['pontos']
	);
echo $_GET['callback'] . '(' . json_encode($response) . ')';
?>

