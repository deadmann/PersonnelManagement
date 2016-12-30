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

    public isCurrentTheFirstWage():boolean{
        if(Util.Utility.isNullOrUndefined(this.wages)){
            throw new Error("Wage within position is null or undefined");
        }

        var min = Enumerable.from(this.wages)
            .minBy((m:WageVm)=>m.startDate);
        var current = this.getCurrentWage();

        return min == current;
    }

    private static getCurrentDateString():string{
        var today =new Date();
        //get Day Returns day of week, Date returns day of month
        return today.getFullYear() + '-'+(today.getMonth()+1) + '-'+today.getDate();
    }

    public getCurrentWage():WageVm{
        if(Util.Utility.isNullOrUndefined(this.wages)){
            throw new Error("Wage within position is null or undefined");
        }

        return Enumerable.from(this.wages)
            .where((w:WageVm)=>Util.Utility.compareString(w.startDate, PositionVm.getCurrentDateString())==-1) //Get All Previous Dates Wages
            .maxBy((m:WageVm)=>m.startDate); //Show The Biggest Date Wage
    }

    public getNextWage():WageVm{
        if(Util.Utility.isNullOrUndefined(this.wages)){
            throw new Error("Wage within position is null or undefined");
        }
        var current = this.getCurrentWage();

        var afterCurrentEnum = Enumerable.from(this.wages)
            .where((w:WageVm)=> Util.Utility.compareString(w.startDate, current.startDate)==1);

        if (!afterCurrentEnum.any()) {
            return null;
        }

        return afterCurrentEnum.minBy((m: WageVm)=>m.startDate);
    }
}