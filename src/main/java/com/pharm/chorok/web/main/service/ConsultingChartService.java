package com.pharm.chorok.web.main.service;

import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.web.main.repository.ConsultingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConsultingChartService {

    @Autowired
    private ConsultingRepository consultingRepo;
    
    public int deleteConsultingChart( TbPpCnstChart inCnstParam ) throws Exception {
        int result = consultingRepo.deleteTbPpCnstChart( inCnstParam );
        return result;
    }
}
