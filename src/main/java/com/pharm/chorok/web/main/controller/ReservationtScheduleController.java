package com.pharm.chorok.web.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ReservationScheduleService;


@RequestMapping(value = "/rsvt")
@Controller
public class ReservationtScheduleController {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;

	@PostMapping("/rs1001p1")
	public String goIndex(TbPpRsvtSch rsvtSch, Model model) throws Exception {
		
		rsvtSchSvc.findReservationInfoByRsvtId(rsvtSch, model);
		return "main/RS1001P01";
	}

}
