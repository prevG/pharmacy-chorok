package com.pharm.chorok.api.main;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultSurveyChartVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpSrvChart;
import com.pharm.chorok.web.main.service.CnstPaperService;



@RequestMapping(value = "/api/v1/main/survey")
@RestController
public class SrvChartApi {
	
	@Autowired
	private CnstPaperService cnstPaperService;
	
	@PostMapping("/selectSurveyChartByCnstId")
	public ResponseEntity<ResponseMessage> selectSurveyChartByCnstId(TbPpCnstChart chartParam) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			List<ResultSurveyChartVo> srvList = cnstPaperService.selectSurveyChartByCnstId( chartParam );

			resMsg.setData( srvList );
			resMsg.setStatus("success");
			//resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	
	
	@PostMapping("/saveSrvChart")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveSrvChart(@RequestParam String jsonData) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			 List<TbPpSrvChart> tbPpSrvChart= Arrays.asList(mapper.readValue(jsonData, TbPpSrvChart[].class));
			 

			 for(int i=0; i<tbPpSrvChart.size(); i++){
				 cnstPaperService.saveSurveyChart(tbPpSrvChart.get(i));
		        
			 }
		 			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	
	
	@PostMapping("/getSrvChart")
	@ResponseBody
	public ResponseEntity<ResponseMessage> getSrvChart(@RequestParam String jsonData) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			
			ObjectMapper mapper = new ObjectMapper();
			
			 List<TbPpSrvChart> tbPpSrvChart= Arrays.asList(mapper.readValue(jsonData, TbPpSrvChart[].class));
			 

			 for(int i=0; i<tbPpSrvChart.size(); i++){
				 cnstPaperService.saveSurveyChart(tbPpSrvChart.get(i));
			 }
			 
		 	resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	
}

