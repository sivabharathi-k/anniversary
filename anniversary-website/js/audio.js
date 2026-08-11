/**
 * audio.js — Shared background music for all pages
 *
 * - Plays song.mpeg softly across every page
 * - Remembers mute state across pages via sessionStorage
 * - Injects a small floating mute/unmute button
 * - Handles browser autoplay policy (plays on first interaction)
 * - Respects prefers-reduced-motion (no button animation)
 */

(function () {
    'use strict';

    var SONG_SRC   = 'assets/song.mpeg';
    var VOLUME     = 0.3;                  // 30% — gentle background level
    var STORAGE_KEY = 'bgMusicMuted';

    /* ── Resolve correct path from any sub-folder depth ────── */
    /* All pages are at root level so path is always the same   */

    /* ── Create audio element ───────────────────────────────── */
    var audio = document.createElement('audio');
    audio.src    = SONG_SRC;
    audio.loop   = true;
    audio.volume = VOLUME;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    /* ── Restore mute preference ────────────────────────────── */
    var muted = sessionStorage.getItem(STORAGE_KEY) === 'true';
    audio.muted = muted;

    /* ── Attempt autoplay ───────────────────────────────────── */
    var playPromise = audio.play();
    var started = false;

    if (playPromise !== undefined) {
        playPromise.then(function () {
            started = true;
        }).catch(function () {
            /* Autoplay blocked — wait for first user interaction */
            started = false;
        });
    }

    /* Play on first touch/click anywhere if blocked */
    function unlockAudio() {
        if (!started) {
            audio.play().then(function () {
                started = true;
            }).catch(function () {});
        }
        document.removeEventListener('click',     unlockAudio);
        document.removeEventListener('touchstart', unlockAudio);
        document.removeEventListener('keydown',    unlockAudio);
    }

    document.addEventListener('click',      unlockAudio, { once: true });
    document.addEventListener('touchstart', unlockAudio, { once: true });
    document.addEventListener('keydown',    unlockAudio, { once: true });

    /* ── Inject floating mute button ────────────────────────── */
    var btn = document.createElement('button');
    btn.id = 'bgMuteBtn';
    btn.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music');
    btn.setAttribute('type', 'button');
    btn.innerHTML = muted ? mutedIcon() : unmutedIcon();
    document.body.appendChild(btn);

    /* ── Toggle mute ─────────────────────────────────────────── */
    btn.addEventListener('click', function (e) {
        e.stopPropagation(); /* don't fire the unlock listener again */
        muted = !muted;
        audio.muted = muted;
        sessionStorage.setItem(STORAGE_KEY, muted ? 'true' : 'false');
        btn.innerHTML = muted ? mutedIcon() : unmutedIcon();
        btn.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music');

        /* If muted was just turned off and audio hasn't started, play */
        if (!muted && !started) {
            audio.play().then(function () { started = true; }).catch(function () {});
        }
    });

    /* ── SVG icons ───────────────────────────────────────────── */
    function unmutedIcon() {
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
               '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
               '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>' +
               '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>' +
               '</svg>';
    }

    function mutedIcon() {
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
               '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
               '<line x1="23" y1="9" x2="17" y2="15"/>' +
               '<line x1="17" y1="9" x2="23" y2="15"/>' +
               '</svg>';
    }

}());
