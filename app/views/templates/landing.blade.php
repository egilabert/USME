<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name="description" content="">
	<meta name="Enric Gilabert" content="">

	<title>
		@yield('titulo') 
	</title>

    @section('head')
	
	    <link rel="shortcut icon" href="{{ URL::asset('favicon.ico') }}">
	    <!-- Bootstrap core CSS -->
	    <link rel="stylesheet" href="{{ URL::asset('asset/css/style.css') }}">
	    <script src="{{ URL::asset('asset/js/vendor/modernizr-2.6.2.min.js') }}"></script>
	    <script src="{{ URL::asset('asset/js/bootstrap.min.js') }}"></script>
	    <script src="{{ URL::asset('asset/js/vendor/jquery-1.10.2.min.js') }}"></script>
	    <!-- Custom styles for this template -->
	    <!-- <link href="css/jumbotron.css" rel="stylesheet"> -->

	    <!-- Just for debugging purposes. Don't actually copy this line! -->
	    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

	    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
	    <!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
	      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
	    <![endif]-->
	@show

  </head>

  <body>
    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->
    <section class="landing">
      <div id="alerts"></div>
      <div class="container">
      		<div class="row text-center">
      			@section('brand')
      			@show
      		</div>
      		<div class="row welcome_sentence text-center">
      			@section('welcome_sentence')
      			@show
      		</div>
          	<div class="row text-center" id="wrapfromulario">
            	@section('landing_form')
      			@show
          	</div>
      </div>
    </section>
    
    <div class="text1landing">
        <div class="">
            <h2 class=""> @yield('subtitle1') </h2>
            <p> @yield('subtext1') </p>
        </div>
    </div>

    <div class="text2landing">
        <div class="">
            <h2 class=""> @yield('subtitle2') </h2>
            <p> @yield('subtext2') </p>
        </div>
    </div>

    <footer class="padding">
      <div class="container text-center">
        <div class="row">
          <div class="col-md-2">About ME.US</div>
          <div class="col-md-1">Help</div>
          <div class="col-md-2">Terms & conditions</div>
          <div class="col-md-1">Privacity</div>
          <div class="col-md-1">Blog</div>
          <div class="col-md-1">Legal</div>
          <div class="col-md-1">iOS</div>
          <div class="col-md-1">Android</div>
          <div class="col-md-1">Press</div>
          <div class="col-md-1">Cookies</div>
        </div>
        <div class="row padding_footer">
          <p>&copy; USME 2014</p>
        </div>
      </div>
    </footer>

  </body>
</html>