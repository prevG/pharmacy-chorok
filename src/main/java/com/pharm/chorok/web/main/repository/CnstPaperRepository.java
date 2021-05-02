package com.pharm.chorok.web.main.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.main.ResultSurveyChartVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpSrvChart;

@Mapper
@Repository
public interface CnstPaperRepository {
        
    
    public List<TbPpCnstPaper> selectCnstPaper(TbPpCnstPaper tbPpCnstPaper) throws Exception;
    
    
    public List<ResultSurveyChartVo> selectSurveyChartByCnstId(TbPpCnstChart tbPpCnstChart) throws Exception;
    
    public int insertTbPpSrvChart(TbPpCnstPaper tbPpCnstPaper) throws Exception;
    public int updateTbPpSrvChart(TbPpSrvChart  tbPpSrvChart) throws Exception;
    public int deleteTbPpSrvChart(TbPpCnstChart tbPpCnstChart) throws Exception;
}
