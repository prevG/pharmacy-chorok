package com.pharm.chorok.web.main.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.entity.TbCommCode;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.repository.TbCommCodeRepository;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.web.main.repository.DosingRepository;

@Service
public class DosingChartService {

    @Autowired
    private DosingRepository dosingRepo;
    
    @Autowired
    private TbCommCodeRepository tbCommCodeRepository;

    /**
     * 상담번호에 대한 복용차트 조회
     * @param chartParam
     * @return
     * @throws Exception
     */
    public List<ResultDosingVo> findDosingChartByCnstId( TbPpCnstChart chartParam ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingRepo.selectDosingChartByCnstId( chartParam );

        return resultList;
    }

    
    /**
     * 오늘 복용상담 목록조회
     * @param chartParam
     * @return
     * @throws Exception
     */
    public List<ResultDosingVo> findDosingListByCallYnAndToday( TbPpCnstChart chartParam ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingRepo.selectDosingChartByCallYn( chartParam );

        return resultList;
    }
    

    /**
     * 복용차트 생성
     * 
     * @param inCnstParam
     * @return
     * @throws Exception
     */
    @Transactional
    public int createDosingChartByCnstId( TbPpCnstChart inCnstParam ) throws Exception {
    	List<TbCommCode> dosgTypeList = tbCommCodeRepository.findByTbCommCodePkGrpCdAndCdExpAndValueCd2OrderBySortNo(
    			"C1014",
    			inCnstParam.getCateTpCd(),
    			String.valueOf(inCnstParam.getDosgTpVal())
    			);

    	List<TbPpDosgChart> dosgChartList = new ArrayList<TbPpDosgChart>();
    	LocalDate startDosgDt = LocalDate.parse(inCnstParam.getStartDosgDt(), DateTimeFormatter.ISO_DATE).plusDays(-1); // yyyy-MM-dd
    	int dosgSeq = 0;
    	for (TbCommCode dosgTypeVo : dosgTypeList) {
    		int dayCnt = StringUtils.isEmpty(dosgTypeVo.getValueCd()) ? 0 : Integer.valueOf(dosgTypeVo.getValueCd());
    		for (int i = 0; i < dayCnt; i++) {
    			TbPpDosgChart dosgChart = new TbPpDosgChart();
    			dosgChart.setCnstId(inCnstParam.getCnstId());
    			dosgChart.setDosgSeq(dosgSeq);
    			dosgChart.setDosgDt(startDosgDt.plusDays(dosgSeq).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
    			dosgChart.setDosgLvCd(dosgTypeVo.getTbCommCodePk().getDitcCd());
    			dosgChartList.add(dosgChart);
    			
    			dosgSeq = dosgSeq + 1;
    		}
    	}
    	
    	int result = 0;
    	for (TbPpDosgChart dosgChart : dosgChartList) {
    		int cnt = dosingRepo.initTbPpDosgChart( dosgChart );
    		result = result + cnt;
    	}
    	
    	//복용차트 생성(오늘날짜로 디폴트 생성)
		//int result = dosingRepo.insertTbPpDosgChart( inCnstParam );
        return result;
    }


    /**
     * 복용차트 삭제
     * @param inCnstParam
     * @return
     * @throws Exception
     */
    @Transactional
    public int deleteDosingChartByCnstId( TbPpCnstChart inCnstParam ) throws Exception {

        //복용차트 생성(오늘날짜로 디폴트 생성)
		int result = dosingRepo.deleteTbPpDosgChart( inCnstParam );
        return result;
    }	
}
