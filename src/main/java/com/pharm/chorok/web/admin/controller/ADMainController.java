package com.pharm.chorok.web.admin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping(value = "/admin")
@Controller
public class ADMainController {
	
	@GetMapping("/index")
	public ModelAndView index( Model model ) throws Exception {
		ModelAndView mv = new ModelAndView();
		/*ArrayList<TbCommUser> usrList = userService.getUserList();
	
		
		 * Map data = new HashMap<>(); data.put("usrList", usrList );
		 * data.put("usr","곽경준"); mv.addAllObjects(data);
		 */
		mv.setViewName("admin/index");
		
		
		return mv;
	}
	
	
	

	
	
}
