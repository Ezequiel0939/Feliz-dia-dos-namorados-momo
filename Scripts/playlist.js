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