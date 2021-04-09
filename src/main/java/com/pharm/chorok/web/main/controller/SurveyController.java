package com.pharm.chorok.web.main.controller;

import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import com.pharm.chorok.domain.table.TbSurvey;
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
	@GetMapping("/survey")
	public ModelAndView survey(TbSurvey tbSurvey) {
		TbSurvey ret;
		ModelAndView mv = new ModelAndView();
		
		try {
			ret = surveyService.getSurvey(tbSurvey);
			mv.addObject("survey", ret);
			mv.setViewName("/main/survey");
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return mv;
	}

	

	
}
