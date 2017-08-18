//regex function for getting param from URL...

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}
	// var name =getParameterByName('name');
	 var user_id =getParameterByName('user_id');
	var email =getParameterByName('email');
	var fbpic = getParameterByName('fbpic');
	// var fname = getParameterByName('fname');
	// var pass = getParameterByName('password');
	// var img = getParameterByName('image');
	// var address = getParameterByName('address');
	// var city = getParameterByName('city');
	// var country = getParameterByName('country');
	// var contact = getParameterByName('contact');
	// var code = getParameterByName('code');
	
	
	//GET CURRENT DAY
	// var d = new Date();
// var weekday = new Array(7);
// weekday[0] =  "Sunday";
// weekday[1] = "Monday";
// weekday[2] = "Tuesday";
// weekday[3] = "Wednesday";
// weekday[4] = "Thursday";
// weekday[5] = "Friday";
// weekday[6] = "Saturday";

// var n = weekday[d.getDay()];
	//END
function getinfo()
{  var user_id =getParameterByName('user_id');
	var email =getParameterByName('email');
	var fbpic = getParameterByName('fbpic');  
	
	document.getElementById('emailid').innerHTML=email;
	document.getElementById("userPic").src =fbpic;
	}

	
	

//END REGEX HERE

//checking for existing email if not sending verification at current email


function signup(){
             var  fname = $("#fullname").val(); 
             var email = $("#sign_email").val();
             var pass = $("#sign_pass").val();
			 var confirm_password = $("#con_pass").val();
			 var city  = $("#city").val();
			 var country  = $("#country").val();
			  var contact = $("#contact").val();
			  
			
			 var dataString = "fname="+ fname + "&email=" + email + "&password=" + pass + "&contact=" + contact +"&country=" + country + "&city=" + city;
			//alert(dataString);
			  if ($.trim(fname).length > 0 && $.trim(email).length > 0 && $.trim(pass).length > 0 && $.trim(confirm_password).length > 0 && $.trim(contact).length > 0  && $.trim(city).length > 0 && $.trim(country).length > 0) {
				  if( pass == confirm_password){
               var options = { dimBackground: true };
			  SpinnerPlugin.activityStart("Checking Email availability...", options); 
                 $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/verifyemail.php",
                    type: "POST",
                    data: {email: email},
                    success: function(data){
					var str= data;	
			 
			  SpinnerPlugin.activityStop(); 	
				if(str.Status == "exist")
				{
					//alert("Email already exist, Try Again");
					navigator.notification.alert('Email already exist, Try Again', null, 'Email verification failed', 'Try Again');
			}	
				else{
			//   alert("Email has been sent to " + email );
			   
			   navigator.notification.alert('Email has been sent to '+email, null, 'Email verification', 'Ok');
			   
			    window.location.href = "verifyaccount.html?"+dataString+"&code="+str.Status+"";
			}
			
	   
                    }
				  });  }
					else {
						//alert("Confirm password donot match");
					navigator.notification.alert('Confirm password donot match', null, 'Password Confirmation', 'Try Again');
					}
         }
		 else { 
		// alert("Please Fill in all fields");
		 navigator.notification.alert('Please Fill in all fields', null, 'Registration failed', 'Try Again');
		 }		 
        };
		
		
