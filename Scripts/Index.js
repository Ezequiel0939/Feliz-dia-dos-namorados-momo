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

    // ====== Autoplay no primeiro scroll ======
        window.addEventListener('scroll', () => {
            if (!window._musicaTocou) {
                fadeIn(audio);
                playBtn.querySelector('i').textContent = '⏸';
                window._musicaTocou = true;
            }
        });

        window.addEventListener("scroll", () => {
            const scrollY = window.scrollY;
            const newSize = 100 + scrollY * 0.05;
            document.body.style.backgroundSize = `${newSize}%`;
        });

        const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    reveals.forEach((el) => {
        const top = el.getBoundingClientRect().top;

        if (top < triggerBottom) {
            el.classList.add("active");
        } else {
            el.classList.remove("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);

// Executa ao carregar também
revealOnScroll();