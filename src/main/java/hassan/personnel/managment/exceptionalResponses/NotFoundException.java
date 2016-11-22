package hassan.personnel.managment.exceptionalResponses;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Hassan on 11/21/2016.
 * Just As Sample Exception
 *
 * Other ways to Return Status Code:
 * http://stackoverflow.com/questions/16232833/how-to-respond-with-http-400-error-in-a-spring-mvc-responsebody-method-returnin
 * http://stackoverflow.com/questions/24292373/spring-boot-rest-controller-how-to-return-different-http-status-codes
 */
@ResponseStatus(code = HttpStatus.NOT_FOUND, reason = "Not Found")
public class NotFoundException extends Exception {

    public NotFoundException() {
    }
}
