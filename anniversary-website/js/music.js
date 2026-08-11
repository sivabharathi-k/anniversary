/**
 * Music Gift Page — music.js
 *
 * Play button opens Spotify (handled by the <a> wrapper in HTML).
 * This file handles the decorative waveform animation on click.
 */

(function () {
    'use strict';

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var waveform       = document.querySelector('.waveform');
    var progressFill   = document.querySelector('.progress-fill');
    var progressDot    = document.querySelector('.progress-dot');
    var playLink       = document.querySelector('.ctrl-play-link');

    /* Animate waveform briefly when play is clicked (visual feedback) */
    if (playLink && !prefersReduced) {
        playLink.addEventListener('click', function () {
            if (!waveform) return;
            waveform.classList.add('playing');
            /* Stop after 3 s — just a visual burst before Spotify opens */
            setTimeout(function () {
                waveform.classList.remove('playing');
            }, 3000);
        });
    }

    /* Set initial decorative progress position */
    document.addEventListener('DOMContentLoaded', function () {
        if (progressFill) progressFill.style.width = '26%';
        if (progressDot)  progressDot.style.left   = '26%';
    });

}());
