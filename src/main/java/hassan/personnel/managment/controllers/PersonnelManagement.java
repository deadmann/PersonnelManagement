package hassan.personnel.managment.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Created by Hassan on 11/18/2016.
 */
@Controller
@RequestMapping("/pm/")
public class PersonnelManagement {

    @RequestMapping(value = "/", method = RequestMethod.GET)
    private String index(){
        return "index";
    }
}
