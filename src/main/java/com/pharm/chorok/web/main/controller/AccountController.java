package com.pharm.chorok.web.main.controller;

import com.common.exception.CustomException;
import com.common.exception.EmailCheckException;
import com.common.exception.EmptyCheckException;
import com.common.exception.NumberCheckException;
import com.common.exception.SizeCheckException;
import com.common.util.Check;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(value = "/account")
@Controller
public class AccountController {

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
			String usrEml = (String)jsonMap.get(TbCommUser.USR_EML);
			if (Check.emptyCheck(usrEml)) {
				throw new EmptyCheckException(TbCommUser.USR_EML);
			} else if (Check.sizeCheck(usrEml, 5, 100)) {
				result.put("min", 5);
				result.put("max", 100);
				throw new SizeCheckException(TbCommUser.USR_EML, 5, 100);
			} else if (Check.emailCheck(usrEml)) {
				throw new EmailCheckException(TbCommUser.USR_EML);
			}
			user.setUsrEml(usrEml);
			
			String usrPhnNo = (String)jsonMap.get(TbCommUser.USR_PHN_NO);
			if (Check.emptyCheck(usrPhnNo)) {
				throw new EmptyCheckException(TbCommUser.USR_PHN_NO);
			} else if (Check.sizeCheck(usrPhnNo, 11, 11)) {
				result.put("min", 5);
				result.put("max", 100);
				throw new SizeCheckException(TbCommUser.USR_PHN_NO, 11, 11);
			} else if (usrPhnNo.contains("-")) {
				usrPhnNo = usrPhnNo.replaceAll("-", "");
			} else if (Check.numberCheck(usrPhnNo)) {
				throw new NumberCheckException(TbCommUser.USR_PHN_NO);
			}
			user.setUsrPhnNo(usrPhnNo);
			
			String usrNm = (String)jsonMap.get(TbCommUser.USR_NM);
			if (Check.emptyCheck(usrNm)) {
				throw new EmptyCheckException(TbCommUser.USR_NM);
			}else if (Check.sizeCheck(usrNm, 2, 50)) {
				result.put("min", 5);
				result.put("max", 100);
				throw new SizeCheckException(TbCommUser.USR_NM, 2, 50);
			}
			user.setUsrNm(usrNm);
			
			String usrPwd = (String)jsonMap.get(TbCommUser.USR_PWD);
			if (Check.emptyCheck(usrPwd)) {
				throw new EmptyCheckException(TbCommUser.USR_PWD);
			} else if (Check.sizeCheck(usrPwd, 2, 100)) {
				result.put("min", 5);
				result.put("max", 100);
				throw new SizeCheckException(TbCommUser.USR_PWD, 2, 100);
			}
			user.setUsrPwd(usrPwd);
			
		} catch(CustomException e) {
			result.put("result", "fail");
			result.put("error_code", e.getCode());
			result.put("error_item", e.getItem());
			result.put("error_message", e.getMessage());
			return result.toString();
		} catch(Exception e) {
			result.put("result", "fail");
		}
		
		int ret = adUserService.saveAdmin(user);
		
		if(ret > 0) {
			result.put("result", "success");
		}else {
			result.put("result", "fail");
			result.put("error_code", "DATA_BASE_ERROR");
			result.put("error_message", "Database Access Error");
		}
		
		return result.toString();
	}

	// 로그아웃 결과 페이지
	@GetMapping("/logout")
	public String logout() {
		return "account/logout";
	}
	
	public class JsonUtil {
		private JSONObject result;
		public JsonUtil() {
			result = new JSONObject();
		}
	}
}
