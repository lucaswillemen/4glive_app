<?php
// DataTables PHP library and database connection
include( "lib/DataTables.php" );
$token = $_GET['token'];
// Alias Editor classes so they are easy to use
use
	DataTables\Editor,
	DataTables\Editor\Field,
	DataTables\Editor\Format,
	DataTables\Editor\Join,
	DataTables\Editor\Validate;



Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.senha_con as senha_con' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.facebook_id as facebook_id' ),
		Field::inst( 'user.saldo as saldo' ),
		Field::inst( 'user.ponto as ponto' ),
		Field::inst( 'user.vencimento as vencimento' ),
		Field::inst( 'user.facebook_picture as facebook_picture' )
	)

	->where( $key = "user.token", $value = $token, $op = '=' )
	->process( $_GET )
	->jsonp();

