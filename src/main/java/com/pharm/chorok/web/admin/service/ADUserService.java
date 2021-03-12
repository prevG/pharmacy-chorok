package com.pharm.chorok.web.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.web.admin.repository.ADUserRepository;

@Service
public class ADUserService{

	@Autowired
	private ADUserRepository userRepository;

    public void insertUser() throws Exception{
    	//codeRepository.insertCommCode()
    }

}