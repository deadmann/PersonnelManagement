///<reference path="modelType.ts"/>
///<reference path="../models/buildingVm.ts"/>
///<reference path="../models/personVm.ts"/>
///<reference path="../models/positionVm.ts"/>
///<reference path="../models/wageVm.ts"/>
///<reference path="../models/workVm.ts"/>

/**
 * Created by Hassan on 11/18/2016.
 */
class ModelHelper {
    public static toBuilding(obj:any):BuildingVm {
        var works = ModelHelper.toArray(obj.works, ModelType.Work);
        return new BuildingVm(obj.id, obj.name, works);
    }

    public static toPerson(obj:any):PersonVm {
        var works = ModelHelper.toArray(obj.works, ModelType.Work);
        var position = ModelHelper.toPosition(obj.position);
        return new PersonVm(obj.id, obj.firstname, obj.lastname, position, works);
    }

    public static toPosition(obj:any):PositionVm {
        var personnel = ModelHelper.toArray(obj.personnel, ModelType.Person);
        var wages = ModelHelper.toArray(obj.wages, ModelType.Wage);
        return new PositionVm(obj.id, obj.title, wages, personnel);
    }

    public static toWage(obj:any):WageVm {
        var position=ModelHelper.toPosition(obj.position);
        return new WageVm(obj.id, obj.startDate, obj.price, position);
    }

    public static toWork(obj:any):WorkVm {
        var person = ModelHelper.toPerson(obj.person);
        var building = ModelHelper.toBuilding(obj.building);
        return new WorkVm(obj.id, obj.workPerDay, obj.date, person, building);
    }

    public static toArray(obj:Array<any>, type:ModelType):Array<any> {
        var arr = [];
        var transform = null;
        for (var i = 0; i < obj.length; i++) {
            switch (type){
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
                default:
                    throw new Error("This Model Type, Does Not Exists");
            }
            arr.push(transform);
        }
        return arr;
    }
}