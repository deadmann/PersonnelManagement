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
public class WorkVm {
    private long id;

    private float workPerDay;
//    @JsonFormat(shape=JsonFormat.Shape.STRING, pattern="yyyy-MM-dd")// HH:mm")
    @JsonSerialize(using = CalendarStringSerializer.class)
    //@JsonDeserialize(using = CalendarStringDeserializer.class)
    private Calendar date;

    private PersonVm person;

    private BuildingVm building;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public float getWorkPerDay() {
        return workPerDay;
    }

    public void setWorkPerDay(float workPerDay) {
        this.workPerDay = workPerDay;
    }

    @JsonSerialize(using = CalendarStringSerializer.class)
    public Calendar getDate() {
        return date;
    }

    @JsonDeserialize(using = CalendarStringDeserializer.class)
    public void setDate(Calendar date) {
        this.date = date;
    }

    public PersonVm getPerson() {
        return person;
    }

    public void setPerson(PersonVm person) {
        this.person = person;
    }

    public BuildingVm getBuilding() {
        return building;
    }

    public void setBuilding(BuildingVm building) {
        this.building = building;
    }
}
