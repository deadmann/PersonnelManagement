package hassan.personnel.managment.services;


import hassan.personnel.managment.exceptionalResponses.ConflictException;
import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class PositionService {

    @Autowired
    private PositionRepository positionRepository;

    public Position getPosition(int id) {
        return positionRepository.findOne(id);
    }

    public List<Position> getPositions(){
        return (List<Position>) positionRepository.findAll();
    }

    public Position save(Position position) throws ConflictException {
        if(getPosition(position.getId())!=null)
            throw new ConflictException("This Item Already Exists");

        return positionRepository.save(position);
    }

    public Iterable<Position> save(Iterable<Position> iterable){
        return positionRepository.save(iterable);
    }




    public List<Position> getPositionsFetchWage(){
        return positionRepository.findAllPositionFetchWage();
    }

    public Position remove(int id) {
        Position position = positionRepository.findOne(id);
        Position copy = position.getCopy(true);

        positionRepository.delete(id);

        //Breaking Exists Links
        position.getPersonnel().forEach(e->{
            e.setPosition(null);
        });

        position.getWages().forEach(e->{
            e.setPosition(null);
        });

        return copy;
    }

    public Position update(Position position){
        return positionRepository.save(position);
    }
}
