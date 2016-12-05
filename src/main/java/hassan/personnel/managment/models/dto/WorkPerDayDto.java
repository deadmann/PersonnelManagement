package hassan.personnel.managment.models.dto;

/**
 * Created by Hassan on 11/24/2016.
 */
public class WorkPerDayDto {
    private long workId;
    private int personId;
    private int year;
    private int month;
    private int day;
    private int buildingId;
    private float workingHours;

    public WorkPerDayDto() {
    }

    public WorkPerDayDto(long workId, int personId, int year, int month, int day, int buildingId, float workingHours) {
        this.workId = workId;
        this.personId = personId;
        this.year = year;
        this.month = month;
        this.day = day;
        this.buildingId = buildingId;
        this.workingHours = workingHours;
    }

    public long getWorkId() {
        return workId;
    }

    public void setWorkId(long workId) {
        this.workId = workId;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getDay() {
        return day;
    }

    public void setDay(int day) {
        this.day = day;
    }

    public int getBuildingId() {
        return buildingId;
    }

    public void setBuildingId(int buildingId) {
        this.buildingId = buildingId;
    }

    public float getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(float workingHours) {
        this.workingHours = workingHours;
    }
}
