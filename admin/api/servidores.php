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



Editor::inst( $db, 'servidores', 'id' )
	->fields(
		Field::inst( 'servidores.id as id' ),
		Field::inst( 'servidores.host as host' ),
		Field::inst( 'servidores.nome as nome' ),
		Field::inst( 'servidores.user as user' ),
		Field::inst( 'servidores.senha as senha' ),
		Field::inst( 'servidores.link as link' ),
		Field::inst( 'servidores.imagem as imagem' )
	)

	->process( $_GET )
	->jsonp();
