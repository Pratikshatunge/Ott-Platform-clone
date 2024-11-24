document.addEventListener('DOMContentLoaded', () => {
    let left_btn = document.querySelector('.bi-chevron-left');
    let right_btn = document.querySelector('.bi-chevron-right');
    let cards = document.querySelector('.cards');
    let search = document.querySelector('.search');
    let search_input = document.getElementById('search_input');
    let play = document.getElementById('play');
    let series = document.getElementById('series');
    let movies = document.getElementById('movies');
    let kids = document.getElementById('kids');

    left_btn.addEventListener('click', () => {
        cards.scrollLeft -= 140;
    });

    right_btn.addEventListener('click', () => {
        cards.scrollLeft += 140;
    });

    let json_url = "movie.json";

    fetch(json_url)
        .then(response => response.json())
        .then((data) => {
            data.forEach((ele, i) => {
                let { name, imdb, date, sposter, bposter, genre, url } = ele;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                    <img src="${sposter}" alt="${name}" class="poster">
                    <div class="rest_card">
                        <img src="${bposter}" alt="${name}">
                        <div class="cont">
                            <h4>${name}</h4>
                            <div class="sub">
                                <p>${genre}, ${date}</p>
                                <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                            </div>
                        </div>
                    </div>
                `;
                cards.appendChild(card);
            });

            // Dynamic title, genre, date, and rating
            document.getElementById('title').innerText = data[0].name;
            document.getElementById('gen').innerText = data[0].genre;
            document.getElementById('dare').innerText = data[0].date;
            document.getElementById('rate').innerHTML = `<span><i class="bi bi-star-fill"></i>${data[0].imdb}</span>`;

            // Search data load
            data.forEach(element => {
                let { name, imdb, date, sposter, genre, url } = element;
                let card = document.createElement('a');
                card.classList.add('card');
                card.href = url;
                card.innerHTML = `
                    <img src="${sposter}" alt="${name}">
                    <div class="cont">
                        <h3>${name}</h3>
                        <p>${genre}, ${date}, <span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</p>
                    </div>
                `;
                search.appendChild(card);
            });

            search_input.addEventListener('input', () => {
                let filter = search_input.value.trim().toUpperCase();
                let a = search.getElementsByTagName('a');

                for (let index = 0; index < a.length; index++) {
                    let b = a[index].getElementsByClassName('cont')[0];
                    let textValue = b.textContent || b.innerText;
                    let card = a[index];

                    if (textValue.toUpperCase().indexOf(filter) >= 0) {
                        card.style.display = "flex";
                        search.style.visibility = "visible";
                        search.style.opacity = 1;
                    } else {
                        card.style.display = "none";
                    }
                }

                // Check if the search input is empty
                if (filter === "") {
                    // If empty, hide the search container
                    search.style.visibility = "hidden";
                    search.style.opacity = 0;
                } else {
                    // If not empty, show the search container
                    search.style.visibility = "visible";
                    search.style.opacity = 1;
                }
            });

            play.addEventListener('click', () => {
                let video = document.querySelector('video');

                if (video.paused) {
                    video.play();
                    play.innerHTML = `Pause <i class="bi bi-pause-fill"></i>`;
                } else {
                    video.pause();
                    play.innerHTML = `Play <i class="bi bi-play-fill"></i>`;
                }
            });

            series.addEventListener('click', () => {
                cards.innerHTML = ''; // Clear existing content

                let seriesArray = data.filter(ele => ele.type === "series");

                seriesArray.forEach(ele => {
                    let { name, imdb, date, sposter, bposter, genre, url } = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = url;
                    card.innerHTML = `
                        <img src="${sposter}" alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="${name}">
                            <div class="cont">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                    <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                                </div>
                            </div>
                        </div>
                    `;
                    cards.appendChild(card);
                });
            });

            movies.addEventListener('click', () => {
                cards.innerHTML = ''; // Clear existing content

                let moviesArray = data.filter(ele => ele.type === "Movie");

                moviesArray.forEach(ele => {
                    let { name, imdb, date, sposter, bposter, genre, url } = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = url;
                    card.innerHTML = `
                        <img src="${sposter}" alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="${name}">
                            <div class="cont">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                    <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                                </div>
                            </div>
                        </div>
                    `;
                    cards.appendChild(card);
                });
            });

            kids.addEventListener('click', () => {
                cards.innerHTML = ''; // Clear existing content

                let kidsArray = data.filter(ele => ele.type === "Kids");

                kidsArray.forEach(ele => {
                    let { name, imdb, date, sposter, bposter, genre, url } = ele;
                    let card = document.createElement('a');
                    card.classList.add('card');
                    card.href = url;
                    card.innerHTML = `
                        <img src="${sposter}" alt="${name}" class="poster">
                        <div class="rest_card">
                            <img src="${bposter}" alt="${name}">
                            <div class="cont">
                                <h4>${name}</h4>
                                <div class="sub">
                                    <p>${genre}, ${date}</p>
                                    <h3><span>IMDB</span><i class="bi bi-star-fill"></i>${imdb}</h3>
                                </div>
                            </div>
                        </div>
                    `;
                    cards.appendChild(card);
                });
            });
        });
});
