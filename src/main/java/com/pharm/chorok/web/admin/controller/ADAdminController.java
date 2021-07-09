package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADAdminService;

@RequestMapping(value = "/admin")
@Controller
public class ADAdminController {

	@Autowired
	private ADAdminService adminService;
	
	@GetMapping("/AD1001MV")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1001MV");
		return mv;
	}
	
	@GetMapping("/AD1001MV_2")
	public ModelAndView admin2() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1001MV_2");
		return mv;
	}
	
	@PostMapping("/getAdmin")
	@ResponseBody
	public String getAdmin(TbCommUser tbCommUser) {
		ArrayList<TbCommUser> tbCommUsers = adminService.selectAdmin(tbCommUser);
		
		JSONObject result = new JSONObject();
		JSONArray arr = new JSONArray();
		for (int i = 0; i < tbCommUsers.size(); i++) {
			JSONObject data = new JSONObject();
			data.put("usrNo",tbCommUsers.get(i).getUsrNo());
			data.put("usrEml",tbCommUsers.get(i).getUsrEml());
			data.put("authorities", tbCommUsers.get(i).getAuthorities());
			data.put("regUsrNo", tbCommUsers.get(i).getRegUsrNo());
			data.put("updUsrNo", tbCommUsers.get(i).getUpdUsrNo());
			data.put("dataOwnrId", tbCommUsers.get(i).getDataOwnrId());
			data.put("password", tbCommUsers.get(i).getPassword());
			data.put("usrName", tbCommUsers.get(i).getUsername());
			data.put("usrAuth", tbCommUsers.get(i).getUsrAuth());
			data.put("usrGrade", tbCommUsers.get(i).getUsrGrade());
			data.put("usrNm", tbCommUsers.get(i).getUsrNm());
			data.put("usrPhnNo", tbCommUsers.get(i).getUsrPhnNo());
			data.put("usrPwd", tbCommUsers.get(i).getUsrPwd());
			data.put("usrAprv",tbCommUsers.get(i).getUsrAprv());
			
			data.put("usrGradeVal",tbCommUsers.get(i).getUsrGradeVal());
			data.put("usrAuthVal",tbCommUsers.get(i).getUsrAuthVal());
			data.put("usrAprvVal",tbCommUsers.get(i).getUsrAprvVal());
			
			data.put("delYn",tbCommUsers.get(i).getDelYn());
			data.put("regDt",tbCommUsers.get(i).getRegDt());
			arr.put(data);
		}
		result.put("total", tbCommUsers.size());
		result.put("rows", arr);
	
		return result.toString();
	}
	
	@PostMapping("/addAdmin")
	@ResponseBody
	public String addAdmin(TbCommUser tbCommUser) {
		Assert.hasLength(tbCommUser.getUsrEml(), "Email must not be empty");
		Assert.hasLength(tbCommUser.getUsrPwd(), "Password must not be empty");
		Assert.hasLength(tbCommUser.getUsrNm(), "User name must not be empty");
		Assert.hasLength(tbCommUser.getUsrPhnNo(), "Phone number must not be empty");

		JSONObject result = new JSONObject();
		int emailCount = adminService.countAdminEmail(tbCommUser);
		if (emailCount > 0) {
			result.put("success", false);
			result.put("Msg", "이메일이 이미 존재합니다.");
			
			return result.toString();
		}
		int phoneCount = adminService.countAdminPhone(tbCommUser);
		if (phoneCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = adminService.addAdmin(tbCommUser);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/modifyAdmin")
	@ResponseBody
	public String modifyAdmin(TbCommUser tbCommUser) {
		Assert.hasLength(tbCommUser.getUsrNo(), "User id must not be empty");
		Assert.hasLength(tbCommUser.getUsrEml(), "Email must not be empty");
		Assert.hasLength(tbCommUser.getUsrNm(), "User name must not be empty");
		Assert.hasLength(tbCommUser.getUsrPhnNo(), "Phone number must not be empty");

		JSONObject result = new JSONObject();
		int emailCount = adminService.countAdminEmailByExcludeUsrNo(tbCommUser);
		if (emailCount > 0) {
			result.put("success", false);
			result.put("Msg", "이메일이 이미 존재합니다.");
			
			return result.toString();
		}
		int phoneCount = adminService.countAdminPhoneByExcludeUsrNo(tbCommUser);
		if (phoneCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = adminService.modifyAdmin(tbCommUser);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/modifyAdminPwd")
	@ResponseBody
	public String modifyAdminPwd(TbCommUser tbCommUser) {
		Assert.hasLength(tbCommUser.getUsrPwd(), "Passworrd must not be empty");
		Assert.hasLength(tbCommUser.getUsrPwdCfm(), "Confirm passworrd must not be empty");
		
		JSONObject result = new JSONObject();
		if (!tbCommUser.getUsrPwd().equals(tbCommUser.getUsrPwdCfm())) {
			result.put("success", false);
			result.put("Msg", "패스워드가 일치하지 않습니다.");
		}
		
		int ret = adminService.modifyAdminPwd(tbCommUser);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/removeAdmin")
	@ResponseBody
	public String removeAdmin(TbCommUser tbCommUser) {
		Assert.hasLength(tbCommUser.getUsrNo(), "User id must not be empty");
		
		JSONObject result = new JSONObject();
		int ret = adminService.removeAdmin(tbCommUser);
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
