package hassan.personnel.managment.services;

import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.repositories.PositionRepository;
import hassan.personnel.managment.repositories.WageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class WageService {

    private final WageRepository wageRepository;
    private final PositionRepository positionRepository;

    @Autowired
    public WageService(WageRepository wageRepository, PositionRepository positionRepository) {
        this.wageRepository = wageRepository;
        this.positionRepository = positionRepository;
    }

    public Wage getWage(int id) {
        return wageRepository.findOne(id);
    }

    public List<Wage> getWages(){
        return wageRepository.findAll();
    }

    public List<Wage> getWagesByPositionId(int id){
        return wageRepository.findByPositionId(id);
    }

    public Wage save(Wage wage) throws ConflictException {
        if(getWage(wage.getId())!=null)
            throw new ConflictException("This Item Already Exists");

        //Make sure position is coming from DB
        Position position = positionRepository.findOne(wage.getPosition().getId());
        wage.setPosition(position); //Add Position to Person

        return wageRepository.save(wage);
    }

    public Iterable<Wage> save(Iterable<Wage> iterable){
        return wageRepository.save(iterable);
    }

    public Wage remove(int id) {
        Wage wage = wageRepository.findOne(id);
        Wage copy = wage.getCopy(true);

        wageRepository.delete(id);

        //Break Exists Link
        wage.getPosition().getWages().remove(wage);
        wage.setPosition(null);

        return copy;
    }

    public Wage update(Wage wage){
        //Make sure position is coming from DB
        Position position = positionRepository.findOne(wage.getPosition().getId());
        wage.setPosition(position); //Add Position to Person

        return wageRepository.save(wage);
    }
}
