let ans_arr = [];
$(document).ready(function () {



  
  document.getElementById("myText").focus();

  $('.msger-chat').scrollTop($('.msger-chat')[0].scrollHeight);


  $("form").submit(function (e) {
    e.preventDefault();
  });

  $('form').on('submit', function () {

    var item = $('form input');
    if(item.val() === '')
      return;
    var chat = { item: item.val() };

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes();

    addMessage(item.val(), time, false);
    item.val('');


    $.ajax({
      type: 'POST',
      url: '/answer',
      data: chat,
      success: function (data) {
        console.log(data);

        let ans = getAnswer(data);
        addMessage(ans, time, true);
        $('.msger-input').focus();

      }

    });

    return false;

  });


});


function getAnswer(arr) {
  if (arr.length == 0)
    return 'Sorry, we had some trouble understanding you.';

  arr = sortByKey(arr, 'count');
  ans_arr = arr;
  console.log(arr[0][1])
  return arr[0].answer;
}

function sortByKey(array, key) {
  return array.sort(function (a, b) {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}


function addMessage(message, time, bot = false) {

  let side = bot ? 'left' : 'right';
  let name = bot ? 'Bot' : 'You';
  let id   = bot ? 'bttn':'';
  let button=''
  if(id=='bttn')
  button='<button id="bttn">see more</button>'
  let htmlString = `      <div class="msg ` + side + `-msg">
  <div class="msg-bubble">

    <div class="msg-info">
      <div class="msg-info-name">` + name + `</div>
      <div class="msg-info-time">` + time + `</div>
    </div>
   
    <div class="msg-text">
    ` + message + `
    </div>
`+button+`
  </div>
</div>`;
  console.log(ans_arr[0])

  let chatContainer = $('.msger-chat');

  chatContainer.append(htmlString);
 
  let scrollTop = $('.msger-chat')[0].scrollHeight;
  chatContainer.animate({ scrollTop: scrollTop }, 'slow');
  $( "#bttn" ).click(function() {
   ans_arr.forEach(function(item){
    let questions = `      <div class="msg ` + side + `-msg">
    <div class="msg-bubble">
  
      <div class="msg-info">
        <div class="msg-info-name">Related Questions</div>
        <div class="msg-info-time">` + time + `</div>
      </div>
     
      <div class="msg-text">
      ` + item.query + `
      </div>
  
    </div>
  </div>`;
    chatContainer.append(questions);
    // alert( item.query );
   })
   
  });
}

