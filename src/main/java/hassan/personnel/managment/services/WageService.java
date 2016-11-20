package hassan.personnel.managment.services;

import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.repositories.WageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by Hassan on 11/17/2016.
 */
@Service
public class WageService {

    @Autowired
    private WageRepository wageRepository;

    public Wage getWage(int id) {
        return wageRepository.findOne(id);
    }

    public List<Wage> getAll(){
        return (List<Wage>) wageRepository.findAll();
    }

    public Wage save(Wage wage) {
        return wageRepository.save(wage);
    }

    public Iterable<Wage> save(Iterable<Wage> iterable){
        return wageRepository.save(iterable);
    }

}
