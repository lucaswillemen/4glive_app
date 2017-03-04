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


if ($_GET['type'] == 'email') {
$email = $_GET['data']['email'];
$senha = $_GET['data']['senha'];
Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.facebook_id as facebook_id' ),
		Field::inst( 'user.facebook_picture as facebook_picture' ),
		Field::inst( 'user.token as token' )
	)

	->where( $key = "user.email", $value = $email, $op = '=' )
	->where( $key = "user.senha", $value = $senha, $op = '=' )
	->where( $key = "user.admin", $value = 1, $op = '=' )
	->process( $_GET )
	->jsonp();
}

if ($_GET['type'] == 'facebook') {
$facebook_id = $_GET['facebook_id'];
Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.facebook_id as facebook_id' ),
		Field::inst( 'user.facebook_picture as facebook_picture' ),
		Field::inst( 'user.token as token' )
	)

	->where( $key = "user.facebook_id", $value = $facebook_id, $op = '=' )
	->where( $key = "user.admin", $value = 1, $op = '=' )
	->process( $_GET )
	->jsonp();
}
