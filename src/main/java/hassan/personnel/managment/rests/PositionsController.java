package hassan.personnel.managment.rests;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.exceptionalResponses.InvalidDataException;
import hassan.personnel.managment.exceptionalResponses.NotFoundException;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.models.dto.PositionInsertDto;
import hassan.personnel.managment.models.vm.PositionVm;
import hassan.personnel.managment.services.PositionService;
import hassan.personnel.managment.services.WageService;
import hassan.personnel.managment.utility.CalendarHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/positions")
public class PositionsController {

    private final static org.apache.log4j.Logger LOGGER = org.apache.log4j.Logger.getLogger(WorksController.class);

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
        List<Position> positionList = positionService.getPositions();
        return positionList.stream().map(Position::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "/fetch-wage", method = RequestMethod.GET)
    private List<PositionVm> fetchWage(){
        List<Position> positionList = positionService.getPositions();
        return positionList.stream().map(Position::getViewModelWithWages).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    @Transactional(rollbackFor = {Exception.class})
    private PositionVm save(@RequestBody PositionInsertDto positionInsert) throws ConflictException {
        Position position = new Position(positionInsert.getTitle());

        if(position.getWages()==null) {
            position.setWages(new ArrayList<>());
        }

        //Add Position to Wage
        Wage wage = new Wage(CalendarHelper.getMinimum(), positionInsert.getStartPayment(), position);
        //Add Wage to Position
        position.getWages().add(wage);

        position = positionService.save(position);
        wage = wageService.save(wage);

        return position.getViewModelWithWages();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @Transactional(rollbackFor = {Exception.class})
    private PositionVm remove(@PathVariable int id) throws NotFoundException, ConflictException {
        Position position = null;
        LOGGER.warn("THIS METHOD IS NOT TESTED");
        try {
            //Check if There are person linked to this Position then throw Conflict(409) Error
            if(!positionService.getPosition(id).getPersonnel().isEmpty())
                throw new ConflictException("There are personnel that are linked to this entity");

            //Try to remove all wages linked to this Position
            for (Wage wage : positionService.getPosition(id).getWages()) {
                wageService.remove(wage.getId());
            }
            //After Deleting All Wages, Delete Position Itself
            position = positionService.remove(id);
            return position.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    private PositionVm update(@PathVariable int id, @RequestBody Position position) throws ConflictException, NotFoundException, InvalidDataException {
        try {
            if(id != position.getId())
                throw new InvalidDataException("Model id does not match with requested id");

            Position positionUpdate = positionService.getPosition(position.getId());
            positionUpdate.setTitle(position.getTitle());

            positionService.update(positionUpdate);
            return positionUpdate.getViewModelWithWages();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

    // Sample of Custom Query
    private List<Position> querySampleFetchWage(){
        List<Position> values = this.positionService.getPositionsFetchWage();
        return values;
    }
}
