angular-popup-service
=====================

Library for handling popup boxes in angular

ngPopup wraps the native [Popup Boxes](http://www.w3schools.com/js/js_popup.asp) in a promise layer with [$q](https://docs.angularjs.org/api/ng/service/$q).
For non [mobile devices](http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-handheld-device-in-jquery?answertab=votes#answer-3540295) the dialog boxes are replaced by a html template but still using the same API.

## Installation
Install with [Bower](http://bower.io/):

    $ bower install angular-popup-service

## Usage
`index.html`

    <body ng-app="myApp">
      <div ng-controller="MainCtrl">
        <button ng-click="alert()">Alert</button>
        <button ng-click="confirm()">Confirm</button>
        <button ng-click="prompt()">Prompt</button>
      </div>

      <!-- Include popup template -->
      <div ng-include="'partials/popup.html'"></div>
    </body>


`app.js`

    angular.module('myApp', ['ngPopup'])
      .controller('MainCtrl', function ($scope, Popup) {

          $scope.alert = function () {
            Popup.alert('Alert message!').then(function () {
              console.info('Alert closed');
            });
          };

          $scope.confirm = function () {
            Popup.confirm('Confirm message?').then(function () {
              console.info('Confirmed!');
            }, function () {
              console.error('Rejected!');
            });
          };

          $scope.prompt = function () {
            Popup.confirm('Prompt message:', 'Prefilled value').then(function (value) {
              console.info('Returned value: ' + value);
            }, function () {
              console.error('Rejected!');
            });
          };

        });
