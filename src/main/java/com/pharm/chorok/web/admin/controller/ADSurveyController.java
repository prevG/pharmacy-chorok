package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.common.component.SMSComponent;
import com.pharm.chorok.web.admin.service.ADSurveyService;

@RequestMapping(value = "/admin")
@Controller
public class ADSurveyController {

	@Autowired
	private ADSurveyService surveyService;
	
	
	@GetMapping("/AD1004MV")
	public ModelAndView AD1004MV( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/AD1004MV");
		return mv;
	}
	
	
	@GetMapping("/surveyReg")
	public ModelAndView surveyReg( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/surveyReg");
		return mv;
	}
	
	
}
