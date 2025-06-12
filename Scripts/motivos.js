// Função de corações
    var love = setInterval(function () {
        var r_num = Math.floor(Math.random() * 40) + 1;
        var r_size = Math.floor(Math.random() * 65) + 10;
        var r_left = Math.floor(Math.random() * 100) + 1;
        var r_bg = Math.floor(Math.random() * 25) + 100;
        var r_time = Math.floor(Math.random() * 5) + 5;

        var heart1 = $("<div class='heart'></div>").css({
            width: r_size + "px",
            height: r_size + "px",
            left: r_left + "%",
            background: "rgba(255," + (r_bg - 25) + "," + r_bg + ",1)",
            animation: "love " + r_time + "s ease forwards"
        });

        var heart2 = $("<div class='heart'></div>").css({
            width: (r_size - 10) + "px",
            height: (r_size - 10) + "px",
            left: (r_left + r_num) + "%",
            background: "rgba(255," + (r_bg - 25) + "," + (r_bg + 25) + ",1)",
            animation: "love " + (r_time + 5) + "s ease forwards"
        });

        $(".bg_heart").append(heart1, heart2);

        // Remove depois que a animação termina
        setTimeout(function () {
            heart1.remove();
            heart2.remove();
        }, (r_time + 5) * 1000);

    }, 500);

    // Texto digitando
    var i = 0;
    var txt1 = "Se eu fosse listar todos os motivos, Sophia, acho que você ficaria presa por horas, talvez dias, lendo.....!  <<               São tantos, tantos detalhes, tantos jeitos seus que fazem meu coração simplesmente parar e depois correr de novo, só de lembrar que você existe. <<<                Eu amo você porque você é você. Porque seu jeito é único, verdadeiro, e quando você fala comigo, parece que o mundo silencia só pra eu te escutar. Sua risada é uma melodia que acalma minha alma. Seus olhos...!                                                                           > .  <<                  apesar de não ter visto eles pessoalmente, eles dizem coisas que palavras não alcançam. Seu sorriso tem o poder de fazer qualquer dor ficar menor. Sua boca, sua voz, tudo em você me encanta de um jeito que nem sei explicar direito....!                                                     > Mas acima de tudo...!                     << eu te amo porque você chegou na minha vida num momento em que tudo parecia desabar. E você, com seu jeito leve e forte ao mesmo tempo, me fez parar de pensar em desistir. Você me mostrou o que é amar, de verdade.!                                                     > Me ensinou que existe alguém nesse mundo capaz de segurar minha mão, mesmo de longe, e me fazer sentir em casa.!                    << Você é minha flor de girassol no meio do caos...!                                                             >E não importa quantos motivos existam, todos eles se resumem a isso: <eu te amo Sophia.....! |                  <<<< porque você é o amor em forma de pessoa!";
    var speed = 50;

    // ====== Música ======
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

    // ====== Digitação com música iniciando no começo ======
    function typeWriter() {
        // Inicia a música na primeira letra, só uma vez
        if (i === 0 && !window._musicaTocou) {
            fadeIn(audio);
            playBtn.querySelector('i').textContent = '⏸';
            window._musicaTocou = true;
        }

        if (i < txt1.length) {
            const char = txt1.charAt(i);

            if (char == '<') {
                document.getElementById("text1").innerHTML += '</br>';
            } else if (char == '>') {
                document.getElementById("text1").innerHTML = '';
            } else if (char == '|') {
                $(".bg_heart").css("background-image", height=100% "url('https://st4.depositphotos.com/22906252/24292/i/450/depositphotos_242925114-stock-photo-field-blooming-sunflowers-summer-ukraine.jpg'");
            } else {
                document.getElementById("text1").innerHTML += char;
            }

            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();