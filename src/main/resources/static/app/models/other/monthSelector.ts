/**
 * Created by Hassan on 11/20/2016.
 */
class MonthSelector {
    public year: number;
    public month: number;


    constructor(year: number, month: number) {
        this.setup();
        if(year != undefined) this.year = year;
        if(month != undefined) this.month = month;
    }

    private setup (){
        this.year = 0;
        this.month = 0;
    }
}