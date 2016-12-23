package hassan.personnel.managment.repositories;

import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

/**
 * Created by Hassan on 12/23/2016.
 */
@Repository
public class DatabaseManagerRepository {
    @PersistenceContext
    private EntityManager entityManager;

    /*private JpaEntityInformation<Account, ?> entityInformation;*/

    /*@PostConstruct
    public void postConstruct() {
        this.entityInformation = JpaEntityInformationSupport.getMetadata(Account.class, entityManager);
    }*/

    public void Backup(String outputDir) {
        //NOT BLOCKING -> For large database, backup is performed while the database perform other operations
        entityManager.createNativeQuery("BACKUP DATABASE TO '" + outputDir + "' BLOCKING AS FILES");
    }
}
