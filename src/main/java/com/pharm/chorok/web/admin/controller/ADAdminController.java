package com.pharm.chorok.web.admin.controller;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADAdminService;
import com.pharm.chorok.web.admin.service.ADCodeService;

@RequestMapping(value = "/admin")
@Controller
public class ADAdminController {

	@Autowired
	private ADAdminService adminService;
	
	@Autowired
	private ADCodeService codeService;
	
	@GetMapping("/AD1001MV")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1001MV");
		return mv;
	}
	
	@GetMapping("/AD1001MV_2")
	public String admin2(Model model) {
		
		List<TbCommCode> usrAuthList = codeService.selectAbbrCodes(new TbCommCode("C1016", "Y"));
		List<TbCommCode> usrAprvList = codeService.selectAbbrCodes(new TbCommCode("C1010", "Y"));
		List<TbCommCode> usrGradeList = codeService.selectAbbrCodes(new TbCommCode("C1003", "Y"));
		List<TbCommCode> delYnList = codeService.selectAbbrCodes(new TbCommCode("C1012", "Y"));
		
		model.addAttribute("usrAuthList", usrAuthList); // 권한코드
		model.addAttribute("usrAprvList", usrAprvList); // 승인코드
		model.addAttribute("usrGradeList", usrGradeList); // 직위코드
		model.addAttribute("delYnList", delYnList); // 사용유무
		
		return "admin/AD1001MV_2";
	}
	
	@PostMapping("/getAdmin")
	@ResponseBody
	public List<TbCommUser> getAdmin(TbCommUser tbCommUser) {
		List<TbCommUser> tbCommUsers = adminService.selectAdmin(tbCommUser);
	
		return tbCommUsers;
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
	public ResponseEntity<ResponseMessage> removeAdmin(@RequestBody PageCriteria<TbCommUser> pageCriteria) {
		Assert.hasLength(pageCriteria.getCriteria().getUsrNo(), "User id must not be empty");
		
		adminService.removeAdmin(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "요청작업이 정상적으로 처리되었습니다."), HttpStatus.OK);
	}
	
}
