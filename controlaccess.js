  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional


 window.onload = function(){
//$('.mainload').fadeOut();
    ready();
}
document.addEventListener("scroll", function () {
  reveal();
  
});

$(document).ready(function(){
	$('#magic').fadeIn('slow',function(){
	$('#magic').delay(1000).fadeOut();
	});
  $('.mainload').fadeIn('slow',function(){
		$('.mainload').delay(500).fadeOut();
    ready();
	});
});


function reveal(){
	var reveals = document.querySelectorAll('.reveal');
	for(var i=0;i < reveals.length; i++){
		var windowheight = window.innerHeight;
		var revealtop = reveals[i].getBoundingClientRect().top;
		var revealpoint = 150;
		if (revealtop < windowheight - revealpoint){
				reveals[i].classList.add('active');
		}
		else{
			reveals[i].classList.remove('active');
		}
	}
}

  var firebaseConfig = {
    apiKey: "AIzaSyCxYAhIWfApAoVuloS3zFMqIIM4ZM7XayI",
    authDomain: "sai-mahavir.firebaseapp.com",
    projectId: "sai-mahavir",
    storageBucket: "sai-mahavir.appspot.com",
    messagingSenderId: "310858203167",
    appId: "1:310858203167:web:3633e7f06d79e1da9cd52a",
    measurementId: "G-15HHZ18TKN"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
//for auth using email and password

function signUp(){
  console.log("sign up clicked");
  var email = document.getElementById("semail");
  var password = document.getElementById("spassword");
  const promise = firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
  console.log(promise);
}

function signIn(){
  var email = document.getElementById("signemail");
  var password = document.getElementById("signpassword");
  const promise = firebase.auth().signInWithEmailAndPassword(email.value, password.value);
  promise.catch(e => alert(e.message));
}

function signOut(){
  firebase.auth().signOut();
  alert("Signed Out");
}
{/*
var phoneinput = document.getElementById('Loginphone');
var verifyotp = document.getElementById('verifyotp');
firebase.auth().useDeviceLanguage();

      phoneinput.onclick = function(){
      document.getElementById('verifyotp').style.display="none";
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          document.getElementById('verifyotp').style.display="block";
          document.getElementById('otpno').style.display="block";
          document.getElementById('phoneno').style.display="none";
          document.getElementById('Loginphone').style.display="none";
          // ...
        },
        'expired-callback': () => {
          // Response expired. Ask user to solve reCAPTCHA again.
          // ...
          alert('reCAPTCHA expired');
        }
      });

      const Number = document.getElementById('phoneno').value;
      const phoneNumber = '+91'+Number;
      console.log(phoneNumber);
      const appVerifier = window.recaptchaVerifier;
      firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
          .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            console.log(confirmationResult);
  
          
            // ...
          }).catch((error) => {
            // Error; SMS not sent
            console.log(error);
          
            // ...
          });
}

verifyotp.onclick = function(){
const code = document.getElementById('otpno').value;
confirmationResult.confirm(code).then((result) => {
  // User signed in successfully.
  const user = result.user;
  console.log("hey i am signed in")
  alert("successfully signed in");
  // ...
}).catch((error) => {
  console.log("User couldn't sign in (bad verification code?");
  alert("Wrong otp");
  // ...
});
}*/}
//checking that user is authenticated or not 
firebase.auth().onAuthStateChanged(function(user){
  if(user){
    var email = user.email;
    if(email){

      console.log(user);
      //alert('active user'+number)
      document.getElementById('userdetails').innerHTML = `
      <p><i class="fa fa-sign-in"></i> signed as </p>
      <p id="useremail"><i class="fa fa-user"></i> ${user.email}</p> <br/>
     `
     document.getElementById('loggeduser').innerHTML = `${user.email}`;
     document.getElementsByClassName('listchild2')[0].style.display = "none";
     document.getElementsByClassName('listchild2')[1].style.display = "block";
     document.getElementsByClassName('btn-address')[0].style.display = "block";
     document.getElementsByClassName('btn-sign-out')[0].style.display = "block";
     document.getElementsByClassName('btn-notify')[0].style.display = "none";
     document.getElementsByClassName('btn-addproduct')[0].style.display = "block";
     document.getElementsByClassName('btn-addresses')[0].style.display = "none";
     document.getElementsByClassName('btn-view-address')[0].style.display = "block";
      fetchdata(user.uid)
    }
    else{
      
      console.log(user);
      //alert('active user'+number)
      document.getElementById('userdetails').innerHTML = `
      <p><i class="fa fa-sign-in"></i> signed as </p>
      <p id="useremail"><i class="fa fa-user"></i> ${user.phoneNumber}</p>`
      document.getElementById('uid').innerHTML = `${user.uid}`
      document.getElementById('loggeduser').innerHTML = `${user.phoneNumber}`;
      document.getElementsByClassName('listchild2')[0].style.display = "none";
      document.getElementsByClassName('listchild2')[1].style.display = "block";
      document.getElementsByClassName('btn-address')[0].style.display = "block";
      document.getElementsByClassName('btn-notify')[0].style.display = "none";
      document.getElementsByClassName('btn-view-address')[0].style.display = "block";
      document.getElementsByClassName('btn-sign-out')[0].style.display = "block";
      document.getElementsByClassName('btn-addresses')[0].style.display = "none";
      document.getElementsByClassName('btn-addproduct')[0].style.display = "block";
      fetchdata(user.uid)
    }
    //is signed in
    
  }else{
   // alert('no active user');
    //no user is signed in
    document.getElementById('userdetails').innerHTML = `
    <p style="color: #a45c40">Please Sign In to use the services</p>
    <button class="btn-primary" style="font-size: 13x;border-radius:12px;" > 
    <a href="./login.html" style="text-decoration: none; color: #fff; font-size: 16px; padding: 10px 14px;" >SIGN IN</a> </button>`
  document.getElementsByClassName('btn-address')[0].style.display = "none";
  document.getElementsByClassName('listchild2')[0].style.display = "block";
  document.getElementsByClassName('listchild2')[1].style.display = "none";
  document.getElementsByClassName('btn-notify')[0].style.display = "block";
   document.getElementsByClassName('btn-sign-out')[0].style.display = "none";
   document.getElementsByClassName('btn-view-address')[0].style.display = "none";
   document.getElementsByClassName('btn-payment')[0].style.display = "none";
   document.getElementsByClassName('btn-addproduct')[0].style.display = "none";
   document.getElementsByClassName('btn-addresses')[0].style.display = "block";
  
  }  
});

function Toggle() {
 document.getElementById('pincode').style.display = "block";
}

function Togglehide() {
 document.getElementById('pincode').style.display = "none";
}
function pincode(){
  var pin_store = document.getElementById('pin').value;
  console.log(pin_store);
  if(pin_store >= 400061 && pin_store <= 400070) {
    document.getElementsByClassName('alert')[0].style.display = "none";
    document.getElementsByClassName('alert')[1].style.display = "block";
  }
  else if (pin_store >= 401300 && pin_store <= 401320){
    document.getElementsByClassName('alert')[0].style.display = "none";
    document.getElementsByClassName('alert')[1].style.display = "block";
  }
  else{
    document.getElementsByClassName('alert')[0].style.display = "block";
    document.getElementsByClassName('alert')[1].style.display = "none";
  }
}

  //for place order module 
  var messagesRef = firebase.database().ref('saimahavir_users');
  document.getElementById('ad-address').addEventListener('submit', addressclicked);
  
 


//for whatsapp redirect checking phone or windows is there 
$(document).ready(function() {
    var isMobile = {
    Android: function() {
    return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
    return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
    return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
    return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
    return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
    };
    
    $(document).on("click", '.whatsapp', function() {
    if( isMobile.any() ) {
    var text = $(this).attr("data-text");
    var url = $(this).attr("data-link");
    var message = encodeURIComponent(text) + " - " + encodeURIComponent(url);
    var whatsapp_url = "whatsapp://send?text=" + message;
    window.location.href = whatsapp_url;
    } else {
    alert("Please share this page in mobile device");
    }
    });
    });


    //add to cart functionality from web dev simplified
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    var removeCartItemButtons = document.getElementsByClassName('btn-remove')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
  
    
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
        
    }
   
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
}



