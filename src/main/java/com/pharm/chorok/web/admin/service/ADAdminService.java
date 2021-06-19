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

    public int addAdmin(TbCommUser tbCommUser) {
    	return adminRepository.addAdmin(tbCommUser);
    }
    
    public int modifyAdmin(TbCommUser tbCommUser) {
    	return adminRepository.modifyAdmin(tbCommUser);
    }
    
	public int modifyAdminPwd(TbCommUser tbCommUser) {
		return adminRepository.modifyAdminPwd(tbCommUser);
	}

	public int removeAdmin(TbCommUser tbCommUser) {
    	return adminRepository.removeAdmin(tbCommUser);
    }
    
    public int countAdminEmail(TbCommUser tbCommUser) {
    	return adminRepository.countAdminEmail(tbCommUser);
    }

	public int countAdminPhone(TbCommUser tbCommUser) {
		return adminRepository.countAdminPhone(tbCommUser);
	}

	public int countAdminEmailByExcludeUsrNo(TbCommUser tbCommUser) {
		return adminRepository.countAdminEmailByExcludeUsrNo(tbCommUser);
	}

	public int countAdminPhoneByExcludeUsrNo(TbCommUser tbCommUser) {
		return adminRepository.countAdminPhoneByExcludeUsrNo(tbCommUser);
	}

}