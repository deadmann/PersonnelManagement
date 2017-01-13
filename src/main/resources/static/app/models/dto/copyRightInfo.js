/**
 * Created by Hassan on 1/13/2017.
 */
var CopyRightInfo = (function () {
    function CopyRightInfo(yearEnglish, nameEnglish, yearPersian, namePersian) {
        this.setup();
        this.yearEnglish = yearEnglish;
        this.nameEnglish = nameEnglish;
        this.yearPersian = yearPersian;
        this.namePersian = namePersian;
    }
    CopyRightInfo.prototype.setup = function () {
        this.yearEnglish = "";
        this.nameEnglish = "";
        this.yearPersian = "";
        this.namePersian = "";
    };
    return CopyRightInfo;
}());
