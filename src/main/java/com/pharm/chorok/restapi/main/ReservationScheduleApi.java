package com.pharm.chorok.restapi.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ReservationScheduleService;


@RequestMapping(value = "/api/v1/main/rsvt")
@RestController
public class ReservationScheduleApi {

	@Autowired
	private ReservationScheduleService rsvtSchSvc;


	@PostMapping("/saveRsvtSch")
	public void saveRsvtSch(TbPpRsvtSch rsvt) throws Exception {
		rsvtSchSvc.saveReservationSchedule( rsvt );
	}
		
	@PostMapping("/deleteSchedule")
	public void deleteRsvtSch(TbPpRsvtSch rsvt) throws Exception {
		rsvtSchSvc.deleteReservationSchedule( rsvt );
	}
}
