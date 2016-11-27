package hassan.personnel.managment;

import org.apache.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class DemoApplication { //extends SpringBootServletInitializer {

	final static Logger logger = Logger.getLogger(DemoApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);

        if(logger.isDebugEnabled()){
            logger.debug("This is debug");
        }

        if(logger.isInfoEnabled()){
            logger.info("This is info");
        }

        logger.warn("This is warn");
        logger.error("This is error");
        logger.fatal("This is fatal");

        logger.warn("TASK: It Seems That Log4J does not look inside log4j.properties file :|");
        logger.warn("TASK: Deactivate Server Default Rest for Save/Remove/Update Requests (Force User to Use /rest/ Instead)");
        logger.warn("TASK: Test Personnel Management - Works/ByPersonAndMonth");
	}
}
