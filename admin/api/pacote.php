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
		Field::inst( 'pacotes.id as id' ),
		Field::inst( 'pacotes.preco as preco' ),
		Field::inst( 'pacotes.validade as validade' ),
		Field::inst( 'pacotes.nv1 as nv1' ),
		Field::inst( 'pacotes.nv2 as nv2' ),
		Field::inst( 'pacotes.nv3 as nv3' ),
		Field::inst( 'pacotes.nv4 as nv4' ),
		Field::inst( 'pacotes.nv5 as nv5' ),
		Field::inst( 'pacotes.nome as nome' )
	)

	->process( $_GET )
	->jsonp();
