package hassan.personnel.managment.exceptionalResponses;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Hassan on 12/15/2016.
 */
@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Removing This Item Is Forbidden")
public class ForbiddenRemove extends Exception {

    public ForbiddenRemove() {
    }

    public ForbiddenRemove(String message) {
        super(message);
    }

    public ForbiddenRemove(String message, Throwable cause) {
        super(message, cause);
    }

    public ForbiddenRemove(Throwable cause) {
        super(cause);
    }

    protected ForbiddenRemove(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}