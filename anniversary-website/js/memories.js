/**
 * Scrapbook Memories Page — memories.js
 *
 * Responsibilities:
 *  1. Central photo configuration — edit this array to change photos/captions
 *  2. Load photos into polaroid frames on page start
 *  3. Staggered entrance animation for polaroids
 */

(function () {
    'use strict';

    /* ============================================================
       PHOTO CONFIGURATION
       ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       To change a photo:
         1. Replace the file in assets/images/ with your own image
            (keep the same filename, e.g. photo1.jpg)
         — OR —
         2. Update the `image` path here to point to your new file

       To change a caption, edit the `caption` field.
       ============================================================ */
    var memories = [
        {
            image:   'assets/images/image11.jpeg',
            caption: 'Our Story Begins',
            alt:     'Our first anniversary memory'
        },
        {
            image:   'assets/images/image22.jpeg',
            caption: 'Beautiful Day',
            alt:     'A beautiful day together'
        },
        {
            image:   'assets/images/image33.jpeg',
            caption: 'Our Beautiful Journey',
            alt:     'Our beautiful journey together'
        },
        {
            image:   'assets/images/image44.jpeg',
            caption: 'Cherished Moment',
            alt:     'A cherished moment'
        },
        {
            image:   'assets/images/image55.jpeg',
            caption: 'Together Always',
            alt:     'Together always'
        },
        {
            image:   'assets/images/image66.jpeg',
            caption: 'My Favourite Memory',
            alt:     'My favourite anniversary memory'
        }
    ];

    /* ── Load Photos from Config ──────────────────────────────── */
    function loadMemories() {
        var polaroids = document.querySelectorAll('.polaroid[data-index]');

        polaroids.forEach(function (polaroidEl) {
            var index  = parseInt(polaroidEl.getAttribute('data-index'), 10);
            var memory = memories[index];
            if (!memory) return;

            var imgEl     = polaroidEl.querySelector('.polaroid-img');
            var captionEl = polaroidEl.querySelector('.polaroid-caption');

            if (imgEl) {
                imgEl.src = memory.image;
                imgEl.alt = memory.alt || 'Anniversary memory';
            }

            if (captionEl) {
                captionEl.textContent = memory.caption;
            }
        });
    }

    /* ── Staggered Entrance Animation ────────────────────────── */
    function initEntranceAnimation() {
        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) return;

        var polaroids = document.querySelectorAll('.polaroid');

        polaroids.forEach(function (el, i) {
            var delay = (i * 0.12 + 0.4) + 's';
            el.style.opacity    = '0';
            el.style.transition = 'opacity 0.65s ease ' + delay + ', transform 0.65s ease ' + delay;
            el.style.transform  = (el.style.transform || '') + ' translateY(22px)';
        });

        if (!('IntersectionObserver' in window)) {
            polaroids.forEach(function (el) {
                el.style.opacity   = '1';
                el.style.transform = el.style.transform.replace('translateY(22px)', '').trim();
            });
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el = entry.target;
                el.style.opacity   = '1';
                el.style.transform = el.style.transform.replace('translateY(22px)', '').trim();
                // After transition ends, remove inline styles so CSS hover rules take over cleanly
                el.addEventListener('transitionend', function cleanup() {
                    el.style.opacity    = '';
                    el.style.transition = '';
                    el.style.transform  = '';
                    el.removeEventListener('transitionend', cleanup);
                }, { once: true });
                observer.unobserve(el);
            });
        }, { threshold: 0.08 });

        polaroids.forEach(function (el) { observer.observe(el); });
    }

    /* ── Init ─────────────────────────────────────────────────── */
    document.addEventListener('DOMContentLoaded', function () {
        loadMemories();
        initEntranceAnimation();
    });

}());
