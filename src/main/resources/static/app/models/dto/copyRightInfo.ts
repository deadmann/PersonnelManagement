/**
 * Created by Hassan on 1/13/2017.
 */

class CopyRightInfo{
    yearEnglish:string;
    nameEnglish:string;
    yearPersian:string;
    namePersian:string;

    constructor(yearEnglish:string, nameEnglish:string, yearPersian:string, namePersian:string){
        this.setup();
        this.yearEnglish = yearEnglish;
        this.nameEnglish = nameEnglish;
        this.yearPersian = yearPersian;
        this.namePersian = namePersian;
    }

    private setup():void{
        this.yearEnglish="";
        this.nameEnglish="";
        this.yearPersian="";
        this.namePersian="";
    }
}