package com.pharm.chorok.config;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class CustomLoginFailureHandler  implements AuthenticationFailureHandler {

	private String errMsg = "";

    @Override
    public void onAuthenticationFailure(
    		HttpServletRequest request, 
    		HttpServletResponse response, 
    		AuthenticationException exception) throws IOException, ServletException {
        

    	if(exception instanceof BadCredentialsException) {
			errMsg = "로그인 정보가 맞지 않습니다";
    	} 
    	if(exception instanceof InternalAuthenticationServiceException) { //id가 존재하지 않는 경우
			errMsg = "로그인 정보가 맞지 않습니다";
    	}
        

//        } else if(exception instanceof InternalAuthenticationServiceException) {
//            errormsg = MessageUtils.getMessage("error.BadCredentials");
//        } else if(exception instanceof DisabledException) {
//            errormsg = MessageUtils.getMessage("error.Disaled");
//        } else if(exception instanceof CredentialsExpiredException) {
//            errormsg = MessageUtils.getMessage("error.CredentialsExpired");
//        }
//        
//        request.setAttribute(loginidname, username);
//        request.setAttribute(loginpwdname, password);
   	
        request.setAttribute("errMsg", errMsg);
        request.getRequestDispatcher("/account/loginFailRedirect").forward(request, response);
    }
}