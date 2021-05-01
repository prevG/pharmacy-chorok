package com.pharm.chorok.common.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.common.component.SMSComponent;
import com.pharm.chorok.common.repository.SmsRepository;
import com.pharm.chorok.domain.table.TbPpSmsHist;

@Service
public class SMSService {
	
	@Autowired
	SMSComponent smsComponent;
	
	@Autowired
	SmsRepository smsRepository;
	
	//파라미터 받아야됨... 누구한테 보낼지.. 
	public void insertSmsHist() throws Exception{
		//파라미터 넘겨줘야됨..
		List<TbPpSmsHist> tbPpSmsHists = smsComponent.sendToastSms();
		
		for(int i=0; i<tbPpSmsHists.size(); i++) {
			smsRepository.insertSmsHist(tbPpSmsHists.get(i));	
		}		
    }
	
	
}
