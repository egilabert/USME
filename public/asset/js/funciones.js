var filter = "all";

function valida_correo(correo) {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(correo)){
		return (true);
	} else {
		return (false);
	}
}

function login(){
	var e = _("inputEmail").value;
	var p = _("inputPassword1").value;
	var loading_icon = '<img src="img/ajax-loader.gif">'; 

	if(e == "" || p == ""){
		$('#alerts').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Fill out the form data! please, try again.</div>');
	} else {
		_("status").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "index.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	_("status").innerHTML = "";
	            if($.trim(ajax.responseText) == "login_failed"){
					$('#alerts').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Login unsuccessful, email adress or password are not correct, please try again.</div>');
					_("loginbtn").style.display = "block";
				}
				else if ($.trim(ajax.responseText) == "login_failed empty fields") {
					$('#alerts').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Fill out the form data! please, try again.</div>');
				} else {
					window.location = "home.php?u="+ajax.responseText;
				}
	        }
        }
        ajax.send("loge="+e+"&logp="+p);
	}
}

function joinGroup(){
	var loading_icon = '<img src="img/ajax-loader.gif">';
	_("ajaxjoin").innerHTML = loading_icon;
	_("joinBtn").style.display = "none";
	var ajax = ajaxObj("POST", "php_parsers/group_parser.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			var datArray = $.trim(ajax.responseText);
			if(datArray == "pending_approval"){
				//_("joinBtn").style.display = "block";
				_("ajaxjoin").innerHTML = '<button id="mmmm" class="btn btn-primary center-block disabled">Waiting joining request...</button>';
			} else if(datArray == "refresh_now"){
				_("ajaxjoin").innerHTML = "Your are now a member, refresh your browser to join in";
			} else {
				_("ajaxjoin").innerHTML = ajax.responseText;
			}
		}
	}
	ajax.send("action=join_group");
}
function approveMember(u){
	var loading_icon = '<img src="img/ajax-loader.gif">';
	_("approveDiv").innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/group_parser.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			var datArray = $.trim(ajax.responseText);
			if(datArray == "member_approved"){
				_("approveDiv").innerHTML = "Member has been approved";
			}
		}
	}
	ajax.send("action=approve_member&u="+u);
}

function declineMember(u){
	var loading_icon = '<img src="img/ajax-loader.gif">';
	_("approveDiv").innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/group_parser.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			var datArray = $.trim(ajax.responseText);
			if(datArray == "member_declined"){
				_("approveDiv").innerHTML = "Member has been declined";
			}
		}
	}
	ajax.send("action=decline_member&u="+u);
}


function quitGroup(){
	var loading_icon = '<img src="img/ajax-loader.gif">';
	var conf = confirm("Press OK to confirm that you want to quit group");
	if(conf != true){
		return false;
	}
	_("ajaxquit").innerHTML = loading_icon;
	_("quitBtn").style.display = "none";
	var ajax = ajaxObj("POST", "php_parsers/group_parser.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "was_removed"){
				alert("you have been removed");
				_("ajaxquit").innerHTML = "You have been succesfully removed from this project";
			}
		}
	}
	ajax.send("action=quit_group");
}
function addAdmin(){
	var n = _("new_admin").value;
	var ajax = ajaxObj("POST", "php_parsers/group_parser.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			var datArray = $.trim(ajax.responseText);
			if(datArray == "admin_added"){				
				alert ("Admin Created");
			}
		}
	}
	ajax.send("action=add_admin&n="+n);
}

function checkusername(){
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	var u = _("InputUname").value;
	if(u != ""){
		_("unamestatus").innerHTML = u+" - "+loading_icon;
		//return false;
		var ajax = ajaxObj("POST", "index.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("unamestatus").innerHTML = ajax.responseText;
	        }
        }
        ajax.send("usernamecheck="+u);
	} else {
		_("unamestatus").innerHTML = "Please introduce a username with 3-16 characters and with letters and numbers";
	}
}

function EditProfile(){
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	var editname = _("editname").value;
	var editdate = _("editdate").value;
	var editgender = _("editgender").value;
	var geocomplete = _("geocomplete").value;
	var editsector = getMultiValue('editsector');
	var editlanguages = getMultiValue('editlanguages');	


//Edit the name of the user ------------------------------------------------
	if (editname != "") {
		_("username_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("username_box").innerHTML = ' <div id="username_box" class="edit_form"><h3>'+ajax.responseText+'</h3><a href="#" onclick="return false;" onmousedown="toggleElement(\'name_form\')">Edit Name</a> <div id="name_form" class="form-group edi_form"><label for="editname" class="control-label">Name</label><input type="text" class="form-control" id="editname" name="editname" placeholder="Edit your profile name"><p><button id="EditnameBtn" class="btn btn-default center-block small-margin" onclick="EditProfile()">Edit</button></p></div>  </div>';
	        }
        }
        ajax.send("editname="+editname);
	}
//Edit the date of birth of the user ------------------------------------------------
	if (editdate != "") {
		_("date_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("date_box").innerHTML = '<div id="gender_box" class="edit_form">Date of birth: '+ajax.responseText+' <a href="#" onclick="return false;" onmousedown="toggleElement(\'date_form\')">Edit Date</a><div id="date_form" class="form-group edi_form"><label for="editdate" class="control-label">Date of birth</label><input type="date" class="form-control" id="editdate" name="editdate" placeholder="Edit your date of birth"><p><button id="EditdateBtn" class="btn btn-default center-block small-margin" onclick="EditProfile()">Edit</button></p></div> </div>';
	        }
        }
        ajax.send("editdate="+editdate);
	}
