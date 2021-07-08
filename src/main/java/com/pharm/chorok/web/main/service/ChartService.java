package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.main.ResultConsultingVo;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.main.ResultSurveyChartVo;
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
    private CnstPaperRepository cnstPaperRepository;

	@Autowired
	private DosingChartService dosingChartSvc;

	@Autowired
	private ConsultingChartService consultingChartSvc;

    @Autowired
    private CnstPaperService cnstPaperSvc;


    /**
     * 차트번호에 해당하는 차트마스터/설문차트/복용차트 정보조회
     */
    public ModelAndView findDosingChartByDosgId( ModelAndView mv, TbPpCnstChart chartParam ) throws Exception {

        List<ResultDosingVo> dosgList = dosingRepo.selectDosingChartByCnstId( chartParam );
        mv.addObject( "dosingList"   , dosgList );

        return mv;
    }

    /**
     * 고객번호에 해당하는 차트목록을 조회
     */
    public List<ResultConsultingVo> findChartListByCustId( TbPpCnstChart inCnstParam ) throws Exception {

        //상담차트 목록
        List<ResultConsultingVo> chartList = consultingRepo.selectConsultingChartByCustId( inCnstParam );
        return chartList;
    }
    

    /**
     * 차트번호에 해당하는 차트마스터/설문차트/복용차트 정보조회
     */
    public ModelAndView findChartByCnstId( ModelAndView mv, TbPpCnstChart inCnstParam, TbPpCnstPaper inCnstPaper ) throws Exception {


        ResultConsultingVo  cnstInfo =  consultingRepo.selectConsultingChartByCnstId( inCnstParam );
		List<ResultSurveyChartVo> cnstPaper = cnstPaperSvc.selectSurveyChartByCnstId( inCnstParam );

        mv.addObject( "cnstInfo" , cnstInfo  ); //차트마스터정보
        mv.addObject( "cnstPaper", cnstPaper ); //설문차트번호
        return mv;
    }

    public List<ResultSurveyChartVo> findPaperChartByCnstId( TbPpCnstChart inCnstParam, TbPpCnstPaper inCnstPaper ) throws Exception {
    	List<ResultSurveyChartVo> cnstPaper = cnstPaperSvc.selectSurveyChartByCnstId( inCnstParam );
    	return cnstPaper;
    }

    /**
     * @deprecated createNewConsultingChart_2 함수로 대체함.
     * 
     * @param custInfo
     * @param rsvtInfo
     * @return
     * @throws Exception
     */
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
		consultingRepo.insertTbPpCnstChart( cnstInfo );

		
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
	
	@Transactional
	public List<ResultConsultingVo> createNewConsultingChart_2(TbCustomer custInfo) throws Exception {

		String usrNo = SecurityContextUtil.getAuthenticatedUser().getUsrNo();		

		//신규 상담차트번호 생성
		Long newCnstId = consultingRepo.selectNewCnstId();

		//상담차트 생성
		TbPpCnstChart cnstInfo = new TbPpCnstChart();
		cnstInfo.setCnstId( newCnstId );
		cnstInfo.setCustId( custInfo.getCustId() );
//		cnstInfo.setPicUsrNo( usrNo );
		//이전 상담차트 번호를 조회하고,
		long prevCnstId = consultingRepo.selectTbPpCnstChartPrevCnstId(cnstInfo);
		//신규 상담번호를 생성한다.
		consultingRepo.insertTbPpCnstChart( cnstInfo );
		
		//설문조사 차트 생성
		TbPpCnstPaper tbPpCnstPaper = new TbPpCnstPaper();
		tbPpCnstPaper.setCnstVer(1);		
		tbPpCnstPaper.setUpdUsrNo(Long.parseLong(usrNo));
		tbPpCnstPaper.setCnstId(newCnstId);
		tbPpCnstPaper.setPrevCnstId( prevCnstId );
		cnstPaperRepository.insertTbPpSrvChart(tbPpCnstPaper);

		//고객의 전체 상담차트 조회
		List<ResultConsultingVo> cnstList = consultingRepo.selectConsultingChartByCustId( cnstInfo );
		return cnstList;
	}

    /**
     * 차트번호에 해당하는 차트마스터/설문차트/복용차트 삭제
     * 
     * @param inCnstParam
     * @throws Exception
     */
    @Transactional
    public void deleteChart( TbPpCnstChart inCnstParam ) throws Exception {

        consultingChartSvc.deleteConsultingChart(inCnstParam); //상담차트마스터 삭제
        dosingChartSvc.deleteDosingChartByCnstId(inCnstParam); //복용차트마스터 삭제
        cnstPaperSvc.deleteSurveyChartByCnstId(inCnstParam);   //설문차트마스터 삭제
    }

    /**
     * 상담번호에 대한 복용차트 조회
     * 
     * @param chartParam
     * @return
     * @throws Exception
     */
    public List<ResultDosingVo> findDosingChartByCnstId( TbPpCnstChart chartParam ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingChartSvc.findDosingChartByCnstId( chartParam );
        return resultList;
    }

    /**
     * 상담정보 수정
     * 
     * @param inCnstChart
     * @return
     * @throws Exception
     */
    @Transactional
	public int updateTbPpCnstChart(TbPpCnstChart inCnstChart) throws Exception {
		return consultingRepo.updateTbPpCnstChart(inCnstChart);
	}
	
}

        