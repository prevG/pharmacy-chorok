package com.pharm.chorok.web.main.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.util.SecurityContextUtil;

@Controller
public class MainController {

	@GetMapping("/")
	public String goIndex(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "/index";
	}
}
