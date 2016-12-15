package hassan.personnel.managment.rests;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.models.vm.BuildingVm;
import hassan.personnel.managment.services.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/16/2016.
 */
@RestController
@RequestMapping("/rest/buildings")
public class BuildingsController {

    @Autowired
    private BuildingService buildingService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private BuildingVm get(@PathVariable int id){
        Building building = buildingService.getBuilding(id);
        return building.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<BuildingVm> getAll(){
        List<Building> buildingList = buildingService.getBuildings();
        return buildingList.stream().map(Building::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Building save(@RequestBody Building building) throws ConflictException {
        return buildingService.save(building);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private BuildingVm remove(@PathVariable int id) throws NotFoundException, ConflictException {
        Building building = null;
        try {
            building = buildingService.remove(id);
            return building.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    private BuildingVm update(@PathVariable int id, @RequestBody Building building) throws ConflictException, NotFoundException, InvalidDataException {
        try {
            if(id != building.getId())
                throw new InvalidDataException("Model id does not match with requested id");

            Building buildingUpdate = buildingService.getBuilding(building.getId());
            buildingUpdate.setName(building.getName());

            buildingService.update(buildingUpdate);
            return building.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

}
