// ==UserScript==
// @name         Watch JIRA stuff
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pressing "w" will watch/unwatch issue.
// @author       carl.wiedemann@card.com
// @match        https://cardtest.atlassian.net/browse/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// ==/UserScript==

(function() {
    'use strict';
    Mousetrap.bind('w', function() {
      jQuery('#watching-toggle').click();
    });
})();
