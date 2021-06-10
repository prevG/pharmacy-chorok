package com.pharm.chorok.web.main.controller;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.common.exception.CustomException;
import com.common.exception.DatabaseInsertException;
import com.common.exception.EmailCheckException;
import com.common.exception.EmptyCheckException;
import com.common.exception.ExceptionItem;
import com.common.exception.NumberCheckException;
import com.common.exception.SizeCheckException;
import com.common.util.Check;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADAdminService;

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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import org.springframework.web.servlet.view.RedirectView;

@RequestMapping(value = "/account")
@Controller
public class AccountController {

	@Autowired
	private ADAdminService adUserService;

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

	@PostMapping("/loginFailRedirect")
	public ModelAndView loginFailRedirect( 
		TbCommUser inCommUser,
		HttpServletRequest req,
		RedirectAttributes redirectAttr) {

		ModelAndView mv = new ModelAndView();
		String usrEml = req.getParameter("usrEml") != null ? req.getParameter("usrEml").toString() : "";
		String errMsg = req.getAttribute("errMsg").toString();

		redirectAttr.addFlashAttribute( "errMsg", errMsg );
		redirectAttr.addFlashAttribute( "usrEml", usrEml );
		mv.setView( new RedirectView( "/account/login"));
		return mv;
	}
	// 회원가입 처리
	@PostMapping("/signupProc")
	@ResponseBody
	public ResponseEntity<ResponseMessage> signupProc(@RequestBody Map<String, String> reqMap) throws Exception {
	// JSON을 String으로 받아오는 코드(1)
	//public ResponseEntity<ResponseMessage> signupProc(@RequestBody String reqStr) throws Exception {
		
		ResponseMessage resMsg = new ResponseMessage();
		JSONObject resJSON = new JSONObject();

		try {
			// String의 JSON을 Map으로 변환하는 과정
			// (1)를 사용할 경우 아래의 코드를 사용
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
			} else if (usrPhnNo.contains("-")) {
				usrPhnNo = usrPhnNo.replaceAll("-", "");
			} else if (Check.sizeCheck(usrPhnNo, 11, 11)) {
				throw new SizeCheckException(TbCommUser.USR_PHN_NO, 11, 11);
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
				resMsg.setStatus(CustomException.SUCCESS);
			}else {
				throw new DatabaseInsertException();
			}
			
		// 예외 처리
		} catch(CustomException e) {
			resMsg.setStatus(CustomException.FAIL);
			resMsg.setMessage(e.getMessage()); 
			resMsg.setErrorCode(e.getErrorCode());
			
			// 추가정보를 resJSON에 추가
			if (e instanceof ExceptionItem) {
				ExceptionItem ei = (ExceptionItem) e;
				resJSON.put("item", ei.getItem());
			}
			if (e instanceof SizeCheckException) {
				SizeCheckException se = (SizeCheckException) e;
				resJSON.put("min", se.getMin());
				resJSON.put("max", se.getMax());
			}
			resMsg.setData(resJSON.toMap());
		} catch(Exception e) {
			resMsg.setStatus(CustomException.FAIL);
			// 예상범위 밖의 예외는 사용자에게 알려주지 않음. 
			//resMsg.setMessage(e.getMessage());
			e.printStackTrace();
		}
		return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.OK);
	}
	
	public class JsonUtil {
		private JSONObject result;
		public JsonUtil() {
			result = new JSONObject();
		}
	}
}
