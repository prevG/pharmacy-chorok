package com.pharm.chorok.web.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.pharm.chorok.domain.main.TbCommCodeVo;
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
		List<TbCommCodeVo> grpCdList = codeService.selectAbbrGrpCodes();
		//사용여부
		List<TbCommCodeVo> useYnList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1017", "Y"));
		
		model.addAttribute("grpCdList", grpCdList);
		model.addAttribute("useYnList", useYnList);
		
		return "admin/AD1002MV";
	}
	
	/**
	 * 공통코드 조회
	 * 
	 * @param tbCommCodeVo
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/getCodes")
	@ResponseBody
	public List<TbCommCodeVo> getCodes(TbCommCodeVo tbCommCodeVo) throws Exception {
		List<TbCommCodeVo> tbCommCodes = codeService.selectCodes(tbCommCodeVo);

		return tbCommCodes;
	}
	
	/**
	 * 그룹코드에 대한 공통코드 조회
	 * 
	 * @param tbCommCodeVo
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/getCodesByGrpCd")
	@ResponseBody
	public List<TbCommCodeVo> getCodesByGrpCd(TbCommCodeVo tbCommCodeVo) throws Exception {
		List<TbCommCodeVo> tbCommCodes = codeService.selectCodesByGrpCd(tbCommCodeVo);

		return tbCommCodes;
	}
	
}
