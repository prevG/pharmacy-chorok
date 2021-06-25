package com.pharm.chorok.web.main.controller;

import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.ChartService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;
import com.pharm.chorok.web.main.service.CustomerService;
import com.pharm.chorok.web.main.service.ReservationService;


@RequestMapping(value = "/reservation")
@Controller
public class ReservationController {

	@Autowired
	private ReservationService reservationSvc;

	@Autowired
	private CustomerService customerSvc;

	@Autowired
	private CommUserDetailsService commUserDetailsSvc;

	@Autowired
	private ChartService chartSvc;
	
	/**
	 * customerSvc 통합 필요.
	 * 
	 */
	@Autowired
	private ADUserService userService;


	/**
	 * 메인페이지의 스케쥴테이블을 재조회한다.
	 * @param reservationPagination
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/dashboard/reload", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView reloadDashboard(
			ReservationPagination reservationPagination) throws Exception {
		
		ModelAndView mv = new ModelAndView("index :: time-table");
		reservationSvc.getDashBoardReservationByDt( mv,  reservationPagination );
        return mv;
	}

	@GetMapping("/RS1001MV")
	public ModelAndView goRS1001ML(
			ReservationPagination reservationPagination,
			Model model) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV");
		reservationSvc.getReservationByDt( mv, reservationPagination );
		return mv;
	}
	
	
	@PostMapping("/RS1001PU01")
	public ModelAndView goRS1001PU01(TbPpRsvtSch rsvt) throws Exception {
		
		ModelAndView mv = new ModelAndView( "main/RS1001PU01" );

		//예약상세정보 조회
		TbPpRsvtSch rsvtSchInfo = reservationSvc.findReservationInfoByRsvtId( rsvt );

		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
		

    	mv.addObject( "schInfo", rsvtSchInfo );
        mv.addObject( "chemistList", chemistList  );
		return mv;
	}

	/**
	 * 주간예약스케쥴표에서 선택된 예약고객의 상세정보 조회
	 * 
	 * @param rsvt
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="/RS1001MV/detail", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView detail(TbPpRsvtSch rsvt) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: reservation-detail");

		//예약상세정보 조회
		TbPpRsvtSch rsvtSchInfo = reservationSvc.findReservationInfoByRsvtId( rsvt );

		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();

    	mv.addObject( "schInfo", rsvtSchInfo );
        mv.addObject( "chemistList", chemistList  );
        return mv;
	}
	
	/**
	 * 주간예약스케쥴표 새로고침
	 * 
	 * @param rsvt
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/RS1001MV/reload", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView reloadReservation(
			ReservationPagination reservationPagination) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: time-table");
		reservationSvc.getReservationByDt( mv,  reservationPagination );
        return mv;
	}




	@PostMapping("/RS1001MV/moveWeek")
	public ModelAndView getPrevWeek(
			ReservationPagination reservationPagination) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: time-table");
		reservationSvc.getReservationByMovedWeekNo( mv,  reservationPagination );
        return mv;
	}

	/**
	 * @deprecated replace RS1001PU02_2
	 * 
	 * @param custId
	 * @param rsvtId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/RS1001PU02")
	public ModelAndView goRS1001P02(
		@RequestParam("custId") String custId,
		@RequestParam("rsvtId") String rsvtId,
		Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU02");

		TbPpRsvtSch outRsvtSch = null;
		TbCustomer outCustomer = null;
		if( !StringUtils.isEmpty(custId) && !"0".equals(custId)) {
			TbCustomer customer = new TbCustomer();
			customer.setCustId( Long.valueOf(custId) );
			outCustomer = customerSvc.findCustomerByCustId( customer );
		}
		TbPpRsvtSch rsvtSch = new TbPpRsvtSch();
		rsvtSch.setRsvtId( Long.valueOf( rsvtId ));
		outRsvtSch = reservationSvc.findReservationInfoByRsvtId( rsvtSch );

		mv.addObject("rsvtInfo", outRsvtSch);
		mv.addObject("custInfo", outCustomer);
		return mv;
	}

	/**
	 * TODO 예약번호가 파라메터로 넘어오는 화면 확인 필요.
	 * 
	 * @param custId
	 * @param rsvtId
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/RS1001PU02_2")
	public ModelAndView goRS1001P02_2(
		@RequestParam("custId") String custId,
		@RequestParam("rsvtId") String rsvtId,
		Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU02_2");

		TbPpRsvtSch outRsvtSch = null;
		TbCustomer outCustomer = null;
		if( !StringUtils.isEmpty(custId) && !"0".equals(custId)) {
			TbCustomer customer = new TbCustomer();
			customer.setCustId( Long.valueOf(custId) );
			outCustomer = customerSvc.findCustomerByCustId( customer );
		}
		TbPpRsvtSch rsvtSch = new TbPpRsvtSch();
		rsvtSch.setRsvtId( Long.valueOf( rsvtId ));
		outRsvtSch = reservationSvc.findReservationInfoByRsvtId( rsvtSch );

		mv.addObject("rsvtInfo", outRsvtSch);
		mv.addObject("custInfo", outCustomer);
		return mv;
	}

	@PostMapping("/RS1001PU03")
	public ModelAndView goRS1001P03(TbPpCnstChart cnstChart, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU03 :: charts");
		chartSvc.findDosingChartByDosgId( mv, cnstChart );
        return mv;
	}

	/**
	 * @deprecated replace /RS1001PU02/saveCustomer_2
	 * 
	 * @param custParam
	 * @param rsvtParam
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/RS1001PU02/saveCustomer", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView saveCustomer(TbCustomer custParam, TbPpRsvtSch rsvtParam) throws Exception {
		
		customerSvc.saveCustomer( custParam, rsvtParam );
		TbCustomer custInfo = customerSvc.findCustomerByCustIdOrRsvtId( custParam, rsvtParam  );

		ModelAndView mv = new ModelAndView("main/RS1001PU03 :: customer-table");
		mv.addObject("custInfo", custInfo);
        return mv;
	}
	
	/**
	 * TODO 해당 함수를 호출하는 화면 확인 필요함.
	 * 
	 * @param tbCustomer
	 * @return
	 */
	@PostMapping("/RS1001PU02/saveCustomer_2")
	@ResponseBody
	public ResponseEntity<ResponseMessage> saveCustomer_2(TbCustomer custParam, TbPpRsvtSch rsvtParam) throws Exception {
		Assert.isTrue(custParam.getCustId() > 0, "고객번호가 존재하지 않습니다.");
		Assert.hasLength(custParam.getCustUsrNm(), "고객이름을 입력하세요");
		Assert.hasLength(custParam.getCustCellNo(), "핸드폰번호를 입력하세요");
		Assert.hasLength(custParam.getCustBirthDt(), "생년월일을 입력하세요");
		Assert.hasLength(custParam.getCustGenTpCd(), "성별을 입력하세요");

		int cellNoCount = userService.countUserCellNoByExcludeCustId(custParam);
		if (cellNoCount > 0)
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "핸드폰번호가 이미 존재합니다."), HttpStatus.OK);
		
		customerSvc.saveCustomer( custParam, rsvtParam );
		TbCustomer custInfo = customerSvc.findCustomerByCustIdOrRsvtId( custParam, rsvtParam );
		if (custInfo == null)
			return new ResponseEntity<ResponseMessage>(new ResponseMessage("fail", "작업 처리중에 문제가 발생했습니다."), HttpStatus.OK);
			
		return new ResponseEntity<ResponseMessage>(new ResponseMessage("success", "정상적으로 처리되었습니다."), HttpStatus.OK);
	}

	/**
	 * 상담차트번호에 해당하는 설문차트정보를 조회한다.
	 * @param chartParam
	 * @param tbPpCnstPaper
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/RS1001PU02/findChartByCnstId", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView findChartByCnstId(TbPpCnstChart chartParam, TbPpCnstPaper tbPpCnstPaper ) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001PU04 :: chart-area");
		chartSvc.findChartByCnstId( mv, chartParam, tbPpCnstPaper );
        return mv;
	}
}
