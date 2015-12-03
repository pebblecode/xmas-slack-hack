
function fetchData(){
  $.get('http://theguardianhivemind.com:5555/api/word', function(arr) {
    arr.map(function(i){
      if (i.word === 'christmas') {
        $('#christocount').text(i.count)
      }
    })
  })
}

var poller = window.setInterval(fetchData, 4000)