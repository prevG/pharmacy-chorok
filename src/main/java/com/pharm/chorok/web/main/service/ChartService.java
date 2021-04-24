package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.web.main.repository.DosingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

@Service
public class ChartService {
    
    @Autowired
    private DosingRepository dosingRepo;

    public ModelAndView selectChartByDosgId( ModelAndView mv, TbPpCnstChart cnstInfo ) throws Exception {

        TbPpCnstChart cosultingInfo = null;

        //상담차트번호에 대한 복용차트 조회
		TbPpDosgChart dosingParam = new TbPpDosgChart();
		dosingParam.setCnstId( cnstInfo.getCnstId() );
        List<ResultDosingVo> dosgList = dosingRepo.selectDosingChartByCustId( dosingParam );

        mv.addObject( "cosultingInfo", cosultingInfo );
        mv.addObject( "dosingList"    , dosgList );

        return mv;
    }
}
