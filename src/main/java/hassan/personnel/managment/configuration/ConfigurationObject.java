package hassan.personnel.managment.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;

/**
 * Created by Hassan on 11/21/2016.
 */
@Configuration
//LOWER PRIORITY
@PropertySource(value = "classpath:/appConfig.properties", encoding = "UTF-8")
@PropertySource(value = "classpath:/config/appConfig.properties", ignoreResourceNotFound = true, encoding = "UTF-8")
@PropertySource(value = "file:./appConfig.properties", ignoreResourceNotFound = true, encoding = "UTF-8")
@PropertySource(value = "file:./config/appConfig.properties", ignoreResourceNotFound = true, encoding = "UTF-8")
//HIGHER PRIORITY
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

    @Value("${application.copyright.en.year}")
    private String copyRightYearEnglish;

    @Value("${application.copyright.en.name}")
    private String copyRightNameEnglish;

    @Value("${application.copyright.fa.year}")
    private String copyRightYearPersian;

    @Value("${application.copyright.fa.name}")
    private String copyRightNamePersian;

    public int getStartYear() {
        return startYear;
    }
    public String getCopyRightYearEnglish(){return copyRightYearEnglish;}
    public String getCopyRightNameEnglish(){return copyRightNameEnglish;}
    public String getCopyRightYearPersian(){return copyRightYearPersian;}
    public String getCopyRightNamePersian(){return copyRightNamePersian;}
}
