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



Editor::inst( $db, 'caixa', 'id' )
	->fields(
		Field::inst( 'caixa.id as id' ),
		Field::inst( 'caixa.valor as valor' ),
		Field::inst( 'caixa.dataregistro as dataregistro' ),
		Field::inst( 'caixa.descricao as descricao' )
	)

	->process( $_GET )
	->jsonp();
