package com.pharm.chorok.web.admin.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.repository.ADAdminRepository;

@Service
public class ADAdminService {

	@Autowired
	private ADAdminRepository adminRepository;
    
    public ArrayList<TbCommUser> selectAdmin(TbCommUser tbCommUser) {
    	return adminRepository.selectAdmin(tbCommUser);
	}

	public int removeAdmin(TbCommUser tbCommUser) throws Exception {
    	return adminRepository.removeAdmin(tbCommUser);
    }
    
    public int saveAdmin(TbCommUser tbCommUser) throws Exception {
    	return adminRepository.saveAdmin(tbCommUser);
    }
    
    public int countAdminEmail(TbCommUser tbCommUser) {
    	return adminRepository.countAdminEmail(tbCommUser);
    }

}