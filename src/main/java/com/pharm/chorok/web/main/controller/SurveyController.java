package com.pharm.chorok.web.main.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.domain.table.TbSurveyQuest;
import com.pharm.chorok.domain.table.TbSurveyQuestExam;
import com.pharm.chorok.web.main.service.SurveyService;

@RequestMapping(value = "/survey")
@Controller
public class SurveyController {

	@Autowired
	private SurveyService surveyService;

	//설문개요와 설문지문제 조회 
	@GetMapping("/surveyList")
	public ModelAndView surveyList(TbSurvey tbSurvey) {
		Map<String,Object> ret;
		ModelAndView mv = new ModelAndView();
		
		try {
			ret = surveyService.getSurveyList(tbSurvey);
			mv.addObject("survey", ret.get("survey"));
			mv.addObject("surveyQuestList", ret.get("surveyQuestList"));
			mv.setViewName("/main/survey");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mv;
	}
	
	//설문개요 조회
	@GetMapping("/view")
	public ModelAndView survey(TbSurvey tbSurvey) throws Exception{
		TbSurvey survey;
		List<TbSurveyQuestExam> tbSurveyQuestExam;
		ModelAndView mv = new ModelAndView();
		
		survey = surveyService.getSurvey(tbSurvey);
		tbSurveyQuestExam = surveyService.getSurveyQuestionExam(tbSurvey);
		mv.addObject("survey", survey);
		mv.addObject("surveyQuestExam", tbSurveyQuestExam);
		mv.setViewName("/main/survey");
		
		
		return mv;
	}

	

	
}
