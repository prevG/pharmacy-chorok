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
	
	
	@GetMapping("/AD1002MV")
	public ModelAndView code( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1002MV");
		return mv;
	}
	
	
	@PostMapping("/getCodesByGrpCd")
	@ResponseBody
	public String getCodesByGrpCd(TbCommCode tbCommCode ) throws Exception {
		ArrayList<TbCommCode> tbCommCodes = codeService.selectCodesByGroupCd(tbCommCode);
		
		JSONObject result = new JSONObject();
		
		JSONArray arr = new JSONArray();
		
		for(int i=0; i<tbCommCodes.size();i++) {
			JSONObject data = new JSONObject();
			data.put("grpCd",tbCommCodes.get(i).getGrpCd());
			data.put("ditcCd", tbCommCodes.get(i).getDitcCd());
			data.put("ditcNm", tbCommCodes.get(i).getDitcNm());
			data.put("cdExp", tbCommCodes.get(i).getCdExp());
			data.put("vOrder", tbCommCodes.get(i).getVOrder());
			data.put("lockYn", tbCommCodes.get(i).getLockYn());
			data.put("useYn", tbCommCodes.get(i).getUseYn());
			arr.put(data);
		}
		
		result.put("total", "1");
		result.put("rows", arr);
	
		return result.toString();
	}
	
	
	@PostMapping("/getGrpCdWithCombo")
	@ResponseBody
	public String getGrpCdWithCombo(TbCommCode tbCommCode) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonStr = "";
		
		ArrayList<TbCommCode> tbCommCodes = codeService.selectCodesByGroupCd(tbCommCode);
		
		jsonStr = objectMapper.writeValueAsString(tbCommCodes);
		return jsonStr;
	}
	
	
	
	@PostMapping("/getCodes")
	@ResponseBody
	public String getCodes(TbCommCode tbCommCode) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonStr = "";
		
		ArrayList<TbCommCode> tbCommCodes = codeService.selectCodes(tbCommCode);
		
		jsonStr = objectMapper.writeValueAsString(tbCommCodes);
		return jsonStr;
	}
	
	
	@PostMapping("/getAbbrCodes")
	@ResponseBody
	public String getAbbrCodes(TbCommCode tbCommCode) throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();
		String jsonStr = "";
		
		ArrayList<TbCommCode> tbCommCodes = codeService.selectAbbrCodes(tbCommCode);
		
		jsonStr = objectMapper.writeValueAsString(tbCommCodes);
		return jsonStr;
	}
	
	
	
	
	@PostMapping("/removeCode")
	@ResponseBody
	public String removeCode(TbCommCode tbCommCode ) throws Exception {
		JSONObject result = new JSONObject();
		
		int ret = codeService.removeCode(tbCommCode);
		
		if(ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공했습니다.");
		}else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	
	
	@PostMapping("/saveCode")
	@ResponseBody
	public String saveCode(TbCommCode tbCommCode ) throws Exception {
		JSONObject result = new JSONObject();

		int ret = codeService.saveCode(tbCommCode);
		
		if(ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공했습니다.");
		}else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
}
