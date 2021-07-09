package com.pharm.chorok.web.admin.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.admin.service.ADUserService;

@RequestMapping(value = "/admin")
@Controller
public class ADUserController {

	@Autowired
	private ADUserService userService;
	
	/**
	 * @deprecated replace AD1003MV_2
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/AD1003MV")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1003MV");
		return mv;
	}
	
	@GetMapping("/AD1003MV_2")
	public ModelAndView admin2() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1003MV_2");
		return mv;
	}
	
	@PostMapping("/getUser")
	@ResponseBody
	public List<TbCustomer> getUser(TbCustomer tbCustomer) throws Exception {
		List<TbCustomer> tbCustomers = userService.selectUser(tbCustomer);

		return tbCustomers;
	}
	
	@PostMapping("/addUser")
	@ResponseBody
	public String addUser(TbCustomer tbCustomer) {
		Assert.hasLength(tbCustomer.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(tbCustomer.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(tbCustomer.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(tbCustomer.getCustGenTpCd(), "성별을 입력하세요");

		JSONObject result = new JSONObject();
		int cellNoCount = userService.countUserCellNo(tbCustomer);
		if (cellNoCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = userService.addUser(tbCustomer);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/modifyUser")
	@ResponseBody
	public String modifyUser(TbCustomer tbCustomer) {
		Assert.isTrue(tbCustomer.getCustId() > 0, "고객번호가 존재하지 않습니다.");
		Assert.hasLength(tbCustomer.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(tbCustomer.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(tbCustomer.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(tbCustomer.getCustGenTpCd(), "성별을 입력하세요");

		JSONObject result = new JSONObject();
		int cellNoCount = userService.countUserCellNoByExcludeCustId(tbCustomer);
		if (cellNoCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = userService.modifyUser(tbCustomer);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/removeUser")
	@ResponseBody
	public String removeUser(TbCustomer tbCustomer) {
		Assert.isTrue(tbCustomer.getCustId() > 0, "고객번호가 존재하지 않습니다.");
		
		JSONObject result = new JSONObject();
		int ret = userService.removeUser(tbCustomer);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
}
