package com.pharm.chorok.api.main;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ChartService;
import com.pharm.chorok.web.main.service.DosingChartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping(value = "/api/v1/main/chart")
@RestController
public class ChartApi {


	@Autowired
	private ChartService chartSvc;
    
	@Autowired
	private DosingChartService dosingSvc;

    @PostMapping("/createNewChart")
	public ResponseEntity<ResponseMessage> createNewChart(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			HashMap<String, Object> result = chartSvc.createNewConsultingChart( custInfo, rsvtInfo );
			
			
			resMsg.setData( result );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 차트가 생성 되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}



    @PostMapping("/createDosingChart")
	public ResponseEntity<ResponseMessage> createDosgChart(TbPpCnstChart inCnstChart) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			List<ResultDosingVo> result = dosingSvc.createDosingChartByCnstId( inCnstChart );
			
			resMsg.setData( result );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 복용차트가 생성 되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}


}
