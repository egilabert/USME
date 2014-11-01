<?php
include_once("php_includes/check_login_status.php");
require_once("php_includes/cryptpass.php");
//require_once("php_includes/server_scripts.php");
// If user is logged in, header them away
if(isset($_SESSION["username"])) {
  header("location: messages.php?msg=NO to that weenis");
    exit();
}

//llamada desde AJAX porque las POST las crean las funciones de LOGIN con AJAX en funciones.js
if(isset($_POST["loge"])) {
      include_once("php_includes/server_scripts.php");
      //echo "I get inside here";
      $script=new script($db_conx);
      $script->login();
      exit;
}

//llamada desde AJAX porque las POST las crean las funciones de REGISTRO con AJAX en funciones.js
if ((isset($_POST["action"]))) {
      include_once("php_includes/server_scripts.php");
      echo "HOLAAAAA!!!!";
      exit();
      $script=new script($db_conx);
      $script->register();
      exit;
}

//llamada desde AJAX porque las POST las crean las funciones de AJAX en funciones.js
if(isset($_POST["usernamecheck"])){
      include_once("php_includes/server_scripts.php");
      $script=new script($db_conx);
      $script->usernamecheck();
      exit;
  }
// AJAX CALLS THIS CODE TO EXECUTE ----------------------------------------------------------------------
if(isset($_POST["e"])){
  $e = mysqli_real_escape_string($db_conx, $_POST['e']);
  $sql = "SELECT id, username FROM users WHERE email='$e' AND activated='1' LIMIT 1";
  $query = mysqli_query($db_conx, $sql);
  $numrows = mysqli_num_rows($query);
  if($numrows > 0){
    while($row = mysqli_fetch_array($query, MYSQLI_ASSOC)){
      $id = $row["id"];
      $u = $row["username"];
    }
    $emailcut = substr($e, 0, 4);//First 4 caracters of the email
    $randNum = rand(10000,99999);//random number of 5 digits
    $tempPass = "$emailcut$randNum";//create a new pass
    $hashTempPass = password_encrypt($tempPass);
    $hashTempPass2 = md5($tempPass);
    $sql = "UPDATE useroptions SET temp_pass='$hashTempPass' WHERE username='$u' LIMIT 1";
    $query = mysqli_query($db_conx, $sql);
    $to = "$e";
    $from = "no-reply@idpool.hol.es";
    $headers ="From: $from\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-type: text/html; charset=iso-8859-1 \n";
    $subject ="Yoursite Temporary Password";
    $msg = '<h2>Hello '.$u.'</h2><p>This is an automated message from yoursite. If you did not recently initiate the Forgot Password process, please disregard this email.</p><p>You indicated that you forgot your login password. We can generate a temporary password for you to log in with, then once logged in you can change your password to anything you like.</p><p>After you click the link below your password to login will be:<br /><b>'.$tempPass.'</b></p><p><a href="http://idpool.hol.es/forgot_passa.php?u='.$u.'&p='.$hashTempPass.'&p1='.$hashTempPass2.'">Click here now to apply the temporary password shown below to your account</a></p><p>If you do not click the link in this email, no changes will be made to your account. In order to set your login password to the temporary password you must click the link above.</p>';
    if(mail($to,$subject,$msg,$headers)) {
      echo "success";
      exit();
    } else {
      echo "email_send_failed";
      exit();
    }
    } else {
        echo "no_exist";
    }
    exit();
}?>
<?php
       $ip=get_client_ip();
       //print_r(geoCheckIP($ip));
       //exit();
       //Array ( [domain] => dslb-094-219-040-096.pools.arcor-ip.net [country] => DE - Germany [state] => Hessen [town] => Erzhausen )

       // Function to get the client ip address
        function get_client_ip() {
            $ipaddress = '';
            if ($_SERVER['HTTP_CLIENT_IP'])
                $ipaddress = $_SERVER['HTTP_CLIENT_IP'];
            else if($_SERVER['HTTP_X_FORWARDED_FOR'])
                $ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
            else if($_SERVER['HTTP_X_FORWARDED'])
                $ipaddress = $_SERVER['HTTP_X_FORWARDED'];
            else if($_SERVER['HTTP_FORWARDED_FOR'])
                $ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
            else if($_SERVER['HTTP_FORWARDED'])
                $ipaddress = $_SERVER['HTTP_FORWARDED'];
            else if($_SERVER['REMOTE_ADDR'])
                $ipaddress = $_SERVER['REMOTE_ADDR'];
            else
                $ipaddress = 'UNKNOWN';
         
            return $ipaddress;
        }

       //Get an array with geoip-infodata
       function geoCheckIP($ip)
       {
               //check, if the provided ip is valid
               if(!filter_var($ip, FILTER_VALIDATE_IP))
               {
                       throw new InvalidArgumentException("IP is not valid");
               }

               //contact ip-server
               $response=@file_get_contents('http://www.netip.de/search?query='.$ip);
               if (empty($response))
               {
                       throw new InvalidArgumentException("Error contacting Geo-IP-Server");
               }

               //Array containing all regex-patterns necessary to extract ip-geoinfo from page
               $patterns=array();
               $patterns["domain"] = '#Domain: (.*?)&nbsp;#i';
               $patterns["country"] = '#Country: (.*?)&nbsp;#i';
               $patterns["state"] = '#State/Region: (.*?)<br#i';
               $patterns["town"] = '#City: (.*?)<br#i';

               //Array where results will be stored
               $ipInfo=array();

               //check response from ipserver for above patterns
               foreach ($patterns as $key => $pattern)
               {
                       //store the result in array
                       $ipInfo[$key] = preg_match($pattern,$response,$value) && !empty($value[1]) ? $value[1] : 'not found';
               }

               return $ipInfo;
       }

