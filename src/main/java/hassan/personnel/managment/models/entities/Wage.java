package hassan.personnel.managment.models.entities;

import hassan.personnel.managment.models.interfaces.ViewModel;
import hassan.personnel.managment.models.vm.WageVm;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
@Table(name = "Wage")
public class Wage implements ViewModel {

    public Wage(){
    }

    public Wage(Calendar startDate, double price, Position position) {
        this.startDate = startDate;
        this.price = price;
        this.position = position;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(nullable = false)
    private Calendar startDate;

    @Column(nullable = true)
    private double price;

//    @Column(name = "position_id")
//    private int postionId;

    @ManyToOne
    //    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "wage_id"))
    private Position position;

    public WageVm getViewModel() {
        WageVm wageVm = new WageVm();
        wageVm.setId(this.getId());
        wageVm.setStartDate(this.getStartDate());
        wageVm.setPrice(this.getPrice());
        wageVm.setPosition(this.getPosition() != null ? this.getPosition().getViewModel() : null);

        return wageVm;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Calendar getStartDate() {
        return startDate;
    }

    public void setStartDate(Calendar startDate) {
        this.startDate = startDate;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Position getPosition() {
        return position;
    }

    public void setPosition(Position position) {
        this.position = position;
    }

//    public int getPostionId() {
//        return postionId;
//    }
//
//    public void setPostionId(int postionId) {
//        this.postionId = postionId;
//    }
}
