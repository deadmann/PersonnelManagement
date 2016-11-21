package hassan.personnel.managment.models.vm;

import java.util.List;

/**
 * Created by Hassan on 11/21/2016.
 */
public class PositionVm {
    private int id;

    private String title;

    private List<WageVm> wages;

    private List<PersonVm> personnel;

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

    public List<WageVm> getWages() {
        return wages;
    }

    public void setWages(List<WageVm> wages) {
        this.wages = wages;
    }

    public List<PersonVm> getPersonnel() {
        return personnel;
    }

    public void setPersonnel(List<PersonVm> personnel) {
        this.personnel = personnel;
    }
}
