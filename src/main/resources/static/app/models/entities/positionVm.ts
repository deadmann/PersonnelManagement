///<reference path="wageVm.ts"/>
///<reference path="personVm.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */
class PositionVm {
    public id: number;
    public title: string;
    public wages: Array<WageVm>;
    public personnel: Array<PersonVm>;


    constructor(id: number, title: string, wages: Array<WageVm>, personnel: Array<PersonVm>) {
        this.setup();
        if (id != undefined)this.id = id;
        if (title != undefined)this.title = title;
        if (wages != undefined)this.wages = wages;
        if (personnel != undefined)this.personnel = personnel;
    }

    private setup() {
        this.id = 0;
        this.title = null;
        this.wages = [];
        this.personnel = [];
    }

    public getCurrentWage():WageVm{
        if(Util.Utility.isNullOrUndefined(this.wages)){
            throw new Error("Wage within position is null or undefined");
        }

        return Enumerable.from(this.wages)
            .where((w:WageVm)=>w.startDate.getTime() < new Date().getTime()) //Get All Previous Dates Wages
            .maxBy((m:WageVm)=>m.startDate.getTime()); //Show The Biggest Date Wage
    }

    public getNextWage():WageVm{
        if(Util.Utility.isNullOrUndefined(this.wages)){
            throw new Error("Wage within position is null or undefined");
        }
        var current = this.getCurrentWage();

        var afterCurrentEnum = Enumerable.from(this.wages)
            .where((w:WageVm)=>w.startDate.getTime() > current.startDate.getTime());

        if (!afterCurrentEnum.any()) {
            return null;
        }

        return afterCurrentEnum.minBy((m: WageVm)=>m.startDate.getTime());
    }
}