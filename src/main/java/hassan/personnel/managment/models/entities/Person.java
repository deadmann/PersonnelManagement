package hassan.personnel.managment.models.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
public class Person {

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
//    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "position_id"))//referencedColumnName = "positionId")-->Name of the PK
    private Position position;

    @OneToMany(mappedBy = "person")
    private List<Work> works;

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