//verifycode

	function verifycode(){
           
			  var fname = getParameterByName('fname');
				var pass = getParameterByName('password');
				// var image = getParameterByName('image');
				// var address = getParameterByName('address');
				var city = getParameterByName('city');
				var country = getParameterByName('country');
				var contact = getParameterByName('contact');
				var ucode = getParameterByName('code');
				var email =getParameterByName('email');
			 var code = $("#code").val();
			 var dataString = "fname="+ fname + "&email=" + email + "&password=" + pass + "&contact=" + contact +"&country=" + country + "&city=" + city;
			  if ($.trim(email).length > 0 && $.trim(code).length > 0) {
                   
					if( code == ucode){
					var options = { dimBackground: true };
					SpinnerPlugin.activityStart("Verifying Account...", options); 	
						
				  $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/register.php",
                    type: "POST",
                    data: dataString,
					// {fname: fname, email: email,password:password , image: image , address : address , city : city , country :country , contact : contact},
                    success: function(data){
					var str= data;	
					
					SpinnerPlugin.activityStop(); 
				
				if(str.Status == "success"){
			  // alert("You're now registered, " + fname );
			   window.location.href = "imageupload.html?email="+email+"";
			}
			if(str.Status == "exist")
			{
				navigator.notification.alert('Email already exist, Try Again', null, 'Email verification failed', 'Try Again');
			}
			
                        
                    }
                    });   
                } else {
					// alert("Invalid Code");
				navigator.notification.alert('Invalid Code', null, 'Code verification failed', 'Try Again');
				}
         }
		 else { 
		 // alert("Please Enter Code");
		 navigator.notification.alert('Please Enter Code', null, 'Code verification failed', 'Try Again');
		 }		 
        };		
		
//forget password verify email
function forgetpassword(){
           
			 var email = $("#email").val();
			 var dataString = "email="+ email ;
			 // alert(email);
			  if ($.trim(email).length > 0 ) {
				var options = { dimBackground: true };
				SpinnerPlugin.activityStart("Sending Verification Email...", options); 
					
				  $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/forgetpassword.php",
                    type: "POST",
                    data: dataString,
                    success: function(data){
					var str= data;	
					
				SpinnerPlugin.activityStop(); 
				if(str.Status == "success"){
					navigator.notification.alert('Verification Code has been at '+email, null, 'Email verification', 'ok');
					
					window.location = "verifycodeforgetpassword.html?email="+email+"";
				}
				else { navigator.notification.alert('You have entered an invalid Email', null, 'Invalid Email', 'Try Again');}
                    }
                    });  
         }
		 else { 

		 navigator.notification.alert('Please Enter Email', null, 'Email verification failed', 'Try Again');
		 }		 
        };				
//forgetpassword verify code
function forgetpasswordverifycode(){
           
			 // var ucode = getParameterByName('code');
			 var email =getParameterByName('email');
			 var code = $("#code").val();
			 
			 var dataString = "email=" + email + "&code=" + code ;
			  if ($.trim(email).length > 0 && $.trim(code).length > 0) {
                var options = { dimBackground: true };
				SpinnerPlugin.activityStart("Verifying Code...", options); 
				  $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/forgetpasswordverifycode.php",
                    type: "POST",
                    data: dataString,
                    success: function(data){
					var str= data;	
				
			SpinnerPlugin.activityStop(); 
			if(str.Status == "success"){
				
				navigator.notification.alert('Code is verified, now you can change your password', null, 'Code verification ', 'ok');
			    window.location.href = "resetpassword.html?email="+email+"";
			}
			if(str.Status == "failed")
			{
				navigator.notification.alert('Invalid Code', null, 'Code verification failed', 'Try Again');
			}
			     
                    }
                    });   
              
         }
		 else { 
		 // alert("Please Enter Code");
		 navigator.notification.alert('Please Enter Code', null, 'Code verification failed', 'Try Again');
		 }		 
        };

//reset password

