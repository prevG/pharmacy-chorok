package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.main.ResultDashBoard01VO;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpDosgChart;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface DosingRepository {
    
    public List<ResultDosingVo> selectDosingChartByCnstId( TbPpCnstChart chartParam ) throws Exception;
    public List<ResultDosingVo> selectDosingChartByCallYn( TbPpCnstChart chartParam ) throws Exception;
    public int insertTbPpDosgChart(TbPpCnstChart chartParam ) throws Exception;
    public int deleteTbPpDosgChart(TbPpCnstChart chartParam ) throws Exception;
    public int updateTbPpDosgChart(TbPpDosgChart dosingInfo ) throws Exception;
    public int updateTbPpDosgChartStartDt(TbPpDosgChart criteria);
	public int updateTbPpDosgChartStopYn(TbPpDosgChart criteria);

    public List<ResultDashBoard01VO> selectDashDosingList01() throws Exception;
    public List<ResultDashBoard01VO> selectDashDosingList02() throws Exception;
    public List<ResultDashBoard01VO> selectDashDosingList03() throws Exception;
    
    public int initTbPpDosgChart(TbPpDosgChart dosgChart);
}
