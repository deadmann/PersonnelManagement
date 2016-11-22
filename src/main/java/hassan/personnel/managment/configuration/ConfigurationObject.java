package hassan.personnel.managment.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;

/**
 * Created by Hassan on 11/21/2016.
 */
@Configuration
@PropertySource(value = "classpath:/appConfig.properties")
public class ConfigurationObject {
    //One Way
    @Autowired
    Environment env;

    public Object getEnvironmentVariable(String key){
        return env.getProperty(key);
    }

    //One Another Way
    @Value("${application.start-year}")
    private int startYear;

    public int getStartYear() {
        return startYear;
    }
}
