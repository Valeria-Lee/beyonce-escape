const buttons = document.querySelectorAll('.dropdown-item')
const playBtn = document.querySelector('#play-btn')
const pauseBtn = document.querySelector('#pause-btn')
const audio = document.querySelector('audio')
const title = document.querySelector('#song-title')
var current_song = ""
var selected_song = ""
var selected_title = ""
var songPlaying = false

buttons.forEach( button => {
  button.addEventListener("click", () => {
    selected_song = button.id
    selected_title = button.innerText
  })
})

playBtn.addEventListener("click", () => {
  if (!songPlaying) {
    songPlaying = true
  }  
  if (current_song != selected_song) {
    current_song = selected_song
    songPlaying = false
    setSong()
  }
  audio.play()
})

function setSong() {
  current_song = selected_song
  title.innerText = selected_title
  audio.setAttribute("src", `${current_song}.mp3`)
}

pauseBtn.addEventListener("click", () => {
  audio.pause()
})