//Edit the location of the user ------------------------------------------------
	if 	((geocomplete != "")) {
		var ln = _("name").value;
		var lat = _("lat").value;
		var lng = _("lng").value;
		var loc = _("location").value;
		var loct = _("location_type").value;
		var fa = _("formatted_address").value;
		var ic = _("icon").value;
		var v = _("viewport").value;
		var st = _("street_number").value;
		var pc = _("postal_code").value;
		var lcl = _("locality").value;
		var co = _("country").value;
		var cs = _("country_short").value;
		var admin = _("administrative_area_level_1").value;
		var idloc = _("id").value;
		var ref = _("reference").value;
		_("location_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("location_box").innerHTML = '<div id="location_box" class="edit_form">Location: '+ajax.responseText+' <a href="#" onclick="return false;" onmousedown="toggleElement(\'location_form\')">Edit Location</a><div id="location_form" class="form-group edi_form"><label for="location_pers" class="control-label">Location</label><div><input id="geocomplete" type="text" class="form-control" name="location_pers" placeholder="Type in an address"><input id="name" name="name" type="hidden" value=""><input id="lat" name="lat" type="hidden" value=""><input id="lng" name="lng" type="hidden" value=""><input id="location" name="location" type="hidden" value=""><input id="location_type" name="location_type" type="hidden" value=""><input id="formatted_address" name="formatted_address" type="hidden" value=""><input id="icon" name="icon" type="hidden" value=""><input id="viewport" name="viewport" type="hidden" value=""><input id="street_number" name="street_number" type="hidden" value=""><input id="postal_code" name="postal_code" type="hidden" value=""><input id="locality" name="locality" type="hidden" value=""><input id="country" name="country" type="hidden" value=""><input id="country_short" name="country_short" type="hidden" value=""><input id="administrative_area_level_1" name="administrative_area_level_1" type="hidden" value=""><input id="id" name="id" type="hidden" value=""><input id="reference" name="reference" type="hidden" value=""><p><button id="EditLocationBtn" class="btn btn-default center-block small-margin" onclick="EditProfile()">Edit location</button></p></div></div> </div>';
	        }
        }
        ajax.send("ln="+ln+"&lat="+lat+"&lng="+lng+"&loc="+loc+"&loct="+loct+"&fa="+fa+"&v="+v+"&st="+st+"&pc="+pc+"&lcl="+lcl+"&co="+co+"&cs="+cs+"&admin="+admin+"&idloc="+idloc+"&ref="+ref);//+"&ic="+ic
	}
//Edit the gender of the user ------------------------------------------------
	if (editgender != "") {
		_("gender_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("gender_box").innerHTML = '<div id="gender_box" class="edit_form">Gender: '+ajax.responseText+' <a href="#" onclick="return false;" onmousedown="toggleElement(\'gender_form\')">Edit Gender</a><div id="gender_form" class="form-group edi_form"><label for="editgender" class="control-label">Gender</label><select id="editgender" name="editgender" data-placeholder="Choose your gender..." class="chosen-select form-control" tabindex="1"><option value=""></option><option value="m">Male</option><option value="f">Female</option></select><p><button id="editgender" class="btn btn-default center-block small-margin" onclick="EditProfile()">Edit</button></p></div> </div>';
	        }
        }
        ajax.send("editgender="+editgender);
	}
//Edit the sector of the user ------------------------------------------------
	if (editsector != "") {
		_("sector_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	var datArray = ajax.responseText.split("|");
	        	_("sector_box").innerHTML = 'Sector: ';
	        	for(var i = 0; i < datArray.length; ++i)
				{
					_("sector_box").innerHTML += '<span class="label label-primary">'+datArray[i]+'</span> &nbsp;'
				}
	        }
        }
        ajax.send("editsector="+editsector);
	}

//Edit the sector of the user ------------------------------------------------
	if (editlanguages != "") {
		_("languages_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_profile.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	var datArray = ajax.responseText.split("|");
	        	_("languages_box").innerHTML = 'Languages: ';
	        	for(var i = 0; i < datArray.length; ++i)
				{
					_("languages_box").innerHTML += '<span class="label label-primary">'+datArray[i]+'</span> &nbsp;'
				}
	        }
        }
        ajax.send("editlanguages="+editlanguages);
	}
}


function EditIdea(id){
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	var editbrandname = _("editbrandname").value;
	var editthesis = _("editthesis").value;
	var editdescription = _("editdescription").value;
	var geocomplete = _("geocomplete").value;
	var editsector = getMultiValue('editsector');
	var editlanguages = getMultiValue('editlanguages');
	var edithn = getMultiValue('edithn');	

//Edit the name of the user ------------------------------------------------
	if (editbrandname != "") {
		_("brandname_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("brandname_box").innerHTML = ' <div id="brandname_box" class="edit_form"><h1>'+ajax.responseText+'</h1><a href="#" onclick="return false;" onmousedown="toggleElement(\'brandname_form\')">Edit project name</a><div id="brandname_form" class="form-group edi_form"><label for="editbrandname" class="control-label">Project name</label><input type="text" class="form-control" id="editbrandname" name="editbrandname" placeholder="Edit your profile name"><p><button id="EditbrandnameBtn" class="btn btn-default center-block small-margin" onclick="EditIdea(\''+id+'\')">Edit</button></p></div></div>';
	        }
        }
        ajax.send("editbrandname="+editbrandname+"&id="+id);
	}
//Edit the thesis of the user ------------------------------------------------
	if (editthesis != "") {
		_("thesis_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("thesis_box").innerHTML = ' <div id="thesis_box" class="edit_form"><h4>'+ajax.responseText+'</h4><a href="#" onclick="return false;" onmousedown="toggleElement(\'thesis_form\')">Edit thesis</a><div id="thesis_form" class="form-group edi_form"><label for="editthesis" class="control-label">Thesis</label><input type="text" class="form-control" id="editthesis" name="editthesis" placeholder="Edit the thesis of your project"><p><button id="EditthesisBtn" class="btn btn-default center-block small-margin" onclick="EditIdea(\''+id+'\')">Edit</button></p></div></div>';
	        }
        }
        ajax.send("editthesis="+editthesis+"&id="+id);
	}
//Edit the thesis of the user ------------------------------------------------
	if (editdescription != "") {
		_("description_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("description_box").innerHTML = ' <div id="description_box" class="edit_form">'+ajax.responseText+'<a href="#" onclick="return false;" onmousedown="toggleElement(\'description_form\')">Edit description</a><div id="description_form" class="form-group edi_form"><label for="editdescription" class="control-label">Description</label><textarea class="form-control" rows="10" id="editdescription" name="editdescription" placeholder="Edit the full description of your idea..."></textarea><p><button id="EditdescriptionBtn" class="btn btn-default center-block small-margin" onclick="EditIdea(\''+id+'\')">Edit</button></p></div></div>';
	        }
        }
        ajax.send("editdescription="+editdescription+"&id="+id);
	}
