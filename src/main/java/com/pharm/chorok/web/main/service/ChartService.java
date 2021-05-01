package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.util.SecurityContextUtil;
import com.pharm.chorok.web.main.repository.CnstPaperRepository;
import com.pharm.chorok.web.main.repository.ConsultingRepository;
import com.pharm.chorok.web.main.repository.DosingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
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

    @Autowired
    private CnstPaperRepository cnstPaperRepository;

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


	@Transactional
	public HashMap<String, Object> createNewConsultingChart(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {

		String usrNo = SecurityContextUtil.getAuthenticatedUser().getUsrNo();		

		//신규 상담차트번호 생성
		Long newCnstId = consultingRepo.selectNewCnstId();

		//상담차트 생성
		TbPpCnstChart cnstInfo = new TbPpCnstChart();
		cnstInfo.setCnstId( newCnstId );
		cnstInfo.setCustId( custInfo.getCustId() );
		cnstInfo.setPicUsrNo( usrNo );
		consultingRepo.insertTpPpCnstChart( cnstInfo );

		
		//설문조사 차트 생성
		TbPpCnstPaper tbPpCnstPaper = new TbPpCnstPaper();
		tbPpCnstPaper.setCnstVer(1);		
		tbPpCnstPaper.setUpdUsrNo(Long.parseLong(usrNo));
		tbPpCnstPaper.setCnstId(newCnstId);
		cnstPaperRepository.insertTbPpSrvChart(tbPpCnstPaper);

		//고객의 전체 상담차트 조회
		List<ResultConsultingVo> cnstList = consultingRepo.selectConsultingChartByCustId( cnstInfo );
		
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("cnstList",  cnstList);
		return result;
	}
    
}

        