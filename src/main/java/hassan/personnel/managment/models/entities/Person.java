package hassan.personnel.managment.models.entities;

import hassan.personnel.managment.models.interfaces.ViewModel;
import hassan.personnel.managment.models.vm.PersonVm;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
@Table(name = "Person")
public class Person implements ViewModel {

    public Person(){
        this.works = new ArrayList<>();
    }

    public Person(String firstname, String lastname, Position position) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.position = position;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 50)
    private String firstname;

    @Column(nullable = true, length = 50)
    private String lastname;

//    @Column(name = "position_id")
//    private int positionId;

    @ManyToOne
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "FK_PERSON_POSITION"))//Name of the FK Constraint
    private Position position;

    @OneToMany(mappedBy = "person", cascade = CascadeType.ALL)
    private List<Work> works;

    public PersonVm getViewModel() {
        PersonVm personVm = new PersonVm();
        personVm.setId(this.getId());
        personVm.setFirstname(this.getFirstname());
        personVm.setLastname(this.getLastname());

        personVm.setPosition(this.getPosition() != null ? this.getPosition().getViewModel() : null);
        personVm.setWorks(null);

        return personVm;
    }

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

//    public int getPositionId() {
//        return positionId;
//    }
//
//    public void setPositionId(int positionId) {
//        this.positionId = positionId;
//    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }
}
