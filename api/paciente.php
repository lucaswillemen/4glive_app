<?php
// DataTables PHP library and database connection
include( "lib/DataTables.php" );

// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Join,
	DataTables\Editor\Validate;

$_GET['data']['token'] = md5(uniqid(rand(), true));


if ($_GET['type'] == 'paciente') {
$token = $_GET['data']['email'];
Editor::inst( $db, 'paciente', 'id' )
	->fields(
		Field::inst( 'paciente.id as id' ),
		Field::inst( 'paciente.email as email' ),
		Field::inst( 'paciente.nome as nome' ),
		Field::inst( 'paciente.telefone as telefone' ),
		Field::inst( 'paciente.nascimento as nascimento' ),
		Field::inst( 'paciente.cep as cep' ),
		Field::inst( 'paciente.cidade as cidade' ),
		Field::inst( 'paciente.estado as estado' ),
		Field::inst( 'paciente.endereco as endereco' ),
		Field::inst( 'paciente.token as token' )
	)

	->where( $key = "paciente.email", $value = $token, $op = '=' )
	->process( $_GET )
	->jsonp();
}

if ($_GET['type'] == 'list') {
$token = $_GET['token'];
Editor::inst( $db, 'medico_paciente', 'id' )
	->fields(
		Field::inst( 'paciente.id as id' ),
		Field::inst( 'paciente.email as email' ),
		Field::inst( 'paciente.nome as nome' ),
		Field::inst( 'paciente.telefone as telefone' ),
		Field::inst( 'paciente.nascimento as nascimento' ),
		Field::inst( 'paciente.cep as cep' ),
		Field::inst( 'paciente.cidade as cidade' ),
		Field::inst( 'paciente.estado as estado' ),
		Field::inst( 'paciente.endereco as endereco' ),
		Field::inst( 'paciente.token as token' )
	)

    ->leftJoin( 'paciente', 'paciente.id', '=', 'medico_paciente.paciente_id' )
    ->leftJoin( 'user', 'user.id', '=', 'medico_paciente.medico_id' )
	->where( $key = "user.token", $value = $token, $op = '=' )
	->process( $_GET )
	->jsonp();
}

if ($_GET['type'] == 'adicionar') {
Editor::inst( $db, 'medico_paciente', 'id' )
	->fields(
		Field::inst( 'medico_paciente.medico_id as medico_id' ),
		Field::inst( 'medico_paciente.paciente_id as paciente_id' )
	)
	->process( $_GET )
	->jsonp();
}