package hassan.personnel.managment.rests;

import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.models.dto.PositionInsertDto;
import hassan.personnel.managment.models.vm.PositionVm;
import hassan.personnel.managment.services.PositionService;
import hassan.personnel.managment.services.WageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/positions")
public class PositionsController {

    @Autowired
    private PositionService positionService;
    @Autowired
    private WageService wageService;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private PositionVm get(@PathVariable int id){
        Position position = positionService.getPosition(id);
        return position.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<PositionVm> getAll(){
        List<Position> positionList = positionService.getAll();
        return positionList.stream().map(m->m.getViewModel()).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private Position save(@RequestBody PositionInsertDto positionInsert){
        Position position = new Position(positionInsert.getTitle());
        position = positionService.save(position);

        Wage wage = new Wage(Date.valueOf(LocalDate.MIN), positionInsert.getStartPrice(), position);
        return wageService.save(wage).getPosition();
    }



    @RequestMapping(value = "/fetch-wage", method = RequestMethod.GET)
    private List<Position> fetchWage(){
        return positionService.getAllPositionFetchWate();
    }
}
