package com.pharm.chorok.web.main.repository;

import java.util.List;

import com.pharm.chorok.domain.main.ResultSrvVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CnstPaperRepository {
        
    
    public List<TbPpCnstPaper> selectCnstPaper(TbPpCnstPaper tbPpCnstPaper) throws Exception;
    
    
    public List<ResultSrvVo> selectSurveyChartByCnstId(TbPpCnstChart tbPpCnstChart) throws Exception;
    
    
    public int insertTbPpSrvChart(TbPpCnstPaper tbPpCnstPaper) throws Exception;
    
}
