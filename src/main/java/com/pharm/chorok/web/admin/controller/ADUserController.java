package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.web.admin.service.ADUserService;

@RequestMapping(value = "/admin")
@Controller
public class ADUserController {

	@Autowired
	private ADUserService userService;
	
	@GetMapping("/AD1003MV")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/AD1003MV");
		return mv;
	}
	
}
