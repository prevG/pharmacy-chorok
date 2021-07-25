package com.pharm.chorok.web.admin.controller;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.comm.CommCodeEx;
import com.pharm.chorok.domain.comm.PageCriteria;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultRcmdVo;
import com.pharm.chorok.domain.main.TbCommCodeVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.CustomerService;

@RequestMapping(value = "/admin")
@Controller
public class ADUserController {

	@Autowired
	private ADUserService userService;
	
	@Autowired
	private CustomerService customerSvc;
	
	/**
	 * @deprecated replace AD1003MV_2
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/AD1003MV")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("admin/AD1003MV");
		return mv;
	}
	
	/**
	 * 고객목록화면
	 * 
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/AD1003MV_2")
	public String admin2() throws Exception {
		
		return "admin/AD1003MV_2";
	}
	
	@PostMapping("/getUser")
	@ResponseBody
	public List<TbCustomer> getUser(TbCustomer tbCustomer) throws Exception {
		List<TbCustomer> tbCustomers = userService.selectUser(tbCustomer);

		return tbCustomers;
	}
	
	@PostMapping("/addUser")
	@ResponseBody
	public String addUser(TbCustomer tbCustomer) {
		Assert.hasLength(tbCustomer.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(tbCustomer.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(tbCustomer.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(tbCustomer.getCustGenTpCd(), "성별을 입력하세요");

		JSONObject result = new JSONObject();
		int cellNoCount = userService.countUserCellNo(tbCustomer);
		if (cellNoCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = userService.addUser(tbCustomer);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	@PostMapping("/modifyUser")
	@ResponseBody
	public String modifyUser(TbCustomer tbCustomer) {
		Assert.isTrue(tbCustomer.getCustId() > 0, "고객번호가 존재하지 않습니다.");
		Assert.hasLength(tbCustomer.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(tbCustomer.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(tbCustomer.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(tbCustomer.getCustGenTpCd(), "성별을 입력하세요");

		JSONObject result = new JSONObject();
		int cellNoCount = userService.countUserCellNoByExcludeCustId(tbCustomer);
		if (cellNoCount > 0) {
			result.put("success", false);
			result.put("Msg", "핸드폰번호가 이미 존재합니다.");
			
			return result.toString();
		}
		
		int ret = userService.modifyUser(tbCustomer);
		if (ret > 0) {
			result.put("success", true);
			result.put("Msg", "작업성공하였습니다.");
		} else {
			result.put("success", false);
			result.put("Msg", "작업실패했습니다.");
		}
		
		return result.toString();
	}
	
	/**
	 * 고객 삭제 플래그 처리
	 * 
	 * @param pageCriteria
	 * @return
	 */
	@PostMapping("/removeUser")
	@ResponseBody
	public ResponseEntity<ResponseMessage> removeUser(@RequestBody PageCriteria<TbCustomer> pageCriteria) {
		Assert.isTrue(pageCriteria.getCriteria().getCustId() > 0, "고객번호가 존재하지 않습니다.");
		
		userService.removeUser(pageCriteria.getCriteria());
		
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 요청 작업이 처리되었습니다."), HttpStatus.OK);
	}
	
	/**
	 * 고객정보 조회
	 */
	@RequestMapping(value = "/AD1003MV_D/{custId}", method={RequestMethod.GET, RequestMethod.POST})
	public String CUS1001ML_D(Model model, 
			@PathVariable long custId) throws Exception {
		
		TbCustomer customer = new TbCustomer();
		
		//고객ID로 조회
		customer.setCustId( custId );
        TbCustomer custInfo = customerSvc.findCustomerByCustId( customer );
        
        //고객 추천인 목록
        List<ResultRcmdVo> rcmdList = customerSvc.findRcmdListByCustId( custId );
        
        //생년월일
        List<TbCommCodeVo> birthYyList = CommCodeEx.birthYyList();
        List<TbCommCodeVo> birthMmList = CommCodeEx.birthMmList();
        List<TbCommCodeVo> birthDdList = CommCodeEx.birthDdList();
        
        // 출산자녀수
        List<TbCommCodeVo> childCntList = CommCodeEx.childCntList();
        
        // 마지막 출산년도
        List<TbCommCodeVo> pcrtYearList = CommCodeEx.pcrtYearList();
        
        model.addAttribute("custInfo", custInfo);
        model.addAttribute("rcmdList", rcmdList);
        model.addAttribute("birthYyList", birthYyList);
        model.addAttribute("birthMmList", birthMmList);
        model.addAttribute("birthDdList", birthDdList);
        model.addAttribute("childCntList", childCntList);
        model.addAttribute("pcrtYearList", pcrtYearList);
        
		return "admin/AD1003MV_D :: customer-main-table";
	}
	
	/**
	 * @deprecated CustomerService 함수로 대체함.
	 * 
	 * @param pageCriteria
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/saveUser")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveUser(
			@RequestBody PageCriteria<TbCustomer> pageCriteria
	
			) throws Exception {
		Assert.hasLength(pageCriteria.getCriteria().getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(pageCriteria.getCriteria().getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(pageCriteria.getCriteria().getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(pageCriteria.getCriteria().getCustGenTpCd(), "성별을 입력하세요");
		
		// 신규고객 등록
		long orgCustId = pageCriteria.getCriteria().getCustId();
		if ( orgCustId == 0) {
			
			// //이미 등록된 핸드폰번호가 존재하는지 확인
			// int newCellNoCount = userService.countUserCellNo(pageCriteria.getCriteria());
			// if (newCellNoCount > 0) {
			// 	return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "핸드폰번호가 이미 존재합니다."), HttpStatus.OK);
			// }

			//1. 고객정보 신규등록 or 수정
			//2. 예약정보에 고객ID 수정
			long newCustId = customerSvc.saveCustomer( pageCriteria.getCriteria() );
			

			
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 고객정보가 등록되었습니다.", newCustId), HttpStatus.OK);
		}

		// 기존고객 수정
		// int cellNoCount = userService.countUserCellNoByExcludeCustId(pageCriteria.getCriteria());
		// if (cellNoCount > 0)
		// 	return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "핸드폰번호가 이미 존재합니다."), HttpStatus.OK);
		customerSvc.saveCustomer_2(pageCriteria.getCriteria());
			
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 고객정보가 수정되었습니다.", orgCustId), HttpStatus.OK);
	}
	
}
