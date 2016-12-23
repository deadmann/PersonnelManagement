package hassan.personnel.managment.rests;

import hassan.personnel.managment.DemoApplication;
import hassan.personnel.managment.repositories.DatabaseManagerRepository;
import hassan.personnel.managment.utility.StrMgr;
import hassan.personnel.managment.utility.ZipUtil;
import org.hibernate.SQLQuery;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.FileSystemResource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Calendar;
import java.util.GregorianCalendar;

/**
 * Created by Hassan on 12/23/2016.
 */
@RestController
@RequestMapping(value = "/rest/database-manager")
public class DatabaseManager {

    private ServletContext servletContext;
    private final Environment env;
    private final DatabaseManagerRepository databaseManagerRepository;

    @Autowired
    public DatabaseManager(Environment env, ServletContext servletContext, DatabaseManagerRepository databaseManagerRepository) {
        this.env = env;
        this.servletContext = servletContext;
        this.databaseManagerRepository = databaseManagerRepository;
    }

    @RequestMapping(value = "/get-backup", produces = { "application/zip" }, method=RequestMethod.GET)
    private void getBackup(HttpServletResponse response) throws IOException {
        /*//String directory = DemoApplication.class.getResource("").getPath();
        String outputLocation = servletContext.getRealPath("./");
        String dataBaseFilePath = servletContext.getRealPath(env.getProperty("application.database-file-location"));
        Calendar cal = new GregorianCalendar();
        String zipFile = outputLocation + "/backup-"
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.YEAR)), 4, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MONTH)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.DAY_OF_MONTH)), 2, "0")
                + "-"
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.HOUR)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MINUTE)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.SECOND)), 2, "0")
                + ".zip";

        SQLQuery query = session.createSQLQuery("BACKUP DATABASE TO '/tmp/backup.tar.gz' BLOCKING");
        query.executeUpdate();*/

        File zipFile = null;

            Calendar cal = new GregorianCalendar();
            String suffix = "-"
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.YEAR)), 4, "0")
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MONTH)), 2, "0")
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.DAY_OF_MONTH)), 2, "0")
                    + "-"
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.HOUR)), 2, "0")
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MINUTE)), 2, "0")
                    + StrMgr.leftPad(String.valueOf(cal.get(Calendar.SECOND)), 2, "0")
                    + ".bak";
            zipFile = File.createTempFile("DBK-", suffix);

            databaseManagerRepository.Backup(zipFile.getAbsolutePath());

            response.setContentType("application/zip");
            response.setHeader("Content-disposition", "attachment; filename=" + zipFile.getName());

            OutputStream out = response.getOutputStream();
            FileInputStream in = new FileInputStream(zipFile);
            /*
             * copy from in to out
             */
            out.close();
            in.close();
            zipFile.delete();
    }
}
