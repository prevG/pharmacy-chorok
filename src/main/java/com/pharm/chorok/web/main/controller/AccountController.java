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
			String usrEml = (String)jsonMap.get(TbCommUser.USR_EML);
			if (emptyCheck(usrEml)) {
				throw new EmptyException(TbCommUser.USR_EML);
			} else if (sizeCheck(usrEml, 5, 100)) {
				throw new SizeException(TbCommUser.USR_EML);
			} else if (emailCheck(usrEml)) {
				throw new EmailException(TbCommUser.USR_EML);
			}
			user.setUsrEml(usrEml);
			
			String usrPhnNo = (String)jsonMap.get(TbCommUser.USR_PHN_NO);
			if (emptyCheck(usrPhnNo)) {
				throw new EmptyException(TbCommUser.USR_PHN_NO);
			} else if (sizeCheck(usrPhnNo, 11, 11)) {
				throw new SizeException(TbCommUser.USR_PHN_NO);
			} else if (usrPhnNo.contains("-")) {
				usrPhnNo = usrPhnNo.replaceAll("-", "");
			} else if (numberCheck(usrPhnNo)) {
				throw new NumberException(TbCommUser.USR_PHN_NO);
			}
			user.setUsrPhnNo(usrPhnNo);
			
			String usrNm = (String)jsonMap.get(TbCommUser.USR_NM);
			if (emptyCheck(usrNm)) {
				throw new EmptyException(TbCommUser.USR_NM);
			}else if (sizeCheck(usrNm, 2, 50)) {
				throw new SizeException(TbCommUser.USR_NM);
			}
			user.setUsrNm(usrNm);
			
			String usrPwd = (String)jsonMap.get(TbCommUser.USR_PWD);
			if (emptyCheck(usrPwd)) {
				throw new EmptyException(TbCommUser.USR_PWD);
			} else if (sizeCheck(usrPwd, 2, 100)) {
				throw new SizeException(TbCommUser.USR_PWD);
			}
			user.setUsrPwd(usrPwd);
			
		} catch(CustomException e) {
			result.put("result", "fail");
			result.put("error_code", e.getErrorCode());
			return result.toString();
		} catch(Exception e) {
			result.put("result", "fail");
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
	
	private boolean emptyCheck(String str) {
		return str==null || "".equals(str.trim());
	}
	
	private boolean sizeCheck(String str, int min, int max) {
		return str.length() < min || str.length() > max;
	}
	
	private boolean emailCheck(String str) {
		return !str.contains("@") || !str.contains(".");
	}
	
	private boolean numberCheck(String str) {
		try {
			Integer.parseInt(str);
		} catch(Exception e) {
			return true;
		}
		return false;
	
	}
	
	public class JsonUtil {
		private JSONObject result;
		public JsonUtil() {
			result = new JSONObject();
		}
	}
	
	public class CustomException extends Exception {
		private String errorCode = "";
		
		protected CustomException(String errorCode) {
			this.errorCode = errorCode;
		}

		public String getErrorCode() {
			return errorCode;
		}
	}
	
	public class EmptyException extends CustomException {
		public EmptyException(String target){
			super(target+"_is_empty");
		}
	}
	
	public class SizeException extends CustomException {
		public SizeException(String target){
			super(target+"_is_short_or_long_size");
		}
	}
	
	public class EmailException extends CustomException {
		public EmailException(String target){
			super(target+"_is_not_email_address");
		}
	}
	
	public class NumberException extends CustomException {
		public NumberException(String target){
			super(target+"_is_not_number");
		}
	}
}
