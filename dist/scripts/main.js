// Blendr make it easy to create pages using css blend modes.
// It takes care of your backgrounds settings.
// It do one thing, and it do it good.

'use strict';

document.addEventListener('DOMContentLoaded', function (event) {
  var jsonPath = '../../data/blendr.json';
  var body = document.body;

  var scr = document.getElementsByClassName('screen');
  console.log(scr);
  for (var i = 0; i < scr.length; ++i) {
    scr[i].classList.add('screen-' + i);
  }

  var getJSON = function getJSON(url) {
    return new Promise(function (resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.open('get', url, true);
      xhr.responseType = 'json';
      xhr.onload = function () {
        var status = xhr.status;
        if (status == 200) {
          resolve(xhr.response);
        } else {
          reject(status);
        }
      };
      xhr.send();
    });
  };

  // define blendr vars from json
  getJSON(jsonPath).then(function (data) {
    // Config vars  
    var screenType = data.config.screenType;
    var nbScreen = data.config.nbScreen;

    // Add class to body
    body.classList.add(screenType);

    // Iterates through the numbers of screens
    for (var i = 0; i < nbScreen; i++) {

      var screenBg = document.createElement('div');
      screenBg.classList.add('screen-' + i + '_background');

      // identify Each screen
      var theScreen = document.body.querySelector('.screen-' + i);

      // Append the background into each screen
      theScreen.appendChild(screenBg);

      // Proprieties vars
      var d = data,
          bgColor = d.pages['page_' + i].background.color,
          bgGradient = d.pages['page_' + i].background.gradient,
          bgImage = d.pages['page_' + i].background.image,
          bgRepeat = d.pages['page_' + i].background.repeat,
          bgSize = d.pages['page_' + i].background.size,
          bgPosition = d.pages['page_' + i].background.position,
          bgBlend = d.pages['page_' + i].blend,
          bgFilter = d.pages['page_' + i].filter;

      // @Debug
      console.log(bgFilter);
      console.log(document.body.querySelector('.screen-' + i));

      // Adds the proper CSS if defined
      document.body.querySelector('.screen-' + i).style.backgroundColor = bgColor;
      document.body.querySelector('.screen-' + i).style.backgroundImage = 'linear-gradient(' + bgGradient + ')';
      document.body.querySelector('.screen-' + i + '_background').style.background = 'url(\'' + bgImage + '\')';
      document.body.querySelector('.screen-' + i + '_background').style.backgroundSize = bgSize;
      document.body.querySelector('.screen-' + i + '_background').style.backgroundRepeat = bgRepeat;
      document.body.querySelector('.screen-' + i + '_background').style.backgroundPosition = bgPosition;
      document.body.querySelector('.screen-' + i + '_background').style.mixBlendMode = bgBlend;
      document.body.querySelector('.screen-' + i + '_background').style.webkitFilter = bgFilter;
      document.body.querySelector('.screen-' + i + '_background').style.filter = bgFilter;
    }
  }, function (status) {
    console.log('You fucked up, Jimmy.' + status);
  });

  //   // Blendr template
  //   var bri = "{{";
  //   var bro = "}}";

  //   var brAll = document.body[0].querySelector('*');
  //   var brTpl = brAll.indexOf(''+bri+'') > -1;

  // if (brTpl) {
  //   console.log(brTemplate)
  // }
});