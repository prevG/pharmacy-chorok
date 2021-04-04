package com.pharm.chorok.web.admin.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.repository.ADUserRepository;

@Service
public class ADUserService{

	@Autowired
	private ADUserRepository userRepository;

    public void insertUser() throws Exception{
    	//codeRepository.insertCommCode()
    }
    
    
    public ArrayList<TbCommUser> getAdmin(TbCommUser tbCommUser) throws Exception{
    	return userRepository.selectAdmin(tbCommUser);
    }
    
    
    public int removeAdmin(TbCommUser tbCommUser) throws Exception{
    	return userRepository.removeAdmin(tbCommUser);
    }
    
    public int saveAdmin(TbCommUser tbCommUser) throws Exception{
    	return userRepository.saveAdmin(tbCommUser);
    }

}