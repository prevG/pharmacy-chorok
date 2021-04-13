package com.pharm.chorok.web.main.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.main.service.DoseService;

@RequestMapping(value = "/dose")
@Controller
public class DoseController {
	@Autowired
	private DoseService doseService;

	//설문개요 조회
	@GetMapping("/view")
	public ModelAndView survey(TbCommUser tbCommUser) throws Exception{
		ModelAndView mv = new ModelAndView();
	
		//doseService.getDoseByComUsrRole(tbCommUser);
		
		mv.setViewName("/main/DS1001P01");
		return mv;
	}

	

	
}
