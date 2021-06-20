package com.pharm.chorok.web.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.admin.repository.ADUserRepository;

@Service
public class ADUserService{

	@Autowired
	private ADUserRepository userRepository;

    public void insertUser() throws Exception{
    	//codeRepository.insertCommCode()
    }
    
    public List<TbCustomer> selectUser(TbCustomer tbCustomer) {
    	return userRepository.selectUsers(tbCustomer);
	}

    public int addUser(TbCustomer tbCustomer) {
    	return userRepository.addUser(tbCustomer);
    }
    
    public int modifyUser(TbCustomer tbCustomer) {
    	return userRepository.modifyUser(tbCustomer);
    }
    
	public int removeUser(TbCustomer tbCustomer) {
		return userRepository.removeUser(tbCustomer);
	}

	public int countUserCellNo(TbCustomer tbCustomer) {
		return userRepository.countUserCellNo(tbCustomer);
	}

	public int countUserCellNoByExcludeCustId(TbCustomer tbCustomer) {
		return userRepository.countUserCellNoByExcludeCustId(tbCustomer);
	}

}