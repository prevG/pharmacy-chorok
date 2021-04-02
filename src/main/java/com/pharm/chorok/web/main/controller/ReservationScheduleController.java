package com.pharm.chorok.web.main.controller;

import java.util.List;

import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.service.ReservationScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;


@RequestMapping(value = "/rsvt")
@Controller
public class ReservationScheduleController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;


	@PostMapping("/rs1001p1")
	public String goRS1001P01(TbPpRsvtSch rsvt, Model model) throws Exception {
		
		rsvtSchSvc.findReservationInfoByRsvtId( rsvt, model );
		return "main/RS1001P01";
	}


	@GetMapping("/rs1001m/refresh")
	public ModelAndView refresh(Model model) throws Exception {
		
		ModelAndView mv = new ModelAndView("index :: time-table");
		rsvtSchSvc.getReservationTable( mv );
        return mv;
	}
}