//Edit the location of the user ------------------------------------------------
	if 	((geocomplete != "")) {
		var ln = _("name").value;
		var lat = _("lat").value;
		var lng = _("lng").value;
		var loc = _("location").value;
		var loct = _("location_type").value;
		var fa = _("formatted_address").value;
		var ic = _("icon").value;
		var v = _("viewport").value;
		var st = _("street_number").value;
		var pc = _("postal_code").value;
		var lcl = _("locality").value;
		var co = _("country").value;
		var cs = _("country_short").value;
		var admin = _("administrative_area_level_1").value;
		var idloc = _("id").value;
		var ref = _("reference").value;
		_("location_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("location_box").innerHTML = '<div id="location_box" class="edit_form">'+ajax.responseText+' <a href="#" onclick="return false;" onmousedown="toggleElement(\'location_form\')">Edit Location</a><div id="location_form" class="form-group edi_form"><label for="location_pers" class="control-label">Location</label><div><input id="geocomplete" type="text" class="form-control" name="location_pers" placeholder="Type in an address"><input id="name" name="name" type="hidden" value=""><input id="lat" name="lat" type="hidden" value=""><input id="lng" name="lng" type="hidden" value=""><input id="location" name="location" type="hidden" value=""><input id="location_type" name="location_type" type="hidden" value=""><input id="formatted_address" name="formatted_address" type="hidden" value=""><input id="icon" name="icon" type="hidden" value=""><input id="viewport" name="viewport" type="hidden" value=""><input id="street_number" name="street_number" type="hidden" value=""><input id="postal_code" name="postal_code" type="hidden" value=""><input id="locality" name="locality" type="hidden" value=""><input id="country" name="country" type="hidden" value=""><input id="country_short" name="country_short" type="hidden" value=""><input id="administrative_area_level_1" name="administrative_area_level_1" type="hidden" value=""><input id="id" name="id" type="hidden" value=""><input id="reference" name="reference" type="hidden" value=""><p><button id="EditLocationBtn" class="btn btn-default center-block small-margin" onclick="EditIdea(\''+id+'\')">Edit location</button></p></div></div> </div>';
	        }
        }
        ajax.send("ln="+ln+"&lat="+lat+"&lng="+lng+"&loc="+loc+"&loct="+loct+"&fa="+fa+"&v="+v+"&st="+st+"&pc="+pc+"&lcl="+lcl+"&co="+co+"&cs="+cs+"&admin="+admin+"&idloc="+idloc+"&ref="+ref+"&id="+id);//+"&ic="+ic
	}
//Edit the sector of the user ------------------------------------------------
	if (editsector != "") {
		_("sector_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	_("sector_box").innerHTML = "";
	        	var datArray = ajax.responseText.split("|");
	        	for(var i = 0; i < datArray.length; ++i)
				{
					_("sector_box").innerHTML += '<span class="label label-primary">'+datArray[i]+'</span><br>';
				}
	        }
        }
        ajax.send("editsector="+editsector+"&id="+id);
	}

//Edit the sector of the user ------------------------------------------------
	if (editlanguages != "") {
		_("languages_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	_("languages_box").innerHTML = "";
	        	var datArray = ajax.responseText.split("|");
	        	for(var i = 0; i < datArray.length; ++i)
				{
					_("languages_box").innerHTML += '<span class="label label-primary">'+datArray[i]+'</span><br>';
				}
	        }
        }
        ajax.send("editlanguages="+editlanguages+"&id="+id);
	}
//Edit the sector of the user ------------------------------------------------
	if (edithn != "") {
		_("hn_box").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "php_parsers/edit_idea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	        	var datArray = ajax.responseText.split("|");
	        	_("hn_box").innerHTML = "";
	        	for(var i = 0; i < datArray.length; ++i)
				{
					_("hn_box").innerHTML += '<span class="label label-primary">'+datArray[i]+'</span><br>';
				}
	        }
        }
        ajax.send("edithn="+edithn+"&id="+id);
	}
}



function signup(){
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	//var u = _("InputUname").value;
	//u.replace(/<br>/g,"\n");
	var n = _("InputName").value;
	var e = _("inputEmail").value;
	var p1 = _("inputPassword1").value;
	//var p2 = _("inputPassword2").value;
	var c = _("geocomplete").value;
	//var d = _("inputDOB").value;
	//var g = _("Gender").value;
	var ln = _("name").value;
	var lat = _("lat").value;
	var lng = _("lng").value;
	var loc = _("location").value;
	var loct = _("location_type").value;
	var fa = _("formatted_address").value;
	//var ic = _("icon").value;
	var v = _("viewport").value;
	var st = _("street_number").value;
	var pc = _("postal_code").value;
	var lcl = _("locality").value;
	var co = _("country").value;
	var cs = _("country_short").value;
	var admin = _("administrative_area_level_1").value;
	var idloc = _("id").value;
	var ref = _("reference").value;
	//var ps = getMultiValue('sector_pers');
	//var lang = getMultiValue('languages');
	var status = _("status2");
	//var sig = "signup";
	
	if(n == "" || e == "" || p1 == ""){
			$('#alerts').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Fill out the form data! please, try again.</div>');
		} else if(ln == "") {
			$('#alerts').html('<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Please use Google autocomplete adress.</div>');
		} else if( _("terms").style.display == "none"){
			$('#alerts').html('<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert">&times;</a><strong></strong> Please view the TERMS OF USE</div>');
		} else {
			_("registerbtn").style.display = "none"; //hide singup button
			var request = $.ajax({
			  url: "php_parsers/register.php",
			  type: "POST",
			  data: { n: n, e: e, p1: p1, ln: ln, lat: lat, lng: lng, loc: loc, loct: loct, fa: fa, v: v, st: st, pc: pc, lcl: lcl, co: co, cs: cs, admin: admin, idloc: idloc, ref: ref },
			  dataType: "html"
			});
			 
			request.done(function( msg ) {
		        if($.trim(msg) != "signup_success"){ //the message has to be send by php server side
					status.innerHTML = msg;
					_("registerbtn").style.display = "block";
				} else {
					status.innerHTML = "";
					$('#alerts').html('<div class="alert alert-success"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>OK</strong> '+n+', check your email inbox and junk mail box at <u>'+e+'</u> in a moment to complete the sign up process by activating your account. You will not be able to do anything on the site until you successfully activate your account.</div>');
					$("#form2").hide();
					$("#form10").hide();
					$("#views_tou").hide();
					$("#fade_legal").css("display", "none");
			        $("#legal_overlay").fadeOut( "1000" );
			        $('#terms').fadeOut( "1000" );
					$("#fade_small").css("display", "none");
                	$("#register_overlay").hide();
                	$('#form3').val("");
                	$('#form4').val("");
                	$('#form3').fadeIn( "500" );
                	$('#form4').fadeIn( "500" );
				}
			});
			 
			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
        }
}

