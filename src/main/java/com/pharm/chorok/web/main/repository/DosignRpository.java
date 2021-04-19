package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DosignRpository {
    
    public List<TbPpDosgChart> findDosingChartByCnstId(TbPpCnstChart cnstInfo ) throws Exception;
    public int insertTbPpCnstChart(TbPpCnstChart cnstInfo ) throws Exception;
    public int updateTbPpCnstChart(TbPpCnstChart cnstInfo ) throws Exception;
}
