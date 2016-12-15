package hassan.personnel.managment.models.interfaces;

/**
 * Created by Hassan on 12/15/2016.
 */
public interface Model<ModelType> {
    ModelType getCopy(boolean withNextLevelArray);
}
