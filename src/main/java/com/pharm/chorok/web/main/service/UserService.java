package com.pharm.chorok.web.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.repository.TbCommUserRepository;

@Service
public class UserService {
	
	@Autowired
	private TbCommUserRepository comUsrRepo;

	
	public ArrayList<TbCommUser> getUserList() throws Exception {
		HashMap<String, Object> params = new HashMap<String, Object>();
		ArrayList<TbCommUser> resultList = comUsrRepo.getUserList( params );
		
		return resultList;
	}
}
