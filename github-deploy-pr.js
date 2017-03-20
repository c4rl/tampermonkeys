// ==UserScript==
// @name         Build deploy PR
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Pressing "d p r" will fill-out deploy template.
// @author       carl.wiedemann@card.com
// @match        https://github.com/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// @require      https://code.jquery.com/jquery-3.1.1.min.js
// @require      https://momentjs.com/downloads/moment.min.js
// ==/UserScript==

(function() {
  'use strict';
  $ = jQuery;
  Mousetrap.bind('d d d', function() {
    var pull_request_body = $('#pull_request_body');
    var pull_request_title = $('#pull_request_title');
    var commits = $('#commits_bucket .commit-message code a:first-child');
    var issues = [];

    // Get all merged tickets.
    commits.each(function (key, item) {
      var full_pr_title = $(item).attr('title').split("\n")[0];
      var matches = full_pr_title.match(/EN-\d+/);
      if (!!matches) {
        var issue_number = matches[0];
        issues.push(issue_number);
      }
    });
    pull_request_body.html(issues.join("\n"));

    var iso_date = moment().format('YYYY-MM-DD');
    var title = 'Deploy ' + iso_date;

    // Previous deploys today, retitle with index.
    var closed_url = 'https://github.com/cardcorp/cardcom/pulls?q=is%3Apr+is%3Aclosed';
    $.get(closed_url, function(data) {
      var re = new RegExp('Deploy ' + iso_date);
      var matches = data.match(re);
      if (!!matches) {
        title = title + '.' + matches.length;
      }
      pull_request_title.val(title);
    });

    // Label the deploy.
    $('[data-hotkey="l"]').click();
    $('[type="checkbox"][value="deploy"]').click();
    $('body').click();

  });
})();
