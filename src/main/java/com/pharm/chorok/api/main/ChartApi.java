package com.pharm.chorok.api.main;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.main.ResultDashBoard01VO;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpSrvChart;
import com.pharm.chorok.web.main.repository.DosingRepository;
import com.pharm.chorok.web.main.service.ChartService;
import com.pharm.chorok.web.main.service.CnstPaperService;
import com.pharm.chorok.web.main.service.CustomerService;
import com.pharm.chorok.web.main.service.DosingChartService;

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

@RequestMapping(value = "/api/v1/main/chart/")
@RestController
public class ChartApi {

	@Autowired
	private ChartService chartSvc;
    
	@Autowired
	private DosingChartService dosingSvc;

	@Autowired
	private DosingRepository dosingRepo;

	@Autowired
	private CnstPaperService cnstPaperService;
	
	@Autowired
	private CustomerService customerSvc;
	
    /**
     * @deprecated /createCnstChart 함수로 대체함.
     * 
     * 신규차트를 생성 ( 차트마스터/설문차트 )
     */
    @PostMapping("/createChart")
	public ResponseEntity<ResponseMessage> createChart(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) {
		
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

    /**
     * 상담차트를 생성 ( 차트마스터/설문차트 )
     */
    @PostMapping("/createCnstChart")
	public ResponseEntity<ResponseMessage> createCnstChart(@RequestBody PageCriteria<TbCustomer> pageCriteria) throws Exception {

    	List<ResultConsultingVo> cnstList = chartSvc.createNewConsultingChart_2( pageCriteria.getCriteria());
    	
    	return new ResponseEntity<ResponseMessage>( new ResponseMessage("success", "정상적으로 상담차트가 생성 되었습니다.", cnstList), HttpStatus.OK );
	}

    /**
     * @deprecated createDosingChart_2 함수로 대체함.
     * 
     * 차트번호에 해당하는 복용차트 생성
     */
    @PostMapping("/createDosingChart")
	public ResponseEntity<ResponseMessage> createDosgChart(TbPpCnstChart inCnstChart) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			dosingSvc.createDosingChartByCnstId( inCnstChart );
			
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 복용차트가 생성 되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
    
    /**
     * 차트번호에 해당하는 복용차트 생성
     */
    @PostMapping("/createDosingChart_2")
    @ResponseBody
	public ResponseEntity<ResponseMessage> createDosgChart_2(@RequestBody PageCriteria<TbPpCnstChart> pageCriteria) throws Exception {
    	Assert.isTrue(pageCriteria.getCriteria().getCnstId() > 0, "상담번호가 존재하지 않습니다.");
    	Assert.hasLength(pageCriteria.getCriteria().getDosgTpCd(), "복용유형을 선택하세요.");
    	Assert.hasLength(pageCriteria.getCriteria().getStartDosgDt(), "복용시작일자를 선택하세요.");
    	
    	//상담정보 저장
    	chartSvc.updateTbPpCnstChart(pageCriteria.getCriteria());
    	//복용차트 생성
    	dosingSvc.createDosingChartByCnstId( pageCriteria.getCriteria() );
    	
    	return new ResponseEntity<ResponseMessage>( new ResponseMessage("success", "정상적으로 복용차트가 생성 되었습니다."), HttpStatus.OK );
	}
    
    /**
     * 상담정보 수정
     * 
     * @param inCnstChart
     * @return
     */
    @PostMapping("/saveCnstChart")
    @ResponseBody
    public ResponseEntity<ResponseMessage> saveCnstChart(TbPpCnstChart inCnstChart) {
    	ResponseMessage resMsg = new ResponseMessage();
    	try {
    		chartSvc.updateTbPpCnstChart(inCnstChart);

			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 상담차트가 수정 되었습니다.");

		} catch (Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
    	
    	return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
    }
    
    /**
     * 상담차트 수정 - 설문차트 포함
     * 
     * saveCnstChart 함수 대체함.
     * 
     * @param pageCriteria
     * @return
     */
    @PostMapping("/saveCnstChart_2")
    @ResponseBody
    public ResponseEntity<ResponseMessage> saveCnstChart_2(@RequestBody PageCriteria<TbPpCnstChart> pageCriteria) throws Exception {
    	Assert.isTrue(pageCriteria.getCriteria().getCnstId().compareTo(0L) > 0, "상담번호가 존재하지 않습니다.");
    	
    	chartSvc.updateTbPpCnstChart(pageCriteria.getCriteria());
    	for (TbPpSrvChart srvChart : pageCriteria.getCriteria().getSrvChartList()) {
    		cnstPaperService.saveSurveyChart(srvChart);
    	}
    	
    	return new ResponseEntity<ResponseMessage>( new ResponseMessage("success", "정상적으로 상담차트가 수정 되었습니다."), HttpStatus.OK );
    }
    
    /**
     * @deprecated /deleteCnstChart 상담차트 삭제로 대체함.
     * 
     * 차트번호에 해당하는 차트마스터 / 설문차트 / 복용차트 삭제
     */
    @PostMapping("/deleteChart")
	public ResponseEntity<ResponseMessage> deleteChart(TbPpCnstChart inCnstChart) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			chartSvc.deleteChart( inCnstChart );
			
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 차트가 삭제되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}

    /**
     * 차트번호에 해당하는 차트마스터 / 설문차트 / 복용차트 삭제
     */
    @PostMapping("/deleteCnstChart")
	public ResponseEntity<ResponseMessage> deleteCnstChart(TbPpCnstChart inCnstChart) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			chartSvc.deleteChart( inCnstChart );
			
			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 차트가 삭제되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}

    /**
     * 고객번호에 해당하는 차트목록 조회 (Tabulator 그리드용)
     */
    @PostMapping("/findAllChartByCustId")
	public List<ResultConsultingVo> findChartListByCustId(TbPpCnstChart inCnstParam) throws Exception {
		List<ResultConsultingVo> chartList =  chartSvc.findChartListByCustId( inCnstParam );
		return chartList;
	}

    /**
     * 고객번호에 해당하는 차트목록 조회 (Tabulator 그리드용)
     */
    @PostMapping("/findDosingChartByCnstId")
	public List<ResultDosingVo> findDosingChartByCnstId(TbPpCnstChart inCnstParam) throws Exception {
		List<ResultDosingVo> chartList =  chartSvc.findDosingChartByCnstId( inCnstParam );
		return chartList;
	}


	/**
	 * INDEX 화면 오늘 한약사님 상담목록
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/dashList01")
	public List<ResultDosingVo> selectDashDosingList01(
		@RequestParam("dosgDt") String dosgDt,
		@RequestParam("callYn") String callYn
	) throws Exception {

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("dosgDt", dosgDt);
		params.put("callYn", callYn);
		return customerSvc.findCustomerByDosgDt( params );
	}

	/**
	 * INDEX 화면 오늘 상담실장 상담목록
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/dashList02")
	public List<ResultDosingVo> selectDashDosingList02(
		@RequestParam("dosgDt") String dosgDt,
		@RequestParam("callYn") String callYn
	) throws Exception {

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("dosgDt", dosgDt);
		params.put("callYn", callYn);
		return customerSvc.findCustomerByDosgDt( params );
	}


	/**
	 * INDEX 화면 오늘 복용보류 목록
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/dashList03")
	public List<ResultDashBoard01VO> selectDashDosingList03() throws Exception {
		List<ResultDashBoard01VO> chartList =  dosingRepo.selectDashDosingList03();
		return chartList;
	}
}
