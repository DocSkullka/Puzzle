(() => {
    "use strict";
    document.body.insertAdjacentHTML("afterbegin", '\n<audio id="audioPuzzle" src="move.mp3"></audio>\n<div class="container">\n\n<div class="cover_opacity"></div>\n\n<div class="popup_container">\n<p class="popup_message"></p>\n<p class="popup_top_list"></p>\n<div class="popup_close popup_nav_close">\n   <span class="popup_close popup_close_line"></span>\n   <span class="popup_close popup_close_line"></span>\n</div>\n</div>\n\n<div class="container_control">\n   <button class="button" id="shuffleButton">Shuffle</button>\n   <button class="button" id="soundButton">Sound ON</button>\n   <button class="button" id="saveButton">Save</button>\n   <button class="button" id="resultButton">Results</button>\n</div>\n<div class="container_information">\n   <div class="information_half">\n      <span class="information information_moves_label">Movies:</span>\n      <span class="information information_moves_volume">5</span>\n   </div>\n\n   <div class="information_half">\n      <span class="information information_time_label">Time: </span>\n      <span class="information information_time_volume">00:00:00</span>\n   </div>\n</div>\n\n<div class="contaier_puzzle">\n\n</div>\n\n<p class="size_information">Frame size: 4 X 4 </p>\n\n<div class="form_radio_group">\n   <div class="form_radio_group-item">\n      <input id="radio-1" class="radio_board_size_item" type="radio" name="radio" value="3">\n      <label for="radio-1">3 x 3</label>\n   </div>\n   <div class="form_radio_group-item">\n      <input id="radio-2" class="radio_board_size_item" type="radio" name="radio" value="4" checked>\n      <label for="radio-2">4 x 4</label>\n   </div>\n   <div class="form_radio_group-item">\n      <input id="radio-3" class="radio_board_size_item" type="radio" name="radio" value="5">\n      <label for="radio-3">5 x 5</label>\n   </div>\n   <div class="form_radio_group-item">\n      <input id="radio-4" class="radio_board_size_item" type="radio" name="radio" value="6">\n      <label for="radio-4">6 x 6</label>\n   </div>\n   <div class="form_radio_group-item">\n      <input id="radio-5" class="radio_board_size_item" type="radio" name="radio" value="7">\n      <label for="radio-5">7 x 7</label>\n   </div>\n   <div class="form_radio_group-item">\n      <input id="radio-6" class="radio_board_size_item" type="radio" name="radio" value="8">\n      <label for="radio-6">8 x 8</label>\n   </div>\n</div>\n</div>\n'), window.addEventListener("load", (function () {})), window.addEventListener("beforeunload", (function () {}));
    let e = [];
    if (localStorage.getItem("winnerTop10")) try {
        e = JSON.parse(localStorage.getItem("winnerTop10"))
    } catch {
        alert('Данные "TОП-10" в LocalStorag повреждены, и для дальнейшей нормальной работы будут очищены! Список топа формируется заново.'), localStorage.removeItem("winnerTop10")
    }

    function n(n, t) {
        let o = new Date,
            i = {
                steps: t,
                time: n,
                date: `${o.getDate()}.${o.getMonth()+1}.${o.getFullYear()}`
            };
        e.push(i), e.sort((function (e, n) {
            return e.steps - n.steps || e.time - n.time
        })), console.log(e), e.length = e.length > 10 ? 10 : e.length, localStorage.setItem("winnerTop10", JSON.stringify(e))
    }
    const t = document.querySelector(".information_time_volume");
    let o, i, a, r, s = Date.now(),
        l = setInterval(c, 100);

    function c() {
        o = Date.now() - s, i = Math.floor(o / 1e3 % 60), a = Math.floor(o / 6e4 % 60), r = Math.floor(o / 36e5 % 24), r = r < 10 ? "0" + r : r, a = a < 10 ? "0" + a : a, i = i < 10 ? "0" + i : i, t.innerHTML = r + ":" + a + ":" + i
    }
    const d = document.querySelector("#soundButton"),
        u = document.querySelector("#audioPuzzle");
    d.addEventListener("click", (function () {
        d.classList.toggle("sound_off"), d.innerHTML = d.classList.contains("sound_off") ? "Sound OFF" : "Sound ON"
    }));
    const p = document.querySelectorAll(".radio_board_size_item"),
        m = document.querySelector(".size_information"),
        _ = document.querySelector(".contaier_puzzle"),
        f = document.querySelector(".information_moves_volume"),
        v = document.querySelector(".popup_message");
    document.querySelector("#resultButton");
    document.querySelector("#shuffleButton").addEventListener("click", T);
    let b, L, h = 0,
        g = 0,
        z = [
            []
        ],
        y = "";

    function M() {
        for (let e of p) e.checked && (g = e.value, m.innerHTML = `Frame size: ${g} X ${g}`, _.style.fontSize = g < 5 ? "max(0.8em, min(3em, 10vw))" : g > 6 ? "max(0.8em, min(3em, 4vw))" : "max(0.8em, min(3em, 6vw))", T())
    }

    function T() {
        clearInterval(l), s = Date.now(), l = setInterval(c, 100), y = "", h = 0, f.innerHTML = h, [b, L] = [g - 1, g - 1], z.length = 0, _.innerHTML = "", _.style.gridTemplateColumns = `repeat(${g}, 1fr)`,
            function () {
                let e = g ** 2;
                for (let n = 0; n < g; n++) {
                    z[n] = [];
                    for (let t = 0; t < g; t++) {
                        let o = document.createElement("div");
                        o.className = 1 === e ? "puzzle_chip puzzle_chip_zero" : "puzzle_chip", o.id = `${n}_${t}`, o.innerHTML = e > 1 ? n * g + t + 1 : 0, _.append(o), o.addEventListener("click", S), z[n][t] = o, y += e > 1 ? n * g + t + 1 : 0, e--
                    }
                }
            }(),
            function (e, n, t) {
                for (let o = 0; o < 13333; o++) switch (Math.round(3 * Math.random())) {
                    case 0:
                        0 != n && H(e[--n][t]);
                        break;
                    case 1:
                        t != g - 1 && H(e[n][++t]);
                        break;
                    case 2:
                        n != g - 1 && H(e[++n][t]);
                        break;
                    case 3:
                        0 != t && H(e[n][--t])
                }
            }(z, b, L)
    }

    function S(e) {
        let o = e.srcElement || e.target,
            i = o.id.charAt(0),
            a = o.id.charAt(2);
        if (i == b && 1 == Math.abs(a - L) || a == L && 1 == Math.abs(i - b)) {
            let e = document.getElementById(b + "_" + L);
            ! function (e, n) {
                let t = 102 * (n.id.charAt(2) - e.id.charAt(2)),
                    o = 102 * (n.id.charAt(0) - e.id.charAt(0));
                e.style.transition = "0.3s all", e.style.transform = `translate(${t}%, ${o}%)`
            }(o, e), d.classList.contains("sound_off") ? u.pause() : u.play(), setTimeout((function () {
                e.innerHTML = o.innerHTML, e.classList.remove("puzzle_chip_zero"), o.innerHTML = 0, o.classList.add("puzzle_chip_zero"), b = i, L = a, h += 1, f.innerHTML = h, o.style.transition = "0s", o.style.transform = "none", b == L && b == g - 1 && function () {
                    let e = "";
                    return z.forEach(((n, t) => {
                        n.forEach(((n, t) => {
                            e += n.innerHTML
                        }))
                    })), y == e
                }() && (clearInterval(l), v.innerHTML = `Hooray! <br> You solved the puzzle <br> in ${t.innerHTML} <br> and ${h} moves!`, n(t.innerHTML, h), E(), q())
            }), 300)
        }
    }

    function H(e) {
        let n = e.id.charAt(0),
            t = e.id.charAt(2);
        if (n == b && 1 == Math.abs(t - L) || t == L && 1 == Math.abs(n - b)) {
            let o = document.getElementById(b + "_" + L);
            o.innerHTML = e.innerHTML, o.classList.remove("puzzle_chip_zero"), e.innerHTML = 0, e.classList.add("puzzle_chip_zero"), b = n, L = t
        }
    }
    p.forEach((e => {
        e.addEventListener("change", M)
    })), M();
    const w = document.querySelector(".cover_opacity");

    function E() {
        w.classList.toggle("opacity-activ")
    }
    const $ = document.querySelector(".popup_container");

    function q() {
        $.classList.toggle("popup_container-activ")
    }
    document.addEventListener("click", (e => {
        if ((e.target.classList.contains("cover_opacity") || e.target.classList.contains("popup_close") || e.target.classList.contains("popup_logo_text") || e.target.classList.contains("popup_link")) && $.classList.contains("popup_container-activ")) {
            E();
            let e = v.innerHTML;
            q(), setTimeout((function () {
                x.innerHTML = "", v.innerHTML = ""
            }), 800), e.includes("Hooray!") && T()
        }
    }));
    const k = document.querySelector("#resultButton"),
        x = document.querySelector(".popup_top_list");
    k.addEventListener("click", (function () {
        v.innerHTML = "TOP-10", x.innerHTML = function (e) {
            let n = "";
            return e.forEach(((e, t) => {
                n += `${t+1}=> steps ${e.steps}; time ${e.time}; date ${e.date}<br>`
            })), n
        }(e), x.style.fontSize = "max(0.8em, min(2em, 4vw))", E(), q()
    }))
})();