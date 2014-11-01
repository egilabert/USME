<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

Route::get('/', function()
{
	return View::make('hello');
});


Route::get('inicio', function()
{
	return 'Welcome to my new app';
});

//Ruta con parámetros....
Route::get('inicio/{dato}', function($dato)
{
	return 'Welcome to my new app with the number: '.$dato;
});

//enviar variables en un array y con el make ya lo hace solo que en la vista tengas un variable con el nombe del indice del array (en este caso $dato)
Route::get('vista/{dato}', function($dato)
{
	$data['dato'] = $dato;
	return View::make('vista1',$data);
});

Route::get('admin', function()
{
	return View::make('admin/vistaadmin');
});

//Controlador normal
Route::get('home', 'InicioController@VerInicio');

//Controlador Rest Full
Route::controller('rest', 'RestFullController');

Route::get('prueba/{dato}', function($dato)
{
	$data['dato'] = $dato;
	return View::make('plantillas/vista1',$data);
});