function resetpassword(){
           
			
			 var email =getParameterByName('email');
			 var pass = $("#password").val();
			 var confirmpassword = $("#confirmpassword").val();
			 // alert(pass +" "+ confirmpassword);
			 var dataString = "email=" + email + "&password=" + pass ;
			  if ($.trim(email).length > 0 && $.trim(pass).length > 0 && $.trim(confirmpassword).length > 0) {
                if(pass == confirmpassword){
				
				var options = { dimBackground: true };
				SpinnerPlugin.activityStart("Reseting Password...", options); 
				
				$.ajax({
                    url: "http://kppreventsmarketing.com/webservices/resetpassword.php",
                    type: "POST",
                    data: dataString,
                    success: function(data){
					var str= data;	
					
				SpinnerPlugin.activityStop(); 
			if(str.Status == "success"){
				
				navigator.notification.alert('Your account Password has been Reset', null, 'Reset Password', 'ok');
			   window.location = "login.html";
			}
			// if(str.Status == "failed")
			// {
				// navigator.notification.alert('Invalid Code', null, 'Code verification failed', 'Try Again');
			// }
			     
                    }
                    });   
					
				} else { navigator.notification.alert('Password do not match', null, 'Reset Password Failed', 'Try Again');}
              
         }
		 
		 else { 
		 // alert("Please Enter Code");
		 navigator.notification.alert('Please fill in all fields', null, 'Reset Password Failed', 'Try Again');
		 }		 
        };				
				
		
//sign in
function signin(){
              
             var email = $("#email").val();
             var pass = $("#password").val();
			 
			
			 var dataString = "&email=" + email + "&pass=" + pass;
			  if ($.trim(email).length > 0 && $.trim(pass).length > 0) {
			  // loadshow();
			   var options = { dimBackground: true };
			   SpinnerPlugin.activityStart("Signing in...", options); 
                    $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/login.php",
                    type: "POST",
                    data: {email: email,pass:pass},
                    success: function(data){
					// loadhide();
					var str= data;	
					
			 var options = { dimBackground: true };
			 SpinnerPlugin.activityStop();
			  
			if(data.Status == "success"){
			// alert("Welcome, "+ str.username);
			   navigator.notification.alert('Welcome '+str.username, null, 'Login successfully', 'ok');
			   window.location.href = "categories.html?user_id="+str.id+"&email="+email+"&fbpic="+str.image+"";
			}
			else{
				//alert("Email or Password Incorrect : Please Retry");
				 navigator.notification.alert('Email or Password Incorrect', null, 'Login failed', 'Try Again');
				//window.location.href = "login.html";
			    }
                        
                    }
                    });   
                
         }
		 else {
			 //alert("Please Fill in all fields");
		navigator.notification.alert('Please Fill in all fields', null, 'Login failed', 'Try Again');			 
		 }		 
        };		
		
//uploading image 		
	
		function takephoto()
{
navigator.camera.getPicture(uploadPhoto, onFail, { 
quality: 40, 
correctOrientation : true,
saveToPhotoAlbum: true,
destinationType: Camera.DestinationType.FILE_URL
});
}
function uploadFromGallery() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto,
                                function(message) { alert('get picture failed'); },
                                { quality: 40, 
								correctOrientation : true,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                );

}
function onFail(message) {
// alert('Failed because: ' + message);
navigator.notification.alert('Failed', null, 'Image Uploading', 'Try Again');		

}

function uploadPhoto(imageURI) {
 
 var options = { dimBackground: true };
 SpinnerPlugin.activityStart("Image uploading...", options); 
   
   var options = new FileUploadOptions();
    options.fileKey="file";
    // options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	 mystring = imageURI.substr(imageURI.lastIndexOf('/')+1); 
var newchar = '1';
mystring = mystring.split('?').join(newchar);
	options.fileName=mystring;
    options.mimeType="image/jpeg";
    imagesrc = imageURI;
	document.getElementById("userimg").src = imagesrc;
	// alert("save "+imagesrc);
	 var email =getParameterByName('email');
	
    var params = new Object();
    options.params = params;
	 options.chunkedMode = false;
    var ft = new FileTransfer();
	// alert(imageURI);
    ft.upload(imageURI, encodeURI("http://kppreventsmarketing.com/webservices/ProfilePhotoUpload.php?email="+email+""), win, fail, options);
}

function win(r) {
	 // loadhide();
	// regshow();
	// alert("An upload: Code = " + r.response);
	// alert("Image uploaded");
	SpinnerPlugin.activityStop(); 
	navigator.notification.alert('Uploaded Successfully', null, 'Image Uploading', 'ok');
    // alert("Code = " + r.responseCode);
    // alert("Response = " + r.response);
    // alert("Sent = " + r.bytesSent);
}

