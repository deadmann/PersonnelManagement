package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.models.vm.BuildingVm;
import hassan.personnel.managment.services.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
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
        List<Building> buildingList = buildingService.getAll();
        return buildingList.stream().map(Building::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Building save(@RequestBody Building building){
        return buildingService.save(building);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private Building remove(@PathVariable int id){
        return buildingService.remove(id);
    }
}
