package com.pharm.chorok.api.main;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultSrvVo;
import com.pharm.chorok.domain.table.TbPpSrvChart;
import com.pharm.chorok.web.main.service.CnstPaperService;



@RequestMapping(value = "/api/v1/main/survey")
@RestController
public class SrvChartApi {
	
	@Autowired
	private CnstPaperService cnstPaperService;
	
	@PostMapping("/selectSurveyChartByCnstId")
	public ResponseEntity<ResponseMessage> selectSurveyChartByCnstId(TbPpSrvChart dosingInfo) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			List<ResultSrvVo> srvList = cnstPaperService.selectSurveyChartByCnstId( dosingInfo );

			resMsg.setData( srvList );
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
}

