package com.pharm.chorok.web.main.service;

import java.util.ArrayList;
import java.util.HashMap;
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

    // UserService에서 이곳으로 이동
    // 현재 미사용. 추후 사용여부 확인요망.
	public ArrayList<TbCommUser> getUserList() throws Exception {
		HashMap<String, Object> params = new HashMap<String, Object>();
		ArrayList<TbCommUser> resultList = comUsrRepo.getUserList(params);

		return resultList;
	}

	public Long joinUser() {

		return null;
	}

}