package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.main.ResultSrvVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.web.main.repository.ConsultingRepository;
import com.pharm.chorok.web.main.repository.DosingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.ModelAndView;

@Service
public class ChartService {
    
    @Autowired
    private DosingRepository dosingRepo;

    @Autowired
    private ConsultingRepository consultingRepo;

	@Autowired
	private DosingChartService dosingChartSvc;

    @Autowired
    private CnstPaperService cnstPaperService;

    public ModelAndView selectChartByDosgId( ModelAndView mv, TbPpCnstChart chartParam ) throws Exception {

        List<ResultDosingVo> dosgList = dosingRepo.selectDosingChartByCnstId( chartParam );
        mv.addObject( "dosingList"   , dosgList );

        return mv;
    }


    public ModelAndView findChartByCnstId( ModelAndView mv, TbPpCnstChart chartParam, TbPpCnstPaper tbPpCnstPaper ) throws Exception {

        ResultConsultingVo cnstInfo =  consultingRepo.selectConsultingChartByCnstId( chartParam );
        List<ResultDosingVo> dosingList = dosingChartSvc.selectDosingChartByCnstId( chartParam );

        tbPpCnstPaper.setCnstVer(1);
		List<TbPpCnstPaper> cnstPaper = cnstPaperService.getCnstPaper(tbPpCnstPaper);
        

        mv.addObject( "cnstInfo", cnstInfo   );
        mv.addObject( "dosgList", dosingList );
        mv.addObject( "cnstPaper", cnstPaper );
        return mv;
    }
    
}

        