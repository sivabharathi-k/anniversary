/**
 * Music Gift Page — music.js
 *
 * Responsibilities:
 *  1. Play/Pause toggle for the decorative waveform animation
 *  2. Smooth progress-bar visual update while "playing"
 *  3. Reduced-motion awareness
 *  4. No actual audio — purely visual/decorative
 */

(function () {
    'use strict';

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── State ──────────────────────────────────────────────── */
    var isPlaying    = false;
    var progressPct  = 26;           // starts at 0:56 visually
    var animFrameId  = null;

    /* ── DOM refs ───────────────────────────────────────────── */
    var playBtn      = document.getElementById('playBtn');
    var iconPlay     = playBtn  && playBtn.querySelector('.icon-play');
    var iconPause    = playBtn  && playBtn.querySelector('.icon-pause');
    var progressFill = document.querySelector('.progress-fill');
    var progressDot  = document.querySelector('.progress-dot');
    var waveform     = document.querySelector('.waveform');

    /* ── Helpers ────────────────────────────────────────────── */
    function setProgress(pct) {
        pct = Math.min(Math.max(pct, 0), 100);
        if (progressFill) {
            progressFill.style.width = pct + '%';
        }
        if (progressDot) {
            progressDot.style.left = pct + '%';
        }
        progressPct = pct;
    }

    function startPlaying() {
        isPlaying = true;
        if (iconPlay)  iconPlay.style.display  = 'none';
        if (iconPause) iconPause.style.display = '';
        if (waveform && !prefersReduced) waveform.classList.add('playing');

        if (!prefersReduced) {
            animateProgress();
        }
    }

    function stopPlaying() {
        isPlaying = false;
        if (iconPlay)  iconPlay.style.display  = '';
        if (iconPause) iconPause.style.display = 'none';
        if (waveform)  waveform.classList.remove('playing');

        if (animFrameId) {
            cancelAnimationFrame(animFrameId);
            animFrameId = null;
        }
    }

    /* Slow decorative progress crawl (~1% every 2 seconds) */
    var lastTick = null;
    function animateProgress(timestamp) {
        if (!isPlaying) return;

        if (!lastTick) lastTick = timestamp;
        var elapsed = timestamp - lastTick;

        if (elapsed > 2000) {
            // Advance progress bar slowly
            setProgress(progressPct + 0.5);
            lastTick = timestamp;

            // Loop back when reaching end
            if (progressPct >= 99) {
                setProgress(0);
            }
        }

        animFrameId = requestAnimationFrame(animateProgress);
    }

    /* ── Play button click ──────────────────────────────────── */
    if (playBtn) {
        playBtn.addEventListener('click', function () {
            if (isPlaying) {
                stopPlaying();
            } else {
                startPlaying();
            }
        });
    }

    /* ── Photo frame — ensure no file picker fires ──────────── */
    /* Safety guard: intercept any click on .gift-photo-link
       to confirm it only navigates to Spotify (href) and never
       triggers a file input. This is already guaranteed by the
       HTML structure (no <input> present), but we add a guard
       in case anything was accidentally injected.              */
    var photoLink = document.querySelector('.gift-photo-link');
    if (photoLink) {
        photoLink.addEventListener('click', function (e) {
            // Allow the anchor's href to open Spotify normally
            // Prevent any child inputs from intercepting
            var inputs = photoLink.querySelectorAll('input[type="file"]');
            inputs.forEach(function (inp) { inp.disabled = true; });
        });
    }

    /* ── Keyboard: spacebar toggles play on the card ────────── */
    document.addEventListener('keydown', function (e) {
        // Only when not focused on an interactive element already
        if (e.target !== document.body) return;
        if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            if (playBtn) playBtn.click();
        }
    });

    /* ── Init ───────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        // Set initial progress position
        setProgress(26);
    });

}());
