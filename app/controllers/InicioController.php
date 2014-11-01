<?php

//Definición de un controlador básico que apunta a una vista
class InicioController extends BaseController {

	public function VerInicio() {

		return View::make('inicio/vista1');
		//return View::make('hello');
	}
}

?>
