<?php
// DataTables PHP library and database connection

include('lib/conexao.php');

$agencia = $_GET['data']['agencia'];
$banco = $_GET['data']['banco'];
$conta = $_GET['data']['conta'];
$tipo = $_GET['data']['tipo'];
$token = $_GET['data']['token'];
$valor = $_GET['data']['valor'];

if (isset($_GET['data']['op'])) {
	$op = $_GET['data']['op'];
}

$user = $conn -> query("SELECT *  FROM `user` WHERE `token` = '$token'") or die(mysql_error());
$user = $user->fetch(PDO::FETCH_ASSOC);

if ($user['saldo'] <= $valor) {	
	$response = array('status' => false, 'msg' => 'Saldo insuficiente');
	echo $_GET['callback'] . '(' . json_encode($response) . ')';
	exit();
}

$user_id = $user['id'];
$atualizar_saldo = $user['saldo'] - $valor;

$conn -> exec("UPDATE `user` SET `saldo`='$atualizar_saldo' WHERE `token` = '$token'");
$conn -> exec("INSERT INTO `saque`(`valor`, `banco`, `agencia`, `tipo`, `op`, `conta`, `user_id`) 
						 VALUES ('$valor', '$banco', '$agencia', '$tipo', '$op', '$conta', '$user_id')");


	$response = array('status' => true, 'msg' => 'Saque pendente', 'valor' => $valor);
	echo $_GET['callback'] . '(' . json_encode($response) . ')';
	exit();