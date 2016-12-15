package hassan.personnel.managment.models.entities;

import com.ibm.icu.util.ULocale;
import hassan.personnel.managment.models.interfaces.Model;
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
public class Work implements Model, ViewModel {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private float workPerDay;

    @Temporal(TemporalType.DATE)
    private java.util.Calendar date;

    @ManyToOne
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "FK_WORK_PERSON"))//Name of the FK Constraint
    private Person person;

    @ManyToOne
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "FK_WORK_BUILDING"))//Name of the FK Constraint
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

    public Work getCopy(boolean withNextLevelArray){
        Work copy = new Work();
        copy.setId(this.getId());
        copy.setDate(this.getDate());
        copy.setWorkPerDay(this.getWorkPerDay());
        copy.setBuilding(this.getBuilding().getCopy(false));
        copy.setPerson(this.getPerson().getCopy(false));
        return copy;
    }

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

    public Person getPerson() {
        return person;
    }

    public void setPerson(Person person) {
        //Remove Work from Old Person
        if(this.person!=null)
            this.person.getWorks().remove(this);

        this.person = person;

        //Add Work to New Person, if new Person has Works (is not null it self)
        if(this.person!=null)
            this.person.getWorks().add(this);
    }

    public Building getBuilding() {
        return building;
    }

    public void setBuilding(Building building) {
        //Remove Work from Old Building
        if(this.building!=null)
            this.building.getWorks().remove(this);

        this.building = building;

        //Add Work to New Building, if new Building has works (is not null it self)
        if(this.building!=null)
            this.building.getWorks().add(this);
    }
}
