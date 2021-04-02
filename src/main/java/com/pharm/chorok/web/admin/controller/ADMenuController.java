package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.web.admin.service.ADCodeService;

@RequestMapping(value = "/admin")
@Controller
public class ADMenuController {
	

	
	@GetMapping("/menu")
	public ModelAndView menu( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/menu");
		return mv;
	}
	
	@GetMapping("/menuAuth")
	public ModelAndView menuAuth( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/menuAuth");
		return mv;
	}
}