function uploadFile(){
	var file = _("file1").files[0];
	//alert(file.name+" | "+file.size+" | "+file.type);
	var formdata = new FormData();
	formdata.append("file1", file);
	var ajax = new XMLHttpRequest();
	ajax.upload.addEventListener("progress", progressHandler, false);
	ajax.addEventListener("load", completeHandler, false);
	ajax.addEventListener("error", errorHandler, false);
	ajax.addEventListener("abort", abortHandler, false);
	ajax.open("POST", "php_parsers/photo_system.php");
	ajax.send(formdata);
}
function progressHandler(event){
	//_("loaded_n_total").innerHTML = "Uploaded "+event.loaded+" bytes of "+event.total;
	var percent = (event.loaded / event.total) * 100;
	_("progressBar").value = Math.round(percent);
	_("status_loading").innerHTML = Math.round(percent)+"% uploaded... please wait";
}
function completeHandler(event){
	var datArray = event.target.responseText.split("|");
	var res = datArray[0].substring(0,5);
	if($.trim(res) == "ERROR") {
		_("status_loading").innerHTML = event.target.responseText;
		_("progressBar").value = 0;
	} else {
		_("progressBar").value = 0;
		_("profile_pic_box").innerHTML = '<a id="imageBtn" href="#" onclick="return false;" onmousedown="toggleElement(\'avatar_form\')">Edit profile image</a><form id="avatar_form" enctype="multipart/form-data" method="post"><h4>Change your avatar</h4><input type="file" name="file1" id="file1" data-filename-placement="inside"><p><input type="button" class="btn btn-default" value="Upload" onclick="uploadFile()"></p><progress id="progressBar" value="0" max="100"></progress><p id="status_loading"></p><p id="loaded_n_total"></p></form><img src="user/'+datArray[0]+'/'+datArray[1]+'" alt="'+datArray[0]+'">';
	}	
}
function errorHandler(event){
	_("status_loading").innerHTML = "Upload Failed";
}
function abortHandler(event){
	_("status_loading").innerHTML = "Upload Aborted";
}

function imgError(image) {
          image.onerror = "";
          image.src = "img/profile2.png";
          return true;
}


function openTerms(){
	$('#terms').delay(500).fadeIn( "1000" );
	emptyElement("status2");
}

function toggleElement(x){
	var x = _(x);
	if(x.style.display == 'block'){
		x.style.display = 'none';
	}else{
		x.style.display = 'block';
	}
}

