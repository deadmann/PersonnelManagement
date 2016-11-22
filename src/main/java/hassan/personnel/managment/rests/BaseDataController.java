package hassan.personnel.managment.rests;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;
import hassan.personnel.managment.configuration.ConfigurationObject;
import hassan.personnel.managment.models.other.MonthSelector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.GregorianCalendar;

/**
 * Created by Hassan on 11/20/2016.
 */
@RestController
@RequestMapping("/rest/base-data")
public class BaseDataController {

    @Autowired
    private ConfigurationObject configurationObject;

    @RequestMapping(value = "/start-year", method = RequestMethod.GET)
    private ResponseEntity<Integer> getStartYear(){
        return ResponseEntity.ok(configurationObject.getStartYear()); //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @RequestMapping(value = "/current-year", method = RequestMethod.GET)
    private ResponseEntity<Integer> getCurrentYear(){
        Calendar currentDate = Calendar.getInstance();

        java.util.Calendar gc = GregorianCalendar.getInstance();
        gc.set(currentDate.get(Calendar.YEAR), currentDate.get(Calendar.MONTH), currentDate.get(Calendar.DAY_OF_MONTH));

        ULocale local = new ULocale("fa_IR@calendar=persian");
        Calendar persianCalendar = Calendar.getInstance(local);
        persianCalendar.clear();

        persianCalendar.setTime(gc.getTime());
        return ResponseEntity.ok(persianCalendar.get(Calendar.YEAR));
    }

    @RequestMapping(value = "/days-in-month", method = RequestMethod.POST)
    private ResponseEntity<Integer> getDaysInMonth(@RequestBody MonthSelector monthSelector){
        // Persian to Gregorian
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = Calendar.getInstance(local);
        persianCalendar.clear();

        //persianCalendar.set(monthSelector.getYear(), monthSelector.getMonth(), 1); // Tir(4th month) 10th 1395 equivalent to June 30th 2016

        MonthSelector next = new MonthSelector();
        next.setYear(monthSelector.getMonth()>=12? monthSelector.getYear() : monthSelector.getYear()+1);
        next.setMonth(monthSelector.getMonth()>=12? monthSelector.getMonth() +1 :1);

        persianCalendar.set(next.getYear(), monthSelector.getMonth(), 1);
        persianCalendar.add(Calendar.DAY_OF_MONTH, -1);

        return ResponseEntity.ok(persianCalendar.get(Calendar.DAY_OF_MONTH));
        //return persianCalendar.getActualMaximum(Calendar.DAY_OF_MONTH);
    }
}
