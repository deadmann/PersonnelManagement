package hassan.personnel.managment.services;


import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.repositories.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    public List<Position> getAll(){
        return (List<Position>) positionRepository.findAll();
    }

    public Position save(Position position) {
        return positionRepository.save(position);
    }

    public Iterable<Position> save(Iterable<Position> iterable){
        return positionRepository.save(iterable);
    }




    public List<Position> getAllPositionFetchWage(){
        return positionRepository.findAllPositionFetchWage();
    }

    public Position remove(int id) {
        Position position = positionRepository.findOne(id);
        positionRepository.delete(id);
        return position;
    }
}
