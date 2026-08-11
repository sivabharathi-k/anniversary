/**
 * audio.js — Background music for all pages
 *
 * HOW AUTOPLAY WORKS:
 * Browsers block autoplay until the user interacts. We solve this by:
 *  1. On the login page — audio.play() is called inside the login form's
 *     submit handler (login.js sets sessionStorage flag 'bgMusicPlaying').
 *  2. On every other page — we detect that flag and play immediately on load
 *     because the browser considers navigation from an interacted page trusted.
 *  3. Fallback — if still blocked, plays on the very first click/tap.
 *
 * Mute state persists across pages via sessionStorage.
 */

(function () {
    'use strict';

    var SONG_SRC    = 'assets/song.mpeg';
    var VOLUME      = 0.35;
    var MUTE_KEY    = 'bgMusicMuted';
    var STARTED_KEY = 'bgMusicStarted';  /* set by login.js on form submit */

    /* ── Audio element ──────────────────────────────────────── */
    var audio = document.createElement('audio');
    audio.src     = SONG_SRC;
    audio.loop    = true;
    audio.volume  = VOLUME;
    audio.preload = 'auto';
    document.body.appendChild(audio);

    /* ── Restore mute preference ────────────────────────────── */
    var muted = sessionStorage.getItem(MUTE_KEY) === 'true';
    audio.muted = muted;

    var started = false;

    function tryPlay() {
        if (started) return;
        var p = audio.play();
        if (p !== undefined) {
            p.then(function () {
                started = true;
                sessionStorage.setItem(STARTED_KEY, 'true');
                updateBtn();
            }).catch(function () {
                /* Still blocked — will retry on first interaction */
            });
        }
    }

    /* ── Autoplay: if user already interacted (came from login) */
    if (sessionStorage.getItem(STARTED_KEY) === 'true') {
        /* Small delay so the page has painted before audio starts */
        setTimeout(tryPlay, 200);
    } else {
        /* First page load — try immediately (may be allowed on some browsers) */
        tryPlay();
    }

    /* ── Fallback: unlock on any first interaction ──────────── */
    function unlockOnInteraction() {
        tryPlay();
        document.removeEventListener('click',      unlockOnInteraction);
        document.removeEventListener('touchstart', unlockOnInteraction);
        document.removeEventListener('keydown',    unlockOnInteraction);
    }

    if (!started) {
        document.addEventListener('click',      unlockOnInteraction, { passive: true });
        document.addEventListener('touchstart', unlockOnInteraction, { passive: true });
        document.addEventListener('keydown',    unlockOnInteraction);
    }

    /* ── Mute button ────────────────────────────────────────── */
    var btn = document.createElement('button');
    btn.id   = 'bgMuteBtn';
    btn.type = 'button';
    btn.setAttribute('aria-label', muted ? 'Unmute background music' : 'Mute background music');
    btn.innerHTML = muted ? mutedIcon() : unmutedIcon();
    document.body.appendChild(btn);

    function updateBtn() {
        btn.innerHTML = (audio.muted || !started) ? mutedIcon() : unmutedIcon();
        btn.setAttribute('aria-label',
            (audio.muted || !started)
                ? 'Unmute background music'
                : 'Mute background music'
        );
        if (started && !audio.muted) {
            btn.classList.add('playing');
        } else {
            btn.classList.remove('playing');
        }
    }

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        muted = !muted;
        audio.muted = muted;
        sessionStorage.setItem(MUTE_KEY, muted ? 'true' : 'false');

        /* If unmuting and not yet started, try to play now */
        if (!muted && !started) {
            tryPlay();
        }
        updateBtn();
    });

    /* ── Icons ──────────────────────────────────────────────── */
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
