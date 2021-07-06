package com.pharm.chorok.web.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;
import com.pharm.chorok.web.main.service.CustomerService;

@RequestMapping(value = "/customer")
@Controller
public class CustomerController {

    @Autowired
    private CustomerService customerSvc;

	@Autowired
	private CalendarService calendarSvc;
	
	@Autowired
	private ADUserService userService;
	
	@Autowired
	private CommUserDetailsService commUserDetailsSvc;

    //고객목록화면
	@GetMapping("/CUS1001ML")
	public String CUS1001ML(Model model) {
		return "customer/CUS1001ML";
	}

    //고객목록화면
	@GetMapping("/CUS1001ML_2")
	public String CUS1001ML_2(Model model) {
		return "customer/CUS1001ML_2";
	}

    //금일상담스케쥴
	@GetMapping("/CUS2001ML")
	public String CUS2001ML(Model model) throws Exception{

		TbCommCalendar cal = calendarSvc.selectCurrentDate();		
		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        

		model.addAttribute("dosgDt", cal.getBaseDt());
		model.addAttribute("counselorList", counselorList);
		model.addAttribute("chemistList", chemistList);
		return "customer/CUS2001ML";
	}

	/**
	 * @deprecated replace CUS1002MV_2
	 * 
	 * @param model
	 * @param custId
	 * @return
	 * @throws Exception
	 */
    //고객목록화면
	@GetMapping("/CUS1002MV/{custId}")
	public String CUS1002MV(
        Model model,
        @PathVariable String custId
    ) throws Exception {

        TbCustomer customer = new TbCustomer();
        customer.setCustId( Long.valueOf(custId) );
		customer = customerSvc.findCustomerByCustId( customer );

        model.addAttribute("custInfo", customer);
		return "customer/CUS1002MV";
	}
	
	/**
	 * replace /CUS1002MV/{custId}
	 * 
	 * TODO 해당 함수를 호출하는 화면 확인 필요.
	 *      1. 고객정보
	 *      2. 복용삼담스케줄
	 *      3. 주간예약스케줄 ...
	 * 
	 * @param model
	 * @param custId
	 * @return
	 * @throws Exception
	 */
    //고객목록화면
	@GetMapping("/CUS1002MV_2/{custId}")
	public String CUS1002MV_2(
        Model model,
        @PathVariable String custId
    ) throws Exception {

        TbCustomer customer = new TbCustomer();
        customer.setCustId( Long.valueOf(custId) );
		customer = customerSvc.findCustomerByCustId( customer );

		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        
        model.addAttribute("custInfo", customer);
        model.addAttribute("chemistList", chemistList);
        model.addAttribute("counselorList", counselorList);
		
		return "customer/CUS1002MV_2";
	}
	
	@PostMapping("/add")
	public ResponseEntity<ResponseMessage> addCustomer(TbCustomer tbCustomer) {
		Assert.hasLength(tbCustomer.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(tbCustomer.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(tbCustomer.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(tbCustomer.getCustGenTpCd(), "성별을 입력하세요");

		ResponseMessage resMsg = new ResponseMessage();
		int cellNoCount = userService.countUserCellNo(tbCustomer);
		if (cellNoCount > 0) {
			resMsg.setStatus("fail");
			resMsg.setMessage("핸드폰번호가 이미 존재합니다.");
			
			return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.OK);
		}
		
		int ret = userService.addUser(tbCustomer);
		if (ret > 0) {
			resMsg.setStatus("success");
			resMsg.setMessage("작업성공하였습니다.");
		} else {
			resMsg.setStatus("fail");
			resMsg.setMessage("작업실패했습니다.");
		}
		
		return new ResponseEntity<ResponseMessage>(resMsg, HttpStatus.OK);
	}
}