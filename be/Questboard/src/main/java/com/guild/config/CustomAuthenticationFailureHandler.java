package com.guild.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

import java.io.IOException;
import java.util.Base64;
import java.util.Enumeration;

//@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
    private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String encodedErrorMessage = null;
        // Get AuthenticationException that was thrown in UserDetailsService, retrieve the error message and attach it as encoded error parameter of the error login page
        if (exception != null) {
            String errorMessage = exception.getMessage();
            System.out.println("FailureHandler: " + errorMessage);
            Enumeration<String> attributes = request.getSession().getAttributeNames();
            while (attributes.hasMoreElements()) {
                String attribute = (String) attributes.nextElement();
                System.out.println(attribute+" : "+request.getSession().getAttribute(attribute));
            }
            encodedErrorMessage = Base64.getUrlEncoder().encodeToString(errorMessage.getBytes());
        }
        request.setAttribute("error", encodedErrorMessage);
        redirectStrategy.sendRedirect(request, response, "/getLoginError");
    }
}
