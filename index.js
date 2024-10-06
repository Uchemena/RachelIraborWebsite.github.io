const API_KEY = 'YOUR_YOUTUBE_API_KEY'; // Replace with your YouTube Data API key
const CHANNEL_ID = 'YOUR_CHANNEL_ID'; // Replace with your YouTube channel ID
const MAX_RESULTS = 10; // Number of videos to fetch

async function fetchVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=${MAX_RESULTS}`);
    const data = await response.json();
    return data.items;
}

function createVideoElement(video) {
    const videoId = video.id.videoId;
    const title = video.snippet.title;
    const description = video.snippet.description;
    const thumbnail = video.snippet.thumbnails.high.url;

    return `
        <article>
            <h3>${title}</h3>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            <p>${description}</p>
        </article>
    `;
}

async function displayVideos() {
    const videos = await fetchVideos();
    const videoContainer = document.getElementById('video-container');
    videoContainer.innerHTML = videos.map(createVideoElement).join('');
}

document.addEventListener('DOMContentLoaded', displayVideos);