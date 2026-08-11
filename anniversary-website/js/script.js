/**
 * Anniversary Letter Page — script.js
 * Handles subtle entrance animations and paragraph stagger.
 */

(function () {
    'use strict';

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    document.addEventListener('DOMContentLoaded', function () {
        if (prefersReducedMotion) return;

        const messagePaper = document.querySelector('.message-paper');
        const paragraphs   = document.querySelectorAll(
            '.message-paper .message-paragraph, .message-paper .final-anniversary'
        );

        if (!messagePaper || !paragraphs.length) return;

        // Assign stagger indices so CSS calc() can delay each paragraph
        paragraphs.forEach(function (para, index) {
            para.style.setProperty('--stagger-index', index);
            para.classList.add('para-hidden');
        });

        if (!('IntersectionObserver' in window)) {
            // Fallback: just show everything immediately
            paragraphs.forEach(function (para) {
                para.classList.remove('para-hidden');
            });
            return;
        }

        // Reveal paragraphs when the card scrolls into view
        const cardObserver = new IntersectionObserver(
            function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        paragraphs.forEach(function (para) {
                            para.classList.add('para-visible');
                        });
                        cardObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );

        cardObserver.observe(messagePaper);
    });

}());
