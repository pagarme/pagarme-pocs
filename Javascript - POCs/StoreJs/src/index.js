$('.terms button').on('click', function() {
  $(".review").hide();
  $(".agreed").show();
  $(".complete button").removeAttr("disabled");
});

$('.agreed').on('click', function() {
  $(".review").show();
  $(".agreed").hide();
  $(".complete button").attr("disabled","disabled");
});

$('button.remove').on('click', function(){
  $(this).parent().velocity({
    translateX: "-800px",
    opacity: 0
  },{
    duration: 500,
    complete: function(elem) {
      $(elem).addClass("deleted");
    },
    easing: [ 0.65, -0.02, 0.72, 0.29 ] 
  });
});

$('#changePrices').on('click', function() {
  var $strike = $('<span class="strike"></span>');
  var $price = $('.price').first();
  var oldPrice = $price.text();
  var $oldPrice = $('<span class="old"></span>');
  var newPrice = '$0.99';
  var $newPrice = $('<span class="new">'+ newPrice +'</span>');
  // add span.strike
  $price.prepend($strike);
  // wrap the span.old around the current price
  $price.wrapInner($oldPrice);
  // For some reason wrapInner doesn't maintain the DOM relationship, so re-assign it back
  $oldPrice = $price.find(".old");
  $price.append($newPrice);

  // draw a slash through the price, and remove the slash
  $strike.velocity({
    width: "105%"
  },{
    duration: 500,
    easing: [ 1, 0, 1, 1 ]
  });
  
  // float the old price up
  $oldPrice.velocity({
    translateY: "-1.2em",
    opacity: 0
  },{
    delay: 500,
    duration: 800,
    complete: function(elem) {
      $(elem).remove();
    },
    easing: [ 0, 1, 1, 1 ]
  });
  
  // Fade in the new price, then unwrap it to finish the animation
  $newPrice.velocity({ 
    opacity: 1
  }, {
    delay: 500, 
    duration: 250,
    easing: "linear",
    complete: function(elem) {
     $(elem).contents().unwrap();
    }
  });
});

$('#undelete').on('click', function(){
  $('.product.ux-card').each( function( index, el ) {
    if ( $(el).hasClass('deleted') ) {
      $(el).velocity('reverse').removeClass('deleted');
    } else {
      // Do nothing
    }
  });;
});