function fail(error) {
	 // loadhide();
    // alert("Check Internet connection = " + error.code);
	SpinnerPlugin.activityStop(); 
	 // alert("Check Internet connection");
	 navigator.notification.alert('Check Internet connection', null, 'Error', 'Try Again');
    // alert("upload error source " + error.source);
    // alert("upload error target " + error.target);
}

function upload()
{ window.location = "login.html";
}

// end uploading
				
				
//Publish event 

		


	function postEvent(){
             var user_id = getParameterByName('user_id');
			 var category = getParameterByName('category');
			
			var event_name= $("#ename").val();
			var event_price= $("#eprice").val();
			var event_date= $("#edate").val();
			var event_time= $("#etime").val();
			var event_address = $("#eaddress").val();
			var event_city = $("#ecity").val();
			var event_country= $("#ecountry").val();
			var event_description= $("#description").val();
			 var dataString = "user_id="+ user_id +"&category=" + category + "&event_name=" + event_name + "&event_price=" + event_price + "&event_date=" + event_date +"&event_time=" + event_time + "&event_address=" + event_address + "&event_city=" + event_city + "&event_country=" + event_country + "&event_description=" + event_description;
			 
			 // alert(user_id);
			  if ($.trim(user_id).length > 0 && $.trim(event_name).length > 0 && $.trim(event_price).length > 0 && $.trim(event_date).length > 0   && $.trim(event_time).length > 0 && $.trim(event_address).length > 0 && $.trim(event_city).length > 0 && $.trim(event_country).length > 0 && $.trim(event_description).length > 0   ) {
                   var options = { dimBackground: true };
					SpinnerPlugin.activityStart("Event Posting...", options); 
					// if( code == ucode){
				  $.ajax({
                    url: "http://kppreventsmarketing.com/webservices/PostEvent.php",
                    type: "POST",
                    data: dataString,
					// {fname: fname, email: email,password:password , image: image , address : address , city : city , country :country , contact : contact},
                    success: function(data){
					var str = data;	
				
            SpinnerPlugin.activityStop(); 
			if(str.Status > 0){
			 
			  window.location.href = "formImageUpload.html?"+dataString+"&email="+email+"&event_id="+str.Status+"&fbpic="+fbpic+"";
			}
			
			if(str.Status == "exist")
			{
				//alert("Event already exist");
				navigator.notification.alert('Event already exist', null, 'Event Posting Failed', 'Try Again');		
		
			}
			
                        
                    }
                    });   
                // } else {alert("Invalid Code");}
         }
		 else { 
		 navigator.notification.alert('Please Fill in all fields', null, 'Event Posting Failed', 'Try Again');	
		 }		 
        };		

//upload banner 


function uploadBannerFromGallery() {

    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadBanner,
                                function(message) { alert('get picture failed'); },
                                { quality: 40, 
								correctOrientation : true,
                                destinationType: navigator.camera.DestinationType.FILE_URI,
                                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                );

}
function onFail(message) {
//alert('Failed because: ' + message);
		 
navigator.notification.alert(message, null, 'Banner upload failed', 'Try Again');	


}

function uploadBanner(imageURI) {
	
	var options = { dimBackground: true };
    SpinnerPlugin.activityStart("Banner uploading...", options); 
    var options = new FileUploadOptions();
    options.fileKey="file";
    // options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
	 mystring = imageURI.substr(imageURI.lastIndexOf('/')+1); 
var newchar = '1';
mystring = mystring.split('?').join(newchar);
	options.fileName=mystring;
    options.mimeType="image/jpeg";
    imagesrc = imageURI;
	document.getElementById("userimg").src = imagesrc;
	// alert("save "+imagesrc);
	 var event_id =getParameterByName('event_id');
	
	
    var params = new Object();
    options.params = params;
	 options.chunkedMode = false;
    var ft = new FileTransfer();
	// alert(imageURI);
    ft.upload(imageURI, encodeURI("http://kppreventsmarketing.com/webservices/UploadBanner.php?event_id="+event_id+""), win, fail, options);
}

