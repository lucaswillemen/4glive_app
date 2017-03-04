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



Editor::inst( $db, 'pacotes', 'id' )
	->fields(
		Field::inst( 'pacotes.nome as nome' ),
		Field::inst( 'pacotes.nome as text' ),
		Field::inst( 'pacotes.id as id' ),
		Field::inst( 'pacotes.validade as validade' ),
		Field::inst( 'pacotes.preco as preco' )
	)

	->process( $_GET )
	->jsonp();

