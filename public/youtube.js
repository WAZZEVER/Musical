const overlay = document.getElementById("overlay");

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '600',
    width: '100%',
    videoId: 'Ltdz7ACq3gs',
    playerVars: {
      'autoplay': 1,
      'controls': 0,
      'disablekb': 1,
      'fs': 0,
      'modestbranding': 1,
      'playsinline': 1,
      'showinfo': 0,
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

function onPlayerReady(event) {
}

function onPlayerStateChange(event) {
  var state = player.getPlayerState();
  console.log("Player state: " + state);
  if (state == "0") {
    mineManually()
    alert("Ended, After you pressed ok page will reload after 5 seconds!")
    setTimeout(function() {
      location.reload();
    }, 5000);
  } else if (state == "2") {
    alert("Pls unpause the video!");
  }
}
