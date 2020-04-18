// The Top Menu Bar | Hyperlinking
$(".menuBar").click(function() {
  window.location = $(this).find("a").attr("href"); 
  return false;
});

$('#yourOrder').click(function(){
console.log('hii')
})
/*linking Order Menu Bar with Modal*/
//

$("#yourOrder").click(function(){
	console.log("yaus")
  $("#order").modal();
  });
$("#yourOrderFromModal").click(function(){
  $("#order").modal();
  });
 
/* Img Modal*/
const menuArray = [];

$(".menuItemTitle").click(function(){
  const itemParent = $(this).parent()[0];
    // Getting the image of the button clicked 
  const imgTitle = $(itemParent).find("button")[0].innerHTML
  const img =$("#"+itemParent.id+"Photo")[0]
  var createImage = function(src, title) {
    var img   = new Image();
    img.src   = src;
    img.alt   = title;
    img.title = title;
    $(img).addClass("img-fluid currentPhoto")
    return img; 
  };
    $(imgTitlePlace).html(imgTitle)
    $(imgPlace).html(createImage(img.src,imgTitle))
    $("#imgModal").modal();
  // Getting the price of the button clicked  
  const smallPrice = $(itemParent).find("#Small").html()
  const mediumPrice = $(itemParent).find("#Medium").html()
  const largePrice = $(itemParent).find("#Large").html()
  const singlePrice = $(itemParent).find(".priceButton").html()
  const halfTrayPrice= $(itemParent).find("#halfTray").html()
  const fullTrayPrice = $(itemParent).find("#fullTray").html()
  if(mediumPrice){
    $(".smallColumn").removeClass("displaynone")
    $(".largeColumn").removeClass("displaynone")
    $("#midSizePhoto").removeClass("displaynone")
    $("#mediumButton").html('Medium')
    $("#smallButton").html('Small')
    $(smallPricePlace).html(smallPrice)
    $(mediumPricePlace).html(mediumPrice)
    $(largePricePlace).html(largePrice)
  }
  else if(halfTrayPrice){
    $(smallPricePlace).html(halfTrayPrice)
    $(mediumPricePlace).html(fullTrayPrice)
    $("#mediumButton").html('Full Tray')
    $("#smallButton").html('Half Tray')
    $(".largeColumn").addClass("displaynone")
  }
 else if(singlePrice){
  $(mediumPricePlace).html(singlePrice)
  $("#mediumButton").html('Single')
  $(".smallColumn").addClass("displaynone")
  $(".largeColumn").addClass("displaynone")
  $("#midSizePhoto").addClass("displaynone")
 }  });
/* Img Modal Buttons */


$(".menuButtons").click(function(){
  const size = this.innerHTML
  const dishName = $("#imgTitlePlace").html()
  const price = $(this).parent().find("div")[0].innerHTML
  console.log(price)
  var clickedDish = { 
    name:size+" "+dishName,
    qty:1,
    price:price
  }
   // if order is empty, we add what's clicked
   if(menuArray.length==0){
    menuArray.push(clickedDish)
    updateOrder()
    signalOrder()
    return menuArray
  }
// if order is not empty, we check to see if we ordered it
else if(menuArray.length>0){
 for(var i =0; i<menuArray.length;i++){
   if(menuArray[i].name==clickedDish.name){
     menuArray[i].qty += 1
     updateOrder()
     signalOrder()
     return menuArray
   }
}}
menuArray.push(clickedDish)
updateOrder()
signalOrder()
return menuArray
})


function signalOrder(){
   setTimeout(function() { 
  $('#yourOrderfromModal').css('background-color', '#009B3A'); 
}, 200);
$('#yourOrderfromModal').css('background-color', '#FED100')
$('#yourOrderfromModal').css('color', 'white')
}

$("#smallColumn").click(function() {
  $('#smallButton').click()
});





/* Designating each price button to send name/qty/price info to
an array called menuArray */
addToOrder(".priceButton")

