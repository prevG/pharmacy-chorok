package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.repository.CnstPaperRepository;
import com.pharm.chorok.web.main.repository.ConsultingRepository;
import com.pharm.chorok.web.main.repository.CustomerRepository;
import com.pharm.chorok.web.main.repository.DosingRepository;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private ConsultingRepository consultingRepo;

    @Autowired
    private DosingRepository dosingRepo;

    @Autowired
    private ReservationScheduleRepository reservationRepo;
    
    @Autowired
    private CnstPaperRepository cnstPaperRepository;

    
    
    public Map<String,Object> getUsrTotInfo(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	/*
    	List<TbSurvey> tbSurveyHist = surveyRepository.selectSurveyHist(tbSurvey);
    	customerRepository.selectUsrInfo();
    	*/
    	return result;
    }
    
	@Transactional
	public int saveCustomer(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {
		
		int result = -1;

		Long custId = custInfo.getCustId();
		if( custId != null && custId > 0) {
			result = customerRepo.updateTbCustomer( custInfo );

		} else {

			//신규 고객번호 생성
			Long newCustId = customerRepo.selectNewCustId();

			//고객정보저장
			custInfo.setCustId( newCustId );
			result = customerRepo.insertTbCustomer( custInfo );

			rsvtInfo.setCustId( newCustId );
			result = reservationRepo.updateCustIdByRsvtId( rsvtInfo );
		}
		return result;
	}

	@Transactional
	public HashMap<String, Object> createNewConsultingChart(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {
		

		//신규 상담차트번호 생성
		Long newCnstId = consultingRepo.selectNewCnstId();

		String usrNo = SecurityContextUtil.getAuthenticatedUser().getUsrNo();

		//상담차트 생성
		TbPpCnstChart cnstInfo = new TbPpCnstChart();
		cnstInfo.setCnstId( newCnstId );
		cnstInfo.setCustId( custInfo.getCustId() );
		cnstInfo.setPicUsrNo( usrNo );
		consultingRepo.insertTpPpCnstChart( cnstInfo );

		//복용차트 생성(오늘날짜로 디폴트 생성)
		TbPpDosgChart dosingInfo = new TbPpDosgChart();
		dosingInfo.setCnstId( newCnstId );
		dosingRepo.insertTbPpDosgChart( dosingInfo );
		
		//설문조사 차트 생성
		TbPpCnstPaper tbPpCnstPaper = new TbPpCnstPaper();
		tbPpCnstPaper.setCnstVer(1);		
		tbPpCnstPaper.setUpdUsrNo(Long.parseLong(usrNo));
		tbPpCnstPaper.setCnstId(newCnstId);
		cnstPaperRepository.insertTbPpSrvChart(tbPpCnstPaper);

		//고객의 전체 상담차트 조회
		List<ResultConsultingVo> cnstList = consultingRepo.selectConsultingChartByCustId( cnstInfo );

		// //상담차트번호에 대한 복용차트 조회
		// List<TbPpDosgChart> dosgList = dosingRepo.selectDosingChartByCustId( dosingInfo );
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("cnstList",  cnstList);
		return result;
	}

	public int deleteConsultingChart(TbPpCnstChart cnstInfo) throws Exception {
		
		int result = -1;
		result = consultingRepo.deleteTpPpCnstChart( cnstInfo );
		return result;
	}

	public TbCustomer findCustomerByCustId(TbCustomer custParam, TbPpRsvtSch rsvtParam) throws Exception {
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("custId", rsvtParam.getCustId() );
		TbCustomer custInfo = customerRepo.findCustomerByCustId( params );

		return custInfo;
	}


    public List<TbCustomer> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) throws Exception {

		String cstUsrNm  = customerParam.getCustUsrNm();
		String custCellNo = customerParam.getCustCellNo();

		if( !StringUtils.hasLength(cstUsrNm) && !StringUtils.hasLength(custCellNo)) {
			return null;
		}
		return customerRepo.selectCustomerByUsrNmOrCellNo( customerParam );
	}
}


