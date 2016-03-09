var myapp = angular.module('myApp', []);

var randomShuffle = function (array) {
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


myapp.controller('myController', ['$scope',
            function ($scope) {
        $scope.chosenValue = Math.random();
                
        $scope.verbs_ = [
            ['backen', 'backte', 'gebacken', 'bake'],
            ['befehlen', 'befahl', 'befohlen', 'order'],
            ['beginnen', 'begann', 'begonnen', 'begin'],
            ['beißen', 'biß', 'gebissen', 'bite'],
            ['bergen', 'barg', 'geborgen', 'recover'],
        ];
        $scope.verbs = randomShuffle($scope.verbs_);
        
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