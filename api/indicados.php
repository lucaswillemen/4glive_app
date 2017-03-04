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

$id = $_GET['id'];


Editor::inst( $db, 'user', 'id' )
	->fields(
		Field::inst( 'user.id as id' ),
		Field::inst( 'user.email as email' ),
		Field::inst( 'user.nome as nome' ),
		Field::inst( 'user.email as text' ),
		Field::inst( 'user.telefone as telefone' ),
		Field::inst( 'user.dataregistro as dataregistro' ),
		Field::inst( 'user.vencimento as vencimento' )
	)

	->where( $key = "user.indicador_id", $value = $id, $op = '=' )
	->process( $_GET )
	->jsonp();