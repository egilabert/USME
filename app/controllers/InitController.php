<?php

//Definición de un controlador básico que apunta a una vista
class InitController extends BaseController {

	public function getIndex()
	{
		return View::make('externals/index');
	}

}

?>
