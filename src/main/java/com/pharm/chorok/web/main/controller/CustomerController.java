package com.pharm.chorok.web.main.controller;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.main.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping(value = "/customer")
@Controller
public class CustomerController {

    @Autowired
    private CustomerService customerSvc;

	@Autowired
	private CalendarService calendarSvc;

    //고객목록화면
	@GetMapping("/CUS1001ML")
	public String CUS1001ML(Model model) {
		return "customer/CUS1001ML";
	}


    //금일상담스케쥴
	@GetMapping("/CUS2001ML")
	public String CUS2001ML(Model model) throws Exception{

		TbCommCalendar cal = calendarSvc.selectCurrentDate();

		model.addAttribute("dosgDt", cal.getBaseDt());
		return "customer/CUS2001ML";
	}


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
}