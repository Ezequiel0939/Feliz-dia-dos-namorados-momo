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

    // ====== Efeito de background com scroll ======
    window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const newSize = 100 + scrollY * 0.05;
        document.body.style.backgroundSize = `${newSize}%`;
    });
    //Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
  "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");

//-> Function that resets the size of the notes.
function recize_notes() {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].classList.contains("active")) {
      notes[i].classList.remove("active");
      gsap.set(notes[i], {
        height: "30%",
        clearProps: "all"
      });
    }
  }
}

//-> Main function that enables all the notes.
function notes_ready() {
  gsap.to(".js-envelop-content", {
    height: "110%",
    duration: 0.5
  });

  for (let i = 0; i < notes.length; i++) {
    notes[i].addEventListener("click", function () {
      if (mobile_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 125 + 40 * i + "%"
          });
        }
      } else if (tablet_media_query.matches) {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 80 + 21 * i + "%"
          });
        }
      } else {
        if (this.classList.contains("active")) {
          this.classList.remove("active");
          gsap.set(this, {
            height: "30%",
            clearProps: "all"
          });
        } else {
          for (let i = 0; i < notes.length; i++) {
            if (notes[i].classList.contains("active")) {
              notes[i].classList.remove("active");
              gsap.set(notes[i], {
                height: "30%",
                clearProps: "all"
              });
            }
          }
          this.classList.add("active");
          gsap.set(this, {
            height: 70 + 20 * i + "%"
          });
        }
      }
    });
  }
}

//-> Function that set up the up paper of the envelope.
function set_up_paper() {
  var arr = [0, 0, 100, 0, 50, 61];
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath:
      "polygon(" +
      arr[0] +
      "%" +
      arr[1] +
      "%," +
      arr[2] +
      "%" +
      arr[3] +
      "%," +
      arr[4] +
      "%" +
      arr[5] +
      "%)",
    onComplete: notes_ready
  });
}

//-> Function that starts the up paper transition.
function envelop_transition() {
  gsap.to(".js-up-paper", {
    bottom: "1%",
    duration: 0.25,
    onComplete: set_up_paper
  });
  document
    .querySelector(".js-up-paper")
    .removeEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

//-> Function that allows cut the sticker.
function sticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", sticker);
  document
    .querySelector(".js-up-paper")
    .addEventListener("click", envelop_transition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

document.querySelector(".js-sticker").addEventListener("click", sticker);

window.onresize = function (event) {
  recize_notes();
};