// redirect to view user events


//display all events by userid

function displayevents() {
		
		var user_id = getParameterByName('user_id');
        
		getinfo();
		// var options = { dimBackground: true };
		// SpinnerPlugin.activityStart("Fetching...", options); 
            $.ajax({
                type: "POST",
                url: "http://kppreventsmarketing.com/webservices/ViewEventsByUserId.php",
                cache: false,
				data: {user_id: user_id},
                crossDomain: true,
                dataType: "json",
                success: function (response) {
                 
				// SpinnerPlugin.activityStop(); 
					var str = response;
					
					var tt;
					for (i in str)
                    {	  var d = new Date(str[i].event_date);
				var weekday = new Array(7);
				weekday[0] = "Sun";
				weekday[1] = "Mon";
				weekday[2] = "Tue";
				weekday[3] = "Wed";
				weekday[4] = "Thu";
				weekday[5] = "Fri";
				weekday[6] = "Sat";
				
				var monthname = new Array(11);
				monthname[0] = "Jan";
				monthname[1] = "Feb";
				monthname[2] = "Mar";
				monthname[3] = "Apr";
				monthname[4] = "May";
				monthname[5] = "Jun";
				monthname[6] = "Jul";
				monthname[7] = "Aug";
				monthname[8] = "Sep";
				monthname[9] = "Oct";
				monthname[10] = "Nov";
				monthname[11] = "Dec";

				var day = weekday[d.getDay()];
				var date = d.getDate();
				var month = monthname[d.getMonth()];
				var year = d.getFullYear();
					//	var n = d.getDay()
						// alert(str[i].event_id);
						
                        tt = "<a onclick='viewdetail("+str[i].event_id+")' style='text-decoration:none;'><img src='"+str[i].event_banner+"' style='width:100%;margin-top: 0px; height: 200px;'/><img src='img/"+str[i].category+".png' style=' margin-top: -25px;margin-left: 20px;'/><h4 style='margin-left: 100px;margin-top: -40px;'>"+str[i].event_name+"</h4><center><p style='margin-top: 20px;'><img src='img/user.png'/> "+str[i].event_users+"  <img src='img/calender.png'/>"+day+" "+month+" "+date+", "+year+"  <img src='img/time.png'/> "+str[i].event_time+" <img src='img/star.PNG'/>  "+str[i].event_rating+"/5</p></center><center><p style='margin-top: 20px;'><img src='img/location.png'/> "+str[i].event_address+", "+str[i].event_city+", "+str[i].event_country+"</p></center></a>";
                        $("#wrapper").append(tt);
					   
					   						 
					
                    }
                }
            });
        }
		
		
