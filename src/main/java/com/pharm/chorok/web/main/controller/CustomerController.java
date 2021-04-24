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

@RequestMapping(value = "/cust")
@Controller
public class CustomerController {

	@Autowired
	private SurveyService surveyService;

	
	
	//설문개요 조회
	@GetMapping("/view")
	public ModelAndView survey(TbSurvey tbSurvey) throws Exception{
		ModelAndView mv = new ModelAndView();
		
		mv.setViewName("/main/CP1001P01");
		return mv;
	}

	

	
}
