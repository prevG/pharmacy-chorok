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
	// 아래의 코드로도 사용가능
	//public String signupProc(@RequestBody Map<String, String> jsonMap) throws Exception {
	public String signupProc(@RequestBody String data) throws Exception {
		
		JSONObject result = new JSONObject();
		
		Map<String, String> jsonMap = new ObjectMapper().readValue(data, Map.class);
		
		TbCommUser user = new TbCommUser();
		try {
			String usrEml = (String)jsonMap.get("usrEml");
			if (emptyCheck(usrEml)) {
				throw new Exception("usrEml_is_empty");
			} else if (!usrEml.contains("@") || !usrEml.contains(".")) {
				throw new Exception("usrEml_is_not_email");
			}
			user.setUsrEml(usrEml);
			
			String usrPhnNo = (String)jsonMap.get("usrPhnNo");
			if (emptyCheck(usrPhnNo)) {
				throw new Exception("usrPhnNo_is_empty");
			} else if (usrPhnNo.length() < 11) {
				throw new Exception("usrPwd_is_short");
			}
			user.setUsrPhnNo(jsonMap.get(usrPhnNo));
			
			String usrNm = (String)jsonMap.get("usrNm");
			if (emptyCheck(usrNm)) {
				throw new Exception("usrNm_is_empty");
			}else if (usrPhnNo.length() < 2) {
				throw new Exception("usrNm_is_short");
			}
			user.setUsrNm(usrNm);
			
			String usrPwd = (String)jsonMap.get("usrPwd");
			if (emptyCheck(usrPwd)) {
				throw new Exception("usrPwd_is_empty");
			} else if (usrPwd.length() < 4) {
				throw new Exception("usrPwd_is_short");
			}
			user.setUsrPwd(usrPwd);
			
		} catch(Exception e) {
			result.put("result", "fail");
			result.put("error_code", e.getMessage());
			return result.toString();
		}
		
		int ret = adUserService.saveAdmin(user);
		
		if(ret > 0) {
			result.put("result", "success");
		}else {
			result.put("result", "fail");
			result.put("error_code", "db_access_error");
		}
		
		return result.toString();
	}

	// 로그아웃 결과 페이지
	@GetMapping("/logout")
	public String logout() {
		return "account/logout";
	}
	
	boolean emptyCheck(String str) {
		return str==null || "".equals(str.trim());
	}
}
