package com.pharm.chorok.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.service.CommUserDetailsService;



public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
    private CommUserDetailsService userDetailsService;
    
    @NonNull
    private BCryptPasswordEncoder passwordEncoder;

    public CustomAuthenticationProvider(BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.passwordEncoder = bCryptPasswordEncoder;
	}

	@Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        
        // AuthenticaionFilter에서 생성된 토큰으로부터 아이디와 비밀번호를 조회함
        String userEmail = token.getName();
        
        String userPw = (String) token.getCredentials();
        // UserDetailsService를 통해 DB에서 아이디로 사용자 조회
        TbCommUser commUser = (TbCommUser) userDetailsService.loadUserByUsername(userEmail);
//        if (!passwordEncoder.matches(userPw, commUser.getPassword())) {
//            throw new BadCredentialsException(commUser.getUsername() + "Invalid password");
//        }

        return new UsernamePasswordAuthenticationToken( commUser, userPw, commUser.getAuthorities());
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}