$(document).ready(function(){

  $("div.navbar-fixed-top").autoHidingNavbar();

  $('.ratings_stars').hover(
            // Handles the mouseover
            function() {
                $(this).prevAll().andSelf().addClass('ratings_over');
            },
            // Handles the mouseout
            function() {
                $(this).prevAll().andSelf().removeClass('ratings_over');
            }
        );
//send ajax request to rate.php
    $('.ratings_stars').bind('click', function() {
			
		var id=$(this).parent().attr("id");
		var num=$(this).attr("class");
		var poststr="id="+id+"&stars="+num;
		$.ajax({url:"php_parsers/rate.php",cache:false,data: {id_sent: id, stars: num},success:function(result){
		var r=poststr+" <br><br> "+result;
        document.getElementById(id).innerHTML=result;
        }
        });	
	});

    $('#mySearch').on('submit', function(event) {

    	event.preventDefault();
    	$('#myModalSearch').modal('show'); //

    	var value = $('#searchquery').val();
		var request = $.ajax({
		  url: "php_parsers/search_handling.php",
		  type: "POST",
		  data: { searchquery: value, filter: filter },
		  dataType: "html"
		});
		 
		request.done(function( msg ) {
		  $( '#mySearch-body' ).html( msg );
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});

    });

    $('#messag').on('click', function(event) {

    	event.preventDefault();
    	$('#newmessage').show();
		$('#sendnewmessage').hide();
    	
    	$('#myModalMail').modal('show'); //

		var request = $.ajax({
		  url: "php_parsers/messaging.php",
		  type: "POST",
		  dataType: "html"
		});
		 
		request.done(function( msg ) {
		  $( '#myMess-body' ).html( msg );
		  //$('#update-user-info select').chosen();  // <--- HERE
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    });

     $('#newmessage').on('click', function(event) {
    	var loading_icon = '<img src="img/ajax-loader.gif">';
    	$('#newmessage').fadeOut( "500" );
		$('#sendnewmessage').delay(500).fadeIn( "1000" );
		$( '#myMess-body' ).html( loading_icon );
		
		var request = $.ajax({
		  url: "php_parsers/messaging.php",
		  type: "POST",
		  data: { newmess: "newmessage" },
		  dataType: "html"
		});
		 
		request.done(function( msg ) {
		  $( '#myMess-body' ).html( msg );
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
		/*var pmtemp = '<input id="pmsubject" class="form-control" onkeyup="statusMax(this,30)" placeholder="Subject..."><br />'+'<textarea id="pmtext" rows="4" class="form-control" onkeyup="statusMax(this,250)" placeholder="Send a new private message"></textarea>'; 
		$( '#myMess-body' ).html( pmtemp );*/
    });

    $('#Language').on('click', function(event) {
    	event.preventDefault();
    	$('#myModalSettings').modal('show');
    });

    $('#Security').on('click', function(event) {
    	event.preventDefault();
    	$('#myModalSecurity').modal('show');
    });

    $('#Helpdesk').on('click', function(event) {
    	event.preventDefault();
    	$('#myModalSettings').modal('show');
    });

    $('#Account').on('click', function(event) {
    	event.preventDefault();
    	$('#myModalSettings').modal('show');
    });

    $('#forgot_pass_button').on('click', function(event) {
        $("#fade").css("display", "block");
        $("#forgot_pass_overlay").show();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $(".alert").alert();

      $('#views_tou').on('click', function(event) {
        $("#fade_legal").css("display", "block");
        _("status2").innerHTML = "";
        $("#legal_overlay").show();
        $('#terms').delay(500).fadeIn( "1000" );
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $('#forgot_pass_close').on('click', function(event) {
        $("#fade").css("display", "none");
        $("#forgot_pass_overlay").hide();
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });

      $('#signupbtn').on('click', function(event) {
        var e = _("inputEmail").value;
        var p1 = _("inputPassword1").value;
        var loading_icon = '<img src="img/ajax-loader.gif">';
        var status = _("status");
        if(e == "" || p1 == ""){
          var message = '<div class="alert alert-danger"><a href="#" class="close" data-dismiss="alert">&times;</a><strong>Error!</strong> Fill out the form data! please, try again.</div>';
          $('#alerts').html(message);
          } else {
            status.innerHTML = loading_icon;
            var request = $.ajax({
              url: "php_parsers/checkemail.php",
              type: "POST",
              data: { email: e },
              dataType: "html"
            });
            request.done(function( msg ) {
              status.innerHTML = "";
              $('#alerts').html( msg );
              if (msg == 'OK') {
                $('#form3').fadeOut( "500" );
                $('#form4').fadeOut( "500" );
                $('#forgot_pass_button').fadeOut( "500" );
                $('#form2').delay(499).fadeIn( "1000" );
                $('#form10').delay(499).fadeIn( "1000" );
                $("#fade_small").css("display", "block");
                $("#register_overlay").show();
              }
            });
             
            request.fail(function( jqXHR, textStatus ) {
              alert( "Request failed: " + textStatus );
            });
        }
      });

      $('#register_close').on('click', function(event) {
        $('#form2').fadeOut( "500" );
        $('#form10').fadeOut( "500" );
        $("#fade_small").css("display", "none");
        $("#register_overlay").hide();
        $('#form3').fadeIn( "1000" );
        $('#form4').fadeIn( "1000" );
        $('#forgot_pass_button').fadeIn( "1000" );
        //onclick="document.getElementsByClassName('overlay').style.display='block';document.getElementsByClassName('fade').style.display='block'"
      });



    $('.notifications_list_element').on('click', function(e){
    	event.preventDefault(e); 
    	var link = $(this).find('.notifications_link').attr('href');
    	var foo = $(this).find('.notifications_link').attr('id');
    	/*console.log(foo);
    	console.log(link);
    	return false;*/

        $('#' + foo).css('display','none');
        var request = $.ajax({
		  url: "php_parsers/notifications_check.php",
		  type: "POST",
		  data: { noteid: foo },
		  dataType: "html"
		});
		 
		request.done(function( msg ) {
		  window.location.href = link;
		  console.log(msg);
		});
		 
		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});

    });

    //$("#pers_mens").chosen();

    $('#updatepass').on('click', function(event) {
    	var loading_icon = '<img src="img/ajax-loader.gif">';
    	var pass1 = $('#actualpass').val();
    	var pass2 = $('#newpass').val();
    	var pass3 = $('#newpass2').val();
    	_('mesModalPass').innerHTML = pass1+"-"+pass2+"-"+pass3;
    	if (pass2 != pass3) {
    		$('#mesModalPass').html("Password do not match");
    	} else {
    		$('#mesModalPass').html(loading_icon);

	    	var request = $.ajax({
			  url: "php_parsers/updatepass.php",
			  type: "POST",
			  data: { pass1: pass1, pass2: pass2, pass3: pass3 },
			  dataType: "html"
			});

			request.done(function( msg ) {
				if ($.trim(msg)=="update_successfull") {
					$( '#mesModalPass' ).html( "Password updated correctly" );
					$('#actualpass').val("");
			    	$('#newpass').val("");
			    	$('#newpass2').val("");
				} else {
					$( '#mesModalPass' ).html(msg);
				}
			});

			request.fail(function( jqXHR, textStatus ) {
			  alert( "Request failed: " + textStatus );
			});
		}
    });

    $('#IdeasSearch').on('click', function(event) {
    	$('#searchquery').val("");
		$('#searchquery').attr("placeholder", "Search ideas");
		filter = "IdeasSearch";
    });

    $('#PeopleSearch').on('click', function(event) {
    	$('#searchquery').val("");
		$('#searchquery').attr("placeholder", "Search people");
		filter = "PeopleSearch";
    });

    $('#InboxSearch').on('click', function(event) {
    	$('#searchquery').val("");
		$('#searchquery').attr("placeholder", "Search in inbox");
		filter = "InboxSearch";
    });

    $('#all').on('click', function(event) {
    	$('#searchquery').val("");
		$('#searchquery').attr("placeholder", "Search on the whole website");
		filter = "all";
    });

///Noooooooooooooootessssssssssssssssss///////////////////////////
    var note = $('#note');

    var saveTimer,
        lineHeight = parseInt(note.css('line-height')),
        minHeight = parseInt(note.css('min-height')),
        lastHeight = minHeight,
        newHeight = 0,
        newLines = 0;

    var countLinesRegex = new RegExp('\n','g');
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    note.on('input',function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSaveNote, 2000);

        // Count the number of new lines
        newLines = note.val().match(countLinesRegex);

        if(!newLines){
            newLines = [];
        }

        // Increase the height of the note (if needed)
        newHeight = Math.max((newLines.length + 1)*lineHeight, minHeight);

        // This will increase/decrease the height only once per change
        if(newHeight != lastHeight){
            note.height(newHeight);
            lastHeight = newHeight;
        }
    }).trigger('input');	// This line will resize the note on page load

    function ajaxSaveNote(){

        // Trigger an AJAX POST request to save the note
        var request = $.ajax({url:"php_parsers/notes.php",data: {note: note.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "Request failed: " + msg );
		  //$( '#note' ).html( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

///SKECTHHHHHHHHHHHHH///////////////////////////

    var sketch = $('#sketch');

    var sketch_saveTimer,
        sketch_lineHeight = parseInt(sketch.css('line-height')),
        sketch_minHeight = parseInt(sketch.css('min-height')),
        sketch_lastHeight = sketch_minHeight,
        sketch_newHeight = 0,
        sketch_newLines = 0;

    var sketch_countLinesRegex = new RegExp('\n','g');
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    sketch.on('input',function(e){

    	var sketch_split = location.search.replace('?', '').split('=');
    	ididea = sketch_split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(sketch_saveTimer);
        sketch_saveTimer = setTimeout(ajaxSavesketch, 2000);

        // Count the number of new lines
        sketch_newLines = sketch.val().match(sketch_countLinesRegex);

        if(!sketch_newLines){
            sketch_newLines = [];
        }

        // Increase the height of the sketch (if needed)
        sketch_newHeight = Math.max((sketch_newLines.length + 1)*sketch_lineHeight, sketch_minHeight);

        // This will increase/decrease the height only once per change
        if(sketch_newHeight != sketch_lastHeight){
            sketch.height(sketch_newHeight);
            sketch_lastHeight = sketch_newHeight;
        }
    }).trigger('input');	// This line will resize the sketch on page load

    function ajaxSavesketch(){
        // Trigger an AJAX POST request to save the sketch
        var request = $.ajax({url:"php_parsers/sketch.php",data: {sketch: sketch.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //$( '#sketch' ).html( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }


});

///BMC///////////////////////////
    var bmc_1 = $('#bmc_1');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_1.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_1, 2000);
    }).trigger('input');	// This line will resize the bmc_1 on page load

    function ajaxSavebmc_1(){

        // Trigger an AJAX POST request to save the bmc_1
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_1: bmc_1.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_1' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_2 = $('#bmc_2');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_2.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_2, 2000);
    }).trigger('input');	// This line will resize the bmc_2 on page load

    function ajaxSavebmc_2(){

        // Trigger an AJAX POST request to save the bmc_2
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_2: bmc_2.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_2' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_3 = $('#bmc_3');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_3.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_3, 2000);
    }).trigger('input');	// This line will resize the bmc_3 on page load

    function ajaxSavebmc_3(){

        // Trigger an AJAX POST request to save the bmc_3
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_3: bmc_3.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_3' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_4 = $('#bmc_4');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_4.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_4, 2000);
    }).trigger('input');	// This line will resize the bmc_4 on page load

    function ajaxSavebmc_4(){

        // Trigger an AJAX POST request to save the bmc_4
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_4: bmc_4.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_4' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_5 = $('#bmc_5');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_5.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_5, 2000);
    }).trigger('input');	// This line will resize the bmc_5 on page load

    function ajaxSavebmc_5(){

        // Trigger an AJAX POST request to save the bmc_5
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_5: bmc_5.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_5' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_6 = $('#bmc_6');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_6.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_6, 2000);
    }).trigger('input');	// This line will resize the bmc_6 on page load

    function ajaxSavebmc_6(){

        // Trigger an AJAX POST request to save the bmc_6
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_6: bmc_6.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_6' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_7 = $('#bmc_7');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_7.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_7, 2000);
    }).trigger('input');	// This line will resize the bmc_7 on page load

    function ajaxSavebmc_7(){

        // Trigger an AJAX POST request to save the bmc_7
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_7: bmc_7.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_7' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_8 = $('#bmc_8');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_8.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_8, 2000);
    }).trigger('input');	// This line will resize the bmc_8 on page load

    function ajaxSavebmc_8(){

        // Trigger an AJAX POST request to save the bmc_8
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_8: bmc_8.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_8' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

    ///BMC///////////////////////////
    var bmc_9 = $('#bmc_9');

    var saveTimer;
    var ididea = "";
    // The input event is triggered on key press-es,
    // cut/paste and even on undo/redo.

    bmc_9.focusout(function(e){

    	var split = location.search.replace('?', '').split('=');
    	ididea = split[1];

        // Clearing the timeout prevents
        // saving on every key press
        clearTimeout(saveTimer);
        saveTimer = setTimeout(ajaxSavebmc_9, 2000);
    }).trigger('input');	// This line will resize the bmc_9 on page load

    function ajaxSavebmc_9(){

        // Trigger an AJAX POST request to save the bmc_9
        var request = $.ajax({url:"php_parsers/bmcs.php",data: {bmc_9: bmc_9.val(), id: ididea},type: "POST"});

        request.done(function( msg ) {
		  //alert( "message saved: " + msg );
		  //$( '#bmc_9' ).val( msg );
		});

		request.fail(function( jqXHR, textStatus ) {
		  alert( "Request failed: " + textStatus );
		});
    }

function list_group_Click(id,messbox,activebox){
	var loading_icon = '<img src="img/ajax-loader.gif">';
	var elems = document.getElementsByClassName("list-group-item");
	for(var timeIndex = 0; timeIndex < elems.length; ++timeIndex)
	{
		if (elems[timeIndex].className.match(/(?:^|\s)active(?!\S)/) ) {
			name = "active";
			var str = elems[timeIndex].className;
  			var res = str.replace("active", "");
  			elems[timeIndex].className = res;
		}
	}

	if (_(messbox).className.match(/(?:^|\s)active(?!\S)/) ) {} else {
		_(messbox).className += "active";
	}

	_("listadomensajes").innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/messaging.php");
	ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
				var response = $.trim(ajax.responseText);
				if(response != ""){
					_("listadomensajes").innerHTML = response;
				}
	        }
        }
    ajax.send("activewrap="+messbox+"&desactivatedbox="+activebox+"&idbox="+id);
}


