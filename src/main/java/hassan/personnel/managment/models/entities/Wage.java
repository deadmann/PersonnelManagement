package hassan.personnel.managment.models.entities;

import hassan.personnel.managment.models.interfaces.Model;
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
public class Wage implements Model, ViewModel {

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

    @Temporal(TemporalType.DATE)
    @Column(nullable = false)
    private Calendar startDate;

    @Column(nullable = true)
    private double price;

    @ManyToOne
    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "FK_WAGE_POSITION"))//Name of the FK Constraint
    private Position position;

    public WageVm getViewModel() {
        WageVm wageVm = new WageVm();
        wageVm.setId(this.getId());
        wageVm.setStartDate(this.getStartDate());
        wageVm.setPrice(this.getPrice());
        wageVm.setPosition(this.getPosition() != null ? this.getPosition().getViewModel() : null);

        return wageVm;
    }

    public Wage getCopy(boolean withNextLevelArray){
        Wage copy = new Wage();
        copy.setId(this.getId());
        copy.setPrice(this.getPrice());
        copy.setStartDate(this.getStartDate());
        copy.setPosition(this.getPosition().getCopy(false));
        return copy;
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
        //Remove Wage from Old Position
        if(this.position!=null)
            this.position.getWages().remove(this);

        this.position = position;

        //Add Wage to New Position, if new Position has wages (is not null it self)
        if(this.position!=null)
            this.position.getWages().add(this);
    }
}
