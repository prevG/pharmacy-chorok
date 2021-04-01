package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ReservationScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping(value = "/rsvt")
@Controller
public class ReservationScheduleController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;

	@GetMapping("/")
	public String goIndex(Model model) throws Exception {
		
		rsvtSchSvc.getReservationTable( model );
		return "index";
	}

	@PostMapping("/rs1001p1")
	public String goRS1001P01(TbPpRsvtSch rsvt, Model model) throws Exception {
		
		rsvtSchSvc.findReservationInfoByRsvtId( rsvt, model );
		return "main/RS1001P01";
	}
}
