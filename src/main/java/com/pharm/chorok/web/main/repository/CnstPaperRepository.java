package com.pharm.chorok.web.main.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.main.ResultSrvVo;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpSrvChart;

@Mapper
@Repository
public interface CnstPaperRepository {
        
    
    public List<TbPpCnstPaper> selectCnstPaper(TbPpCnstPaper tbPpCnstPaper) throws Exception;
    
    
    public List<ResultSrvVo> selectSurveyChartByCnstId(TbPpSrvChart tbPpCnstPaper) throws Exception;
    
}
