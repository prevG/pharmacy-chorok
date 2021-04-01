package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.service.ReservationScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;

	@GetMapping("/")
	public String goIndex(Model model) throws Exception {
		
		rsvtSchSvc.getReservationTable( model );
		return "index";
	}

	@GetMapping("/home")
	public String goHome(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "home/home";
	}
}
