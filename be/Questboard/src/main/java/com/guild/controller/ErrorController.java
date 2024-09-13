package com.guild.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.security.sasl.AuthenticationException;

@Controller
public class ErrorController {

    @ResponseBody
    @RequestMapping(value = "/error", method = {RequestMethod.GET, RequestMethod.POST})
//    @RequestMapping(value = "/getLoginError")
    public void getLoginError(HttpServletRequest req, HttpServletResponse resp) {
        AuthenticationException exception = (AuthenticationException) req.getSession().getAttribute("SPRING_SECURITY_LAST_EXCEPTION");
        String status = String.valueOf(resp.getStatus());

        String errMsg = status==null?"null":status;
        System.out.println("SPRING_SECURITY_EXCEPTION: "+exception);
        System.out.println("STATUS: "+ errMsg);
//        Enumeration<String> attributes = req.getSession().getAttributeNames();
//        while (attributes.hasMoreElements()) {
//            String attribute = (String) attributes.nextElement();
//            System.out.println(attribute+" : "+req.getSession().getAttribute(attribute));
//        }
//        System.out.println(Arrays.stream(req.getCookies()).toList());
//        System.out.println("error: "+req.getSession().getAttribute("error"));
    }

//    @ResponseBody
//    @RequestMapping(value ="/tokenInvalid")
//    public ResponseEntity tokenInvalid (HttpServletResponse response) {
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("token expired");
//    }
}
