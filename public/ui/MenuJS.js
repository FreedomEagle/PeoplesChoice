console.log('hi')
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

