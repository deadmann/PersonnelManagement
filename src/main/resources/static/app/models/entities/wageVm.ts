///<reference path="positionVm.ts"/>
///<reference path="../../../typings/index.d.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */



class WageVm {
    public id: number;
    public startDate: Date;
    public price: number;
    public position: PositionVm;

    constructor(id: number, startDate: Date|string|number, price: number, position: PositionVm) {
        this.setup();
        if (id != undefined)this.id = id;
        if (startDate != undefined) {
            if (typeof startDate == "number") {
                this.startDate = new Date(<number>startDate);
            }else if(typeof startDate == "string"){
                this.startDate = new Date(<string>startDate);
            }else if (typeof startDate == "Date") {
                this.startDate = <Date>startDate;
            }else{
                throw new Error("Cannot Cast '"+ (typeof startDate).toString() + "' to 'Date'");
            }
        }
        if (price != undefined)this.price = price;
        if (position != undefined)this.position = position;
    }

    private setup() {
        this.id = 0;
        this.startDate = null;
        this.price = 0;
        this.position = null;
    }

    public getGregorianStartDate():string{
        return this.startDate.getFullYear().toString()
            +'-'+this.startDate.getMonth()
            +'-'+this.startDate.getDay();
    }

    //??? is used at all? :-/
    public isValidPersianDate():boolean{
        try{
            if(!moment(this.startDate).isValid())
                return false;
            //test on persian
            moment(this.startDate).format('jYYYY/jM/jD');
            return true;
        }catch (err){
            return false;
        }
    }

    public getPersianStartDate():string{
        try{
            return moment(this.startDate).format('jYYYY/jM/jD');
        }catch (err){
            return "";
        }
    }

    get persianStartDate(): string {
        return this.getPersianStartDate();
    }
}