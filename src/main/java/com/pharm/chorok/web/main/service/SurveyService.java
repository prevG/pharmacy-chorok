package com.pharm.chorok.web.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.domain.table.TbSurveyQuest;
import com.pharm.chorok.domain.table.TbSurveyQuestExam;
import com.pharm.chorok.web.main.repository.SurveyRepository;

@Service
public class SurveyService {
    

    @Autowired
    private SurveyRepository surveyRepository;

    public Map<String,Object> getSurveyList(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	TbSurvey survey = surveyRepository.selectSurvey(tbSurvey);
    	List<TbSurveyQuest> surveyQuestList = surveyRepository.selectSurveyQuestList(tbSurvey);
    	
    	result.put("survey", survey);
    	result.put("surveyQuestList", surveyQuestList);
    	
    	return result;
    } 
    
    
    public TbSurvey getSurvey(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	TbSurvey survey = surveyRepository.selectSurvey(tbSurvey);
    	
    	return survey;
    }
    
    
    
    public List<TbSurveyQuestExam> getSurveyQuestionExam(TbSurvey tbSurvey) throws Exception {
    	
    	List<TbSurveyQuestExam> tbSurveyQuest = surveyRepository.getSurveyQuestionExam(tbSurvey);
    	
    	return tbSurveyQuest;
    }
    

    
    
    

}
