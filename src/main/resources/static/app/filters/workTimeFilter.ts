/**
 * Created by Hassan on 12/22/2016.
 */
module PersonnelManagement {
    "use strict";


    export function workTimeFilter() {
        return (fHours: number) => {
            if(Util.Utility.isNullOrUndefined(fHours))
                return  "";

            var strTime="";
            var workDay = Math.floor(fHours /8);
            if(workDay!=0) {
                strTime += workDay + " روز";
            }
            var hours = Math.floor(fHours)-(workDay*8);
            if((Math.floor(fHours)-(workDay*8)) != 0){
                if(strTime!= "")
                    strTime+= " و ";
                strTime+= hours+ " ساعت";
            }
            var minutes = fHours - hours - (workDay*8);
            if(minutes != 0){
                if(strTime!= "")
                    strTime+= " و ";
                strTime+= Math.floor(minutes * 60)+ " دقیقه";
            }

            return strTime;
        };
    }

    workTimeFilter.$inject = [];

    angular.module("personnelManagement")
        .filter("workTime", workTimeFilter);
}