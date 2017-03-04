 <?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include('Net/SSH2.php');
include('../lib/conexao.php');

$debug = false;

//Definição da data de hoje
$today = date('Y-m-d');
if ($debug) {echo "Data de hoje: ".$today."<br>";}



//Consulta do usuário
$token = $_GET['token'];
$me = $conn -> query("
	SELECT * FROM `user` WHERE `token` = '$token'
")->fetch(PDO::FETCH_ASSOC);
if ($debug) {echo "<pre>Dados do usuário: "; print_r($me); echo "</pre>";}



//Consulta do pacote
$pacote_id = $_GET['pacote'];
$pacote = $conn -> query("
	SELECT * FROM `pacotes` WHERE `id` = '$pacote_id'
")->fetch(PDO::FETCH_ASSOC);
$valor_pacote = $pacote['preco'];
$valor_diferenca = $pacote['preco'] - $pacote['nv1'];
if ($debug) {echo "<br>Valor consimido: ".$valor_diferenca." de: ".$me['saldo'];}




if ($me['saldo'] < $valor_diferenca) {
	
$response = array('status' => false, 'msg' => 'Saldo insuficiente');
echo $_GET['callback'] . '(' . json_encode($response) . ')';
exit();
}

//Consulta do usuário
$user_id = $_GET['indicado'];
$user = $conn -> query("
	SELECT 
	`user`.`nome`, 
	`user`.`email`, 
	`user`.`user_con`, 
	`user`.`vencimento`, 
	`user`.`indicador_id`, 
	`servidores`.*  
	FROM `user` 
	LEFT JOIN `servidores` ON `user`.`server_id` = `servidores`.`id` 
	WHERE `user`.`id` = '$user_id'
")->fetch(PDO::FETCH_ASSOC);
if ($debug) {echo "<pre>Dados do usuário: "; print_r($user); echo "</pre>";}




$host = $user['host'];
$username = $user['user'];
$pass = $user['senha'];
$user_con = $user['user_con'];


if ($debug) {echo "<pre>";print_r($pacote);echo "</pre>";}

if ($debug) {echo "INSERT INTO `fatura`(`valor`, `datapagamento`, `descricao`, `user_id`, `pacotes_id`) VALUES ('".$pacote['preco']."', '$today', 'Ativação do pacote ".$pacote['nome']."', '$user_id', '$pacote_id')";}


//Inserir fatura
$conn -> exec("INSERT INTO `fatura`(`valor`, `datapagamento`, `descricao`, `user_id`, `pacotes_id`) VALUES ('".$pacote['preco']."', '$today', 'Ativação do pacote ".$pacote['nome']."', '$user_id', '$pacote_id')");

if ($user['vencimento'] > $today) {
	$novo_vencimento = date('Y-m-d', strtotime($user['vencimento']. ' + '.$pacote['validade'].' days'));
	if ($debug) {echo "<br>vencimento superior<br>Atual vencimento: ".$user['vencimento']."<br>Novo vencimento: ".$novo_vencimento;}
}else{
	$novo_vencimento = date('Y-m-d', strtotime($today. ' + '.$pacote['validade'].' days'));
	if ($debug) {echo "<br>vencimento inferior<br>Atual vencimento: ".$user['vencimento']."<br>Novo vencimento: ".$novo_vencimento;}
}

//Inserir vencimento e pontos
$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['preco']."',`vencimento`='$novo_vencimento' WHERE `user`.`id` = '$user_id'");


//------------------Distribuição dos bônus

//NV1
if (isset($user['indicador_id'])) {
	if ($user['indicador_id'] != 0) {
		$consumir = 0-$valor_diferenca;
		if ($debug) {echo "<br>Tem indicador NV1";}
		if ($debug) {echo "UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv1']."', `saldo` =  saldo - $valor_diferenca WHERE `user`.`id` = '".$user['indicador_id']."'";}
		$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv1']."', `saldo` =  `saldo`-'$valor_diferenca' WHERE `user`.`id` = '".$user['indicador_id']."'");
		$indicador_nv1 = $conn->query("SELECT * FROM `user` WHERE `id` = '".$user['indicador_id']."'")->fetch(PDO::FETCH_ASSOC);
		$conn -> exec("INSERT INTO `extrato`(`valor`, `ponto`, `des`, `user_id`) VALUES ('$consumir','".$pacote['nv1']."', 'Ativação de cliente', '".$indicador_nv1['id']."')");
		if ($debug) {echo "<pre>Dados do usuário: "; print_r($indicador_nv1);}
	}
}

//NV2
if (isset($indicador_nv1['indicador_id'])) {
	if ($indicador_nv1['indicador_id'] != 0) {
		if ($debug) {echo "<br>Tem indicador";}
		$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv2']."', `saldo` =  `saldo`+'".$pacote['nv2']."' WHERE `user`.`id` = '".$indicador_nv1['indicador_id']."'");
		$indicador_nv2 = $conn->query("SELECT * FROM `user` WHERE `id` = '".$indicador_nv1['indicador_id']."'")->fetch(PDO::FETCH_ASSOC);
		$conn -> exec("INSERT INTO `extrato`(`valor`, `ponto`, `des`, `user_id`) VALUES ('".$pacote['nv2']."','".$pacote['nv2']."', 'Bônus nível 2', '".$indicador_nv2['id']."')");
		if ($debug) {echo "<pre>Dados do usuário: "; print_r($indicador_nv2);}
	}
}

//NV3
if (isset($indicador_nv2['indicador_id'])) {
	if ($indicador_nv2['indicador_id'] != 0) {
		if ($debug) {echo "<br>Tem indicador";}
		$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv3']."', `saldo` =  `saldo`+'".$pacote['nv3']."' WHERE `user`.`id` = '".$indicador_nv2['indicador_id']."'");
		$indicador_nv3 = $conn->query("SELECT * FROM `user` WHERE `id` = '".$indicador_nv2['indicador_id']."'")->fetch(PDO::FETCH_ASSOC);
		$conn -> exec("INSERT INTO `extrato`(`valor`, `ponto`, `des`, `user_id`) VALUES ('".$pacote['nv3']."','".$pacote['nv3']."', 'Bônus nível 3', '".$indicador_nv3['id']."')");
		if ($debug) {echo "<pre>Dados do usuário: "; print_r($indicador_nv3);}
	}
}

//NV4
if (isset($indicador_nv3['indicador_id'])) {
	if ($indicador_nv3['indicador_id'] != 0) {
		if ($debug) {echo "<br>Tem indicador";}
		$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv4']."', `saldo` =  `saldo`+'".$pacote['nv4']."' WHERE `user`.`id` = '".$indicador_nv3['indicador_id']."'");
		$indicador_nv4 = $conn->query("SELECT * FROM `user` WHERE `id` = '".$indicador_nv3['indicador_id']."'")->fetch(PDO::FETCH_ASSOC);
		$conn -> exec("INSERT INTO `extrato`(`valor`, `ponto`, `des`, `user_id`) VALUES ('".$pacote['nv4']."','".$pacote['nv4']."', 'Bônus nível 4', '".$indicador_nv4['id']."')");
		if ($debug) {echo "<pre>Dados do usuário: "; print_r($indicador_nv4);}
	}
}

//NV5
if (isset($indicador_nv4['indicador_id'])) {
	if ($indicador_nv4['indicador_id'] != 0) {
		if ($debug) {echo "<br>Tem indicador";}
		$conn -> exec("UPDATE `user` SET `ponto`= `ponto`+'".$pacote['nv5']."', `saldo` =  `saldo`+'".$pacote['nv5']."' WHERE `user`.`id` = '".$indicador_nv4['indicador_id']."'");
		$indicador_nv5 = $conn->query("SELECT * FROM `user` WHERE `id` = '".$indicador_nv4['indicador_id']."'")->fetch(PDO::FETCH_ASSOC);
		$conn -> exec("INSERT INTO `extrato`(`valor`, `ponto`, `des`, `user_id`) VALUES ('".$pacote['nv5']."','".$pacote['nv5']."', 'Bônus nível 5', '".$indicador_nv5['id']."')");
		if ($debug) {echo "<pre>Dados do usuário: "; print_r($indicador_nv5);}
	}
}


$d = date_create($novo_vencimento);
$mudardata = date_format($d,"d/m/Y");
if ($debug) {echo "<pre>Nova data: "; print_r($mudardata);}





$connection = new Net_SSH2($host, 22);
$connection->login($username, $pass);

$connection->write("mudardata".PHP_EOL);
sleep(1);
$connection->write($user_con.PHP_EOL);
sleep(1);
$connection->write($mudardata.PHP_EOL);
sleep(1);




$response = array('vencimento' => $novo_vencimento, 'status' => true, 'valor' => $valor_diferenca);
echo $_GET['callback'] . '(' . json_encode($response) . ')';
?>

