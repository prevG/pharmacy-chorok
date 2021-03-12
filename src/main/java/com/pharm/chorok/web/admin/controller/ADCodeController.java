package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.web.admin.service.ADCodeService;
import com.pharm.chorok.web.main.service.UserService;

@RequestMapping(value = "/admin")
@Controller
public class ADCodeController {

	@Autowired
	private ADCodeService codeService;
	
	
	@GetMapping("/code")
	public ModelAndView code( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/code");
		return mv;
	}
	
}
