package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.Map;

import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.web.main.repository.ConsultingRepository;
import com.pharm.chorok.web.main.repository.CustomerRepository;
import com.pharm.chorok.web.main.repository.SurveyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ConsultingRepository consultingRepository;

    @Autowired
    private SurveyRepository surveyRepository;
    
    
    public Map<String,Object> getUsrTotInfo(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	/*
    	List<TbSurvey> tbSurveyHist = surveyRepository.selectSurveyHist(tbSurvey);
    	customerRepository.selectUsrInfo();
    	*/
    	return result;
    }
    
	public int saveCustomer(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {
		
		int result = -1;

		Long custId = custInfo.getCustId();
		if( custId != null && custId > 0) {
			result = customerRepository.updateTbCustomer( custInfo );
		} else {
			result = customerRepository.insertTbCustomer( custInfo );
		}
		return result;
	}

	public int createNewConsultingChart(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {
		
		int result = -1;
		Long custId = custInfo.getCustId();
		result = consultingRepository.insertTpPpCnstChart( null );
		return result;
	}
}
