package com.pharm.chorok.web.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.web.main.service.UserService;

@RequestMapping(value = "/admin")
@Controller
public class ADMainController {

	@Autowired
	private UserService userService;
	
	@GetMapping("/index")
	public ModelAndView index( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		/*ArrayList<TbCommUser> usrList = userService.getUserList();
	
		
		 * Map data = new HashMap<>(); data.put("usrList", usrList );
		 * data.put("usr","곽경준"); mv.addAllObjects(data);
		 */
		mv.setViewName("/admin/index");
		
		
		return mv;
	}
	
	
	
	@GetMapping("/sms")
	public ModelAndView sms( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/sms");
		return mv;
	}
	
	
}
