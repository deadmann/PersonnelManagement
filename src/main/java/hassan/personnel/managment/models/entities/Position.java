package hassan.personnel.managment.models.entities;

import hassan.personnel.managment.models.interfaces.ViewModel;
import hassan.personnel.managment.models.vm.PositionVm;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
public class Position implements ViewModel {

    public Position(){
        personnel = new ArrayList<Person>();
        wages = new ArrayList<Wage>();
    }

    public Position(String title) {
        this.title = title;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String title;

    @OneToMany(mappedBy = "position")
    private List<Wage> wages;

    @OneToMany(mappedBy = "position")
    private List<Person> personnel;

    public PositionVm getViewModel() {
        PositionVm positionVm = new PositionVm();
        positionVm.setId(this.getId());
        positionVm.setTitle(this.getTitle());
        positionVm.setPersonnel(null);
        positionVm.setWages(null);

        return positionVm;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

//    public int getWageId() {
//        return wageId;
//    }
//
//    public void setWageId(int wageId) {
//        this.wageId = wageId;
//    }

    public List<Wage> getWages() {
        return wages;
    }

    public void setWages(List<Wage> wages) {
        this.wages = wages;
    }

    public List<Person> getPersonnel() {
        return personnel;
    }

    public void setPersonnel(List<Person> personnel) {
        this.personnel = personnel;
    }
}
