window.onload = function() {
    const players = document.querySelectorAll('[data-type=player]');
    console.log(players);
    const circles = document.querySelector(".playlist__image");
    //const decor = document.querySelectorAll(".equalizer");
    const equalizers = document.querySelectorAll('[data-type=equalizer]');
    console.log(equalizers)
    
    function initPlayer(player) {
        const playButton = player.querySelector('[data-type=playButton]');
        const icon = playButton.querySelector('[data-type=icon]');
        const playerSong = player.querySelector('#song');
        const progressContainer = player.querySelector('[data-type=progressContainer]');
        const progressBar = player.querySelector('[data-type=progressBar]');
        const timer = player.querySelector('[data-type=timer]');
        const playList = player.querySelector('[data-type=playlist]');
        const songList = player.querySelectorAll('[data-type=songname]');
        // duration = current time
        // set next :
        //          1. find current song
        //          2. then change player.src to his nextEl.dataset.value
        //          3. play the piano 
        function setCurrent(e) {
            playerSong.src = e.path[0].dataset.value;
            songList.forEach(song => song.classList.remove('current'));
            this.classList.add('current');
            player.classList.remove('play')
            togglePlayer();
        }

        if(songList) {
            songList.forEach(song => {
                song.addEventListener('click', setCurrent)
            })
        }
        player.addEventListener('load', (e) => {
            console.log(e);
        });

        function togglePlayer() {
            const isPlaying = player.classList.contains('play');
            if(isPlaying){
                player.classList.remove('play')
                circles.classList.remove('play')
                equalizers.forEach(item => {
                    item.querySelectorAll('[data-type=stick]').forEach(stick => {
                      stick.classList.remove('active')
                    })
                  })
                icon.textContent = 'play_arrow'
                playerSong.pause();
            } else {
                player.classList.add('play')
                circles.classList.add('play')
                equalizers.forEach(item => {
                    item.querySelectorAll('[data-type=stick]').forEach(stick => {
                      stick.classList.add('active')
                    })
                  })
                icon.textContent = 'pause';
                playerSong.play();
            }
        }

        function updateProgress(e) {
            const {duration, currentTime} = e.srcElement
            const progressPersent = currentTime / duration * 100;
            progressBar.style.width = `${progressPersent}%`
            timer.textContent = `${Math.trunc(currentTime/600)}${Math.trunc(currentTime/59)}:${Math.trunc(Math.round(currentTime % 59)/10)}${Math.trunc(Math.round(currentTime % 59)%10)} - ${Math.trunc(duration/600)}${Math.trunc(duration/60)}:${Math.round(duration % 60)}`
            if (currentTime === duration) autoSwitch();
        }   

        function autoSwitch() {
            const current = playList.querySelector('.current');
            const next = current.nextElementSibling;
            console.log(next);
            current.classList.remove('current');
            if (next) {
                next.classList.add('current');
                playerSong.src = next.dataset.value;
                playerSong.play();
            } else {
                console.log(playList.firstElementChild);
                playerSong.src = playList.firstElementChild.dataset.value;
                playList.firstElementChild.classList.add('current');
                playerSong.play();    
            }
        }

        function setProgress(e) {
            const width = this.clientWidth;
            const clickX = e.offsetX;
            const duration = playerSong.duration;
            playerSong.currentTime = clickX/width*duration

        }

        playButton.addEventListener('click', togglePlayer);
        playButton.addEventListener('click', function(e) {
            console.log(e)
        })
        playerSong.addEventListener('timeupdate', updateProgress);
        progressContainer.addEventListener('click',setProgress);
        progressContainer.addEventListener('mousedown', setProgress);
        }

    players.forEach(player => initPlayer(player));




    const sliderList = document.querySelectorAll('[data-type=slider]');

    function initSlider(slider) {
        const screen = slider.querySelector('[data-type=container]')
        const gap = 30;
        const list = slider.querySelector('[data-type=list]');
        const buttons = slider.querySelectorAll('[data-type=button]');
        const displayWidth = screen.getBoundingClientRect().width;
        console.log(displayWidth)
        const items = list.querySelectorAll('[data-type=item]');
        const itemWidth = items[0].getBoundingClientRect().width+gap;
        const displayItems = Math.round(displayWidth/itemWidth);
        console.log(displayItems)
        list.style.gap = gap + 'px';
        screen.style.width = `${itemWidth*displayItems}px`;
        let count = 0;
        function move() {
            let direction = this.dataset.value;
            direction === "next" ? count++ : count--;
            if(count > items.length-displayItems) {count = 0}
            if (count < 0) {count = items.length-displayItems}
            list.style.transform = `translate(-${count*itemWidth}px)`
        }
        buttons.forEach(button => button.addEventListener('click', move))
    }   


    sliderList.forEach(slider => initSlider(slider))
    window.addEventListener('resize', () => {
        sliderList.forEach(slider => initSlider(slider))    
    })
};

