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

    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }
    
    public ArrayList<TbCommCode> selectCodesByGroupCd(TbCommCode tbCommCode){
    	return codeRepository.selectCodesByGroupCd(tbCommCode);
    }
    
    
    public void saveCode(TbCommCode tbCommCode) {
    	codeRepository.saveCode(tbCommCode);
    }
    
    
    public int removeCode(TbCommCode tbCommCode) {
    	return codeRepository.removeCode(tbCommCode);
    }

}