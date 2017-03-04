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

	Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.telefone as telefone' ),
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.senha as senha' ),
		Field::inst( 'user.token as token' )
	)
	->process( $_GET )
	->jsonp();