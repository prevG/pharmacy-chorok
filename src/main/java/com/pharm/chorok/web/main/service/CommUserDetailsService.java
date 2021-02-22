package com.pharm.chorok.web.main.service;

import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.repository.TbCommUserRepository;

@Service
public class CommUserDetailsService implements UserDetailsService {

	@Autowired
	private TbCommUserRepository comUsrRepo;

    @Override
    public UserDetails loadUserByUsername(String usrEml) throws UsernameNotFoundException {
    	TbCommUser usrParams = new TbCommUser();
    	usrParams.setUsrEml(usrEml);
    	
        TbCommUser comUsr = comUsrRepo.selectComUsrByUsrEml( usrEml );
        if( comUsr == null ) {
        	new UsernameNotFoundException( usrEml );
        }
        
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
//        if( memberId.equals("admin")) {
//            grantedAuthorities.add(new SimpleGrantedAuthority(Role.ADMIN.getValue()));
//        } else {
//            grantedAuthorities.add(new SimpleGrantedAuthority(Role.MEMBER.getValue()));
//        }

        return comUsr;
    }

}