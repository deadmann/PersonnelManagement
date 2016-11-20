package hassan.personnel.managment.rests;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;
import hassan.personnel.managment.models.other.MonthSelector;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.Locale;

/**
 * Created by Hassan on 11/20/2016.
 */
@RestController
@RequestMapping("/rest/base-data")
public class BaseDataController {

    @RequestMapping(value = "/days-in-month", method = RequestMethod.POST)
    private int getDaysInMonth(@RequestBody MonthSelector monthSelector){
        // Persian to Gregorian
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = Calendar.getInstance(local);
        persianCalendar.clear();
        persianCalendar.set(monthSelector.getYear(), monthSelector.getMonth(), 1); // Tir(4th month) 10th 1395 equivalent to June 30th 2016

        return persianCalendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }
}
