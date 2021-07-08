package com.pharm.chorok.api.main;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ReservationService;


@RequestMapping(value = "/api/v1/main/reservation")
@RestController
public class ReservationApi {

	@Autowired
	private ReservationService reservationSvc;


	/**
	 * 예약스케쥴 상세정보 저장
	 * 
	 * @param rsvt
	 * @return
	 */
	@PostMapping("/saveReservation")
	public ResponseEntity<ResponseMessage> saveRsvtSch(TbPpRsvtSch rsvt) {
		
		ResponseMessage resMsg = new ResponseMessage();
		TbPpRsvtSch resultRsvt = null;
		try {
			reservationSvc.saveReservation( rsvt );
			if( rsvt.getRsvtId() != null && rsvt.getRsvtId() > 0 ) {
				resultRsvt = reservationSvc.findReservationByRsvtId( rsvt );
			} else {
				resultRsvt = reservationSvc.findReservationByRsvtInfo( rsvt );
			}
			

			resMsg.setData( resultRsvt );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
		

	/**
	 * 예약스케쥴 상세정보 삭제
	 * 
	 * @param rsvt
	 * @return
	 */
	@PostMapping("/deleteReservation")
	public ResponseEntity<ResponseMessage> deleteReservation(TbPpRsvtSch rsvt) throws Exception {

		ResponseMessage resMsg = new ResponseMessage();
		TbPpRsvtSch resultRsvt = null;
		try {
			reservationSvc.deleteReservation( rsvt );
			resultRsvt = reservationSvc.findReservationByRsvtId( rsvt );

			resMsg.setData( resultRsvt );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 삭제되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}


	/**
	 * 예약스케쥴 상세정보 조회(예약번호) 
	 * 
	 * @param rsvt
	 * @return
	 */
	@PostMapping("/findByRsvtId")
	public ResponseEntity<ResponseMessage> findByRsvtId(TbPpRsvtSch rsvt) throws Exception {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {

			//예약상세정보 조회
			TbPpRsvtSch rsvtSchInfo = reservationSvc.findReservationByRsvtId( rsvt );

			resMsg.setStatus("success");
			resMsg.setData(rsvtSchInfo);

		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	
	/**
	 * 예약스케쥴 상세정보 조회(예약자명 또는 예약자전화번호) 
	 * 
	 * @param rsvt
	 * @return
	 */
	@PostMapping("/findBySearchKeyword")
	public List<TbPpRsvtSch> findBySearchKeyword(TbPpRsvtSch rsvt) throws Exception {
		
			//예약상세정보 조회
		if( StringUtils.isEmpty(rsvt.getSearchKeyword())) {
			return null;
		}
		List<TbPpRsvtSch> resultList = reservationSvc.findBySearchKeyword( rsvt );
		return resultList;
	}
}
