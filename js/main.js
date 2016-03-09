var myapp = angular.module('myApp', []);


myapp.controller('myController', ['$scope',
            function ($scope) {
        $scope.randomShuffle = function (array) {
            var m = array.length,
                t, i;

            // While there remain elements to shuffle
            while (m) {
                // Pick a remaining element…
                i = Math.floor(Math.random() * m--);

                // And swap it with the current element.
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }

        $scope.score = 0;
        $scope.addScorePrateritum = function (form) {
            if (form.prateritum.$valid) {
                $scope.score += 1;
            }
        }
        $scope.addScorePartizip = function (form) {
            if (form.partizip.$valid) {
                $scope.score += 1;
            }
        }
        $scope.addScoreEnglisch = function (form) {
            if (form.englisch.$valid) {
                $scope.score += 1;
            }
        }

        $scope.verbs_ = [
            ['backen', 'backte', 'gebacken', 'bake'],
            ['befehlen', 'befahl', 'befohlen', 'order'],
            ['beginnen', 'begann', 'begonnen', 'begin'],
            ['beißen', 'biß', 'gebissen', 'bite'],
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
            scope.$watch(attrs['wjValidationError'], function (errorMsg) {
                elm[0].setCustomValidity(errorMsg);
                ctl.$setValidity('wjValidationError', errorMsg ? false : true);
            });
        }
    };
});

myapp.directive('lowercase', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, modelCtrl) {
            var lowercase = function (inputValue) {
                if (inputValue == undefined) inputValue = '';
                var lowercase = inputValue.toLowerCase();
                if (lowercase !== inputValue) {
                    modelCtrl.$setViewValue(lowercase);
                    modelCtrl.$render();
                }
                return lowercase;
            }
            modelCtrl.$parsers.push(lowercase);
            lowercase(scope[attrs.ngModel]); // lowercase initial value
        }
    };
});