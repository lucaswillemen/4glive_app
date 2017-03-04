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



Editor::inst( $db, 'revendedores', 'id' )
	->fields(
		Field::inst( 'revendedores.id as id' ),
		Field::inst( 'revendedores.email as email' ),
		Field::inst( 'revendedores.nome as nome' ),
		Field::inst( 'revendedores.telefone as telefone' ),
		Field::inst( 'revendedores.nascimento as nascimento' ),
		Field::inst( 'revendedores.cep as cep' ),
		Field::inst( 'revendedores.cidade as cidade' ),
		Field::inst( 'revendedores.estado as estado' ),
		Field::inst( 'revendedores.endereco as endereco' ),
		Field::inst( 'revendedores.senha as senha' ),
		Field::inst( 'revendedores.token as token' )
	)

	->process( $_GET )
	->jsonp();
