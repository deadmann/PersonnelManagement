package hassan.personnel.managment.models.vm;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import hassan.personnel.managment.utility.CalendarStringDeserializer;
import hassan.personnel.managment.utility.CalendarStringSerializer;

import java.util.Calendar;

/**
 * Created by Hassan on 11/21/2016.
 */
public class WageVm {
    private int id;

//    @JsonSerialize(using = CustomCalendarSerializer.class)
//    @JsonDeserialize(using = CustomCalendarDeserializer.class)
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")// HH:mm")
    @JsonSerialize(using = CalendarStringSerializer.class)
    //@JsonDeserialize(using = CalendarStringDeserializer.class) //Deserializer Does Not Work :|
    private Calendar startDate;

    private double price;

    private PositionVm position;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Calendar getStartDate() {
        return startDate;
    }

    public void setStartDate(Calendar startDate) {
        this.startDate = startDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public PositionVm getPosition() {
        return position;
    }

    public void setPosition(PositionVm position) {
        this.position = position;
    }
}
