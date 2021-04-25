package com.pharm.chorok.api.main;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.SMSReservationVo;
import com.pharm.chorok.web.admin.service.ADSMSService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping(value = "/api/v1/sms")
@RestController
public class SMSApi {
    
    @Autowired
    public ADSMSService ADSMSSvc;

    @PostMapping("/reservation")
    public ResponseEntity<ResponseMessage> sendSmsReservation(SMSReservationVo smsObj) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			ADSMSSvc.sendSmsReservation( smsObj );

			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 예약문자가 발송 되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
}
