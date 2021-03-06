package hassan.personnel.managment.models.entities;

import hassan.personnel.managment.models.interfaces.Model;
import hassan.personnel.managment.models.interfaces.ViewModel;
import hassan.personnel.managment.models.vm.BuildingVm;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
@Table(name = "Building")
public class Building implements Model, ViewModel {
    public Building(String name) {
        this.name = name;
    }

    public Building() {
        this.works = new ArrayList<>();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String name;

    @OneToMany(mappedBy = "building")//, cascade = CascadeType.ALL)
    private List<Work> works;

    public BuildingVm getViewModel(){
        BuildingVm buildingVm = new BuildingVm();
        buildingVm.setId(this.getId());
        buildingVm.setName(this.getName());
        buildingVm.setWorks(null);

        return buildingVm;
    }

    public Building getCopy(boolean withNextLevelArray){
        Building copy = new Building();
        copy.setId(this.getId());
        copy.setName(this.getName());

        if (withNextLevelArray) {
            List<Work> workList = new ArrayList<>();
            for (Work work : this.getWorks()) {
                workList.add((Work) work.getCopy(false));
            }
            copy.setWorks(workList);
        }

        return copy;
    }

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

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }
}
