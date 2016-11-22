/**
 * Created by Hassan on 11/20/2016.
 */
(function(){
    'use strict';

    var config = function ($routeProvider, $httpProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "/app/pages/home/index.html"
            })
            .when("/building", {
                templateUrl: "/app/pages/building/BuildingIndex.html",
                controller: "buildingIndexController",
                controllerAs: "ctrl"
            })
            .when("/building/insert", {
                templateUrl: "/app/pages/building/buildingInsert.html",
                controller: "buildingInsertController",
                controllerAs: "ctrl"
            })
            .when("/person", {
                templateUrl: "/app/pages/person/personIndex.html",
                controller: "personIndexController",
                controllerAs: "ctrl"
            })
            .when("/person/insert",{
                templateUrl: "/app/pages/Person/personInsert.html",
                controller: "personInsertController",
                controllerAs: "ctrl"
            })
            .when("/position", {
                templateUrl: "/app/pages/position/positionIndex.html",
                controller: "positionIndexController",
                controllerAs: "ctrl"
            })
            .when("/position/insert",{
                templateUrl: "/app/pages/position/positionInsert.html",
                controller: "positionInsertController",
                controllerAs: "ctrl"
            })
            .when("/wage", {
                templateUrl: "/app/pages/wage/wageIndex.html",
                controller: "wageIndexController",
                controllerAs: "ctrl"
            })
            .when("/wage/insert",{
                templateUrl: "/app/pages/wage/wageInsert.html",
                controller: "wageInsertController",
                controllerAs: "ctrl"
            })
            .when("/work", {
                templateUrl: "/app/pages/work/workIndex.html",
                controller: "workIndexController",
                controllerAs: "ctrl"
            })
            .when("/work/insert",{
                templateUrl: "/app/pages/work/workInsert.html",
                controller: "workInsertController",
                controllerAs: "ctrl"
            })
            .otherwise({
                redirectTo: "/"
            });
    };

    config.$inject = ['$routeProvider','$httpProvider'];

    angular.module('personnelManagement')
        .config(config);
})();