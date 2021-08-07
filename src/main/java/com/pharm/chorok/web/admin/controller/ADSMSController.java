package com.pharm.chorok.web.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.common.component.SMSComponent;
import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.common.service.SMSService;
import com.pharm.chorok.domain.main.TbCommCodeVo;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADCodeService;
import com.pharm.chorok.web.main.service.CommUserDetailsService;

@RequestMapping(value = "/admin")
@Controller
public class ADSMSController {
	
	@Autowired
	SMSService smsService;
	
	@Autowired
	private SMSComponent SmsComponent;
	
	@Autowired
	private CalendarService calendarSvc;
	
	@Autowired
	private CommUserDetailsService commUserDetailsSvc;
	
	@Autowired
	private ADCodeService codeService;
	
	/**
	 * @deprecated /sms_2 함수로 대체함.
	 * 
	 * @param model
	 * @return
	 * @throws Exception
	 */
	@GetMapping("/sms")
	public ModelAndView sms( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/sms");
		
		//smsService.insertSmsHist();
		
		SmsComponent.sendSms();
		return mv;
	}
	
	@GetMapping("/sms_2")
	public String sms_2(Model model) {
		
		TbCommCalendar cal = calendarSvc.selectCurrentDate();		
		//약사목록 조회
        List<TbCommUser> chemistList = commUserDetailsSvc.selectChemistList();
        //상담실장목록 조회
        List<TbCommUser> counselorList = commUserDetailsSvc.selectCounselorList();
        //통화여부 코드목록
        List<TbCommCodeVo> pausYnList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1021", "Y"));
        
		model.addAttribute("dosgDt", cal.getBaseDt());
		model.addAttribute("counselorList", counselorList);
		model.addAttribute("chemistList", chemistList);
		model.addAttribute("pausYnList", pausYnList);

		return "admin/sms_2";
	}
	
	@GetMapping("/sms_3")
	public String sms_3(Model model) {
		
        //복용유형 코드목록
        List<TbCommCodeVo> dosgTpList = codeService.selectCodesByGrpCd(new TbCommCodeVo("C1018", "Y"));
        
		model.addAttribute("dosgTpList", dosgTpList);

		return "admin/sms_3";
	}
	
}
