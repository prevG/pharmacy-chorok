package com.pharm.chorok.web.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
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

    	//복용차트 생성(오늘날짜로 디폴트 생성)
		int result = dosingRepo.insertTbPpDosgChart( inCnstParam );
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
