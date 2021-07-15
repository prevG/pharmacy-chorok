package com.pharm.chorok.web.main.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.comm.CommCodeEx;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommCode;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.admin.service.ADCodeService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;
import com.pharm.chorok.web.main.service.CustomerService;
import com.pharm.chorok.web.main.service.ReservationService;

@RequestMapping(value = "/customer")
@Controller
public class CustomerController {

    @Autowired
    private CustomerService customerSvc;

	@Autowired
	private CalendarService calendarSvc;
	
	@Autowired
	private CommUserDetailsService commUserDetailsSvc;

	@Autowired
	private ReservationService reservationSvc;
	
	@Autowired
	private ADCodeService codeService;

	/**
	 * @deprecated /CUS1001ML_2 함수로 대체함.
	 * 
	 * @param model
	 * @return
	 */
    //고객목록화면
	@GetMapping("/CUS1001ML")
	public String CUS1001ML(Model model) {
		return "customer/CUS1001ML";
	}

	/**
	 * 고객목록화면
	 * 
	 * @param model
	 * @return
	 */
	@GetMapping("/CUS1001ML_2")
	public String CUS1001ML_2(Model model) {
		
		return "customer/CUS1001ML_2";
	}

	/**
	 * 금일상담스케쥴
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/CUS2001ML")
	public String CUS2001ML(Model model) throws Exception{

		TbCommCalendar cal = calendarSvc.selectCurrentDate();		
		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        
        //통화여부 코드목록
        List<TbCommCode> pausYnList = codeService.selectAbbrCodes(new TbCommCode("C1021", "Y"));
        

		model.addAttribute("dosgDt", cal.getBaseDt());
		model.addAttribute("counselorList", counselorList);
		model.addAttribute("chemistList", chemistList);
		model.addAttribute("pausYnList", pausYnList);
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
	@GetMapping("/CUS1002MV_2/{custId}/{tabNo}")
	public String CUS1002MV_2(
        Model model,
        @PathVariable String custId,
        @PathVariable int tabNo
    ) throws Exception {
		
        TbCustomer customer = new TbCustomer();
        customer.setCustId( Long.valueOf(custId) );
		customer = customerSvc.findCustomerByCustId( customer );

		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        
        model.addAttribute("tabNo", tabNo);
        model.addAttribute("custInfo", customer);
        model.addAttribute("chemistList", chemistList);
        model.addAttribute("counselorList", counselorList);
		
		return "customer/CUS1002MV_2";
	}

	/**
	 * 고객정보 목록     - 신규등록 /수정
	 * 복용상담차트 목록  - 신규등록 /수정
	 * 주간예약스케쥴     - 상담하기
	 */
	@RequestMapping(value="/CUS1001ML_D/{custId}/{tabNo}", method={RequestMethod.GET, RequestMethod.POST})
	public String CUS1001ML_D(Model model, 
			@PathVariable long custId,
			@PathVariable int tabNo,
			@RequestParam(required = false, defaultValue = "0") long rsvtId) throws Exception {
		
        TbCustomer customer = new TbCustomer();
		TbPpRsvtSch outRsvtSch = new TbPpRsvtSch();
		
		//주간예약스케쥴에서 신규고객에 대해서 "상담하기"를 클릭한 경우
		if( rsvtId > 0 && custId == 0 ) {
			TbPpRsvtSch rsvtSch = new TbPpRsvtSch();
			rsvtSch.setRsvtId( rsvtId );
			outRsvtSch = reservationSvc.findReservationByRsvtId( rsvtSch );
		}

		//고객ID로 조회
        customer.setCustId( custId );
        TbCustomer custInfo = customerSvc.findCustomerByCustId( customer );

		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        
        //상담가능시간 코드
        List<TbCommCode> cnstHhList = codeService.selectAbbrCodes(new TbCommCode("C1019", "Y"));
        
        //복용유형 코드
        List<TbCommCode> dosgTpCdList = codeService.selectAbbrCodes(new TbCommCode("C1018", "Y"));
        
        //복용여부 코드
        List<TbCommCode> dosgYnList = codeService.selectAbbrCodes(new TbCommCode("C1017", "Y"));
        
        //상담예약 코드
        List<TbCommCode> callYnList = codeService.selectAbbrCodes(new TbCommCode("C1016", "Y"));

        //통화여부 코드
        List<TbCommCode> pausYnList = codeService.selectAbbrCodes(new TbCommCode("C1021", "Y"));
        
        //결재유형 코드
        List<TbCommCode> payTpCdList = codeService.selectAbbrCodes(new TbCommCode("C1022", "Y"));
        
        //생년월일
        List<TbCommCode> birthYyList = CommCodeEx.birthYyList();
        List<TbCommCode> birthMmList = CommCodeEx.birthMmList();
        List<TbCommCode> birthDdList = CommCodeEx.birthDdList();
        
        // 출산자녀수
        List<TbCommCode> childCntList = CommCodeEx.childCntList();
        
        // 마지막 출산년도
        List<TbCommCode> pcrtYearList = CommCodeEx.pcrtYearList();

        model.addAttribute("tabNo", tabNo);
        model.addAttribute("rsvtInfo", outRsvtSch);
        model.addAttribute("custInfo", custInfo);
        model.addAttribute("chemistList", chemistList);
        model.addAttribute("counselorList", counselorList);
        model.addAttribute("cnstHhList", cnstHhList);
        model.addAttribute("dosgTpCdList", dosgTpCdList);
        model.addAttribute("dosgYnList", dosgYnList);
        model.addAttribute("callYnList", callYnList);
        model.addAttribute("pausYnList", pausYnList);
        model.addAttribute("payTpCdList", payTpCdList);
        model.addAttribute("birthYyList", birthYyList);
        model.addAttribute("birthMmList", birthMmList);
        model.addAttribute("birthDdList", birthDdList);
        model.addAttribute("childCntList", childCntList);
        model.addAttribute("pcrtYearList", pcrtYearList);

        return "main/RS1001PU02_2 :: customer-main-table";
	}
	
}