?>

<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="">
    <link rel="shortcut icon" href="ico/favicon.ico">

    <title>Welcome to IdPool</title>

    <!-- Bootstrap core CSS -->
    <link href="css/style.css" rel="stylesheet">
    <link rel="stylesheet" href="font-awesome.0/css/font-awesome.min.css">
    <link href="//netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

    <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <!-- Custom styles for this template -->
    <!-- <link href="css/jumbotron.css" rel="stylesheet"> -->

    <!-- Just for debugging purposes. Don't actually copy this line! -->
    <!--[if lt IE 9]><script src="../../assets/js/ie8-responsive-file-warning.js"></script><![endif]-->

    <!-- HTML5 shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
    <?php include_once("analyticstracking.php") ?>
  </head>

  <body>

    <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
    <![endif]-->

    <!-- Main jumbotron for a primary marketing message or call to action -->
    <!-- <div class="jumbotron"> -->
    <section class="padding landing">
      <div class="">
        <div class="row">
          <div id="brand" class="center-block">MEUS</div>
        </div>
        <div class="row">
          <div id="welcome_sentence"><em>Ideas worth developping</em></div>
        </div>

          <div class="col-md-4"></div>
          <div class="row" id="wrapregistrationform">
          <div class="col-md-4">
          <form name="registrationform" id="registrationform" class="form-horizontal" role="form" method="POST" onsubmit="return false;" action="">
              <div class="row">
              <div class="form-group" id="form2" style="display:none;">
                <div class="col-sm-12">
                  <input id="InputName" type="text" class="form-control input-lg" onfocus="emptyElement('status')" name="inputName" placeholder="Insert your full-name">
                </div>
              </div>

              <div class="form-group" id="form3">
                <div class="col-sm-12">
                  <input id="inputEmail" type="email" onfocus="emptyElement('status')" onkreyup="restrict('inputEmail')" class="form-control input-lg" name="inputEmail" placeholder="Insert your email adress...">
                </div>
              </div>

              <div class="form-group" id="form4">
                <div class="col-sm-12">
                  <input id="inputPassword1" type="password" class="form-control input-lg" onfocus="emptyElement('status')" name="inputPassword1" placeholder="Insert your password...">
                </div>
              </div>

              <div class="form-group" id="form10" style="display:none;">
                <div class="col-sm-12">
                  <input id="geocomplete" type="text" onfocus="emptyElement('status')" class="form-control input-lg" name="location_pers" placeholder="Type in an address...">
                  <input id="name" name="name" type="hidden" value="">
                  <input id="lat" name="lat" type="hidden" value="">
                  <input id="lng" name="lng" type="hidden" value="">
                  <input id="location" name="location" type="hidden" value="">
                  <input id="location_type" name="location_type" type="hidden" value="">
                  <input id="formatted_address" name="formatted_address" type="hidden" value="">
                  <input id="icon" name="icon" type="hidden" value="">
                  <!--<input name="bounds" type="hidden" value="">-->
                  <input id="viewport" name="viewport" type="hidden" value="">
                  <!--<input name="route" type="hidden" value="">-->
                  <input id="street_number" name="street_number" type="hidden" value="">
                  <input id="postal_code" name="postal_code" type="hidden" value="">
                  <input id="locality" name="locality" type="hidden" value="">
                  <!--<input name="sublocality" type="hidden" value="">-->
                  <input id="country" name="country" type="hidden" value="">
                  <input id="country_short" name="country_short" type="hidden" value="">
                  <input id="administrative_area_level_1" name="administrative_area_level_1" type="hidden" value="">
                  <input id="id" name="id" type="hidden" value="">
                  <input id="reference" name="reference" type="hidden" value="">
                  <!--<input name="url" type="hidden" value="">-->
                  <!--<input name="website" type="hidden" value="">-->
                </div>
                
              </div>
              </div>

                <input type="hidden" id="grabar" name="grabar2" value="si">

                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group" id="form6">
                      <button id="loginbtn" name="loginbtn" type="button" class="btn btn-primary center-block" onClick="login();" title="Create Account">Log in</button> <!--onClick="signup();"-->
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="form-group" id="form30">
                      <button id="signupbtn" name="signupbtn" type="button" class="btn btn-primary center-block" onClick="follow();" title="Create Account">Register</button> <!--onClick="signup();"-->
                    </div>
                  </div>
                </div>

              <a href="javascript:void(0)" title="password" id="forgot_pass_button">Forgot your password?</a>
              <span id="statusform"></span>

              <div class="row center-block" id="status"></div>

                <div class="form-group" id="form12" style="display:none;">
                  <div class="col-sm-offset-2 col-sm-10">
                    <a href="#" onclick="return false" onmousedown="openTerms()">View Terms Of Use</a>
                  </div>
                </div>

                <div id="terms" class="well" style="display:none;">
                  <h3>IdPool Terms of use and Privacy settings</h3>
                  <p>1. Hablar con el abogado</p>
                  <p>2. Intentar que el abogado me proteja de todo</p>
                  <p>3. Intentar que el abogado me permita sacarle y utilizar toda la información possible al usuario</p>
                  <p>4. Hola usuario, tu confirma!</p>
                </div>

            </form>
            </div>
            <div class="col-md-4"></div>
        </div>
    
     <div class="row text1landing">
        <div class="container padding">
            <h2 class="center-block"> What we think</h2>
            <p>We live in a world full of amazig people and it's them and there variety of ideas and skills that made this little spot in the universe such an amazing place. 
            Have you ever had a dream? Have you ever wandered if you could do that, have you ever thought that this could be done better, have you ever seen a project somewhere and you would have loved to bring it to your community? Most of the time the problem is how do I do it and which are the steps a should follow... 
            Have you ever wandered that in this amazing world there are famers, engineers, doctors, artist, market analyzers, computers geeks and a variety of people who wants to do something else, something exciting but they have not had an idea yet...  </p>
        </div>
      </div>
      <div class="row text2landing">
        <div class="container padding">
            <h2 class="center-block"> What we do</h2>
            <p>
              We believe on us, we are better than I am.
              IdPool puts together people who wants to be part of a new project and ideas that need people to be developed!!
              Sign-in, look for ideas, post your ideas and look for people. We will help you getting in contact with the talents of this world, all of them, and we will help you to fulfill all the needs so that the dream comes true!
            </p>
        </div>
      </div>
    </div>
    </section>



    <div id="fade"></div>
    <div id="forgot_pass_overlay" class="overlay">
            <form name="forgotpassform" class="form-horizontal" role="form" method="POST" action="" id="forgotpassform" onsubmit="return false;">
              <a 
              id = "forgot_pass_close"
              href="javascript:void(0)" class="pull-right"><span class="glyphicon glyphicon-remove"></span>
              </a>
              <legend>Generate a temorary log in password</legend>
              
              <div class="form-group">
                <label for="email" class="col-sm-4 control-label">Enter Your Email Address</label>
                <div class="col-sm-8">
                  <input id="email_forgot_pass" type="email" class="form-control input-lg" name="subject" placeholder="Enter your email adress..." onfocus="_('mensaje').innerHTML='';" maxlength="88">
                </div>
              </div>

              <div class="form-group">
                <label for="mensaje" class="col-sm-4 control-label"></label>
                <div class="col-sm-8">
                  <div id="mensaje"></div>
                </div>
              </div>

              <div class="form-group">
                <div class="col-sm-offset-2 col-sm-10">
                  <button type="button" class="btn btn-primary pull-right" title="Edit" id="forgotpassbtn" onclick="forgotpass()">Generate Temporary Log In Password</button>
                </div>
              </div>
            </form>
    </div>

    <footer class="padding">
      <div class="container text-center">
        <p>&copy; Company 2014</p>
      </div>
    </footer>
    
    <!-- </div> --><!-- /container -->
    

    <!-- Bootstrap core JavaScript
    ================================================== -->
    <!-- Placed at the end of the document so the pages load faster -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.10.2.min.js"><\/script>')</script>
    <script src="js/bootstrap.min.js"></script>

    <!-- Script per a ocultar el navbar-->
    <script src="js/jquery.bootstrap-autohidingnavbar.js"></script>
    <script>
      $("div.navbar-fixed-top").autoHidingNavbar();
    </script>

    <!-- Script per activar el multiselector del formulari de registre-->
    <script src="js/chosen.jquery.js" type="text/javascript"></script>
    <script src="js/prism.js" type="text/javascript" charset="utf-8"></script>
    <script src="js/jquery.localScroll.min.js" type="text/javascript"></script> 
    <script type="text/javascript">
    $(document).ready(function(){
      var config = {
        '.chosen-select'           : {},
        '.chosen-select-deselect'  : {allow_single_deselect:true},
        '.chosen-select-no-single' : {disable_search_threshold:10},
        '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
        '.chosen-select-width'     : {width:"95%"}
      }
      for (var selector in config) {
        $(selector).chosen(config[selector]);
      }

      //$('.chzn-select').chosen();
      //$('#select-input').chosen();

      $("#geocomplete").geocomplete({
          details: "form",
          types: ["geocode", "establishment"],
         });

      $("#geocomplete").bind(function(){
          $("#geocomplete").trigger("geocode");
        });

      $("#trans").localScroll({
        target:'#linktoform'
        //duration:1000
      });


      $('#forgot_pass_button').on('click', function(event) {
        $("#fade").css("display", "block");
        $("#forgot_pass_overlay").show();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $('#forgot_pass_close').on('click', function(event) {
        $("#fade").css("display", "none");
        $("#forgot_pass_overlay").hide();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $('#register_open').on('click', function(event) {
        $("#fade").css("display", "block");
        $("#register_overlay").show();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $('#register_close').on('click', function(event) {
        $("#fade").css("display", "none");
        $("#register_overlay").hide();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

    });
    </script>
    
    <!--Script per al input de localització-->
    <script src="http://maps.googleapis.com/maps/api/js?sensor=false&amp;libraries=places"></script>
    <script src="js/jquery.geocomplete.js"></script>

    <!--Script de funcions-->
    <script src="js/plugins.js"></script>
    <script src="js/ajax.js"></script>
    <script src="js/fadeEffects.js"></script>
    <script src="js/main.js"></script>
    <script src="js/md5.js"></script>
    <script src="js/funciones.js"></script>
    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
        <script>
            (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
            function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
            e=o.createElement(i);r=o.getElementsByTagName(i)[0];
            e.src='//www.google-analytics.com/analytics.js';
            r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
            ga('create','UA-XXXXX-X');ga('send','pageview');
        </script>
  </body>
</html>

<!--

<div class="form-group" id="form1" style="display:none;">
                <div class="col-sm-12">
                  <input id="InputUname" type="text" class="form-control input-lg" onblur="checkusername()" onkreyup="restrict('InputUname')" maxlength="16" name="inputName" placeholder="Insert a username...">
                  <span id="unamestatus"></span>
                </div>
              </div>

<div class="form-group" id="form5" style="display:none;">
                <div class="col-sm-12">
                  <input id="inputPassword2" type="password" class="form-control input-lg" onfocus="emptyElement('status')" name="inputPassword2" placeholder="Retype your password...">
                </div>
              </div>

              <div class="form-group" id="form7" style="display:none;">
                <div class="col-sm-12">
                  <select id="Gender" name="Gender" data-placeholder="Choose your gender..." onfocus="emptyElement('status')" class="chosen-select form-control input-lg" tabindex="1">
                          <option value=""></option>
                          <option value="m">Male</option>
                          <option value="f">Female</option>
                  </select>
                </div>
              </div>

              <div class="form-group" id="form8" style="display:none;">
                <div class="col-sm-12">
                  <input id="inputDOB" type="date" class="form-control input-lg" name="inputDOB" onfocus="emptyElement('status')" placeholder="Insert your date of birth...">
                </div>
              </div>

              <div class="form-group" id="form9" style="display:none;">
                  <div class="col-sm-12">
                      <select id="sector_pers" name="sector_pers[]" data-placeholder="Choose the sectors that best matches your fields of expertise..." onfocus="emptyElement('status')" class="chosen-select form-control input-lg" multiple  tabindex="1">
                        <?php 
                          $getcarreer = mysqli_query($db_conx,"SELECT id, carreer_key, career_name FROM carreer");
                          while ($row = mysqli_fetch_array($getcarreer, MYSQLI_ASSOC)) {
                              $carreer_key = $row['carreer_key'];
                              $carrer_id = $row['id'];
                              $carreer_name = $row['career_name'];
                          ?>
                          <option value="<?php echo $carrer_id?>"><?php echo $carreer_name?></option>
                        <?php }?>
                      </select>
                  </div>
              </div>

 <div class="form-group" id="form11" style="display:none;">
                    <div class="col-sm-12">
                        <select id="languages" name="languages[]" onfocus="emptyElement('status')" data-placeholder="Choose the languages required..." class="chosen-select form-control input-lg chzn-select" multiple  tabindex="4">
                          <?php
                            $getlanguages = mysqli_query($db_conx,"SELECT id_languages, language FROM languages");
                            while ($row = mysqli_fetch_array($getlanguages, MYSQLI_ASSOC)) {
                                $id_languages = $row['id_languages'];
                                $language = $row['language'];
                            ?>
                            <option value="<?php echo $id_languages?>"><?php echo $language ?></option>
                          <?php }?>
                        </select>
                    </div>
                </div>


-->
