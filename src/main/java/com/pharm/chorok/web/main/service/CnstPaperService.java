package com.pharm.chorok.web.main.service;

import java.util.List;

import com.pharm.chorok.domain.main.ResultSrvVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.web.main.repository.CnstPaperRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CnstPaperService {
    @Autowired
    private CnstPaperRepository cnstPaperRepository;

    
    public List<TbPpCnstPaper> getCnstPaper( TbPpCnstPaper tbPpCnstPaper ) throws Exception
    {
    	List<TbPpCnstPaper> cnstPaper = cnstPaperRepository.selectCnstPaper(tbPpCnstPaper);
    	return cnstPaper;
    }
    
    
    public List<ResultSrvVo> selectSurveyChartByCnstId(TbPpCnstChart chartParam) throws Exception
    {
    	List<ResultSrvVo> cnstPaper = cnstPaperRepository.selectSurveyChartByCnstId(chartParam);
    	return cnstPaper;
    }
    
    
    public int insertTbPpSrvChart(TbPpCnstPaper tbPpCnstPaper) throws Exception
    {
    	return cnstPaperRepository.insertTbPpSrvChart(tbPpCnstPaper);
    }
    
    

}
