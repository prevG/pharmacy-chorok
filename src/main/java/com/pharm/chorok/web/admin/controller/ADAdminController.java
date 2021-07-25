package com.pharm.chorok.web.admin.controller;

import java.util.List;

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
import com.pharm.chorok.domain.main.TbCommCodeVo;
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
	
	/**
	 * 관리자 관리 화면
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/AD1001MV_2")
	public String admin2(Model model) {
		
		List<TbCommCodeVo> usrAuthList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1016", "Y"));
		List<TbCommCodeVo> usrAprvList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1010", "Y"));
		List<TbCommCodeVo> usrGradeList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1003", "Y"));
		List<TbCommCodeVo> delYnList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1012", "Y"));
		
		model.addAttribute("usrAuthList", usrAuthList); // 권한코드
		model.addAttribute("usrAprvList", usrAprvList); // 승인코드
		model.addAttribute("usrGradeList", usrGradeList); // 직위코드
		model.addAttribute("delYnList", delYnList); // 사용유무
		
		return "admin/AD1001MV_2";
	}
	
	/**
	 * 관리자 목록 조회
	 * 
	 * @param tbCommUser
	 * @return
	 */
	@PostMapping("/getAdmin")
	@ResponseBody
	public List<TbCommUser> getAdmin(TbCommUser tbCommUser) {
		List<TbCommUser> tbCommUsers = adminService.selectAdmin(tbCommUser);
	
		return tbCommUsers;
	}
	
	/**
	 * 관리자 신규 추가
	 * 
	 * @param pageCriteria
	 * @return
	 */
	@PostMapping("/addAdmin")
	@ResponseBody
	public ResponseEntity<ResponseMessage> addAdmin(@RequestBody PageCriteria<TbCommUser> pageCriteria) {
		Assert.hasLength(pageCriteria.getCriteria().getUsrEml(), "Email must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrPwd(), "Password must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrNm(), "User name must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrPhnNo(), "Phone number must not be empty");

		int emailCount = adminService.countAdminEmail(pageCriteria.getCriteria());
		if (emailCount > 0) {
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "이메일이 이미 존재합니다."), HttpStatus.OK);
		}
		int phoneCount = adminService.countAdminPhone(pageCriteria.getCriteria());
		if (phoneCount > 0) {
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "핸드폰번호가 이미 존재합니다."), HttpStatus.OK);
		}
		
		adminService.addAdmin(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 요청 작업이 처리되었습니다."), HttpStatus.OK);
	}
	
	/**
	 * 관리자 정보 수정
	 * 
	 * @param pageCriteria
	 * @return
	 */
	@PostMapping("/modifyAdmin")
	@ResponseBody
	public ResponseEntity<ResponseMessage> modifyAdmin(@RequestBody PageCriteria<TbCommUser> pageCriteria) {
		Assert.hasLength(pageCriteria.getCriteria().getUsrNo(), "User id must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrEml(), "Email must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrNm(), "User name must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrPhnNo(), "Phone number must not be empty");

		int emailCount = adminService.countAdminEmailByExcludeUsrNo(pageCriteria.getCriteria());
		if (emailCount > 0) {
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "이메일이 이미 존재합니다."), HttpStatus.OK);
		}
		int phoneCount = adminService.countAdminPhoneByExcludeUsrNo(pageCriteria.getCriteria());
		if (phoneCount > 0) {
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "핸드폰번호가 이미 존재합니다."), HttpStatus.OK);
		}
		
		adminService.modifyAdmin(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 요청 작업이 처리되었습니다."), HttpStatus.OK);
	}
	
	/**
	 * 관리자 비밀번호 변경
	 * 
	 * @param pageCriteria
	 * @return
	 */
	@PostMapping("/modifyAdminPwd")
	@ResponseBody
	public ResponseEntity<ResponseMessage> modifyAdminPwd(@RequestBody PageCriteria<TbCommUser> pageCriteria) {
		Assert.hasLength(pageCriteria.getCriteria().getUsrPwd(), "Passworrd must not be empty");
		Assert.hasLength(pageCriteria.getCriteria().getUsrPwdCfm(), "Confirm passworrd must not be empty");
		
		if (!pageCriteria.getCriteria().getUsrPwd().equals(pageCriteria.getCriteria().getUsrPwdCfm())) {
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "비밀번호가 일치하지 않습니다."), HttpStatus.OK);
		}
		
		adminService.modifyAdminPwd(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 요청 작업이 처리되었습니다."), HttpStatus.OK);
	}
	
	/**
	 * 관리자 삭제 플래그 처리
	 * 
	 * @param pageCriteria
	 * @return
	 */
	@PostMapping("/removeAdmin")
	@ResponseBody
	public ResponseEntity<ResponseMessage> removeAdmin(@RequestBody PageCriteria<TbCommUser> pageCriteria) {
		Assert.hasLength(pageCriteria.getCriteria().getUsrNo(), "User id must not be empty");
		
		adminService.removeAdmin(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 요청 작업이 처리되었습니다."), HttpStatus.OK);
	}
	
}
