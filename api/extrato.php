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

$id = $_GET['uid'];

Editor::inst( $db, 'extrato', 'id' )
	->fields(
		Field::inst( 'extrato.valor as valor' ),
		Field::inst( 'extrato.ponto as ponto' ),
		Field::inst( 'extrato.des as des' ),
		Field::inst( 'extrato.ponto as ponto' ),
		Field::inst( 'extrato.dataregistro as dataregistro' )
	)

	->where( $key = "extrato.user_id", $value = $id, $op = '=' )
	->process( $_GET )
	->jsonp();