function forgotpass(){
	var e = _("email_forgot_pass").value;
	var loading_icon = '<img src="img/ajax-loader.gif">';
	if(e == ""){
		_("mensaje").innerHTML = "Type in your email address";
	} else {
		_("forgotpassbtn").style.display = "none";
		_("mensaje").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "index.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
				var response = $.trim(ajax.responseText);
				if(response == "success"){
					_("forgotpassform").innerHTML = '<legend>New password generated correctly!</legend><h3>Step 2. Check your email inbox in a few minutes</h3><p>You can close this window or tab if you like.</p>';
				} else if (response == "no_exist"){
					_("mensaje").innerHTML = "Sorry that email address is not in our system";
					_("forgotpassbtn").style.display = "block";
				} else if(response == "email_send_failed"){
					_("mensaje").innerHTML = "Mail function failed to execute";
					_("forgotpassbtn").style.display = "block";
				} else {
					_("mensaje").innerHTML = response+"An unknown error occurred";
					_("forgotpassbtn").style.display = "block";
				}
	        }
        }
        ajax.send("e="+e);
	}
}

function friendToggle(type,user,elem){
	var conf = confirm("Press OK to confirm the '"+type+"' action for user");
	var loading_icon = '<img src="img/ajax-loader.gif">';
	if(conf != true){
		return false;
	}
	_(elem).innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/friend_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "friend_request_sent"){
				_(elem).innerHTML = '<button class="btn btn-success disabled btn-xs center-block" role="button" onclick="friendToggle(\'friend\',\'<?php echo $u; ?>\',\'friendBtn\')">Friend Request Sent...</button>';
			} else if($.trim(ajax.responseText) == "unfriend_ok"){
				_(elem).innerHTML = '<button class="btn btn-success btn-xs center-block" role="button" onclick="friendToggle(\'friend\',\'<?php echo $u; ?>\',\'friendBtn\')">Add Friend</button>';
			} else {
				alert(ajax.responseText);
				_(elem).innerHTML = 'Try again later';
			}
		}
	}
	ajax.send("type="+type+"&user="+user);
}

