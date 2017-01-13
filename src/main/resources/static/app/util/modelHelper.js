///<reference path="../innerReferences.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
var ModelHelper = (function () {
    function ModelHelper() {
    }
    ModelHelper.toBuilding = function (obj) {
        if (Util.Utility.isNullOrUndefined(obj))
            return null;
        var works = ModelHelper.toArray(obj.works, ModelType.Work);
        return new BuildingVm(obj.id, obj.name, works);
    };
    ModelHelper.toPerson = function (obj) {
        if (Util.Utility.isNullOrUndefined(obj))
            return null;
        var works = ModelHelper.toArray(obj.works, ModelType.Work);
        var position = ModelHelper.toPosition(obj.position);
        return new PersonVm(obj.id, obj.firstname, obj.lastname, position, works);
    };
    ModelHelper.toPosition = function (obj) {
        if (Util.Utility.isNullOrUndefined(obj))
            return null;
        var personnel = ModelHelper.toArray(obj.personnel, ModelType.Person);
        var wages = ModelHelper.toArray(obj.wages, ModelType.Wage);
        return new PositionVm(obj.id, obj.title, wages, personnel);
    };
    ModelHelper.toWage = function (obj) {
        if (Util.Utility.isNullOrUndefined(obj))
            return null;
        var position = ModelHelper.toPosition(obj.position);
        return new WageVm(obj.id, obj.startDate, obj.price, position);
    };
    ModelHelper.toWork = function (obj) {
        if (Util.Utility.isNullOrUndefined(obj))
            return null;
        var person = ModelHelper.toPerson(obj.person);
        var building = ModelHelper.toBuilding(obj.building);
        return new WorkVm(obj.id, obj.workPerDay, obj.date, person, building);
    };
    ModelHelper.toCopyRightInfo = function (obj) {
        return new CopyRightInfo(obj.yearEnglish, obj.nameEnglish, obj.yearPersian, obj.namePersian);
    };
    ModelHelper.toWorkPerDayDto = function (obj) {
        return new WorkPerDayDto(obj.id, obj.personId, obj.year, obj.month, obj.day, obj.buildingId, obj.workingHours);
    };
    ModelHelper.toArray = function (obj, type) {
        if (obj == undefined || obj == null)
            return [];
        var arr = [];
        var transform = null;
        for (var i = 0; i < obj.length; i++) {
            switch (type) {
                case ModelType.Building:
                    transform = ModelHelper.toBuilding(obj[i]);
                    break;
                case ModelType.Person:
                    transform = ModelHelper.toPerson(obj[i]);
                    break;
                case ModelType.Position:
                    transform = ModelHelper.toPosition(obj[i]);
                    break;
                case ModelType.Wage:
                    transform = ModelHelper.toWage(obj[i]);
                    break;
                case ModelType.Work:
                    transform = ModelHelper.toWork(obj[i]);
                    break;
                case ModelType.CopyRightInfo:
                    transform = ModelHelper.toCopyRightInfo(obj[i]);
                    break;
                case ModelType.WorkPerDayDto:
                    transform = ModelHelper.toWorkPerDayDto(obj[i]);
                    break;
                default:
                    throw new Error("This Model Type, Does Not Exists");
            }
            arr.push(transform);
        }
        return arr;
    };
    return ModelHelper;
}());
