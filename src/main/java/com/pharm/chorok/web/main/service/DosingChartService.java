package com.pharm.chorok.web.main.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.web.main.repository.DosingRepository;

@Service
public class DosingChartService {

    @Autowired
    private DosingRepository dosingRepo;

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
    	List<TbPpDosgChart> dosgChartList = new ArrayList<TbPpDosgChart>();
    	LocalDate dosgDt = LocalDate.parse(inCnstParam.getStartDosgDt(), DateTimeFormatter.ISO_DATE); // yyyy-MM-dd
    	int weekCnt = (inCnstParam.getCateTpCd().equals("3")) ? 6 : 4;
    	int dayCnt = inCnstParam.getDosgTpVal();
    	int dosgLv = 0;
    	int dosgSeq = 0;
    	for (int i = 0; i < weekCnt; i++) {
    		if (i == 0) {
    			// dosgLv = 0
				TbPpDosgChart initChart = new TbPpDosgChart();
				initChart.setCnstId(inCnstParam.getCnstId());
				initChart.setDosgSeq(dosgSeq++);
				initChart.setDosgDt(dosgDt.plusDays(dosgSeq).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
				initChart.setDosgLvCd(String.valueOf(dosgLv));
				dosgChartList.add(initChart);
				// dosgLv = 1
				dosgLv = 1;
				for (int j = 0; j < dayCnt; j++) {
					TbPpDosgChart dosgChart = new TbPpDosgChart();
					dosgChart.setCnstId(inCnstParam.getCnstId());
					dosgChart.setDosgSeq(dosgSeq++);
					dosgChart.setDosgDt(dosgDt.plusDays(dosgSeq).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
					dosgChart.setDosgLvCd(String.valueOf(dosgLv));
					dosgChartList.add(dosgChart);
				}
				// dosgLv = 2
				dosgLv = 2;
				for (int j = dayCnt; j < 7; j++) {
					TbPpDosgChart dosgChart = new TbPpDosgChart();
					dosgChart.setCnstId(inCnstParam.getCnstId());
					dosgChart.setDosgSeq(dosgSeq++);
					dosgChart.setDosgDt(dosgDt.plusDays(dosgSeq).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
					dosgChart.setDosgLvCd(String.valueOf(dosgLv));
					dosgChartList.add(dosgChart);
				}
    		} else {
    			dosgLv = dosgLv + 1;
    			for (int j = 0; j < 7; j++) {
					TbPpDosgChart dosgChart = new TbPpDosgChart();
					dosgChart.setCnstId(inCnstParam.getCnstId());
					dosgChart.setDosgSeq(dosgSeq++);
					dosgChart.setDosgDt(dosgDt.plusDays(dosgSeq).format(DateTimeFormatter.ofPattern("yyyyMMdd")));
					dosgChart.setDosgLvCd(String.valueOf(dosgLv));
					dosgChartList.add(dosgChart);
    			}
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