function blockToggle(type,blockee,elem){
	var conf = confirm("Press OK to confirm the '"+type+"' action on user");
	var loading_icon = '<img src="img/ajax-loader.gif">';
	if(conf != true){
		return false;
	}
	var elem = document.getElementById(elem);
	elem.innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/block_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "blocked_ok"){
				elem.innerHTML = '<button class="btn btn-default btn-xs center-block" role="button" onclick="blockToggle(\'unblock\',\'<?php echo $u; ?>\',\'blockBtn\')">Unblock User</button>';
			} else if($.trim(ajax.responseText) == "unblocked_ok"){
				elem.innerHTML = '<button class="btn btn-danger btn-xs center-block" role="button" onclick="blockToggle(\'block\',\'<?php echo $u; ?>\',\'blockBtn\')">Block User</button>';
			} else {
				alert(ajax.responseText);
				elem.innerHTML = 'Try again later';
			}
		}
	}
	ajax.send("type="+type+"&blockee="+blockee);
}


function friendReqHandler(action,reqid,user1,elem){
	//var conf = confirm("Press OK to '"+action+"' this friend request.");
	var loading_icon = '<img src="img/ajax-loader.gif"> <hr/>';
	/*if(conf != true){
		return false;
	}*/
	_(elem).innerHTML = loading_icon;
	var ajax = ajaxObj("POST", "php_parsers/friend_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "accept_ok"){
				_(elem).innerHTML = "<b>Request Accepted!</b><br />Your are now friends <hr/> ";
				
			} else if($.trim(ajax.responseText) == "reject_ok"){
				_(elem).innerHTML = "<b>Request Rejected</b><br />You chose to reject friendship with this user <hr/>";
			} else {
				_(elem).innerHTML = ajax.responseText;
			}
		}
	}
	ajax.send("action="+action+"&reqid="+reqid+"&user1="+user1);
}

function AddingIdeas(){
	window.onbeforeunload = null;
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	var bn = _("brandName").value;
	var th = _("thesis").value;
	var d = $('#editor').html(); //_("description").value;
	var fn = _("financialNeeds").value;
	var ds = _("dateOfStart").value;
	var c = _("geocomplete").value;
	var inv = _("invrule").value;
	var i = ""; //_("image").value;
	var grabar = _("grabar4").value;

	var ln = _("name").value;
	var lat = _("lat").value;
	var lng = _("lng").value;
	var loc = _("location").value;
	var loct = _("location_type").value;
	var fa = _("formatted_address").value;
	var ic = _("icon").value;
	var v = _("viewport").value;
	var st = _("street_number").value;
	var pc = _("postal_code").value;
	var lcl = _("locality").value;
	var co = _("country").value;
	var cs = _("country_short").value;
	var admin = _("administrative_area_level_1").value;
	var idloc = _("id").value;
	var ref = _("reference").value;

	//_("registrationform").innerHTML = lat+"-"+lng+"-"+loc+"-"+loct+"-"+fa+"-"+ic+"-"+v+"-"+st+"-"+pc+"-"+lcl+"-"+co+"-"+cs+"-"+admin+"-"+idloc+"-"+ref;

	var hn = getMultiValue('humanNeeds');
	var sec = getMultiValue('sector');
	var lang = getMultiValue('languages');

	

	var status = _("status");
	/*status.innerHTML = d;
	return false;*/
	if(bn == "" || th == "" || d == "" || fn == "" || ds == "" || c == "" || hn == "" || sec == "" || lang == "" || inv==""){
		status.innerHTML = "Fill out all of the form data";
	} else if (ln == "") {
		status.innerHTML = "Please use Google's autocomplete location";
	} else {
		_("subbtn").style.display = "none"; //hide singup button
		status.innerHTML = loading_icon; //please wait or gif
		var ajax = ajaxObj("POST", "addidea.php"); //set up ajax objects
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) { //response text is back
	       	var datArray = ajax.responseText.split("|");
			if($.trim(datArray[0]) != "addidea_success"){ //the message has to be send by php server side
					status.innerHTML = ajax.responseText;
					_("subbtn").style.display = "block";
				} else {
					var rid = datArray[1];
					var r = confirm("Your idea has been uploaded succesfully! Do you want to view it or edit it?");
					if (r == true) {
						var route = "ideasdetail.php?id="+rid;
					    window.location.href = route;
					} else {
					    window.location.href = "home.php";
					}
				}
	        }
        }
        ajax.send("bn="+bn+"&inv="+inv+"&th="+th+"&d="+d+"&fn="+fn+"&ds="+ds+"&c="+c+"&i="+i+"&hn="+hn+"&sec="+sec+"&l="+lang+"&ln="+ln+"&lat="+lat+"&lng="+lng+"&loc="+loc+"&loct="+loct+"&fa="+fa+"&v="+v+"&st="+st+"&pc="+pc+"&lcl="+lcl+"&co="+co+"&cs="+cs+"&admin="+admin+"&idloc="+idloc+"&ref="+ref);//+"&ic="+ic
	}
}

function blue()
{
	//alert("Hola!!!!");
	var form=document.addidea;
	form.submit();
}

function getMultiValue(selectId)
{
    var list     = document.getElementById(selectId),
        selected = [],
        i;
    for (i = 0; i < list.options.length; i++) {
        if (list.options[i].selected) {
            selected.push(list.options[i].value);
        }
    }
    return selected;
}

function postPmGen(tuser,fuser,subject,ta){
	var receiver = _(tuser).value;
	var data = _(ta).value;
	var data2 = _(subject).value;
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	if(data == "" || data2 == "" || receiver=="0"){
		alert("Fill all fields");
		return false;
	}
	var ajax = ajaxObj("POST", "php_parsers/pm_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "pm_sent"){
				alert("Message has been sent");
				_(ta).value = "";
				_(subject).value = "";
				var request = $.ajax({
				  url: "php_parsers/messaging.php",
				  type: "POST",
				  dataType: "html"
				});
				 
				request.done(function( msg ) {
				  $( '#myMess-body' ).html( msg );
				  //$('#update-user-info select').chosen();  // <--- HERE
				});
				 
				request.fail(function( jqXHR, textStatus ) {
				  alert( "Request failed: " + textStatus );
				});
			} else {
				alert(ajax.responseText);
			}
		}
	}
	ajax.send("action=new_pm&fuser="+fuser+"&tuser="+receiver+"&data="+data+"&data2="+data2);
}

