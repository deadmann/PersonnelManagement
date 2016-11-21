package hassan.personnel.managment.models.vm;

import java.util.List;

/**
 * Created by Hassan on 11/21/2016.
 */
public class PersonVm {
    private int id;

    private String firstname;

    private String lastname;

    private PositionVm position;

    private List<WorkVm> works;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public PositionVm getPosition() {
        return position;
    }

    public void setPosition(PositionVm position) {
        this.position = position;
    }

    public List<WorkVm> getWorks() {
        return works;
    }

    public void setWorks(List<WorkVm> works) {
        this.works = works;
    }
}
