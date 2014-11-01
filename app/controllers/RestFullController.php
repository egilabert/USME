<?php

class RestFullController extends BaseController {
	
	public function getIndex()
	{
		return View::make('restfull/inicio');
	}

	public function getSaludo()
	{
		return View::make('restfull/saludo');
	}

	public function getSaludoCompuesto()
	{
		return View::make('restfull/saludoCompuesto');
	}
}
?>