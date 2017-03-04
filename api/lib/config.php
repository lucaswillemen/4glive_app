<?php if (!defined('DATATABLES')) exit(); // Ensure being used in DataTables env.
include "conexao.php";
date_default_timezone_set("America/Sao_Paulo");
// Enable error reporting for debugging (remove for production)
error_reporting(E_ALL);
ini_set('display_errors', '1');


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * Database user / pass
 */
$sql_details = array(
	"type" => "Mysql",  // Database type: "Mysql", "Postgres", "Sqlite" or "Sqlserver"
	"user" => $username,       // Database user name
	"pass" => $password,      // Database password
	"host" => $host,       // Database host
	"port" => "",       // Database connection port (can be left empty for default)
	"db"   => $db,       // Database name
	"dsn"  => "charset=utf8"        // PHP DSN extra information. Set as `charset=utf8` if you are using MySQL
	
);


