package com.pharm.chorok.api.main;

import java.util.Arrays;
import java.util.List;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultSurveyChartVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.domain.table.TbPpSrvChart;
import com.pharm.chorok.web.main.repository.DosingRepository;
import com.pharm.chorok.web.main.service.CnstPaperService;

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



@RequestMapping(value = "/api/v1/main/survey")
@RestController
public class SrvChartApi {
	
	@Autowired
	private CnstPaperService cnstPaperService;


	@Autowired
	private DosingRepository dosingRepo;
	
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
	
	
	/**
	 * 고객의 복용차트 정보을 저장한다.
	 * @param jsonData
	 * @return
	 */
	@PostMapping("/saveDosingChart")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveDosingChart(
		@RequestParam String jsonData
		) {
		

		ResponseMessage resMsg = new ResponseMessage();

		ObjectMapper mapper = new ObjectMapper();
		try {
			List<TbPpDosgChart> dosingList= Arrays.asList(mapper.readValue(jsonData, TbPpDosgChart[].class));
			for( TbPpDosgChart vo : dosingList ) {
				dosingRepo.updateTbPpDosgChart(vo);
			}
		 	
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			e.printStackTrace();
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
	
	/**
	 * 고객의 복용차트 정보을 저장한다.
	 * @param jsonData
	 * @return
	 */
	@PostMapping("/saveDosingChart_2")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveDosingChart_2(@RequestBody PageCriteria<TbPpDosgChart> pageCriteria) throws Exception {
		Assert.isTrue(pageCriteria.getCriteria().getDosgId() > 0, "복용번호가 존재하지 않습니다.");

		//복용정보 저장
		dosingRepo.updateTbPpDosgChart(pageCriteria.getCriteria());
		//복용일자 변경시 이후 일수 변경
		dosingRepo.updateTbPpDosgChartStartDt(pageCriteria.getCriteria());
		//이후 일수 조정 (감량종류/문자전송/보류여부)
		dosingRepo.updateTbPpDosgChartAdjust(pageCriteria.getCriteria());
		
		
		return new ResponseEntity<ResponseMessage>( new ResponseMessage("success", "정상적으로 저장되었습니다."), HttpStatus.OK );
	}

	/**
	 * deprecated /saveSrvChart_2 함수로 대체함.
	 * 
	 * 고객의 설문답변을 저장한다.
	 * @param jsonData
	 * @return
	 */
	@PostMapping("/saveSrvChart")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveSrvChart(
		@RequestParam String jsonData
		) {
		
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
	
	/**
	 * 고객의 설문답변을 저장한다.
	 * 
	 * @param criteria
	 * @return
	 */
	@PostMapping(value = "/saveSrvChart_2")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveSrvChart_2(@RequestBody PageCriteria<List<TbPpSrvChart>> pageCriteria) {
		
		ResponseMessage resMsg = new ResponseMessage();
		List<TbPpSrvChart> tbPpSrvChart = pageCriteria.getCriteria();
		try {
			for (int i = 0; i < tbPpSrvChart.size(); i++){
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

