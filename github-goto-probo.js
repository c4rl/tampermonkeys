// ==UserScript==
// @name         Go to probo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pressing "g o" will go to probo.
// @author       carl.wiedemann@card.com
// @match        https://github.com/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// ==/UserScript==

(function (window, Mousetrap) {
    'use strict';
    Mousetrap.bind('g o', function () {
      let a_probo_url = document.getElementsByClassName('branch-action')[0].getElementsByClassName('merge-status-list')[0].children[0].lastElementChild.lastElementChild.getAttribute('href');
      let parts = a_probo_url.split('/');
      parts.pop();
      parts.pop();
      window.location = parts.join('/');
    });
})(window, Mousetrap);


