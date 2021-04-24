package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.service.ReservationScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class WebController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;

	@GetMapping("/")
	public ModelAndView goIndex(
		ReservationPagination reservationPagination,
		Model model) throws Exception {
		ModelAndView mv = new ModelAndView("index");
		rsvtSchSvc.getDashBoard( mv, reservationPagination );
		return mv;
	}

	@GetMapping("/home")
	public String goHome(Model model) {
		
		TbCommUser comUser = SecurityContextUtil.getAuthenticatedUser();
		
		model.addAttribute("name", comUser.getUsrNm() );
		return "home/home";
	}
}
