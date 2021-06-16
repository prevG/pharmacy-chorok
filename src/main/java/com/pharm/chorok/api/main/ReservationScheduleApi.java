package com.pharm.chorok.api.main;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping(value = "/api/v1/main/reservation")
@RestController
public class ReservationScheduleApi {

	@Autowired
	private ReservationService rsvtSchSvc;


	@PostMapping("/saveReservation")
	public ResponseEntity<ResponseMessage> saveRsvtSch(TbPpRsvtSch rsvt) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			rsvtSchSvc.saveReservationSchedule( rsvt );

			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
		
	@PostMapping("/deleteReservation")
	public ResponseEntity<ResponseMessage> deleteReservation(TbPpRsvtSch rsvt) throws Exception {

		ResponseMessage resMsg = new ResponseMessage();
		try {
			rsvtSchSvc.deleteReservationSchedule( rsvt );

			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 삭제되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
}
