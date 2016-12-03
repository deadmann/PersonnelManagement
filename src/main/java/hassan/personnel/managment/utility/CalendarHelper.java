package hassan.personnel.managment.utility;

import com.ibm.icu.util.ULocale;

import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;

/**
 * Created by Hassan on 11/18/2016.
 */
public class CalendarHelper {
    public static int daysInPersianMonth(int year, int month){
        month = month - 1; //JAVA CALENDAR MONTH START FROM 0 TO 11

        // Persian to Gregorian
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = com.ibm.icu.util.Calendar.getInstance(local);
        persianCalendar.clear();

        persianCalendar.set(year, month, 1); // Tir(4th month) 10th 1395 equivalent to June 30th 2016

//        int yearNext = month>=12 ? year : year+1;
//        int monthNext = month>=12 ? month +1 : 1;
//
//        persianCalendar.set(yearNext, monthNext, 1);
//        persianCalendar.add(com.ibm.icu.util.Calendar.DAY_OF_MONTH, -1);
//
//        return persianCalendar.get(com.ibm.icu.util.Calendar.DAY_OF_MONTH);
        return persianCalendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }

    public static int daysInPersianMonth(com.ibm.icu.util.Calendar calendar){
        return daysInPersianMonth(calendar.get(Calendar.YEAR), calendar.get(Calendar.MONTH));
    }

    public static int daysInPersianMonth(Calendar calendar){
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = com.ibm.icu.util.Calendar.getInstance(local);
        persianCalendar.clear();

        persianCalendar.setTime(calendar.getTime());
        return daysInPersianMonth(persianCalendar);
    }

    public static com.ibm.icu.util.Calendar toPersian(Calendar calendar){
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = com.ibm.icu.util.Calendar.getInstance(local);
        persianCalendar.clear();

        persianCalendar.setTime(calendar.getTime());
        return persianCalendar;
    }

    public static Calendar toGregorian(com.ibm.icu.util.Calendar calendar){
        Calendar gregorianCalendar = new GregorianCalendar();
        gregorianCalendar.setTime(calendar.getTime());
        return gregorianCalendar;
    }

    public static com.ibm.icu.util.Calendar createPersian(int year, int month, int day){
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = com.ibm.icu.util.Calendar.getInstance(local);
        persianCalendar.clear();
        persianCalendar.set(year, month-1, day); //FIX MONTH IN CALENDAR (0 .. 11)
        return persianCalendar;
    }

    public static Calendar createGregorian(int year, int month, int day){//FIX MONTH IN CALENDAR (0 .. 11)
        return new GregorianCalendar(year, month - 1, day);
    }

    public static Calendar getMinimum(){
        Calendar calendar = new GregorianCalendar();
        //calendar.setTimeInMillis(-9223372036854775808L);
        //calendar.setTime(new Date(Long.MIN_VALUE));
        calendar.set(0, 0, 0);
        return calendar;
    }
}
