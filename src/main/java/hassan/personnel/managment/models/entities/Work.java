package hassan.personnel.managment.models.entities;

import com.ibm.icu.util.Calendar;
import com.ibm.icu.util.ULocale;

import javax.persistence.*;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
public class Work {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int workPerDay;

    private Date date;

//    @Column(name = "person_id")
//    private int personId;
//
//    @Column(name = "building_id")
//    private int buildingId;

    @ManyToOne
//    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "person_id"))
    private Person person;

    @ManyToOne
//    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "building_id"))
    private Building building;

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

    public Date getDate() {
        return date;
    }

    public String getPersianDate() {
        ULocale local = new ULocale("fa_IR@calendar=persian");
        Calendar persianCalendar = Calendar.getInstance(local);
        persianCalendar.clear();

        java.util.Calendar gc = GregorianCalendar.getInstance();
        gc.set(2016, java.util.Calendar.JUNE, 30);

        persianCalendar.setTime(gc.getTime());

        return "" + persianCalendar.get(Calendar.YEAR)
                + persianCalendar.get(Calendar.MONTH)
                + persianCalendar.get(Calendar.DAY_OF_MONTH);
    }

    public void setDate(Date date) {
        this.date = date;
    }

    //    public int getPersonId() {
//        return personId;
//    }
//
//    public void setPersonId(int personId) {
//        this.personId = personId;
//    }
//
//    public int getBuildingId() {
//        return buildingId;
//    }
//
//    public void setBuildingId(int buildingId) {
//        this.buildingId = buildingId;
//    }

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        this.person = person;
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        this.building = building;
    }
}
