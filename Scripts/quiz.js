const quizData = [
      { question: "Pronta pra responder?", options: ["Sim"], answer: "Sim" },
      { question: "Qual dia a gente se conheceu?", options: ["02/01/2025", "04/01/2025", "tudo não passa de uma simulação"], answer: "04/01/2025" },
      { question: "tu me ama?", options: ["Sim", "não"], answer: "Sim" },
      { question: "Certeza?", options: ["Sim", "não"], answer: "Sim" },
      { question: "Absoluta?", options: ["Vou te esmurrar", "não"], answer: "Vou te esmurrar" },
      { question: "Só pra confirmar mesmo, vai que né?", options: ["Ezequiel...", "não"], answer: "Ezequiel..." },
      { question: "Tá bom, entendi. Então clica no eu te amo", options: ["Eu te amo", "não"], answer: "Eu te amo" },
      { question: "Batman ou Homem aranha?", options: ["Batman", "Miranha","Os dois são igualmente fodas"], answer: "Os dois são igualmente fodas" },
      { question: "Qual desses eu prefiro", options: ["Brigadeiro Foda","Passar uma hora no teu colo recebendo carinho"], answer: "Passar uma hora no teu colo recebendo carinho" },
      { question: "A gente sempre vai estar junto?", options: ["Sim", "não"], answer: "Sim" },
      { question: "Prometo te amar pra sempre, amor. Promete me amar?", options: ["Sim", "Ainda pergunta?"], answer: "Ainda pergunta?" },
      { question: "Vai se casar comigo?", options: ["Sim"], answer: "Sim" },
      { question: "Promete me amar até que a morte nos separe (ou até depois)?", options: ["uhum", "Nah"], answer: "uhum" },
      { question: "Te amo gatinha, tu me amas?", options: ["Amuuuuuuu", "Naum te amo"], answer: "Amuuuuuuu" }
    ];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const submitButton = document.getElementById("submit");

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    function showQuestion() {
      const question = quizData[currentQuestion];
      questionElement.innerText = question.question;

      optionsElement.innerHTML = "";
      selectedOption = null;

      question.options.forEach(option => {
        const button = document.createElement("button");
        button.innerText = option;
        button.addEventListener("click", () => {
          [...optionsElement.children].forEach(btn => btn.classList.remove("selected"));
          button.classList.add("selected");
          selectedOption = option;
        });
        optionsElement.appendChild(button);
      });
    }

    submitButton.addEventListener("click", () => {
      if (!selectedOption) return;

      if (selectedOption === quizData[currentQuestion].answer) {
        score++;
      }

      currentQuestion++;

      if (currentQuestion < quizData.length) {
        showQuestion();
      } else {
        showResult();
      }
    });

    function showResult() {
      document.getElementById("quiz").innerHTML = `
        <h1>✨ Parabens ✨</h1>
        <p>Você acertou ${score} de ${quizData.length} perguntas!</p>
        <p>TE AMO, PRINCESA. ISSO SO PROVA COMO VOCÊ LEMBRA DE MIM! 💍💖</p>
      `;
    }

    showQuestion();

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
        // Inicia a música após o primeiro clique ou movimento do mouse
  function iniciarMusica() {
    if (!hasInteracted) {
      audio.play().catch(() => {}); // ignora erros se o navegador bloquear
      hasInteracted = true;
    }
  }