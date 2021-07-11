package com.pharm.chorok.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	/*
     * 스프링 시큐리티 룰을 무시하게 하는 Url 규칙.
     */
	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/vendor/**", "/webjars/**", "/adminlte/**", "/easyui/**", "/example/**");	
	}
	
	/*
     * 스프링 시큐리티 룰.
     */
	@Override 
	protected void configure(HttpSecurity http) throws Exception {
        http.sessionManagement()
                .invalidSessionUrl("/account/login")
                .and()
			.csrf()
				.disable()
            .headers()
                .frameOptions().sameOrigin()
                .and()
			.authorizeRequests()
				.antMatchers("/account/**").permitAll()
				.antMatchers("/customer/**").permitAll()
				.anyRequest().authenticated()
            	.and()
			.formLogin()
				.loginPage("/account/login")		
                .permitAll()
                .and()
    	     //.oauth2Login()
    	        //.and()
            .logout()
            	.logoutUrl("/account/logout")
                .invalidateHttpSession(true)
                .deleteCookies("JSESSIONID")
                .logoutSuccessHandler( customLogoutSuccessHandler() )
            	.and()
            .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class).logout()
			;
	}
	
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter customAuthenticationFilter = new CustomAuthenticationFilter(authenticationManager());
        customAuthenticationFilter.setFilterProcessesUrl("/account/doLogin");
        customAuthenticationFilter.setAuthenticationSuccessHandler( customLoginSuccessHandler());
        customAuthenticationFilter.setAuthenticationFailureHandler( customLoginFailureHandler());
        customAuthenticationFilter.afterPropertiesSet();
        return customAuthenticationFilter;
    }

    @Bean
    public CustomLoginSuccessHandler customLoginSuccessHandler() {
        return new CustomLoginSuccessHandler();
    }

    @Bean
    public CustomLoginFailureHandler customLoginFailureHandler() {
        return new CustomLoginFailureHandler();
    }

    @Bean
    public CustomLogoutSuccessHandler customLogoutSuccessHandler() {
        return new CustomLogoutSuccessHandler();
    }

    @Bean
    public CustomAuthenticationProvider customAuthenticationProvider() {
        return new CustomAuthenticationProvider(bCryptPasswordEncoder());
    }

    /**
     * 스프링 시큐리티가 사용자를 인증하는 방법이 담긴 객체.
     */
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) {
    	
        //AuthenticationProvider 구현
        authenticationManagerBuilder.authenticationProvider(customAuthenticationProvider());
    }
}
