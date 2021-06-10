package com.pharm.chorok.api.main;

import java.util.List;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.DosingChartService;
import com.pharm.chorok.web.main.service.ReservationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping(value = "/api/v1/main/dosing")
@RestController
public class DosingChartApi {

	@Autowired
	private ReservationService rsvtSchSvc;

	@Autowired
	private DosingChartService dosgChartSvc;
	

	/**
	 * 상담차트번호에 해당하는 복용차트 조회
	 * @param chartParam
	 * @return
	 */
	@PostMapping("/findDosingChartByCnstId")
	public ResponseEntity<ResponseMessage> findDosingChartByCnstId(TbPpCnstChart chartParam) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			List<ResultDosingVo> dosingList = dosgChartSvc.findDosingChartByCnstId( chartParam );

			resMsg.setData( dosingList );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 조회되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	
	

	@PostMapping("/saveRsvtSch")
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
		
	
	@PostMapping("/deleteSchedule")
	public ResponseEntity<ResponseMessage>  deleteRsvtSch(TbPpRsvtSch rsvt) throws Exception {

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
