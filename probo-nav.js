// ==UserScript==
// @name         Navigate probo
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Use "j/k" to move up and down, "o" to toggle.
// @author       carl.wiedemann@card.com
// @match        https://app.probo.ci/*
// @grant        none
// @require      https://craig.global.ssl.fastly.net/js/mousetrap/mousetrap.min.js?bc893
// ==/UserScript==

(function (window, document, Mousetrap) {
  'use strict';

  let scrollToElement = function (element) {
    window.scrollTo({
      top: element.offsetTop
    });
  };

  let addHighlight = function (element) {
    element.getElementsByClassName('task-log')[0].style.borderWidth = "12px";
  };

  let removeHighlight = function (element) {
    element.getElementsByClassName('task-log')[0].style.borderWidth = null;
  };

  let hasHighlight = function (element) {
    return !!element.getElementsByClassName('task-log')[0].style.borderWidth;
  };

  let toggleHighlight = function (element) {
    if (hasHighlight(element)) {
      removeHighlight(element);
    }
    else {
      addHighlight(element);
    }
  };

  let getProposedElement = function (element, direction) {
    return direction > 0 ? element.nextElementSibling : element.previousElementSibling;
  };

  setTimeout(function (event) {
    let task_log_list = document.getElementsByClassName('task-log-list')[0];

    let _self = this;

    _self.current_element = task_log_list.firstElementChild;
    addHighlight(_self.current_element);

    let activateElement = function (direction) {
      let proposed_element = getProposedElement(_self.current_element, direction);
      if (!!proposed_element) {
        toggleHighlight(_self.current_element);
        _self.current_element = proposed_element;
        toggleHighlight(_self.current_element);
        window.scrollTo({top: _self.current_element.offsetTop - 100});
      }
    };

    Mousetrap.bind('j', function () {
      activateElement(1);
    });

    Mousetrap.bind('k', function () {
      activateElement(-1);
    });

    Mousetrap.bind('o', function () {
      let task = _self.current_element.getElementsByClassName('task-log__title')[0];
      let e = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
      });
      task.dispatchEvent(e);
    });


  }, 2000);

})(window, document, Mousetrap);

