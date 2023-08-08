const overlay = document.getElementById("overlay");

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '700',
    width: '100%',
    videoId: '7Y6QW8Fj8-o',
    playerVars: {
      'autoplay': 1,         // Autoplay the video
      'controls': 0,         // Hide video controls
      'disablekb': 1,        // Disable keyboard controls
      'fs': 0,               // Disable fullscreen option
      'modestbranding': 1,   // Hide YouTube logo
      'playsinline': 1,      // Play inline on mobile devices
      'showinfo': 0,         // Hide video information
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
