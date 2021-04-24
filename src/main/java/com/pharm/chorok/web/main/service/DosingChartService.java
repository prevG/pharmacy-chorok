package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpDosgChart;
import com.pharm.chorok.web.main.repository.DosingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DosingChartService {
    

    @Autowired
    private DosingRepository dosingRepo;

    public List<ResultDosingVo> selectDosingChartByDosgId( TbPpDosgChart dosingInfo ) throws Exception {

		//상담차트번호에 대한 복용차트 조회
		List<ResultDosingVo> resultList = dosingRepo.selectDosingChartByCustId( dosingInfo );

        return resultList;
    }
}
