package com.pharm.chorok.api.main;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.main.ResultDashBoard01VO;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.repository.DosingRepository;
import com.pharm.chorok.web.main.service.ChartService;
import com.pharm.chorok.web.main.service.DosingChartService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
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


    /**
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
	 * INDEX 화면 오늘 약사님 상담목록
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/dashList01")
	public List<ResultDashBoard01VO> selectDashDosingList01() throws Exception {
		List<ResultDashBoard01VO> chartList =  dosingRepo.selectDashDosingList01();
		return chartList;
	}

	/**
	 * INDEX 화면 오늘 상담실장 상담목록
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/dashList02")
	public List<ResultDashBoard01VO> selectDashDosingList02() throws Exception {
		List<ResultDashBoard01VO> chartList =  dosingRepo.selectDashDosingList02();
		return chartList;
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
