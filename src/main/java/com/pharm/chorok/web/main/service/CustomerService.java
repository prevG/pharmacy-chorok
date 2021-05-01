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
    private ReservationScheduleRepository reservationRepo;    
    
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


