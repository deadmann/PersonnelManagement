package hassan.personnel.managment.rests;

import hassan.personnel.managment.repositories.DatabaseManagerRepository;
import hassan.personnel.managment.utility.StrMgr;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
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

    //produces = { "application/gzip" },
    @RequestMapping(value = "/get-backup", method = RequestMethod.GET)
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
        String prefix = "DBK-"
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.YEAR)), 4, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MONTH)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.DAY_OF_MONTH)), 2, "0")
                + "-"
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.HOUR)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.MINUTE)), 2, "0")
                + StrMgr.leftPad(String.valueOf(cal.get(Calendar.SECOND)), 2, "0");
        String suffix = ".tar.gz";
        zipFile = File.createTempFile(prefix, suffix);

        zipFile.delete();

        databaseManagerRepository.Backup(zipFile.getAbsolutePath());

        response.setContentType("application/gzip");
        response.setHeader("Content-disposition", "attachment; filename=" + zipFile.getName());

//            OutputStream out = response.getOutputStream();
//            FileInputStream in = new FileInputStream(zipFile);
            /*
             * copy from in to out
             */
        OutputStream out = null;
        FileInputStream in = null;
        try {
            out = response.getOutputStream();
            in = new FileInputStream(zipFile);

            byte[] buffer = new byte[4096]; // To hold file contents
            int bytes_read; // How many bytes in buffer

            // Read a chunk of bytes into the buffer, then write them out,
            // looping until we reach the end of the file (when read() returns
            // -1). Note the combination of assignment and comparison in this
            // while loop. This is a common I/O programming idiom.
            while ((bytes_read = in.read(buffer)) != -1)
                // Read until EOF
                out.write(buffer, 0, bytes_read); // write
        }
        catch (Exception ex){
            System.out.print(ex.getMessage());
        }
        // Always close the streams, even if exceptions were thrown
        finally {
            if (in != null)
                try {
                    in.close();
                } catch (IOException e) {
                    ;
                }
            if (out != null)
                try {
                    out.close();
                } catch (IOException e) {
                    ;
                }
        }

//        out.close();
//        in.close();
        zipFile.delete();
    }
}
