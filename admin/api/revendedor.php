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



Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.telefone as telefone' ),
		Field::inst( 'user.ponto as ponto' ),
		Field::inst( 'user.vencimento as vencimento' ),
		Field::inst( 'user.saldo as saldo' )
	)

	->where( $key = "user.saldo", $value = 0, $op = '>' )
	->process( $_GET )
	->jsonp();
