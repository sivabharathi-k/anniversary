/**
 * Login Page — login.js
 * Handles credential validation, shake animation, error display,
 * fade-out transition, and background particle generation.
 */

(function () {
    'use strict';

    /* ── Credentials ────────────────────────────────────────── */
    var CORRECT = {
        name:        'ArshiyaSivabharathi',
        password:    '1306',
        anniversary: '2nd Anniversary'
    };

    var REDIRECT = 'home.html';

    /* ── DOM refs ───────────────────────────────────────────── */
    var form        = document.getElementById('loginForm');
    var card        = document.getElementById('loginCard');
    var page        = document.querySelector('.login-page');
    var errorMsg    = document.getElementById('errorMsg');
    var nameInput   = document.getElementById('loginName');
    var passInput   = document.getElementById('loginPassword');
    var annivInput  = document.getElementById('loginAnniversary');

    /* ── Form submit ────────────────────────────────────────── */
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            handleLogin();
        });
    }

    function handleLogin() {
        var name   = nameInput   ? nameInput.value.trim()   : '';
        var pass   = passInput   ? passInput.value.trim()   : '';
        var anniv  = annivInput  ? annivInput.value.trim()  : '';

        var valid =
            name  === CORRECT.name &&
            pass  === CORRECT.password &&
            anniv === CORRECT.anniversary;

        if (valid) {
            loginSuccess();
        } else {
            loginFail();
        }
    }

    /* ── Success ────────────────────────────────────────────── */
    function loginSuccess() {
        hideError();

        /* Mark that audio should autoplay on the next page —
           this submit click counts as user interaction          */
        sessionStorage.setItem('bgMusicStarted', 'true');
        sessionStorage.removeItem('bgMusicMuted'); /* reset mute on fresh login */

        /* Fade out then redirect */
        if (page) page.classList.add('fade-out');
        setTimeout(function () {
            window.location.href = REDIRECT;
        }, 700);
    }

    /* ── Failure ────────────────────────────────────────────── */
    function loginFail() {
        showError();
        shakeCard();

        /* Clear password field for re-entry */
        if (passInput) {
            passInput.value = '';
            passInput.focus();
        }
    }

    function showError() {
        if (errorMsg) errorMsg.classList.add('visible');
    }

    function hideError() {
        if (errorMsg) errorMsg.classList.remove('visible');
    }

    /* Remove shake class after animation ends so it can retrigger */
    function shakeCard() {
        if (!card) return;
        card.classList.remove('shake');
        /* Force reflow to allow re-triggering the animation */
        void card.offsetWidth;
        card.classList.add('shake');
        card.addEventListener('animationend', function onEnd() {
            card.classList.remove('shake');
            card.removeEventListener('animationend', onEnd);
        });
    }

    /* Hide error as soon as user starts typing again */
    [nameInput, passInput, annivInput].forEach(function (el) {
        if (!el) return;
        el.addEventListener('input', hideError);
    });

    /* ── Hint link — fade out then go to secret.html ────────── */
    var hintLink = document.getElementById('hintLink');
    if (hintLink) {
        hintLink.addEventListener('click', function (e) {
            e.preventDefault();
            if (page) page.classList.add('fade-out');
            setTimeout(function () {
                window.location.href = 'secret.html';
            }, 650);
        });
    }

    /* ══════════════════════════════════════════════════════════
       BACKGROUND PARTICLES
       Floating tiny hearts and sparkles across the background.
       ══════════════════════════════════════════════════════════ */
    var prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    var SYMBOLS = ['♡', '✦', '·', '˚', '✿', '♡', '✦', '♡'];
    var container = document.getElementById('bgParticles');
    var PARTICLE_COUNT = 22;

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle() {
        var el = document.createElement('span');
        el.className = 'particle';
        el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];

        /* Random horizontal position */
        el.style.left = randomBetween(2, 96) + 'vw';

        /* Start below the viewport */
        el.style.bottom = '-40px';

        /* Random size */
        var size = randomBetween(10, 18);
        el.style.fontSize = size + 'px';

        /* Random duration between 12s and 28s */
        var dur = randomBetween(12, 28);
        el.style.animationDuration = dur + 's';

        /* Random delay so they don't all start together */
        el.style.animationDelay = randomBetween(0, 18) + 's';

        /* Slight random opacity peak */
        el.style.setProperty('--peak-opacity', randomBetween(0.25, 0.55));

        return el;
    }

    if (container && !prefersReduced) {
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            container.appendChild(createParticle());
        }
    }

}());
