package hassan.personnel.managment.repositories;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

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

    /*The query force us to use transaction, and since the DB is online and we use spring, it also force us to use spring transaction*/
    @Transactional(rollbackFor = {Exception.class})
    public void Backup(String outputDir) {
//        EntityTransaction transaction = entityManager.getTransaction();
//        transaction.begin();
//        try {
            //NOT BLOCKING -> For large database, backup is performed while the database perform other operations
            //AS FILES -> We only define directory not the file itself
            Query q = entityManager.createNativeQuery("BACKUP DATABASE TO '" + outputDir + "' BLOCKING"/*" AS FILES"*/);
            q.executeUpdate();
//            transaction.commit();
//        }catch(Exception ex){
//            transaction.rollback();
//        }

//        try {
//            Class.forName("org.hsqldb.jdbcDriver");
//            Connection conn = DriverManager.getConnection("jdbc:hsqldb:file:./PersonnelDb", "sa", "pass");
//            Statement st = conn.createStatement();
//            st.execute("BACKUP DATABASE TO '" + outputDir + "' BLOCKING AS FILES");
//        } catch (SQLException e) {
//            e.printStackTrace();
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
    }
}