function ideaPm(tusers,fuser,subject,ta){
	var data = $("#ta").val();
	var data2 = $("#subject").val();
	if(data == "" || data2 == ""){
		alert("Fill all fields");
		return false;
	}
	_("ideapmBtn").disabled = true;

	var request = $.ajax({
		url: "php_parsers/group_pmsystem.php",
		type: "POST",
		data: { action: "newideaspm", fuser: fuser, tusers: tusers, text: data, subject: data2 },
		dataType: "html"
	});
			 
	request.done(function( msg ) {
	    if($.trim(ajax.responseText) == "pm_sent"){
				alert("Message has been sent.");
				_("ideapmBtn").disabled = false;
				$("#ta").val("");
				$("#subject").val("");
			} else {
				alert(ajax.responseText);
			}
	});
			 
	request.fail(function( jqXHR, textStatus ) {
		alert( "Request failed: " + textStatus );
	});
}


function postPm(tuser,fuser,subject,ta){
	var data = _(ta).value;
	var data2 = _(subject).value;
	if(data == "" || data2 == ""){
		alert("Fill all fields");
		return false;
	}
	_("pmBtn").disabled = true;
	var ajax = ajaxObj("POST", "php_parsers/pm_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "pm_sent"){
				alert("Message has been sent.");
				_("pmBtn").disabled = false;
				_(ta).value = "";
				_(subject).value = "";
			} else {
				alert(ajax.responseText);
			}
		}
	}
	ajax.send("action=new_pm&fuser="+fuser+"&tuser="+tuser+"&data="+data+"&data2="+data2);
}

function statusMax(field, maxlimit) {
	if (field.value.length > maxlimit){
		alert(maxlimit+" maximum character limit reached");
		field.value = field.value.substring(0, maxlimit);
	}
}

function replyToPm(pmid,user,ta,btn,osender){	
	var data = _(ta).value;
	if(data == ""){
		alert("Type something first weenis");
		return false;
	}
	_(btn).disabled = true;
	var ajax = ajaxObj("POST", "php_parsers/pm_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			var datArray = ajax.responseText.split("|");
			if($.trim(datArray[0]) == "reply_ok"){
				var rid = datArray[1];
				data = data.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\n/g,"<br />").replace(/\r/g,"<br />");
				_("listadomensajes").innerHTML += '<p><b><div class ="status_boxes2"><div>Reply by you just now:</b><br />'+data+'</div></div></p>';
				//expand("pm_"+pmid);
				_(btn).disabled = false;
				_(ta).value = "";
			} else {
				alert(ajax.responseText);
			}
		}
	}
	ajax.send("action=pm_reply&pmid="+pmid+"&user="+user+"&data="+data+"&osender="+osender);
}
function deletePm(pmid,wrapperid,originator){
	var conf = confirm(originator+"Press OK to confirm deletion of this message and its replies");
	if(conf != true){
		return false;
	}
	var ajax = ajaxObj("POST", "php_parsers/pm_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "delete_ok"){
				_(wrapperid).style.display = 'none';
			} else {
				alert(ajax.responseText);
			}
		}
	}
	ajax.send("action=delete_pm&pmid="+pmid+"&originator="+originator);
}
function markRead(pmid,originator){
	var ajax = ajaxObj("POST", "php_parsers/pm_system.php");
	ajax.onreadystatechange = function() {
		if(ajaxReturn(ajax) == true) {
			if($.trim(ajax.responseText) == "read_ok"){
				alert("Message has been marked as read");
			} else {
				alert(ajax.responseText);
			}
		}
	}
	ajax.send("action=mark_as_read&pmid="+pmid+"&originator="+originator);
}

function edit()
{
	//alert("Hola!!!!");
	var form=document.editform;
	
	if (form.inputName.value==0)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>El Nombre está vacío</font><hr>";
		form.inputName.value="";
		form.inputName.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}
	
	if (form.inputEmail.value==0)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>El E-Mail está vacío</font><hr>";
		form.inputEmail.value="";
		form.inputEmail.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}
	if (valida_correo(form.inputEmail.value)==false)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>El E-Mail ingresado no es válido</font><hr>";
		form.inputEmail.value="";
		form.inputEmail.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}

	if (form.inputDOB.value==0)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>La fecha de nacimiento está vacía</font><hr>";
		form.inputDOB.value="";
		form.inputDOB.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}

	if (form.inputPassword.value==0)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>El Password está vacío</font><hr>";
		form.inputPassword.value="";
		form.inputPassword.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}
	
	if (form.inputPassword.value != form.inputPassword2.value)
	{
		//alert("Ingrese su Login");
		document.getElementById("error3").innerHTML="<font color='red'>Los Password ingresados no coinciden</font><hr>";
		form.inputPassword.value="";
		form.inputPassword2.value="";
		form.inputPassword.focus();
		return false;
	}else
	{
		document.getElementById("error3").innerHTML="";
	}
	
	form.inputPassword.value=calcMD5(form.inputPassword.value);
	form.inputPassword2.value=calcMD5(form.inputPassword2.value);
	form.submit();
	
}

//---------------------------------------------------------------------------------------------------
//Funciones importadas con el segundo método --------------------------------------------------------
//---------------------------------------------------------------------------------------------------

// Make this function external like I did in the video

function _(x){
	return document.getElementById(x);
}

function restrict(elem){
	var tf = _(elem);
	var rx = new RegExp;
	if(elem == "inputEmail"){
		rx = /[' "]/gi;
	} else if(elem == "InputUname"){
		rx = /[^a-z0-9]/gi;
	}
	tf.value = tf.value.replace(rx, "");
}

function emptyElement(x){
	_(x).innerHTML = "";
}


function checkGname(){
	var loading_icon = '<img src="img/ajax-loader.gif">'; 
	var u = _("brandName").value;
	if(u != ""){
		_("bnamecheck").innerHTML = loading_icon;
		var ajax = ajaxObj("POST", "addidea.php");
        ajax.onreadystatechange = function() {
	        if(ajaxReturn(ajax) == true) {
	            _("bnamecheck").innerHTML = ajax.responseText;
	        }
        }
        ajax.send("checkGname="+u);
	} 
}

/* function addEvents(){
	_("elemID").addEventListener("click", func, false);
}
window.onload = addEvents; */