function addToOrder(button){
var buttons=document.querySelectorAll(button)
buttons.forEach(function(eachbutton){
eachbutton.addEventListener("click",function(){
 var size = eachbutton.id
 var price = Number(eachbutton.innerHTML)
 var parentNode = eachbutton.parentElement
 var dishName = parentNode.getElementsByClassName("menuItemTitle")[0].innerHTML
 var clickedDish = { 
   name:size+" "+dishName,
   qty:1,
   price:price
 }
 // if order is empty, we add what's clicked
     if(menuArray.length==0){
       menuArray.push(clickedDish)
       updateOrder()
       return menuArray
     }
  // if order is not empty, we check to see if we ordered it
  if(menuArray.length>0){
    for(var i =0; i<menuArray.length;i++){
      if(menuArray[i].name==clickedDish.name){
        menuArray[i].qty += 1
        updateOrder()
        return menuArray
      }
    }
  }
  menuArray.push(clickedDish)
  updateOrder()
  console.log(menuArray)
  return menuArray
})
})
}

function updateOrder(){
updateQty()
updatePrice()
updateDishOrdered()
addButton()
minusButton()
removeButton()
updateTotal()
updateSignal()
}

function updateDishOrdered(){
 var nameColumn =document.getElementById("menuNameColumn")
 nameColumn.innerHTML = "";

 for(let i=0; i<menuArray.length;i++){
   let names = document.createElement("div")
   names.innerHTML = menuArray[i].name
   nameColumn.appendChild(names)     
 }
}

function updateQty(){
 var orderqty =document.getElementById("menuQtyColumn")
 orderqty.innerHTML = "";

 for(let i=0; i<menuArray.length;i++){
   if(menuArray[i].qty<=0){
     menuArray[i].qty=0
   }
  let qtyinfo = document.createElement("div")
   qtyinfo.innerHTML = menuArray[i].qty
   orderqty.appendChild(qtyinfo)     
 }
}

function updatePrice(){
var priceColumn =document.getElementById("menuPriceColumn")
priceColumn.innerHTML = ""
for(var i=0; i<menuArray.length;i++){
  var finalPrice = menuArray[i].price * menuArray[i].qty
  var priceTemplate = document.createElement("div")
  priceTemplate.innerHTML = "$"+addZero(finalPrice)
  priceColumn.appendChild(priceTemplate)
}
}

function addZero(price){ 
   let pricestring= price.toString()
   if(pricestring.indexOf(".")>-1){ 
    let dotplace= pricestring.indexOf(".")
    let lengthafterdot= pricestring.length - dotplace-1
          return pricestring.concat('0')
    }
else{
  return pricestring.concat('.00')
  
}}

function minusButton(){
 var minusButtonArea =document.getElementById("minusbutton")
minusButtonArea.innerHTML=""
 for(let i=0; i<menuArray.length;i++){
   var minusButton= document.createElement("div")
   minusButton.className="editButton"
   minusButton.innerHTML = "-1"
   minusButton.onclick= function(){   
     menuArray[i].qty -= 1
     updateOrder();
   }
   minusButtonArea.appendChild(minusButton)     
 }
}

function addButton(){
 var addButtonArea =document.getElementById("addbutton")
addButtonArea.innerHTML=""
 for(let i=0; i<menuArray.length;i++){
   var addButtonDiv = document.createElement("div")
   var addButton= document.createElement("div")
    addButton.className="editButton"
   addButton.innerHTML = "+1"
   addButton.onclick= function(){
     menuArray[i].qty += 1
     updateOrder();
   }
   addButtonArea.appendChild(addButton)    
 }
}

function removeButton(){
 var removeButtonArea =document.getElementById("removebutton")
removeButtonArea.innerHTML=""
 for(let i=0; i<menuArray.length;i++){
   var removeButton= document.createElement("div")
   removeButton.className="editButton"
   removeButton.innerHTML = "Del"
   removeButton.onclick= function(){
     menuArray.splice(i,1)
     updateOrder();
   }
   removeButtonArea.appendChild(removeButton)     
 }
}

