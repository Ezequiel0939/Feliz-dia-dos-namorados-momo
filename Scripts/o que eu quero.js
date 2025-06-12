const playBtn = document.getElementById('PlayBtn');
    const audio = document.getElementById('musicaFundo');

    // ====== Fade-in e Fade-out ======
    function fadeIn(audio) {
        audio.volume = 0;
        audio.loop = true;
        audio.play().catch((e) => {
            console.log("Autoplay bloqueado: ", e);
        });

        let fade = setInterval(() => {
            if (audio.volume < 1) {
                audio.volume = Math.min(audio.volume + 0.1, 1);
            } else {
                clearInterval(fade);
            }
        }, 200);
    }

    function fadeOut(audio) {
        let fade = setInterval(() => {
            if (audio.volume > 0.1) {
                audio.volume = Math.max(audio.volume - 0.1, 0);
            } else {
                audio.volume = 0;
                audio.pause();
                clearInterval(fade);
            }
        }, 200);
    }

    // ====== Botão de Play/Pause ======
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            fadeIn(audio);
            playBtn.querySelector('i').textContent = '⏸';
        } else {
            fadeOut(audio);
            playBtn.querySelector('i').textContent = '▶';
        }
    });

    // ====== Tocar ao primeiro clique ou movimento ======
    function tocarMusicaAutomaticamente() {
        if (!window._musicaTocou) {
            fadeIn(audio);
            playBtn.querySelector('i').textContent = '⏸';
            window._musicaTocou = true;

            // Remove os ouvintes após tocar
            window.removeEventListener('click', tocarMusicaAutomaticamente);
            window.removeEventListener('mousemove', tocarMusicaAutomaticamente);
        }
    }

    window.addEventListener('click', tocarMusicaAutomaticamente);
    window.addEventListener('mousemove', tocarMusicaAutomaticamente);

    // ====== Autoplay no primeiro scroll (mantido junto) ======
    window.addEventListener('scroll', () => {
        if (!window._musicaTocou) {
            fadeIn(audio);
            playBtn.querySelector('i').textContent = '⏸';
            window._musicaTocou = true;
        }
    });