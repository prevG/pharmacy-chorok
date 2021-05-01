package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.web.main.repository.DosingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DosingChartService {
    

    @Autowired
    private DosingRepository dosingRepo;

    public List<ResultDosingVo> selectDosingChartByCnstId( TbPpCnstChart chartParam ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingRepo.selectDosingChartByCnstId( chartParam );

        return resultList;
    }

    public List<ResultDosingVo> selectDosingChartByCallYn( TbPpCnstChart chartParam ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingRepo.selectDosingChartByCallYn( chartParam );

        return resultList;
    }
    

    @Transactional
    public List<ResultDosingVo> createDosingChartByCnstId( TbPpCnstChart inCnstParam ) throws Exception {

        //복용차트 생성(오늘날짜로 디폴트 생성)
		dosingRepo.insertTbPpDosgChart( inCnstParam );
		
        //상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = selectDosingChartByCnstId( inCnstParam );

        return resultList;
    }	
}
