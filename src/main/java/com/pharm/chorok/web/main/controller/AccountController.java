package com.pharm.chorok.web.main.controller;

import com.common.exception.CustomException;
import com.common.exception.DatabaseInsertException;
import com.common.exception.EmailCheckException;
import com.common.exception.EmptyCheckException;
import com.common.exception.NumberCheckException;
import com.common.exception.SizeCheckException;
import com.common.util.Check;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
	public ResponseEntity<ResponseMessage> signupProc(@RequestBody Map<String, String> reqMap) throws Exception {
	// 아래의 코드로도 사용가능
	//public ResponseEntity<ResponseMessage> signupProc(@RequestBody String reqStr) throws Exception {
		
		ResponseMessage resMsg = new ResponseMessage();
		JSONObject resObj = new JSONObject();

		try {
			//Map<String, String> reqMap = new ObjectMapper().readValue(reqStr, Map.class);
			TbCommUser user = new TbCommUser();
			
			// 유효성 검사
			String usrEml = (String)reqMap.get(TbCommUser.USR_EML);
			if (Check.emptyCheck(usrEml)) {
				throw new EmptyCheckException(TbCommUser.USR_EML);
			} else if (Check.sizeCheck(usrEml, 5, 100)) {
				throw new SizeCheckException(TbCommUser.USR_EML, 5, 100);
			} else if (Check.emailCheck(usrEml)) {
				throw new EmailCheckException(TbCommUser.USR_EML);
			}
			user.setUsrEml(usrEml);
			
			String usrPhnNo = (String)reqMap.get(TbCommUser.USR_PHN_NO);
			if (Check.emptyCheck(usrPhnNo)) {
				throw new EmptyCheckException(TbCommUser.USR_PHN_NO);
			} else if (Check.sizeCheck(usrPhnNo, 11, 11)) {
				throw new SizeCheckException(TbCommUser.USR_PHN_NO, 11, 11);
			} else if (usrPhnNo.contains("-")) {
				usrPhnNo = usrPhnNo.replaceAll("-", "");
			} else if (Check.numberCheck(usrPhnNo)) {
				throw new NumberCheckException(TbCommUser.USR_PHN_NO);
			}
			user.setUsrPhnNo(usrPhnNo);
			
			String usrNm = (String)reqMap.get(TbCommUser.USR_NM);
			if (Check.emptyCheck(usrNm)) {
				throw new EmptyCheckException(TbCommUser.USR_NM);
			}else if (Check.sizeCheck(usrNm, 2, 50)) {
				throw new SizeCheckException(TbCommUser.USR_NM, 2, 50);
			}
			user.setUsrNm(usrNm);
			
			String usrPwd = (String)reqMap.get(TbCommUser.USR_PWD);
			if (Check.emptyCheck(usrPwd)) {
				throw new EmptyCheckException(TbCommUser.USR_PWD);
			} else if (Check.sizeCheck(usrPwd, 4, 100)) {
				throw new SizeCheckException(TbCommUser.USR_PWD, 4, 100);
			}
			user.setUsrPwd(usrPwd);
			
			// DB에 저장
			int ret = adUserService.saveAdmin(user);
			
			if(ret > 0) {
				resMsg.setStatus("success");
			}else {
				throw new DatabaseInsertException();
			}
			
		// 예외 처리
		} catch(CustomException e) {
			resMsg.setStatus("fail");
			resMsg.setMessage( e.getMessage() ); 
			resMsg.setErrorCode(e.getCode());
			resObj.put("item", e.getItem());
			if (e instanceof SizeCheckException) {
				SizeCheckException se = (SizeCheckException) e;
				resObj.put("min", se.getMin());
				resObj.put("max", se.getMin());
			}
			resMsg.setData(resObj.toMap());
		} catch(Exception e) {
			resMsg.setStatus("fail");
			// 예상범위 밖의 예외는 사용자에게 알려주지 않음. 
			//resMsg.setMessage( e.getMessage() );
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.OK);
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
