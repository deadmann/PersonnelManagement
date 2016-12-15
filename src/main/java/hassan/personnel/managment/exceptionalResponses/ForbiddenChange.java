package hassan.personnel.managment.exceptionalResponses;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Created by Hassan on 12/15/2016.
 */
@ResponseStatus(code = HttpStatus.FORBIDDEN, reason = "Changing of  This Item in Some Property or All Is Forbidden")
public class ForbiddenChange extends Exception {

    public ForbiddenChange() {
    }

    public ForbiddenChange(String message) {
        super(message);
    }

    public ForbiddenChange(String message, Throwable cause) {
        super(message, cause);
    }

    public ForbiddenChange(Throwable cause) {
        super(cause);
    }

    protected ForbiddenChange(String message, Throwable cause, boolean enableSuppression, boolean writableStackTrace) {
        super(message, cause, enableSuppression, writableStackTrace);
    }
}