package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DosingRepository {
    
    public List<ResultDosingVo> selectDosingChartByCnstId( TbPpCnstChart chartParam ) throws Exception;
    public int insertTbPpDosgChart(TbPpDosgChart dosingInfo ) throws Exception;
    public int updateTbPpDosgChart(TbPpDosgChart dosingInfo ) throws Exception;
}
