package hassan.personnel.managment.utility;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

/**
 * Created by Hassan on 12/29/2016.
 */
public class CalendarStringSerializer extends JsonSerializer<Calendar> {

    @Override
    public void serialize(Calendar value, JsonGenerator gen, SerializerProvider arg2)
            throws IOException, JsonProcessingException {
        if (value == null) {
            gen.writeNull();
        } else {
            //FORMATTER ?? No NO, returns day-1, at least for min date

            String year = StrMgr.leftPad(String.valueOf(value.get(Calendar.YEAR)),4, "0");
            String month = StrMgr.leftPad(String.valueOf(value.get(Calendar.MONTH)+1),2, "0");
            String day = StrMgr.leftPad(String.valueOf(value.get(Calendar.DAY_OF_MONTH)),2, "0");

            gen.writeString(year+"-"+month+"-"+day);
        }
    }


}
