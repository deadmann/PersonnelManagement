package hassan.personnel.managment.models.vm;

import java.util.List;

/**
 * Created by Hassan on 11/21/2016.
 */
public class BuildingVm {
    private int id;

    private String name;

    private List<WorkVm> works;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<WorkVm> getWorks() {
        return works;
    }

    public void setWorks(List<WorkVm> works) {
        this.works = works;
    }
}
