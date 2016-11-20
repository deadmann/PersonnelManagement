package hassan.personnel.managment.models.dto;

/**
 * Created by Hassan on 11/19/2016.
 */
public class PositionInsertDto {
    private String title;

    private double startPrice;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(double startPrice) {
        this.startPrice = startPrice;
    }
}
