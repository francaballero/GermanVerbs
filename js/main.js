/*global angular: true */

var myapp = angular.module('myApp', []);

myapp.controller('myController', ['$scope',
            function ($scope) {
        $scope.randomShuffle = function (array) {
            var m = array.length,
                t, i;

            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        };

        $scope.start = false;
        $scope.startFunction = function () {
            $scope.start = true;
        };
        $scope.home = function () {
            if ($scope.start === true) {
                $scope.start = false;
            }
        };

        $scope.customStyle = {};
        $scope.score = 0;
        $scope.addScorePrateritum = function (form) {
            if (form.prateritum.$valid) {
                $scope.score += 15;
                $scope.customStyle.style = {
                    "color": "#1d9f88"
                };
            }
        };
        $scope.addScorePartizip = function (form) {
            if (form.partizip.$valid) {
                $scope.score += 15;
                $scope.customStyle.style = {
                    "color": "#1d9f88"
                };
            }
        };
        $scope.addScoreEnglisch = function (form) {
            if (form.englisch.$valid) {
                $scope.score += 15;
                $scope.customStyle.style = {
                    "color": "#1d9f88"
                };
            }
        };
        $scope.substractScore = function () {
            $scope.score -= 20;
            $scope.customStyle.style = {
                "color": "red"
            };
        };

        $scope.verbs_ = [
            ['backen', 'backte', 'gebacken', 'bake'],
            ['befehlen', 'befahl', 'befohlen', 'order'],
            ['beginnen', 'begann', 'begonnen', 'begin'],
            ['beißen', 'biss', 'gebissen', 'bite'],
            ['bergen', 'barg', 'geborgen', 'recover'],
        ];
        $scope.verbs = $scope.randomShuffle($scope.verbs_);

        //Previous-Next navigation
        $scope.activePage = {
            page: 0
        };
        $scope.pages = $scope.verbs;
}]);


myapp.directive('wjValidationError', function () {
    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            scope.$watch(attrs.wjValidationError, function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('wjValidationError', errorMsg ? false : true);
            });
        }
    };
});

myapp.directive('replaceSS', function () {

    return {
        require: 'ngModel',
        link: function (scope, elm, attrs, ctl) {
            console.log(elm);
            console.log(elm.replace('ß', 'ss'));
            return elm.replace('ß', 'ss');
        }
    };
});


myapp.directive('lowercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var lowercase = function (inputValue) {
                if (inputValue === undefined) inputValue = '';
                var lowercase = inputValue.toLowerCase();
                if (lowercase !== inputValue) {
                    modelCtrl.$setViewValue(lowercase);
                    modelCtrl.$render();
                }
                return lowercase;
            };
            modelCtrl.$parsers.push(lowercase);
            lowercase(scope[attrs.ngModel]);
        }
    };
});