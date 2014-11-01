<!DOCTYPE html>
<html lang="en">
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

	@section('header')
		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		    <div class="container">
		        <div class="navbar-header">
		            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
		              <span class="sr-only">Toggle navigation</span>
		              <span class="icon-bar"></span>
		              <span class="icon-bar"></span>
		              <span class="icon-bar"></span>
		            </button>
		            <a class="navbar-brand" href="index.php">USME</a>
		        </div>

		        <div class="navbar-collapse collapse">
		            <ul class="nav navbar-nav">
		                  &nbsp;
		            </ul>
		    	</div><!--/.navbar-collapse -->
		    </div> <!--/.container -->
		 </div> <!-- End of the navbar -->
	@show

	<div class="container minim">
		<div class="row fixnavbar">
			@yield('body')
		</div>
	</div>

	@section('footer')

	<footer class="padding margin_footer">
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
		          <p>&copy; MEUS 2014</p>
		        </div>
	      </div>
    </footer>
	@show

</body>
</html>