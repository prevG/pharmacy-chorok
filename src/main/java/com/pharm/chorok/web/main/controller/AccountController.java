package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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
	public String signupProc(TbCommUser tbCommUser ) throws Exception {
		
		JSONObject result = new JSONObject();
		
		int ret = adUserService.saveAdmin(tbCommUser);
		
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
