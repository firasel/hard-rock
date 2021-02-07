// search music data load for api
let dataLoad = async searchName => {
    let url = `https://api.lyrics.ovh/suggest/${searchName}`
    try {
        let response = await fetch(url);
        let data = await response.json();
        // pass parameter in function for showing all music result
        dataShow(data.data)
        // previous error message empty
        document.getElementById('errorMessage').innerText = ''
        // previous lyrics empty
        document.getElementById('showLyricsResult').innerText = '';
    } catch (error) {
        // previous lyrics empty
        document.getElementById('showLyricsResult').innerText = '';
        // previous search result empty
        document.getElementById('showSearchResult').innerText = '';
        errorMessage('music not found!, please try again later.')
    }
}


// search all music result show in html page
let dataShow = data => {
    const showResult = document.getElementById('showSearchResult')
    showResult.innerText = ''
    data.forEach(song => {
        let resultDiv = document.createElement('div')
        resultDiv.className = 'single-result row align-items-center my-3 p-3'
        // html element for one by one music object
        let singleResultDiv = `    
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p><br>
                <audio controls>
                    <source src="${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="showLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>`

        resultDiv.innerHTML = singleResultDiv
        showResult.appendChild(resultDiv)
    });
}


// showing music lyrics in html page this music
let showLyrics = async (artist, title) => {
    let showResult = document.getElementById('showLyricsResult')
    let url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    try {
        let response = await fetch(url);
        let data = await response.json();
        if (data.lyrics.trim() !== '') {
            console.log(data)
            showResult.innerText = data.lyrics
            // previous error message empty
            document.getElementById('errorMessage').innerText = '';
        } else {
            // previous lyrics empty
            document.getElementById('showLyricsResult').innerText = '';
            errorMessage('lyrics not found!, please try again.');
        }
    } catch (error) {
        // previous lyrics empty
        document.getElementById('showLyricsResult').innerText = '';
        errorMessage('lyrics not found!, please try again.');
    }
}


// showing error message for any errors
let errorMessage = (message) => {
    let errorDiv = document.getElementById('errorMessage');
    let element = document.createElement('h4');
    element.className = 'text-center text-danger text-bold';
    element.textContent = message;

    //previous error message empty
    errorDiv.innerText = '';
    errorDiv.appendChild(element);
}


// get user input
let userInput = () => {
    const userInput = document.getElementById('searchInput')
    dataLoad(userInput.value)
    userInput.value = ''
}

//added event listener in search button
document.getElementById('searchButton').addEventListener('click', userInput)