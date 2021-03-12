package com.pharm.chorok.web.admin.service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.repository.ADCodeRepository;
import com.pharm.chorok.web.main.repository.TbCommUserRepository;

@Service
public class ADCodeService{

	@Autowired
	private ADCodeRepository codeRepository;

    public ArrayList<TbCommCode> selectCommCode(String grpCd) throws Exception {
    	return codeRepository.selectCommCode(grpCd);
    }
    
    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }

}