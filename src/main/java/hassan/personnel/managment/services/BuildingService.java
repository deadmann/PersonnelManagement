package hassan.personnel.managment.services;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.repositories.BuildingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class BuildingService {

    @Autowired
    private BuildingRepository buildingRepository;

    public Building getBuilding(int id) {
        return buildingRepository.findOne(id);
    }

    public List<Building> getBuildings(){
        return buildingRepository.findAll();
    }

    public Building save(Building building) throws ConflictException {
        if(getBuilding(building.getId())!=null)
            throw new ConflictException("This Item Already Exists");
        return buildingRepository.save(building);
    }

    public Iterable<Building> save(Iterable<Building> iterable){
        return buildingRepository.save(iterable);
    }

    public Building remove(int id) {
        Building building = buildingRepository.findOne(id);
        Building copy = building.getCopy(true);

        buildingRepository.delete(id);

        //Breaking Links
        building.getWorks().forEach((e)->{
            e.setBuilding(null);
        });

        return copy;
    }

    public Building update(Building building){
        return buildingRepository.save(building);
    }
}
