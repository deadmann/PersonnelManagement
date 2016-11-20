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
                controllerAs: "buildingIndexCtrl"
            })
            .when("/building/insert", {
                templateUrl: "/app/pages/building/buildingInsert.html",
                controller: "buildingInsertController",
                controllerAs: "buildingInsertCtrl"
            })
            .when("/person", {
                templateUrl: "/app/pages/person/personIndex.html",
                controller: "personIndexController",
                controllerAs: "personIndexCtrl"
            })
            .when("/person/insert",{
                templateUrl: "/app/pages/Person/personInsert.html",
                controller: "personInsertController",
                controllerAs: "personInsertCtrl"
            })
            .when("/position", {
                templateUrl: "/app/pages/position/positionIndex.html",
                controller: "positionIndexController",
                controllerAs: "positionIndexCtrl"
            })
            .when("/position/insert",{
                templateUrl: "/app/pages/position/positionInsert.html",
                controller: "positionInsertController",
                controllerAs: "positionInsertCtrl"
            })
            .when("/wage", {
                templateUrl: "/app/pages/wage/wageIndex.html",
                controller: "wageIndexController",
                controllerAs: "wageIndexCtrl"
            })
            .when("/wage/insert",{
                templateUrl: "/app/pages/wage/wageInsert.html",
                controller: "wageInsertController",
                controllerAs: "wageInsertCtrl"
            })
            .when("/work", {
                templateUrl: "/app/pages/work/workIndex.html",
                controller: "workIndexController",
                controllerAs: "workIndexCtrl"
            })
            .when("/work/insert",{
                templateUrl: "/app/pages/work/workInsert.html",
                controller: "workInsertController",
                controllerAs: "workInsertCtrl"
            })
            .otherwise({
                redirectTo: "/"
            });
    };

    config.$inject = ['$routeProvider','$httpProvider'];

    angular.module('personnelManagement')
        .config(config);
})();