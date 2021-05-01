package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.common.service.SMSService;

@RequestMapping(value = "/admin")
@Controller
public class ADSMSController {
	
	
	@Autowired
	SMSService smsService;
	
	@GetMapping("/sms")
	public ModelAndView sms( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/sms");
		
		smsService.insertSmsHist();
		return mv;
	}
	
	
	
	

	
	
}
