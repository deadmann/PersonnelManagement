package hassan.personnel.managment.rests;

import hassan.personnel.managment.exceptionalResponses.*;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.models.vm.WageVm;
import hassan.personnel.managment.services.PositionService;
import hassan.personnel.managment.services.WageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.Calendar;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Created by Hassan on 11/17/2016.
 */
@RestController
@RequestMapping("/rest/wages")
public class WagesController {

    private final WageService wageService;
    private final PositionService positionService;

    @Autowired
    public WagesController(WageService wageService, PositionService positionService) {
        this.wageService = wageService;
        this.positionService = positionService;
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    private WageVm get(@PathVariable int id){
        Wage wage = wageService.getWage(id);
        return wage.getViewModel();
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    private List<WageVm> getAll(){
        List<Wage> wageList = wageService.getWages();
        return wageList.stream().map(Wage::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "/by-position-id/{positionId}", method = RequestMethod.GET)
    private List<WageVm> getWagesByPositionId(@PathVariable int positionId){
        List<Wage> wageList = wageService.getWagesByPositionId(positionId);
        return wageList.stream().map(Wage::getViewModel).collect(Collectors.toList());
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    private WageVm save(@RequestBody Wage wage) throws ConflictException, InvalidDataException {
        Calendar cal = new GregorianCalendar(wage.getStartDate().get(
                Calendar.YEAR),
                wage.getStartDate().get(Calendar.MONTH),
                wage.getStartDate().get(Calendar.DAY_OF_MONTH));
        wage.setStartDate(cal);

        //Find First Wage
        Position position = positionService.getPosition(wage.getPosition().getId());
        Optional<Wage> first = position.getWages().stream().sorted((a, b)->{
            if(a.getStartDate().getTime().getTime()>b.getStartDate().getTime().getTime())
                return 1;
            if(a.getStartDate().getTime().getTime()<b.getStartDate().getTime().getTime())
                return -1;
            return 0;
        }).findFirst();

        if(!first.isPresent() || first.get() == null){
            throw new InvalidDataException("Position Does Not Contain Begining Wage");
        }

        if(first.get().getStartDate().getTime().getTime() >= wage.getStartDate().getTime().getTime()){
            throw new InvalidDataException("New Wage Should Not Begin Before The First Wage In Position");
        }

        wage.setPosition(position);
        return wageService.save(wage).getViewModel();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    private WageVm remove(@PathVariable int id) throws NotFoundException, ConflictException, ForbiddenRemove, InvalidDataException {
        Wage wage = wageService.getWage(id);

        Position position = positionService.getPosition(wage.getPosition().getId());
        Optional<Wage> first = position.getWages().stream().sorted((a, b)->{
            if(a.getStartDate().getTime().getTime()>b.getStartDate().getTime().getTime())
                return 1;
            if(a.getStartDate().getTime().getTime()<b.getStartDate().getTime().getTime())
                return -1;
            return 0;
        }).findFirst();

        if(!first.isPresent() || first.get() == null){
            throw new InvalidDataException("Position Does Not Contain Begining Wage");
        }

        //If FIRST ITEM disallow
        if(first.get().getId() == id)
            throw new ForbiddenRemove("This Item Should Not Get Deleted.");

        try {
            wage = wageService.remove(id);
            return wage.getViewModel();
        }catch (DataIntegrityViolationException ex){
            throw new ConflictException(ex.getMessage());
        }catch (EmptyResultDataAccessException ex){
            throw new NotFoundException("Requested Item Does Not Found");
        }
    }

    @RequestMapping(value="/{id}", method=RequestMethod.PUT)
    private WageVm update(@PathVariable int id, @RequestBody Wage wage) throws ConflictException, NotFoundException, InvalidDataException, ForbiddenChange {
        //Fix Incoming Calendar
        Calendar cal = new GregorianCalendar(wage.getStartDate().get(
                Calendar.YEAR),
                wage.getStartDate().get(Calendar.MONTH),
                wage.getStartDate().get(Calendar.DAY_OF_MONTH));
        wage.setStartDate(cal);

        try {
            if (id != wage.getId())
                throw new InvalidDataException("Model id does not match with requested id");

            Wage wageUpdate = wageService.getWage(wage.getId());

            //Find First Wage
            Position position = positionService.getPosition(wage.getPosition().getId());
            Optional<Wage> first = position.getWages().stream().sorted((a, b)->{
                if(a.getStartDate().getTime().getTime()>b.getStartDate().getTime().getTime())
                    return 1;
                if(a.getStartDate().getTime().getTime()<b.getStartDate().getTime().getTime())
                    return -1;
                return 0;
            }).findFirst();

            if(!first.isPresent() || first.get() == null){
                throw new InvalidDataException("Position Does Not Contain Begining Wage");
            }

            //If FIRST ITEM and DATE CHANGED disallow
            if (first.get().getId() == id
                    && first.get().getStartDate().getTimeInMillis() != wage.getStartDate().getTimeInMillis())
                throw new ForbiddenChange("Date Should Not Get Modified On First Item.");

            //Wage wageUpdate = wageService.getWage(wage.getId());
            wageUpdate.setStartDate(wage.getStartDate());
            wageUpdate.setPrice(wage.getPrice());

            wageService.update(wageUpdate);
            return wageUpdate.getViewModel();
        } catch (DataIntegrityViolationException ex) {
            throw new ConflictException(ex.getMessage());
        } catch (EmptyResultDataAccessException ex) {
            throw new NotFoundException("Requested Item Does Not Found");
        } catch (ForbiddenChange forbiddenChange) {
            throw forbiddenChange;
        }
    }
}
