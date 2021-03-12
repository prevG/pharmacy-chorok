package com.pharm.chorok.web.admin.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.web.admin.repository.ADSMSRepository;

@Service
public class ADSMSService{

	@Autowired
	private ADSMSRepository SMSRepository;

    public ArrayList<TbCommCode> selectCommCode(String grpCd) throws Exception {
    	return SMSRepository.selectCommCode(grpCd);
    }
    
    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }

}