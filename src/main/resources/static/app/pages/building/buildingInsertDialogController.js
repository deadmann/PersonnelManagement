/**
 * Created by Hassan on 11/18/2016.
 */
(function () {
    'use strict';

    controller.$inject = ['$location', '$scope', 'personnelService'];

    angular
        .module('personnelManagement')
        .controller('buildingInsertDialogController', controller);

    function controller($location, $scope, personnelService) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'Add New Person';

        vm.View = {
            /**
             * @type {SectionVM}
             */
            Section: null,
            /**
             * @type {PersonVM}
             */
            Person:null
        };

        vm.Action= {
            save: function () {
                personnelService.save({}, vm.View.Person
                    , function (data) {
                        $scope.answer(new DialogResult(DialogResultType.Ok, data));
                    }, function (err) {
                        alert("cannot save data. " + err);
                    });
            },
            cancel: function () {
                $scope.answer(new DialogResult(DialogResultType.Cancel, null));
            }
        };

        activate();

        function activate() {
            vm.View.Section = $scope.Modal.PassedData.Section;
            vm.View.Person = new PersonVM();
            vm.View.Person.SectionId = vm.View.Section.Id;
        }
    }
})();
