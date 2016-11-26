package hassan.personnel.managment.seeders;

import hassan.personnel.managment.models.entities.Building;
import hassan.personnel.managment.models.entities.Person;
import hassan.personnel.managment.models.entities.Position;
import hassan.personnel.managment.models.entities.Wage;
import hassan.personnel.managment.services.BuildingService;
import hassan.personnel.managment.services.PersonService;
import hassan.personnel.managment.services.PositionService;
import hassan.personnel.managment.services.WageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import sun.util.resources.LocaleData;

import java.sql.Date;
import java.time.LocalDate;
import java.util.*;

/**
 * Created by Hassan on 11/17/2016.
 */
@Component
public class DatabaseSeeder implements CommandLineRunner {

    private BuildingService buildingService;
    private PersonService personService;
    private PositionService positionService;
    private WageService wageService;

    @Autowired
    public DatabaseSeeder(BuildingService buildingService, PersonService personService, PositionService positionService, WageService wageService){
        this.buildingService = buildingService;
        this.personService = personService;
        this.positionService = positionService;
        this.wageService = wageService;
    }

    @Override
    public void run(String... strings) throws Exception {
        if(!buildingService.getAll().isEmpty())
            return;

       List<Building> buildingList = new ArrayList<Building>(){
            {
                add(new Building("Azarbaijani"));
                add(new Building("Dadgostari"));
            }
        };
        buildingService.save(buildingList);

        List<Position> positionList = new ArrayList<Position>(){
            {
                add(new Position("Mohandes"));
                add(new Position("Kargar"));
            }
        };
        positionService.save(positionList);

        List<Wage> wageList = new ArrayList<Wage>(){
            {
                add(new Wage(Calendar.getInstance(), 1000.0, positionList.get(1)));
                add(new Wage(Calendar.getInstance(), 1200.0, positionList.get(0)));
            }
        };
        wageService.save(wageList);

        List<Person> personList = new ArrayList<Person>(){
            {
                add(new Person("Moradi", "Ali", positionList.get(0)));
                add(new Person("Aghai", null, positionList.get(1)));
            }
        };
        personService.save(personList);


    }
}
