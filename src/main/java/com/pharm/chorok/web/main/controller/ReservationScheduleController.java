package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
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


	@PostMapping("/rs1001m/refresh")
	public ModelAndView refresh(
		ReservationPagination reservationPagination,
		Model model) throws Exception {
		
		ModelAndView mv = new ModelAndView("index :: time-table");
		rsvtSchSvc.getReservationByDt( mv,  reservationPagination );
        return mv;
	}


	@PostMapping("/rs1001m/moveWeek")
	public ModelAndView getPrevWeek(
		ReservationPagination reservationPagination,
		Model model) throws Exception {
		
		ModelAndView mv = new ModelAndView("index :: time-table");
		rsvtSchSvc.getReservationByMovedWeekNo( mv,  reservationPagination );
        return mv;
	}
}
