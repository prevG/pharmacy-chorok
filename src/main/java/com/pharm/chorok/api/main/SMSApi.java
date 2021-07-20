package com.pharm.chorok.api.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.SMSReservationVo;
import com.pharm.chorok.domain.main.DosgTpSmsVo;
import com.pharm.chorok.web.admin.service.ADSMSService;
import com.pharm.chorok.web.main.service.DosgTpMstService;


@RequestMapping(value = "/api/v1/sms")
@RestController
public class SMSApi {
    
    @Autowired
    public ADSMSService ADSMSSvc;
    
    @Autowired
    public DosgTpMstService dosgTpMstService; 

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
    
    @PostMapping("/dosgTpList")
    @ResponseBody
    public List<DosgTpSmsVo> dosgTpList(DosgTpSmsVo dosgTpVo) {
    	
    	List<DosgTpSmsVo> dosgTpList = dosgTpMstService.selectTbDosgMstList(dosgTpVo);
    	
    	return dosgTpList;
    }
    
    /**
     * 복용유형 발송문자 신규생성
     * 
     * @param pageCriteria
     * @return
     */
    @PostMapping("/addDosgTpSms")
    @ResponseBody
    public ResponseEntity<ResponseMessage> addDosgTpSms(@RequestBody PageCriteria<DosgTpSmsVo> pageCriteria) {
    	
    	dosgTpMstService.addDosgTpSms(pageCriteria.getCriteria());
    	
    	return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 복용발송문자가 생성 되었습니다."), HttpStatus.OK);
    }
    
    /**
     * 복용유형 발송문자 정보수정
     * 
     * @param pageCriteria
     * @return
     */
    @PostMapping("/modifyDosgTpSms")
    @ResponseBody
    public ResponseEntity<ResponseMessage> modifyDosgTpSms(@RequestBody PageCriteria<DosgTpSmsVo> pageCriteria) {
    	
    	dosgTpMstService.modifyDosgTpSms(pageCriteria.getCriteria());
    	
    	return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 복용발송문자가 수정 되었습니다."), HttpStatus.OK);
    }
    
    /**
     * 복용유형 발송문자 삭제
     * 
     * @param pageCriteria
     * @return
     */
    @PostMapping("/removeDosgTpSms")
    @ResponseBody
    public ResponseEntity<ResponseMessage> removeDosgTpSms(@RequestBody PageCriteria<DosgTpSmsVo> pageCriteria) {
    	
    	dosgTpMstService.removeDosgTpSms(pageCriteria.getCriteria());
    	
    	return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 복용발송문자가 삭제 되었습니다."), HttpStatus.OK);
    }
    
}
