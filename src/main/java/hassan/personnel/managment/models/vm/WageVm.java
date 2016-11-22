package hassan.personnel.managment.models.vm;

import java.util.Calendar;

/**
 * Created by Hassan on 11/21/2016.
 */
public class WageVm {
    private int id;

    private Calendar startDate;

    private double price;

    private PositionVm position;

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

    public PositionVm getPosition() {
        return position;
    }

    public void setPosition(PositionVm position) {
        this.position = position;
    }
}
