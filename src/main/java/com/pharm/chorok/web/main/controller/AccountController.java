package com.pharm.chorok.web.main.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(value = "/account")
@Controller
public class AccountController {

	@Autowired
	private CommUserDetailsService userService;

	@Autowired
	private ADUserService adUserService;

	// 로그인 페이지
	@GetMapping("/login")
	public String login() {
		return "account/login";
	}

	// 회원가입 페이지
	@GetMapping("/signup")
	public String signup() {
		return "account/signup";
	}

	// 회원가입 처리
	@PostMapping("/signupProc")
	@ResponseBody
	// 아래의 코드로도 사용가능.
	// public String signupProc(@RequestBody Map<String, Object> jsonMap) throws Exception {
	public String signupProc(@RequestBody String data) throws Exception {
		
		Map<String, String> jsonMap = new ObjectMapper().readValue(data, Map.class);
		TbCommUser user = new TbCommUser();
		user.setUsrEml((String)jsonMap.get("usrEml"));
		user.setUsrPhnNo((String)jsonMap.get("usrPhnNo"));
		user.setUsrNm((String)jsonMap.get("usrNm"));
		user.setUsrPwd((String)jsonMap.get("usrPwd"));
		
		int ret = adUserService.saveAdmin(user);
		
		JSONObject result = new JSONObject();
		if(ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		}else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}

	// 로그아웃 결과 페이지
	@GetMapping("/logout")
	public String logout() {
		return "account/logout";
	}
}
