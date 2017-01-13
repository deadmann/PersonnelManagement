package hassan.personnel.managment.rests;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;
import hassan.personnel.managment.configuration.ConfigurationObject;
import hassan.personnel.managment.models.dto.CopyRightInfo;
import hassan.personnel.managment.utility.CalendarHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.GregorianCalendar;

/**
 * Created by Hassan on 11/20/2016.
 */
@RestController
@RequestMapping("/rest/base-data")
public class BaseDataController {

    private ConfigurationObject configurationObject;

    @Autowired
    public BaseDataController(ConfigurationObject configurationObject) {
        this.configurationObject=configurationObject;
    }

    @RequestMapping(value="/copy-right-info")
    private ResponseEntity<CopyRightInfo> getCopyRightInfo(){
        CopyRightInfo cri = new CopyRightInfo();
        cri.setYearEnglish(configurationObject.getCopyRightYearEnglish());
        cri.setNameEnglish(configurationObject.getCopyRightNameEnglish());
        cri.setYearPersian(configurationObject.getCopyRightYearPersian());
        cri.setNamePersian(configurationObject.getCopyRightNamePersian());

        return ResponseEntity.ok(cri);
    }

    @RequestMapping(value = "/start-year", method = RequestMethod.GET)
    private ResponseEntity<Integer> getStartYear(){
        return ResponseEntity.ok(configurationObject.getStartYear()); //return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @RequestMapping(value = "/current-year", method = RequestMethod.GET)
    private ResponseEntity<Integer> getCurrentYear(){
        //Returns Persian on Persian Systems, Gregorian on Gregorian's :-s
        //Calendar currentDate = Calendar.getInstance();

        ULocale local = new ULocale("fa_IR@calendar=persian");
        Calendar persianCalendar = Calendar.getInstance(local);

        return ResponseEntity.ok(persianCalendar.get(Calendar.YEAR));
    }

    @RequestMapping(value = "/days-in-month/{year}/{month}", method = RequestMethod.GET)
    private ResponseEntity<Integer> getDaysInMonth(@PathVariable int year, @PathVariable int month){
        return ResponseEntity.ok(CalendarHelper.daysInPersianMonth(year, month));
    }
}
