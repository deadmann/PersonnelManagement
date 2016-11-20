package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.services.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Hassan on 11/16/2016.
 */
@RestController
@RequestMapping("/rest/buildings")
public class BuildingsController {

    @Autowired
    private BuildingService buildingService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private Building get(@PathVariable int id){
        return buildingService.getBuilding(id);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<Building> getAll(){
        return  buildingService.getAll();
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Building save(@RequestBody Building building){
        return buildingService.save(building);
    }


}