function updateTotal(){
 var toalPriceBody =document.getElementById("totalPrice")
 toalPriceBody.innerHTML = "";
    var totalPrice= 0 ;
 for(let i=0; i<menuArray.length;i++){
   var itemprice = menuArray[i].price*menuArray[i].qty
  totalPrice += itemprice
 }
   toalPriceBody.innerHTML = "$"+addZero(totalPrice);
}

function updateSignal(){
   var signal = document.getElementById("yourOrderContent")
   var finalQty = 0
 for(var i =0 ; i<menuArray.length; i++){
   finalQty += menuArray[i].qty
 }
  signal.innerHTML = "<a data-toggle=\"modal\" href=\"#order\">"+finalQty +"<br>" +"Items"+"</a>"
  $("#yourOrder").addClass("glow")
}

function  checkOutWhere(){
var checkOutButton= document.getElementById('checkOutButton')
var finalQty = 0
for(var i =0 ; i<menuArray.length; i++){
  finalQty += menuArray[i].qty
}
if(finalQty==0){
  alert("You must order food before you can check out~")
  
}else{checkOutButton.setAttribute("href", "#checkOut")}

}

function checkDeliveryRequirement(){

var name= document.getElementById('name')
var tele= document.getElementById('phone')
var adr= document.getElementById('adr')
var city= document.getElementById('city')
var state= document.getElementById('state')
var zip= document.getElementById('zipcode')
var takeout = document.getElementById('takeoutMethod')
var deliverout = document.getElementById('deliveryMethod')

if(takeout.checked==false && deliverout.checked==false){
  alert("Please choose between Take Out and Delivery")
  return false;
}

if(takeout.checked){
  if(!name.value){$(name).addClass("missinginfo") 
return false; }
 if(name.value){$(name).removeClass("missinginfo") 
 }
 if(!tele.value){$(tele).addClass("missinginfo")
return false;  }
if(tele.value){$(tele).removeClass("missinginfo")
}
}

else if(deliverout.checked){
  if(!name.value){$(name).addClass("missinginfo") 
return false; }
 if(name.value){$(name).removeClass("missinginfo") 
 }
 if(!tele.value){$(tele).addClass("missinginfo")
return false;  }
if(tele.value){$(tele).removeClass("missinginfo")
}                    
 if(!adr.value){$(adr).addClass("missinginfo")
return false;                   }
if(adr.value){$(adr).removeClass("missinginfo")
                }
 if(!city.value){$(city).addClass("missinginfo")
return false;                   }
if(city.value){$(city).removeClass("missinginfo")
;    }
if(!state.value){$(state).addClass("missinginfo")
return false;                      }
if(state.value){$(state).removeClass("missinginfo")
                    }
 if(!zip.value){$(zip).addClass("missinginfo")
return false;                   }
if(zip.value){$(zip).removeClass("missinginfo")
           }
}
}

//making sure the delivery method is defaulted to take-out
  function resetDelivery(){
    $( "#takeoutMethod" ).prop( "checked", true );
    $( "#deliveryMethod" ).prop( "checked", false );
    $("#deliveryForm").addClass('displaynone')
    $('#deliveryForm').find('input:text').val('');
  }


  //checking the delivery method
    function checkDeliveryMethod(){
       $("#deliveryMethod").click(function(){
        var finalPrice =0;
        for(var i =0 ; i<menuArray.length; i++){
          finalPrice += menuArray[i].price*menuArray[i].qty
        }console.log((finalPrice))
         console.log(menuArray)
        if(finalPrice>=20){
          $("#deliveryForm").removeClass('displaynone')
        }
        else{
          alert("The Order Must Be Over $20 for Delivery")
         $("#takeoutMethod").click()
        }
        
      })
    $("#takeoutMethod").click(function(){
        $("#deliveryForm").addClass('displaynone')
        $('#deliveryForm').find('input:text').val('');
        
      })
    }
  
  checkDeliveryMethod()

  // Create a Stripe client.
var stripe = Stripe('pk_test_m78JBijSO9D9GjZiyPhwbkNR003MoahjvF');

// Create an instance of Elements.
var elements = stripe.elements();

// Custom styling can be passed to options when creating an Element.
// (Note that this demo uses a wider set of styles than the guide below.)
var style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4'
    }
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a'
  }
};

