package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.repository.DoseRepository;

@Service
public class DoseService {
    @Autowired
    private DoseRepository doseRepository;

    
    
    public Map<String,Object> getDoseByComUsrRole(TbCommUser tbCommUser) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	
    	doseRepository.selectDoseByComUsrRole(tbCommUser);
    	/*
    	List<TbSurvey> tbSurveyHist = surveyRepository.selectSurveyHist(tbSurvey);
    	customerRepository.selectUsrInfo();
    	*/
    	return result;
    }
    

    
    
    

}
