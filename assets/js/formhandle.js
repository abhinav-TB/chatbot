$(document).ready(function(){

  $('form').on('submit', function(){

      var item = $('form input');
      var chat = {item: item.val()};


      $.ajax({
        type: 'POST',
        url: '/answer',
        data: chat,
        success: function(data){
          
          location.reload();
        }
      
      });

      return false;

  });


});
