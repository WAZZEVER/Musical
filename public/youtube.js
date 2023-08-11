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
  const progressBar = document.querySelector('.progress');
const totalTime = 180;
let currentTime = 0;

function updateProgressBar() {
    currentTime++;
    const progressPercent = (currentTime / totalTime) * 100;
    progressBar.value = progressPercent;
    progressBar.textContent = `${progressPercent.toFixed(0)}%`;

    if (currentTime < totalTime) {
        setTimeout(updateProgressBar, 1000); 
    }
}

updateProgressBar();
  if (state == "0"){
    mineManually()
    alert("Ended, After you pressed ok page will reload after 10 seconds!")
  setTimeout(function() {
    location.reload();
  }, 10000);      
  } else if (state == "2"){
    alert("Pls unpause the video!")
  }
}