// Create an instance of the card Element.
var card = elements.create('card', {style: style});

// Add an instance of the card Element into the `card-element` <div>.
card.mount('#card-element');

// Handle real-time validation errors from the card Element.
card.addEventListener('change', function(event) {
  var displayError = document.getElementById('card-errors');
  if (event.error) {
    displayError.textContent = event.error.message;
  } else {
    displayError.textContent = '';
  }
});

// Handle form submission.

  var form = document.getElementById('payment-form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    if(checkDeliveryRequirement()==false){
      return false;
    }
        stripe.createToken(card).then(function(result) {
        if (result.error) {
        // Inform the user if there was an error.
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        // Send the token to your server.
        stripeTokenHandler(result.token);
      }
    });
  });
  
  // Submit the form with the token ID.
  function stripeTokenHandler(token) {
    // Insert the token ID into the form so it gets submitted to the server
    var form = document.getElementById('payment-form');
    var hiddenInput = document.createElement('input');
    var priceInput= document.createElement('input')
    var orderInput =document.createElement('input')
    var finalPrice= 0;
    hiddenInput.setAttribute('type', 'hidden');
    hiddenInput.setAttribute('name', 'stripeToken');
    hiddenInput.setAttribute('value', token.id);
    for(var i =0;i<menuArray.length;i++){
       finalPrice += menuArray[i].price * menuArray[i].qty
    }
    priceInput.setAttribute('type','number')
    priceInput.setAttribute('name','finalPrice')
    priceInput.setAttribute('value',JSON.stringify(finalPrice*100))
    priceInput.className='displaynone'
    orderInput.setAttribute('type','text')
    orderInput.setAttribute('name','order')
    orderInput.setAttribute('value',JSON.stringify(menuArray))
    orderInput.className='displaynone'
     form.appendChild(hiddenInput);
     form.appendChild(priceInput);
     form.appendChild(orderInput);
     
    // Submit the form
    form.submit();
   
  }
//check hours

function checkTimeandOpenModal(){
var objDate = new Date();
var hours = objDate.getHours();
var mins = objDate.getMinutes();
var time = hours*60+mins
var day = objDate.getUTCDay()
console.log(time)

  if(day==0||day==1||day==2||day==3||day==4){

    if(time< 480 || time > 1170){
      $("#yourOrder").click(function(){
        alert("We are Sorry. Our online store is closed. Please call the restaurant for further assistance.")
        window.location.reload(false); 
      })
      $("#yourOrderfromModal").click(function(){
        alert("We are Sorry. Our online store is closed. Please call the restaurant for further assistance.")
        window.location.reload(false); 
        
      })
      }
      else{
        $("#order").modal();
      }    
  }

  if(day==5||day==6){
    
    if(time< 480 || time > 1230){
      $("#yourOrder").click(function(){
        alert("We are Sorry. Our online store is closed. Please call the restaurant for further assistance.")
        window.location.reload(false); 
      })
      $("#yourOrderfromModal").click(function(){
        alert("We are Sorry. Our online store is closed. Please call the restaurant for further assistance.")
        window.location.reload(false); 
        
      })
      }
      else{
        $("#order").modal();
      }    

  }
}


function checkDaySoup(){
  var objDate = new Date();
  var hours = objDate.getHours();
  var mins = objDate.getMinutes();
  var time = hours*60+mins
  var day = objDate.getUTCDay()

  if(day==1||day==4){
    $("#chickenSoup").addClass("displaynone")
    $("#cowHeadSoup").addClass("displaynone")
    $("#redPeasSoup").removeClass("displaynone")

  }
  if(day==2||day==3){
    $("#redPeasSoup").addClass("displaynone")
    $("#cowHeadSoup").addClass("displaynone")
    $("#chickenSoup").removeClass("displaynone")
  }
  if(day==5||day==3){
    $("#redPeasSoup").addClass("displaynone")
    $("#chickenSoup").addClass("displaynone")
    $("#cowHeadSoup").removeClass("displaynone")
  }
}
checkDaySoup()

console.log('hello')
