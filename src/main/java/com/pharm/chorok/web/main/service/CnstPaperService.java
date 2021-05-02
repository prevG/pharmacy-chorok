package com.pharm.chorok.web.main.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pharm.chorok.domain.main.ResultSurveyChartVo;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpSrvChart;
import com.pharm.chorok.web.main.repository.CnstPaperRepository;

@Service
public class CnstPaperService {
    @Autowired
    private CnstPaperRepository cnstPaperRepository;

    
    public List<TbPpCnstPaper> getCnstPaper( TbPpCnstPaper tbPpCnstPaper ) throws Exception
    {
    	List<TbPpCnstPaper> cnstPaper = cnstPaperRepository.selectCnstPaper(tbPpCnstPaper);
    	return cnstPaper;
    }
    
    
    public List<ResultSurveyChartVo> selectSurveyChartByCnstId(TbPpCnstChart chartParam) throws Exception
    {
    	List<ResultSurveyChartVo> cnstPaper = cnstPaperRepository.selectSurveyChartByCnstId(chartParam);
    	return cnstPaper;
    }
    
    
    public int insertTbPpSrvChart(TbPpCnstPaper tbPpCnstPaper) throws Exception
    {
    	return cnstPaperRepository.insertTbPpSrvChart(tbPpCnstPaper);
    }
    
    public int deleteSurveyChartByCnstId(TbPpCnstChart tbPpCnstChart) throws Exception
    {
    	return cnstPaperRepository.deleteTbPpSrvChart(tbPpCnstChart);
    }
    
    
	public int saveSurveyChart(TbPpSrvChart srvChart) throws Exception {
		
		int result = -1;
		
		result = cnstPaperRepository.updateTbPpSrvChart(srvChart);
		
		/*
		 * TbPpSrvChart tbPpSrvChart = cnstPaperRepository.getSrvChartId(srvChart); if(
		 * tbPpSrvChart != null) { result =
		 * cnstPaperRepository.updateTbPpSrvChart(srvChart); } else { result =
		 * cnstPaperRepository.insertTbPpSrvChart(srvChart); }
		 */
		return result;
	}
    
    

}
