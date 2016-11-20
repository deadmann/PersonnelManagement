package hassan.personnel.managment.services;

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

    public List<Building> getAll(){
        return (List<Building>) buildingRepository.findAll();
    }

    public Building save(Building building) {
        return buildingRepository.save(building);
    }

    public Iterable<Building> save(Iterable<Building> iterable){
        return buildingRepository.save(iterable);
    }

}
