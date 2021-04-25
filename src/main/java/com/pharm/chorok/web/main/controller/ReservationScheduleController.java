package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpCnstChart;
import com.pharm.chorok.domain.table.TbPpCnstPaper;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.ChartService;
import com.pharm.chorok.web.main.service.CustomerService;
import com.pharm.chorok.web.main.service.ReservationScheduleService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;


@RequestMapping(value = "/reservation")
@Controller
public class ReservationScheduleController {

	@Autowired
	private ReservationScheduleService reservationSvc;

	@Autowired
	private CustomerService customerSvc;

	@Autowired
	private ChartService chartSvc;


	@RequestMapping(value = "/dashboard/refresh", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView refreshDashboard(
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
		reservationSvc.findReservationInfoByRsvtId( mv, rsvt );
		return mv;
	}

	
	@PostMapping("/RS1001MV/detail")
	public ModelAndView detail(TbPpRsvtSch rsvt) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001MV :: reservation-detail");
		reservationSvc.findReservationInfoByRsvtId( mv, rsvt );
        return mv;
	}
	
	@RequestMapping(value = "/RS1001MV/refresh", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView refresh(
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



	@PostMapping("/RS1001PU02")
	public ModelAndView goRS1001P02(TbPpRsvtSch rsvt, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU02");
		reservationSvc.findCustomerByRsvtId( mv, rsvt );
		return mv;
	}

	@PostMapping("/RS1001PU03")
	public ModelAndView goRS1001P03(TbPpCnstChart cnstChart, Model model) throws Exception {

		ModelAndView mv = new ModelAndView("main/RS1001PU03 :: charts");
		chartSvc.selectChartByDosgId( mv, cnstChart );
        return mv;
	}
		
	@RequestMapping(value = "/RS1001PU02/saveCustomer", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView saveCustomer(TbCustomer custParam, TbPpRsvtSch rsvtParam) throws Exception {
		
			
		customerSvc.saveCustomer( custParam, rsvtParam );
		TbCustomer custInfo = customerSvc.findCustomerByCustId( custParam, rsvtParam  );


		ModelAndView mv = new ModelAndView("main/RS1001PU02 :: customer-table");
		mv.addObject("custInfo", custInfo);
        return mv;
	}


	@RequestMapping(value = "/RS1001PU02/findChartByCnstId", method = {RequestMethod.GET, RequestMethod.POST})
	public ModelAndView findChartByCnstId(TbPpCnstChart chartParam, TbPpCnstPaper tbPpCnstPaper ) throws Exception {
		
		ModelAndView mv = new ModelAndView("main/RS1001PU02 :: chart-area");
		chartSvc.findChartByCnstId( mv, chartParam, tbPpCnstPaper );
        return mv;
	}
}
