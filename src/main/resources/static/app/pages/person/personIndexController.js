/**
 * Created by Hassan on 11/20/2016.
 */
(function () {

    var controller = function ($location, personnelService) {
        var self = this;

        self.view={
            personnel: []
        };

        self.event={
            insert: function () {
                $location.path("/person/insert")
            },
            remove:function (id) {
                //var removeItem = Enumerable.From(buildings).FirstOrDefault(null,w=>w.id ==id);
                //buildings.splice()
                personnelService.remove({id:id}).$promise
                    .then(function (data) {
                        self.view.personnel.remove(null, function (item, empty) {
                            return item.id == data.id;
                        }, 'all');
                    }, function (err) {
                        if(err.status===404){
                            alert("آیتم مورد نظر ‍یدا نشد");
                        }else if(err.status===409){
                            alert("آیتم انتخابی توسط آیتم های دیگری مورد استفاده است");
                        } else {
                            alert("یک خطای ناشناس در هنگام حذف آتم رخ داده است");
                        }
                    });
            }
        };

        function initialize() {
            personnelService.query().$promise
                .then(function (data) {
                    self.view.personnel = data;
                }, function (err) {
                    alert("An Error Has Occur");
                });
        }

        initialize();
    };

    controller.$inject = ["$location", "personnelService"];

    angular.module("personnelManagement")
        .controller("personIndexController", controller);

})();