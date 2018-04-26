// ==UserScript==
// @name         Go to PR files
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pressing "g p" will go to PR.
// @author       carl.wiedemann@card.com
// @match        https://app.probo.ci/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// ==/UserScript==

(function (window, Mousetrap) {
    'use strict';
    Mousetrap.bind('g p', function () {
      window.location = document.getElementsByClassName('build__action-links')[0].children[1].children[0].getAttribute('href');
    });
})(window, Mousetrap);

