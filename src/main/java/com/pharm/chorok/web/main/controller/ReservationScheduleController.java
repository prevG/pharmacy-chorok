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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@RequestMapping(value = "/reservation")
@Controller
public class ReservationScheduleController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;


	@GetMapping("/RS1001MV")
	public ModelAndView goRS1001ML(
			ReservationPagination reservationPagination,
			Model model) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV");
		rsvtSchSvc.getReservationByDt( mv, reservationPagination );
		return mv;
	}
	
	
	@PostMapping("/RS1001PV01")
	public ModelAndView goRS1001P01(TbPpRsvtSch rsvt) throws Exception {
		
		ModelAndView mv = new ModelAndView( "main/RS1001PV01" );
		rsvtSchSvc.findReservationInfoByRsvtId( mv, rsvt );
		return mv;
	}


	@PostMapping("/RS1001PU02")
	public ModelAndView goRS1001P02(TbPpRsvtSch rsvt, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU02");
		rsvtSchSvc.findCustomerByRsvtId( mv, rsvt );
		return mv;
	}

	
	@PostMapping("/RS1001MV/detail")
	public ModelAndView detail(
			TbPpRsvtSch rsvt) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: reservation-detail");
		rsvtSchSvc.findReservationInfoByRsvtId( mv, rsvt );
        return mv;
	}
	
	@RequestMapping(value = "/RS1001MV/refresh", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView refresh(
			ReservationPagination reservationPagination) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: time-table");
		rsvtSchSvc.getReservationByDt( mv,  reservationPagination );
        return mv;
	}


	@PostMapping("/RS1001MV/moveWeek")
	public ModelAndView getPrevWeek(
			ReservationPagination reservationPagination) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: time-table");
		rsvtSchSvc.getReservationByMovedWeekNo( mv,  reservationPagination );
        return mv;
	}
}
