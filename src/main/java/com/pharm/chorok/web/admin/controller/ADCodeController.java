package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	
	
	@PostMapping("/getCodesByGrpCd")
	@ResponseBody
	public String getCodesByGrpCd(TbCommCode tbCommCode ) throws Exception {
		//ObjectMapper objectMapper = new ObjectMapper();
		tbCommCode.setGrpCd("00000");
		ArrayList<TbCommCode> tbCommCodes = codeService.selectCodesByGroupCd(tbCommCode);
		
		JSONObject result = new JSONObject();
		JSONObject data = new JSONObject();
		JSONArray arr = new JSONArray();
		
		for(int i=0; i<tbCommCodes.size();i++) {
			data.put("grpCd",tbCommCodes.get(i).getGrpCd());
			data.put("ditcCd", tbCommCodes.get(i).getDitcCd());
			data.put("ditcNm", tbCommCodes.get(i).getDitcNm());
			data.put("cdExp", tbCommCodes.get(i).getCdExp());
			data.put("vOrder", tbCommCodes.get(i).getVOrder());
			data.put("lockYn", tbCommCodes.get(i).getLockYn());
			data.put("useYn", tbCommCodes.get(i).getUseYn());
		}
		
		arr.put(data);
		
		result.put("total", "1");
		result.put("rows", arr);
	
		return result.toString();
	}
	
	@PostMapping("/saveCode")
	public ModelAndView saveCode(TbCommCode tbCommCode ) throws Exception {
		
		codeService.saveCode(tbCommCode);
		
		
		ModelAndView mv = new ModelAndView("redirect:/boardMain"); 
		return mv;

	}
	
}