function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.remove()
    updateCartTotal()
    checkcart()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal() 
}

function addToCartClicked(event) {
    var button = event.target
    console.log(button);
    var shopItem = button.parentElement.parentElement
    console.log(shopItem);
    var tilt = shopItem.getElementsByClassName("shop-item-button")[0]
    tilt.innerHTML = "added";
    var title = shopItem.getElementsByClassName('card-title')[0].innerText
    var price = shopItem.getElementsByClassName('card-price')[0].innerText
    var delprice = shopItem.getElementsByClassName('del')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img-top')[0].src
    var cardweight = shopItem.getElementsByClassName('card-weight')[0].innerText
    addItemToCart(title, price, delprice,imageSrc,cardweight) 
    updateCartTotal()
    window.navigator.vibrate(300);
    checkcart()
    
}

function addItemToCart(title, price, delprice,imageSrc,cardweight) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        } 
    }
    var cartRowContents = `
    <div class="cart-manager">
        <div class="cart-item cart-column"> 
          <span class="cart-item-title">${title}</span>
          <img class="cart-item-image" src="${imageSrc}">
        </div><br/>
        <div class="cartprice-flex">
        <span class="cart-price cart-column">${price}<span>&#8377</span></span>
        <span class="delxprice"><del>${delprice}<del><span>&#8377</span></span>
        </div>
        <div class="saved">you saved &#8377 <span class="dis" id="delp"></span> !</div>
        <div class="cart-quantity cart-column">
            <label>
            <span>Quantity :</span><input class="cart-quantity-input" type="number" value="1">
            <span id="we">Weight : <span class="weight"> ${cardweight}</span></span></label>
    
        </div>
        <span class="btn-flex">
            <button class="btn-remove" type="button">Remove</button>
            <button class="btn-remove1" type="button">Review</button>
        </span>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    console.log(cartItems);
    cartRow.getElementsByClassName('btn-remove')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)

}

function checkcart(){
  var cartItemContainer = document.getElementsByClassName('cart-items')[0]
  var cartRows = cartItemContainer.getElementsByClassName('cart-row')
  var items = cartRows.length;
  if (items == 0){
    
    document.getElementsByClassName('imgc')[0].style.display="block";
  }
  else{
    document.getElementsByClassName('imgc')[0].style.display="none";
  }
 
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var discount = 0
    var items = cartRows.length;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i]
        
        var cartitem = cartRow.getElementsByClassName('cart-item-title')[0]
        var carttitle = cartitem.innerText;
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var del_price = cartRow.getElementsByClassName('delxprice')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('Rs.', ''))
        var dprice = parseFloat(del_price.innerText.replace('Rs.', ''))
        var quantity = quantityElement.value
        var evedis =  (dprice - price) * quantity
        discount = discount + (dprice - price) * quantity
        total = total + (price * quantity) 
        document.getElementsByClassName('dis')[i].innerText = evedis;
    }

    total = Math.round(total * 100) / 100 + 30
    document.getElementsByClassName('cart-total-price')[0].innerText =  total
    document.getElementsByClassName('pay-total-price')[0].innerText =  total
    var coll = 0;
    document.getElementsByClassName('pay-collection-price')[0].innerText = coll;
    document.getElementsByClassName('pay-sum-price')[0].innerText =  total;
    document.getElementsByClassName('no-item')[0].innerText = items + ' items';
    document.getElementsByClassName('incp')[0].innerText = '30';
    document.getElementsByClassName('incd')[0].innerText = discount;
    document.getElementsByClassName('incd')[1].innerText = discount;
    document.getElementsByClassName('incs')[0].innerText = total;
    document.getElementsByClassName('item_number')[0].innerText = items ;
    document.getElementsByClassName('item_number')[1].innerText = items ;
  
    
}
function authverified(){
    document.getElementsByClassName('rest')[0].style.display = "block";
    document.getElementsByClassName('auth')[0].style.display="none";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('gmap')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
}
function authnotverified(){
  document.getElementsByClassName('rest')[0].style.display = "none";
  document.getElementsByClassName('auth')[0].style.display="block";
  document.getElementsByClassName('foot')[0].style.display="none";
  document.getElementsByClassName('gmap')[0].style.display="none";
  document.getElementsByClassName('top-nav-bar')[0].style.display="none";
}
function auth(){
   document.getElementsByClassName('rest')[0].style.display = "none";
    document.getElementsByClassName('auth')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
}
function address(){
    document.getElementsByClassName('add')[0].style.display = "block";
}
function view(){
  var id = document.getElementById('uid').innerText 
  document.getElementsByClassName('order-id')[0]  = id;
  document.getElementsByClassName('address_holder')[0].style.display = "block";
  document.getElementsByClassName('custom-add')[0].style.display = "block";
  document.getElementsByClassName('btn-payment')[0].style.display = "block";
  document.getElementsByClassName('cart-items')[0].style.display = "none";
 document.getElementsByClassName('add')[0].style.display = "none";
 document.getElementsByClassName('btn-address')[0].style.display = "block";
}
function addressclose(){
    document.getElementsByClassName('add')[0].style.display = "none";
}
function payment(){
    document.getElementsByClassName('payment')[0].style.display = "block";
     var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      console.log(dateTime);
      document.getElementsByClassName('date-time')[0].innerHTML = dateTime ;
    document.getElementsByClassName('addtocart')[0].style.display = "none";
    document.getElementsByClassName('products')[0].style.display = "none";
    document.getElementsByClassName('gmap')[0].style.display="none";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    
}
function paymentclose(){
    document.getElementsByClassName('addtocart')[0].style.display = "block";
    document.getElementsByClassName('rest')[0].style.display = "none";
    document.getElementsByClassName('payment')[0].style.display = "none";
    document.getElementsByClassName('cart-items')[0].style.display = "none";
    document.getElementsByClassName('address_holder')[0].style.display = "block";
    document.getElementsByClassName('custom-add')[0].style.display = "block";
    document.getElementsByClassName('gmap')[0].style.display="none";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function displaycart(){
 
    document.getElementsByClassName('addtocart')[0].style.display = "block";
    document.getElementsByClassName('cart-items')[0].style.display = "block";
     document.getElementsByClassName('address_holder')[0].style.display = "none";
    document.getElementsByClassName('custom-add')[0].style.display = "none";
    document.getElementsByClassName('products')[0].style.display = "none";
    document.getElementsByClassName('products')[1].style.display = "none";
    document.getElementsByClassName('products')[2].style.display = "none";
    document.getElementsByClassName('products')[3].style.display = "none";
    document.getElementsByClassName('products')[4].style.display = "none";
    document.getElementsByClassName('products')[5].style.display = "none";
    document.getElementsByClassName('products')[6].style.display = "none";
    document.getElementsByClassName('rest')[0].style.display = "none";
    document.getElementsByClassName('gmap')[0].style.display="none";
    document.getElementsByClassName('payment')[0].style.display = "none";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="none";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
function hidecart(){
    document.getElementsByClassName('addtocart')[0].style.display = "none";
    document.getElementsByClassName('fetch')[0].style.display = "none";
    document.getElementsByClassName('rest')[0].style.display = "block";
    document.getElementsByClassName('products')[0].style.display="none";
    document.getElementById("mySidenav").style.width = "0";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
    document.getElementsByClassName('gmap')[0].style.display="block";
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function authc(){
if(document.getElementById('summer').checked == true) {  
   
    document.getElementById('signxup').style.display="block" ;
    document.getElementsByClassName('btn-sign-out')[0].style.display="none";
    document.getElementById('signxin').style.display="none" ;
    document.getElementById('signxmobile').style.display="none" ;
    document.getElementById('ex').style.display="none" ;
    
} 
else {  
         document.getElementById('signxup').style.display="none" ;
}  
}
function auths(){
if(document.getElementById('winter').checked == true) {  
    
    document.getElementById('signxin').style.display="block" ;
    document.getElementById('signxup').style.display="none" ;
    document.getElementsByClassName('btn-sign-out')[0].style.display="none";
    document.getElementById('signxmobile').style.display="none" ;
    document.getElementById('ex').style.display="none" ;
} 
else {  
         document.getElementById('signxup').style.display="none" ;
}  
}
function authr(){
if(document.getElementById('rain').checked == true) {  
   
    document.getElementById('signxin').style.display="none" ;
    document.getElementById('signxup').style.display="none" ;
    document.getElementById('signxmobile').style.display="block" ;
    document.getElementsByClassName('btn-sign-out')[0].style.display="none";
    document.getElementById('ex').style.display="none" ;
} 
else {  
    document.getElementById('signxup').style.display="none" ;
}  
}


//address on cart page
function addressclicked(event) {
    event.preventDefault();
    var orderID = document.getElementById('uid').innerText;
    console.log(orderID);
    //var add_store = document.getElementsByClassName('add')[0]
    var add_rc = document.getElementById("add_rc").value
    var add_email = document.getElementById("add_email").value
    var add_contact = document.getElementById("add_contact").value
    var add_alter= document.getElementById("add_alter").value
    var add_zip= document.getElementById("add_zip").value
    var add_add = document.getElementById("add_add").value
    var add_local= document.getElementById("add_local").value
    var add_lan = document.getElementById("add_lan").value
    var st = document.getElementById("st").value
    var ci = document.getElementById("ci").value
    console.log(add_rc , '\n',add_contact,'\n',add_alter,'\n',add_zip,'\n',add_add,'\n',add_local,'\n',add_lan
      ,'\n',st,'\n',ci);
    document.getElementById('ad-address').reset();
    rc_address(orderID,add_rc,add_email,add_contact,add_alter,add_zip,add_add,add_local,add_lan,st,ci)
    
}

function rc_address(orderID,add_rc,add_email,add_contact,add_alter,add_zip,add_add,add_local,add_lan,st,ci) {
   var cartaddress = document.createElement('div')
   var qw = document.getElementsByClassName('address_holder')[0]
     var cartRowContents1 = `
      <div class="address-container">
          <h1 style="padding: 10px;">Customer Details</h1><br>
   
          <span class="rec-name1"> ${add_rc}</span><br>
          <h2><i class="fa fa-envelope" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
          <span class="rec-name2"> ${add_email}</span><br>
          <h2><i class="fa fa-phone-square" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
          <span class="rec-name"> ${add_contact}</span><br>
          <h2><i class="fa fa-map-marker" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
          <span class="rec-name p-2"> ${add_add},${ci}, ${st} - ${add_zip}</span>
        </div>
       `
        cartaddress.innerHTML = cartRowContents1
        qw.append(cartaddress)
       
         document.getElementsByClassName('address_holder')[0].style.display = "block";
         document.getElementsByClassName('custom-add')[0].style.display = "block";
         document.getElementsByClassName('btn-payment')[0].style.display = "block";
         document.getElementsByClassName('cart-items')[0].style.display = "none";
        document.getElementsByClassName('add')[0].style.display = "none";
        document.getElementsByClassName('btn-address')[0].style.display = "none";

        var messagesRef1 = firebase.database().ref('order_details/orders/'+orderID+'addresss');
        var newMessageRef1 = messagesRef1.push()
        newMessageRef1.set({
          Name: add_rc,
          Email: add_email,
          Contact:add_contact,
          Address_details : add_add +', '+ ci +', ' + st +', ' + add_zip
        });
        console.log('added')
  }


  function cartpage(){
    document.getElementsByClassName('address_holder')[0].style.display = "none";
    document.getElementsByClassName('custom-add')[0].style.display = "none";
    document.getElementsByClassName('btn-payment')[0].style.display = "block";
    document.getElementsByClassName('cart-items')[0].style.display = "block";
    document.getElementsByClassName('gmap')[0].style.display = "none";
   document.getElementsByClassName('add')[0].style.display = "none";
   document.getElementsByClassName('btn-address')[0].style.display = "none";
  }


  function fetchdata(orderID){
    const db = firebase.database();
    const ref = db.ref('order_details/orders/'+`${orderID}`);
    console.log(ref)
    // Attach an asynchronous callback to read the data at our posts reference
    ref.once('value', (snapshot) => {
      snapshot.forEach(
      function(childsnapshot){
      let newPost = childsnapshot.val();
      var fetchOrderID =  newPost.OrderID ;
      var fetchCustomer =  newPost.Customer;
      var fetchEmail = newPost.Email ;
      var fetchContact = newPost.Contact;
      var fetchRecievers_details =  newPost.Recievers_details;
      var fetchCart_items_names = newPost.Cart_items_names ;
      var fetchCart_total =  newPost.Cart_total;
      var fetchPurchaseDate = newPost.PurchaseDate;
      var fetchStatus = newPost.Order_Status;
      var fetchPurchaseTime = newPost.PurchaseTime;
      var fetchorder = document.createElement('div')
      var collect = document.getElementsByClassName('orderdetails_holder')[0]
        var fetchorderdetails = `
         <div class="address-container">
             <h1>Order Placed on ${fetchPurchaseDate} at ${fetchPurchaseTime} </h1><br>
             <span class="deal"><span class="ford"> ${fetchCustomer}</span></span>
             <span class="deal"><span class="ford"> ${fetchEmail}</span> </span>
             <span class="deal"><span class="ford"> ${fetchContact}</span> </span>
             <span class="deal"><span class="ford"> ${fetchCart_items_names}</span> </span>
             <span class="deal"><span class="ford"> total : ${fetchCart_total} &#8377</span> </span>
             <span class="deal"><span class="ford"> order status : <span style="border:1px solid #ccc;padding: 5px 10px; border-radius:4px;">${fetchStatus}</span></span> </span>
     
           </div>
     ` 
     fetchorder.innerHTML = fetchorderdetails
     collect.append(fetchorder)
      }
      )
     
    });
  
    const refadd = db.ref('order_details/orders/'+orderID+'addresss');
    console.log(refadd)
    // Attach an asynchronous callback to read the data at our posts reference
    refadd.once('value', (snapshot) => {
      snapshot.forEach(
      function(childsnapshot){
      let newPost = childsnapshot.val();
      var cartaddress = document.createElement('div')
      var qw = document.getElementsByClassName('address_holder')[0]
      var address = ` <div class="address-container">
      <h1 style="padding: 10px 0px;">Customer Details</h1><br>
      <span class="rec-name1"> ${newPost.Name}</span><br>
      <h2><i class="fa fa-phone" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
      <span class="rec-name2"> ${newPost.Contact}</span><br>
      <h2><i class="fa fa-envelope" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
      <span class="rec-name2"> ${newPost.Email}</span><br>
      <h2><i class="fa fa-map-marker" style="color:#222; padding: 0px 0px 0px 0px;"></i></h2>
      <span class="rec-name"> ${newPost.Address_details}</span>
    </div>`
        cartaddress.innerHTML = address 
        qw.append(cartaddress)
     
      });
    });
    
   
    document.getElementsByClassName('address_holder')[0].style.display = "block";
    document.getElementsByClassName('custom-add')[0].style.display = "block";
    document.getElementsByClassName('btn-payment')[0].style.display = "block";
    document.getElementsByClassName('cart-items')[0].style.display = "none";
   document.getElementsByClassName('add')[0].style.display = "none";
   document.getElementsByClassName('btn-address')[0].style.display = "none";
  }
  
  function purchaseClicked(event) {
   var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    var carttitle = '';
    var discount = 0
    var quantity = 0
    var quantity1 = 0
    var items = cartRows.length;
    if ( 0 < items){
      for (var i = 0; i < cartRows.length; i++) {
          var cartRow = cartRows[i]
          
          var cartitem = cartRow.getElementsByClassName('cart-item-title')[0].innerText
           carttitle += i + '.' + cartitem + '\n';
          var priceElement = cartRow.getElementsByClassName('cart-price')[0]
          var del_price = cartRow.getElementsByClassName('delxprice')[0]
          var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
          var price = parseFloat(priceElement.innerText.replace('Rs.', ''))
          var dprice = parseFloat(del_price.innerText.replace('Rs.', ''))
          quantity = quantityElement.value 
          discount = discount + (dprice - price) * quantity
          total = total + (price * quantity) 
          quantity1 += quantity + '/';

      }
      total = Math.round(total * 100) / 100 + 30
      console.log("Order : " + '\n' + carttitle);
      console.log("No. of Rows : " + items);
      console.log("Quantity : " + quantity1);
      console.log("Bag Discount : " + discount);
      console.log("Cart Total : "+ total);
      
      var f = ""
      var fetchadd = document.getElementsByClassName('address-container')[0]
      var fetch_rec = fetchadd.getElementsByClassName('rec-name')
      for(var i=0;i<fetch_rec.length;i++){
        f += fetch_rec[i].innerText + '\n' ;
      }
      console.log("Order Reciever's Details : " + f);
      var orderID =  document.getElementById('uid').innerText
      var reciever = document.getElementsByClassName('rec-name1')[0].innerText
      var email = document.getElementsByClassName('rec-name2')[0].innerText
      var contact = document.getElementsByClassName('rec-name')[0].innerText

      console.log(reciever+' '+email);

      //fetching date and time 
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      console.log(dateTime);
      document.getElementsByClassName('date-time').innerHTML = dateTime ;

      saveorderinfo(orderID,reciever,email,contact,f,carttitle,items,quantity1,discount, total , date ,time)
      sendorderEmail(orderID,reciever, email,f,carttitle,items,quantity1,discount, total , date , time)
      sendordercustomer(orderID,reciever, email,f,carttitle,items,quantity1,discount, total , date , time)
      alert('order successfully placed');

      var cartItems = document.getElementsByClassName('cart-items')[0]
      while (cartItems.hasChildNodes()) {
          cartItems.removeChild(cartItems.firstChild)
      }
      updateCartTotal()
     
   }
   else{
       alert('kindly add products to your cart');
   }
}


//for showing cart final cart deatils to the user or customer
function saveorderinfo(orderID,reciever,email,contact,f,carttitle,items,quantity1,discount,total,date,time){
  var messagesRef1 = firebase.database().ref('order_details/orders/'+orderID);
  var newMessageRef1 = messagesRef1.push()
  newMessageRef1.set({
    OrderID : orderID,
    Customer : reciever,
    Email : email,
    Contact:contact,
    Recievers_details : f,
    Cart_items_names : carttitle,
    Items :items,
    Quantity : quantity1,
    Discount_value : discount,
    Cart_total : total,
    PurchaseDate : date,
    PurchaseTime : time,
    Order_Status: 'Processing'
  });
 
  fetchdata(orderID)
  displayorder()
}

function sendorderEmail(orderID,reciever,email,f,carttitle,items,quantity1,discount,total,date,time){
  Email.send({
    Host:'smtp.gmail.com',
    Port:'587',
    Username:'guptasundaram7@gmail.com',
    Password:'tdftrcwzvjusbeds',
    To:'guptasundaram7@gmail.com',
    // president.rca3141@gmail.com
    From:`${email}`,
    Subject: `${reciever} sent you a message`,
    Body: `<div style="border: 2px solid #eee;">
    <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
    <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
      <tbody>
        <tr>
          <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#f7fafc">
            <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                      <tbody>
                        <tr>
                          <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left" bgcolor="#ffffff">
                                    <table class="card-body" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;" align="left">
                                            <h1 class="h3  text-center" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 28px; line-height: 33.6px; margin: 0;" align="center">
                                            Cart Order Details</h1>
                                            <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <h5 class="text-center" style="color: #fff; background-color: #000; font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; margin: 0; padding: 10px;" align="center">Sai Mahavir Foods</h5>
                                            <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="table thead-default" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 100%;">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Order Id : </td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${orderID}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Receiver Name :</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${reciever}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Receiver Details :</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${f}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Cart Details</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${carttitle}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Quantity</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${quantity1}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Discount</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${discount}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Total</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${total}</td>
                                                </tr>
                                
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Date of Order</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${date+' '+time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <p style="color: #0099e3; font-size: 15px; line-height: 24px; width: 100%; margin: 0; padding: 10px;" align="left">Hide quoted text</p>
                                            <div class="space-y-3">
                                              <p class="text-gray-700" style="color: #4BB543; font-size: 20px; font-weight: bold; line-height: 24px; width: 100%; margin: 0; padding: 5px 10px;" align="left">
                                                Now is the time to prepare for covid-19.
                                                Simple precautions and planning can make big difference. 
                                                Action now will help protect you and your family.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body></div>`
  })
}
function sendordercustomer(orderID,reciever,email,f,carttitle,items,quantity1,discount,total,date,time){
  Email.send({
    Host:'smtp.gmail.com',
    Username:'saimahavirfoods@gmail.com',
    Password:'rbyngxbfmrsehmzv',
    To:`${email}`,
    // president.rca3141@gmail.com
    From:"saimahavirfoods@gmail.com",
    Subject: `sai mahavir foods sent you a message`,
    Body: `<div style="border: 2px solid #eee;">
    <body class="bg-light" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
    <table class="bg-light body" valign="top" role="presentation" border="0" cellpadding="0" cellspacing="0" style="outline: 0; width: 100%; min-width: 100%; height: 100%; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; font-family: Helvetica, Arial, sans-serif; line-height: 24px; font-weight: normal; font-size: 16px; -moz-box-sizing: border-box; -webkit-box-sizing: border-box; box-sizing: border-box; color: #000000; margin: 0; padding: 0; border-width: 0;" bgcolor="#f7fafc">
      <tbody>
        <tr>
          <td valign="top" style="line-height: 24px; font-size: 16px; margin: 0;" align="left" bgcolor="#f7fafc">
            <table class="container" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
              <tbody>
                <tr>
                  <td align="center" style="line-height: 24px; font-size: 16px; margin: 0; padding: 0 16px;">
                    <!--[if (gte mso 9)|(IE)]>
                      <table align="center" role="presentation">
                        <tbody>
                          <tr>
                            <td width="600">
                    <![endif]-->
                    <table align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 600px; margin: 0 auto;">
                      <tbody>
                        <tr>
                          <td style="line-height: 24px; font-size: 16px; margin: 0;" align="left">
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="card" role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-radius: 6px; border-collapse: separate !important; width: 100%; overflow: hidden; border: 1px solid #e2e8f0;" bgcolor="#ffffff">
                              <tbody>
                                <tr>
                                  <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0;" align="left" bgcolor="#ffffff">
                                    <table class="card-body" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                      <tbody>
                                        <tr>
                                          <td style="line-height: 24px; font-size: 16px; width: 100%; margin: 0; padding: 20px;" align="left">
                                            <h1 class="h3  text-center" style="padding-top: 0; padding-bottom: 0; font-weight: 500; vertical-align: baseline; font-size: 28px; line-height: 33.6px; margin: 0;" align="center">
                                            Cart Order Details</h1>
                                            <table class="s-2 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 8px; font-size: 8px; width: 100%; height: 8px; margin: 0;" align="left" width="100%" height="8">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <h5 class="text-center" style="color: #fff; background-color: #000; font-weight: 500; vertical-align: baseline; font-size: 20px; line-height: 24px; margin: 0; padding: 10px;" align="center">Sai Mahavir Foods</h5>
                                            <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="hr" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; height: 1px; width: 100%; margin: 0;" align="left">
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="s-5 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 20px; font-size: 20px; width: 100%; height: 20px; margin: 0;" align="left" width="100%" height="20">
                                                    &#160;
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <table class="table thead-default" border="0" cellpadding="0" cellspacing="0" style="width: 100%; max-width: 100%;">
                                              <tbody>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Order Id : </td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${orderID}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Receiver Name :</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${reciever}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Receiver Details :</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${f}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Cart Details</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${carttitle}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Quantity</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${quantity1}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Discount</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${discount}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Total</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${total}</td>
                                                </tr>
                                                <tr>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">Date of Order</td>
                                                  <td style="line-height: 24px; font-size: 16px; border-top-width: 1px; border-top-color: #e2e8f0; border-top-style: solid; margin: 0; padding: 12px;" align="left" valign="top">${date+' '+time}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                            <p style="color: #0099e3; font-size: 15px; line-height: 24px; width: 100%; margin: 0; padding: 10px;" align="left">Hide quoted text</p>
                                            <div class="space-y-3">
                                              <p class="text-gray-700" style="color: #4BB543; font-size: 20px; font-weight: bold; line-height: 24px; width: 100%; margin: 0; padding: 5px 10px;" align="left">
                                                Now is the time to prepare for covid-19.
                                                Simple precautions and planning can make big difference. 
                                                Action now will help protect you and your family.
                                              </p>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                            <table class="s-10 w-full" role="presentation" border="0" cellpadding="0" cellspacing="0" style="width: 100%;" width="100%">
                              <tbody>
                                <tr>
                                  <td style="line-height: 40px; font-size: 40px; width: 100%; height: 40px; margin: 0;" align="left" width="100%" height="40">
                                    &#160;
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <!--[if (gte mso 9)|(IE)]>
                    </td>
                  </tr>
                </tbody>
              </table>
                    <![endif]-->
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </body></div>`  
  }).then( (message) => alert("message has been sent to your email kindly Check !"))
}




function anonymous(event){
  event.preventDefault();
  var pop = document.getElementById("fetchorderid").value;
  fetchdata(pop);
}

function displayorder(){
  document.getElementsByClassName('gmap')[0].style.display = "none";
  document.getElementsByClassName('fetch')[0].style.display="block";
  document.getElementsByClassName('addtocart')[0].style.display = "none";
    document.getElementsByClassName('products')[0].style.display = "none";
    document.getElementsByClassName('products')[1].style.display = "none";
    document.getElementsByClassName('products')[2].style.display = "none";
    document.getElementsByClassName('rest')[0].style.display = "none";
    document.getElementsByClassName('payment')[0].style.display = "none";
    document.getElementsByClassName('products')[0].style.display = "none";
    document.getElementsByClassName('foot')[0].style.display="block";
    document.getElementsByClassName('top-nav-bar')[0].style.display="none";
    document.getElementById("mySidenav").style.width = "0";
  
}
function products(i,j,r,t,s,w,x){
  document.getElementsByClassName('gmap')[0].style.display = "none";
  document.getElementsByClassName('products')[i].style.display="block";
  document.getElementsByClassName('products')[j].style.display="none";
  document.getElementsByClassName('products')[r].style.display="none";
  document.getElementsByClassName('products')[t].style.display="none";
  document.getElementsByClassName('products')[s].style.display="none";
  document.getElementsByClassName('products')[w].style.display="none";
  document.getElementsByClassName('products')[x].style.display="none";
   document.getElementsByClassName('rest')[0].style.display = "none";
   document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
   document.getElementsByClassName('foot')[0].style.display="block";
   document.getElementById("mySidenav").style.width = "0";
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;

}

function returnhome(i,j,r,t,s,w,x){
  document.getElementsByClassName('rest')[0].style.display = "block";
  document.getElementsByClassName('gmap')[0].style.display = "block";
  document.getElementsByClassName('products')[i].style.display="none";
  document.getElementsByClassName('products')[j].style.display="none";
  document.getElementsByClassName('products')[r].style.display="none";
  document.getElementById("mySidenav").style.width = "0";
  document.getElementsByClassName('foot')[0].style.display="block";
  document.getElementsByClassName('top-nav-bar')[0].style.display="flex";
}