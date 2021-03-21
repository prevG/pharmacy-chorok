package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.web.admin.service.ADCodeService;

@RequestMapping(value = "/admin")
@Controller
public class ADCodeController {

	@Autowired
	private ADCodeService codeService;
	
	
	@GetMapping("/code")
	public ModelAndView code( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/code");
		return mv;
	}
	
	
	@PostMapping("/getCodes")
	@ResponseBody
	public String getCode(TbCommCode tbCommCode ) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		//ModelAndView mv = new ModelAndView();
		//String ditcCdKind = tbCommCode.getDitcCdKind();

		//tbCommCode.setDitcCd("00000");
		//ArrayList<TbCommCode> tbCommCodes = codeService.selectCodes(tbCommCode);
		
		
		 TbCommCode tbCommCodes = new TbCommCode();
		 
		 tbCommCodes.setDitcNm("a");
		  
		 String temp = objectMapper.writeValueAsString(tbCommCodes);
		 
		//mv.addObject(tbCommCodes);
		//mv.addObject("codeList", tbCommCodes);
		//mv.setViewName("/admin/code");
		
	
		return temp;
	}
	
}
