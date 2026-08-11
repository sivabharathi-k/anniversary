/**
 * Secret Page — secret.js
 * Back button: fade out → return to login.html
 * Background particles: same logic as login.js
 */

(function () {
    'use strict';

    var page    = document.getElementById('secretPage');
    var backBtn = document.getElementById('backBtn');

    /* ── Back button ────────────────────────────────────────── */
    if (backBtn) {
        backBtn.addEventListener('click', function () {
            if (page) page.classList.add('fade-out');
            setTimeout(function () {
                window.location.href = 'index.html';
            }, 650);
        });
    }

    /* ── Background particles (identical to login.js) ───────── */
    var prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    var SYMBOLS        = ['♡', '✦', '·', '˚', '✿', '♡', '✦', '♡'];
    var container      = document.getElementById('bgParticles');
    var PARTICLE_COUNT = 22;

    function randomBetween(a, b) {
        return a + Math.random() * (b - a);
    }

    function createParticle() {
        var el       = document.createElement('span');
        el.className = 'particle';
        el.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
        el.style.left            = randomBetween(2, 96) + 'vw';
        el.style.bottom          = '-40px';
        el.style.fontSize        = randomBetween(10, 18) + 'px';
        el.style.animationDuration = randomBetween(12, 28) + 's';
        el.style.animationDelay  = randomBetween(0, 18) + 's';
        return el;
    }

    if (container && !prefersReduced) {
        for (var i = 0; i < PARTICLE_COUNT; i++) {
            container.appendChild(createParticle());
        }
    }

}());
