/**
 * Created by Hassan on 11/24/2016.
 */
class WorkPerDayDto{
    public id: number;
    public personId: number;
    public year:number;
    public month: number;
    public day: number;
    public buildingId: number;
    public workingHours: number;

    constructor(id:number, personId:number, year: number, month: number, day: number, buildingId: number, workingHours: number) {
        this.setup();
        if(id!=undefined) this.id = id;
        if(personId!=undefined) this.personId = personId;
        if(year!=undefined) this.year = year;
        if(month!=undefined) this.month = month;
        if(day!=undefined) this.day = day;
        if(buildingId!=undefined) this.buildingId = buildingId;
        if(workingHours!=undefined) this.workingHours = workingHours;
    }

    private setup() {
        this.id = null;
        this.personId = null;
        this.year = null;
        this.month = null;
        this.day = null;
        this.buildingId = null;
        this.workingHours = null;
    }
}