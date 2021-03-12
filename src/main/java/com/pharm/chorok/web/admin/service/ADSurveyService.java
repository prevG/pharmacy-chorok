package com.pharm.chorok.web.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.web.admin.repository.ADSurveyRepository;

@Service
public class ADSurveyService{

	@Autowired
	private ADSurveyRepository surveyRepository;

  
    public void insertCommCode() throws Exception{
    	//codeRepository.insertCommCode()
    }

}