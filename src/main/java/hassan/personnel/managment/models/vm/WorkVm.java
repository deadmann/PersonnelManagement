package hassan.personnel.managment.models.vm;

import java.util.Calendar;

/**
 * Created by Hassan on 11/21/2016.
 */
public class WorkVm {
    private long id;

    private int workPerDay;

    private Calendar date;

    private PersonVm person;

    private BuildingVm building;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getWorkPerDay() {
        return workPerDay;
    }

    public void setWorkPerDay(int workPerDay) {
        this.workPerDay = workPerDay;
    }

    public Calendar getDate() {
        return date;
    }

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
