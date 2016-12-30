///<reference path="positionVm.ts"/>
///<reference path="../../../typings/index.d.ts"/>
/**
 * Created by Hassan on 11/18/2016.
 */



class WageVm {
    public id: number;
    public startDate: string;
    public price: number;
    public position: PositionVm;

    constructor(id: number, startDate: string, price: number, position: PositionVm) {
        this.setup();
        if (id != undefined) this.id = id;
        if (startDate != undefined) this.startDate = startDate;
        if (price != undefined) this.price = price;
        if (position != undefined) this.position = position;
    }

    private setup() {
        this.id = 0;
        this.startDate = null;
        this.price = 0;
        this.position = null;
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