function viewdetail(id)
{  window.location="eventdetails.html?event_id="+id+"&user_id="+user_id+"&email="+email+"&fbpic="+fbpic+"";}		
//view event details by event id
function viewEventdetails(){
	
		 var event_id =getParameterByName('event_id');
		   getinfo();
		   var options = { dimBackground: true };
			SpinnerPlugin.activityStart("Fetching...", options); 
            $.ajax({
                type: "POST",
                url: "http://kppreventsmarketing.com/webservices/vieweventbyeventid.php",
                cache: false,
				data: {event_id: event_id},
                crossDomain: true,
                dataType: "json",
                success: function (response) {
                    var str = response;
					
				SpinnerPlugin.activityStop(); 
					var tt;
					for (i in str)
                    {	  var d = new Date(str[i].event_date);
				var weekday = new Array(7);
				weekday[0] = "Sun";
				weekday[1] = "Mon";
				weekday[2] = "Tue";
				weekday[3] = "Wed";
				weekday[4] = "Thu";
				weekday[5] = "Fri";
				weekday[6] = "Sat";
				
				var monthname = new Array(11);
				monthname[0] = "Jan";
				monthname[1] = "Feb";
				monthname[2] = "Mar";
				monthname[3] = "Apr";
				monthname[4] = "May";
				monthname[5] = "Jun";
				monthname[6] = "Jul";
				monthname[7] = "Aug";
				monthname[8] = "Sep";
				monthname[9] = "Oct";
				monthname[10] = "Nov";
				monthname[11] = "Dec";

				var day = weekday[d.getDay()];
				var date = d.getDate();
				var month = monthname[d.getMonth()];
				var year = d.getFullYear();
					//	var n = d.getDay()
						// alert(str[i].event_id);
						available= str[i].event_capacity - str[i].event_ticket_sold;
						
                        tt = "<img src='"+str[i].event_banner+"' style='width:100% ; height: 200px;'/><img src='img/"+str[i].category+".png' style='margin-left:20px;margin-top: -25px;'/><h4 style='margin-left:100px;margin-top: -35px;'>"+str[i].event_name+"</h4><center><p style='margin-top: 20px;'><img src='img/user.png'/> "+str[i].event_users+" <img src='img/calender.png'/> "+day+" "+month+" "+date+", "+year+" <img src='img/time.png'/> "+str[i].event_time+"</p></center><center><p style='font-size: 18px;font-weight: 500;'><img src='img/dollar.png'/> "+str[i].event_price+"</p></center><br><center><p style='margin-top: -10px;'><img src='img/star"+str[i].event_rating+".png'/><br> "+str[i].event_rating+" Reviews</p></center><center><p style='margin-top: 20px;'><img src='img/location.png'/> "+str[i].event_address+", "+str[i].event_city+", "+str[i].event_country+"</p></center><div class='ui-grid-b'><div class='ui-block-a' style='float: right;width:45%'><div class='ui-bar ui-bar-a' style='height:50px;background: none;border: none;'><button type='button' class='btn btn-primary' style='background:#ffa627;color:#fff;font-size: 12px;margin-left:-10px;'>"+available+" Available</button></div></div><div class='ui-block-b' style='float: right;width:45%'><div class='ui-bar ui-bar-a' style='height:50px;background: none;border: none;'><button type='button' class='btn btn-primary' style='background:#ffa627;color:#fff;font-size: 12px;margin-left:-10px;'>"+str[i].event_ticket_sold+" Sold</button></div></div></div><div id='main_login' data-role='content' style='padding: 10px;'><p>Description:</p><p>"+str[i].event_description+"</p><button type='button' class='btn btn-primary' style='color: #fff; background: #333; border-color: #333; width: 100%;'>Book Now</button></div>";
                       
                        $("#wrapper").append(tt);
					   
					   						 
					
                    }
                }
            });
		 
	
	
}
//fblogin


		
function Pageforgetpassword(){
	window.location = "forgetpassword.html";
}
//categories pages functions 
function postEventBanner()
{ window.location = "viewads.html?user_id="+user_id+"&email="+email+"&fbpic="+fbpic+""; };
function category()
{ window.location = "categories.html?user_id="+user_id+"&email="+email+"&fbpic="+fbpic+"";}		
function arts()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=arts&fbpic="+fbpic+"";}		
function career()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=career&fbpic="+fbpic+"";}		
function dance()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=dance&fbpic="+fbpic+"";}		
function education()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=education&fbpic="+fbpic+"";}		
function film()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=film&fbpic="+fbpic+"";}		
function food()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=food&fbpic="+fbpic+"";}		
function games()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=games&fbpic="+fbpic+"";}		
function health()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=health&fbpic="+fbpic+"";}		
function hobbies()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=hobbies&fbpic="+fbpic+"";}		
function community()
{ window.location = "form.html?user_id="+user_id+"&email="+email+"&category=community&fbpic="+fbpic+"";}		