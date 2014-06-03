'use strict';

angular.module('ngPopup', [])
  .controller('ngPopupCtrl', ['$scope', '$rootScope', '$window', function ($scope, $rootScope, $window) {
    $scope.ok = function (value) {
      $scope.popup.$resolve(value);
      $scope.popup = false;
    };
    $scope.cancel = function () {
      $scope.popup.$reject();
      $scope.popup = false;
    };
    $rootScope.$on('ngPopup', function (e, data) {
      e.preventDefault();
      $scope.popup = data;
      if (data.type === 'prompt') {
        $window.setTimeout(function () {
          angular.element($window.ngPopupValue).focus();
        }, 0);
      }
    });
  }])
  .service('Popup', ['$window', '$q', '$rootScope', function ($window, $q, $rootScope) {
    var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    var emit = function (type, message, value, deferred) {
      $rootScope.$emit('ngPopup', {
        type: type,
        message: message,
        value: value,
        $resolve: deferred.resolve,
        $reject: deferred.reject
      });
    };
    var alert = function (message) {
      var deferred = $q.defer();
      if (isMobile) {
        try {
          $window.alert(message);
        } catch (err) {
          deferred.reject(err);
        }
        deferred.resolve(true);
      } else {
        emit('alert', message, null, deferred);
      }
      return deferred.promise;
    };
    var confirm = function (message) {
      var deferred = $q.defer();
      if (isMobile) {
        try {
          var value = $window.confirm(message);
          if (value) {
            deferred.resolve(value);
          } else {
            deferred.reject(value);
          }
        } catch (err) {
          deferred.reject(err);
        }
      } else {
        emit('confirm', message, null, deferred);
      }
      return deferred.promise;
    };

    var prompt = function (message, value) {
      var deferred = $q.defer();
      if (isMobile) {
        try {
          value = $window.prompt(message, value);
          if (value !== null) {
            deferred.resolve(value);
          } else {
            deferred.reject(value);
          }
        } catch (err) {
          deferred.reject(err);
        }
      } else {
        emit('prompt', message, value, deferred);
      }
      return deferred.promise;
    };

    // Public API
    return {
      alert: alert,
      confirm: confirm,
      prompt: prompt
    };
  }]);
