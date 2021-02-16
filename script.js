// Event listener for collapsible item
var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function () {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

// Audio Logic
var song = new Audio();
var muted = false;
var vol = 1;
var spe = 1;
var curtime = 0;

function onSongClicked(thisObject) {
  // Show player and details
  document.querySelector(".audio-player").style.display = "block";
  document.querySelector(".audio-details").style.display = "block";

  // Stop the previous song
  if (!song.paused) {
    song.pause();
  }

  // Reset the song and set global values
  // Reset the play button
  document.querySelector(".btn-playpause").innerHTML =
    '<i class="fa fa-play fa-2x"></i>';
  var selectedSongElement = thisObject;
  song.src = selectedSongElement.dataset.songaudio;
  song.type = "audio/mpeg";
  song.currentTime = 0;
  song.playbackRate = spe;

  // Once the song is loaded
  song.onloadedmetadata = () => {
    timeUpdateListener();
  }

  // Set other parameters
  // Set title
  var playingPodcastTitle = selectedSongElement.parentNode.querySelector(
    ".audio-title"
  );
  document.querySelector(".playing-audio-title").innerHTML =
    playingPodcastTitle.innerHTML;

  // Set publication date
  var playingPodcastDate = selectedSongElement.parentNode.querySelector(
    ".publication-date"
  );
  document.querySelector(".playing-audio-publication-date").innerHTML =
    playingPodcastDate.innerHTML;

  // Set description
  var playingPodcastDescription = selectedSongElement.parentNode.querySelector(
    ".description"
  );
  document.querySelector(".playing-audio-description").innerHTML =
    playingPodcastDescription.innerHTML;
}

function skip(time) {
  if (time == "back") {
    song.currentTime = song.currentTime - 5;
  } else if (time == "fwd") {
    song.currentTime = song.currentTime + 5;
  }
}

function playpause(elemID) {
  if (!song.paused) {
    song.pause();
    document.querySelector(".btn-playpause").innerHTML =
      '<i class="fa fa-play fa-2x"></i>';
  } else {
    song.play();
    document.querySelector(".btn-playpause").innerHTML =
      '<i class="fa fa-pause fa-2x"></i>';
  }
}

function stop() {
  song.pause();
  song.currentTime = 0;
  document.getElementById("seek").value = 0;
}
function setPos(pos) {
  song.currentTime = pos;
}

// function setVolume(volume) {
//   song.volume = volume;
//   vol = volume;
// }

function setSpeed(speed) {
  song.playbackRate = speed;
  spe = speed;
}

song.addEventListener("timeupdate", () => {
  if(!isNaN(song.duration)) {timeUpdateListener()}
});

function timeUpdateListener() {
        document.querySelector(".total-duration").innerHTML = "00:00";
        curtime = parseInt(song.currentTime, 10);
        document.getElementById("seek").max = song.duration;
        document.getElementById("seek").value = curtime;
    
        // Calculate the time left and the total duration
        let currentMinutes = Math.floor(song.currentTime / 60);
        let currentSeconds = Math.floor(song.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(song.duration / 60);
        let durationSeconds = Math.floor(song.duration - durationMinutes * 60);
    
        // Add a zero to the single digit time values
        if (currentSeconds < 10) {
          currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
          durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
          currentMinutes = "0" + currentMinutes;
        }
        if (durationMinutes < 10) {
          durationMinutes = "0" + durationMinutes;
        }
    
        document.querySelector(".total-duration").innerHTML =
          durationMinutes + ":" + durationSeconds;
        document.querySelector(".current-time").innerHTML =
          currentMinutes + ":" + currentSeconds;
}
