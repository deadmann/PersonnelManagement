package hassan.personnel.managment.models.entities;

import javax.persistence.*;
import java.util.Date;

/**
 * Created by Hassan on 11/16/2016.
 */
@Entity
public class Wage {

    public Wage(){
    }

    public Wage(Date startDate, double price, Position position) {
        this.startDate = startDate;
        this.price = price;
        this.position = position;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private Date startDate;

    @Column(nullable = true)
    private double price;

//    @Column(name = "position_id")
//    private int postionId;

    @ManyToOne
    //    @JoinColumn(nullable = false, foreignKey = @ForeignKey(name = "wage_id"))
    private Position position;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
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
