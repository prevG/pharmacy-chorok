package com.pharm.chorok.web.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.web.admin.repository.ADMenuRepository;

@Service
public class ADMenuService{

	@Autowired
	private ADMenuRepository menuRepository;

  
    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }

}