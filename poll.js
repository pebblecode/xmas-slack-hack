
function fetchData(){
  $.get('http://theguardianhivemind.com:5555/api/word', function(arr) {
    arr.map(function(i){
      if (i.word === 'christmas') {
        var num = -180 + (i.count * 6)
        document.getElementByClassName('needle')[0].style.transform = num + 'deg'
      }
    })
  })
}

var poller = window.setInterval(fetchData, 4000)