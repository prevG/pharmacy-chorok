package com.pharm.chorok.web.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.web.main.service.CnstPaperService;

@RequestMapping(value = "/cnstPaper")
@Controller
public class CnstPaperController {

	@Autowired
	private CnstPaperService cnstPaperService;

	
	
	//설문개요 조회
	@GetMapping("/view")
	public ModelAndView view(TbPpCnstPaper tbPpCnstPaper) throws Exception{
		ModelAndView mv = new ModelAndView();
		
		tbPpCnstPaper.setCnstVer(1);
		List<TbPpCnstPaper> cnstPaper = cnstPaperService.getCnstPaper(tbPpCnstPaper);
		
		mv.addObject("cnstPaper", cnstPaper);
		mv.setViewName("/main/CP1001P01");
		return mv;
	}
	


}
