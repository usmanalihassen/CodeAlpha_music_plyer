// script.js
const songs = [
    { id: 1, title: "Song 1", src: "/music/song1.mp3", category: "Pop" },
    { id: 2, title: "Song 2", src: "/music/song2.mp3", category: "Rock" },
    { id: 3, title: "Song 3", src: "/music/song3.mp3", category: "Jazz" }
];

let currentIndex = 0;
let isPlaying = false;
const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("play-pause");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const volumeControl = document.getElementById("volume");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const songTitle = document.getElementById("song-title");

function loadSong(index) {
    songTitle.innerText = songs[index].title;
    audio.src = songs[index].src;
}

function playSong() {
    audio.play();
    isPlaying = true;
    playPauseBtn.innerText = "⏸";
}

function pauseSong() {
    audio.pause();
    isPlaying = false;
    playPauseBtn.innerText = "▶";
}

playPauseBtn.addEventListener("click", () => {
    isPlaying ? pauseSong() : playSong();
});

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    playSong();
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    playSong();
});

volumeControl.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filteredSongs = songs.filter(song => song.title.toLowerCase().includes(query));
    if (filteredSongs.length > 0) {
        currentIndex = songs.indexOf(filteredSongs[0]);
        loadSong(currentIndex);
    }
});

categorySelect.addEventListener("change", (e) => {
    const category = e.target.value;
    const filteredSongs = category ? songs.filter(song => song.category === category) : songs;
    if (filteredSongs.length > 0) {
        currentIndex = songs.indexOf(filteredSongs[0]);
        loadSong(currentIndex);
    }
});

loadSong(currentIndex);
