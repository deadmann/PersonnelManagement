package hassan.personnel.managment.utility;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.TimeZone;

/**
 * Created by Hassan on 12/29/2016.
 */
public class CalendarStringDeserializer extends JsonDeserializer<Calendar> {

    @Override
    public Calendar deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        String dateAsString = jsonParser.getText();
        String[] strings = dateAsString.split("-");
        int year = Integer.parseInt(strings[0]);
        int month = Integer.parseInt(strings[1]) - 1;
        int day = Integer.parseInt(strings[2]);
        Calendar calendar = new GregorianCalendar(year, month, day);
        calendar.setTimeZone(TimeZone.getDefault());
        return calendar;
    }
}