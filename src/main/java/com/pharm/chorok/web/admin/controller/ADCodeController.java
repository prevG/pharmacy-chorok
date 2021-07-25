package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.web.admin.service.ADCodeService;

@RequestMapping(value = "/admin")
@Controller
public class ADCodeController {

	@Autowired
	private ADCodeService codeService;
	
	/**
	 * 공통코드 화면
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/AD1002MV")
	public String code(Model model) {
		
		//그룹코드
		List<TbCommCode> grpCdList = codeService.selectAbbrGrpCodes(new TbCommCode());
		//사용여부
		List<TbCommCode> useYnList = codeService.selectAbbrCodes(new TbCommCode("C1017", "Y"));
		
		model.addAttribute("grpCdList", grpCdList);
		model.addAttribute("useYnList", useYnList);
		
		return "admin/AD1002MV";
	}
	
	@PostMapping("/getCodesByGrpCd_2")
	@ResponseBody
	public List<TbCommCode> getCodesByGrpCd_2(TbCommCode tbCommCode) {
		List<TbCommCode> tbCommCodes = codeService.selectCodesByGroupCd_2(tbCommCode);
		
		return tbCommCodes;
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
