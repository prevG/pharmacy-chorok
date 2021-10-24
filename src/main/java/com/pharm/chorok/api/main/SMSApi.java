package com.pharm.chorok.api.main;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.DosgTpSmsVo;
import com.pharm.chorok.domain.main.ResultDosgTpSmsHistVo;
import com.pharm.chorok.domain.main.SMSReservationVo;
import com.pharm.chorok.web.admin.service.ADSMSService;
import com.pharm.chorok.web.main.service.DosgTpMstService;
import com.pharm.chorok.web.main.service.ReservationService;

/**
 * 복용유형 발송문자 정보를 처리하는 클래스 
 * 
 * @author Jaratus
 *
 */
@RequestMapping(value = "/api/v1/sms")
@RestController
public class SMSApi {
    
    @Autowired
    public ADSMSService ADSMSSvc;
    
    @Autowired
    private ReservationService reservationService;
    
    @Autowired
    private DosgTpMstService dosgTpMstService; 

    /**
     * @deprecated sendSmsReservation2 함수로 대체함.
     * 
     * @param smsObj
     * @return
     */
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
    
    /**
     * 상담예약문자 발송
     * 
     * @param pageCriteria
     * @return
     */
    @PostMapping("/reservation_2")
    public ResponseEntity<ResponseMessage> sendSmsReservation2(@RequestBody PageCriteria<SMSReservationVo> pageCriteria)  {
		Assert.notNull(pageCriteria.getCriteria(), "상담예약문자 정보가 없습니다.");
		ResponseMessage responseMessage = null;
		try {
			reservationService.sendSmsReservation( pageCriteria.getCriteria() );
			responseMessage = new ResponseMessage("success", "정상적으로 상담예약문자가 발송 되었습니다.");
		} catch(Exception ex ) {
			
			ex.printStackTrace();
			responseMessage = new ResponseMessage("fail", "문자발송이 실패하였습니다.<br/>예약자 연락처를 확인해보세요.<br/><br/>또는 관리자에게 문의하세요.");
		}

		return new ResponseEntity<ResponseMessage>(responseMessage, HttpStatus.OK);
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
    	Assert.hasLength(pageCriteria.getCriteria().getDosgTpCd(), "복용유형이 존재하지 않습니다");
    	Assert.hasLength(pageCriteria.getCriteria().getSendHhmi(), "발송시간은 공백일 수 없습니다");
    	
    	long existCnt = dosgTpMstService.existDosgTpSms(pageCriteria.getCriteria().getDosgTpCd(), pageCriteria.getCriteria().getDosgSeq(), pageCriteria.getCriteria().getSendHhmi());
    	if (existCnt > 0) {
    		return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "발송시간이 동일한 복용발송문자가 존재 합니다."), HttpStatus.OK);
    	}
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
    	Assert.isTrue(pageCriteria.getCriteria().getSmsId() > 0, "발송문자 번호가 존재하지 않습니다");
    	
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
    	Assert.isTrue(pageCriteria.getCriteria().getSmsId() > 0, "발송문자 번호가 존재하지 않습니다");
    	
    	dosgTpMstService.removeDosgTpSms(pageCriteria.getCriteria());
    	
    	return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 복용발송문자가 삭제 되었습니다."), HttpStatus.OK);
    }
    
    /**
     * 
     * 
     * @param dosgTpVo
     * @return
     */
    @PostMapping("/dosgTpSmsHistList")
    @ResponseBody
    public List<ResultDosgTpSmsHistVo> dosgTpSmsHistList(
    		@RequestParam("dosgDt") String dosgDt,
    		@RequestParam("picUsrNo") String picUsrNo,
    		@RequestParam("pic2UsrNo") String pic2UsrNo,
    		@RequestParam("pausYn") String pausYn
    		) {
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("dosgDt", dosgDt);
		params.put("picUsrNo", picUsrNo);
		params.put("pic2UsrNo", pic2UsrNo);
		params.put("pausYn", pausYn);
		
    	List<ResultDosgTpSmsHistVo> dosgSmsList = dosgTpMstService.selectDosgTpSmsHistList(params);
    	
    	return dosgSmsList;
    }

}
