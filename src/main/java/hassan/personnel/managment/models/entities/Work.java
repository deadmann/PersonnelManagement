package hassan.personnel.managment.models.entities;

import com.ibm.icu.util.ULocale;
import hassan.personnel.managment.models.interfaces.ViewModel;
import hassan.personnel.managment.models.vm.WorkVm;

import javax.persistence.*;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
@Table(name = "Work")
public class Work implements ViewModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private int workPerDay;

    @Temporal(TemporalType.DATE)
    private java.util.Calendar date;

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

    public WorkVm getViewModel() {
        WorkVm workVm = new WorkVm();
        workVm.setId(this.getId());
        workVm.setDate(this.getDate());
        workVm.setWorkPerDay(this.getWorkPerDay());

        workVm.setBuilding(this.getBuilding() != null ? this.getBuilding().getViewModel() : null);
        workVm.setPerson(this.getPerson() != null ? this.getPerson().getViewModel() : null);

        return workVm;
    }


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

    public void setDate(java.util.Calendar date) {
        this.date = date;
    }

    @Transient
    public String getPersianDate() {
        ULocale local = new ULocale("fa_IR@calendar=persian");
        com.ibm.icu.util.Calendar persianCalendar = com.ibm.icu.util.Calendar.getInstance(local);
        persianCalendar.clear();

        Calendar gc = GregorianCalendar.getInstance();
        gc.set(2016, Calendar.JUNE, 30);

        persianCalendar.setTime(gc.getTime());

        return "" + persianCalendar.get(Calendar.YEAR)
                + persianCalendar.get(Calendar.MONTH)
                + persianCalendar.get(Calendar.DAY_OF_MONTH);
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
