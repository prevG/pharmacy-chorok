package com.pharm.chorok.web.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.util.SecurityContextUtil;

@Controller
public class WebController {

	@GetMapping("/")
	public String goIndex(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "index";
	}

	@GetMapping("/home")
	public String goHome(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "home/home";
	}

	@GetMapping("/schedule_weekly")
	public String goScheduleWeekly(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "home/schedule_weekly";
	}
}
