package com.pharm.chorok.web.admin.controller;

import java.util.ArrayList;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;

@RequestMapping(value = "/admin")
@Controller
public class ADUserController {

	@Autowired
	private ADUserService userService;
	
	@GetMapping("/admin")
	public ModelAndView admin() throws Exception {
		ModelAndView mv = new ModelAndView();
		mv.setViewName("/admin/admin");
		return mv;
	}
	
	
	
	@PostMapping("/getAdmin")
	@ResponseBody
	public String getAdmins( TbCommUser tbCommUser ) throws Exception {
		ArrayList<TbCommUser> tbCommUsers = userService.getAdmin(tbCommUser);
		
		JSONObject result = new JSONObject();
		
		JSONArray arr = new JSONArray();
		
		for(int i=0; i<tbCommUsers.size();i++) {
			JSONObject data = new JSONObject();
			data.put("usrNo",tbCommUsers.get(i).getUsrNo());
			data.put("usrEml",tbCommUsers.get(i).getUsrEml());
			data.put("authorities", tbCommUsers.get(i).getAuthorities());
			data.put("regUsrNo", tbCommUsers.get(i).getRegUsrNo());
			data.put("updUsrNo", tbCommUsers.get(i).getUpdUsrNo());
			data.put("dataOwnrId", tbCommUsers.get(i).getDataOwnrId());
			data.put("password", tbCommUsers.get(i).getPassword());
			data.put("userName", tbCommUsers.get(i).getUsername());
			data.put("userAuth", tbCommUsers.get(i).getUsrAuth());
			data.put("userGrade", tbCommUsers.get(i).getUsrGrade());
			data.put("usrNm", tbCommUsers.get(i).getUsrNm());
			data.put("usrPhnNo", tbCommUsers.get(i).getUsrPhnNo());
			data.put("usrPwd", tbCommUsers.get(i).getUsrPwd());
			data.put("usrAprv",tbCommUsers.get(i).getUsrAprv());
			data.put("delYn",tbCommUsers.get(i).getDelYn());
			data.put("regDt",tbCommUsers.get(i).getRegDt());
			arr.put(data);
		}
		
		result.put("total", tbCommUsers.size());
		result.put("rows", arr);
	
		return result.toString();
	}
	
	
	
	@GetMapping("/modifyAdmin")
	@ResponseBody
	public String modifyUser( Model model ) throws Exception {
		JSONObject result = new JSONObject();
		return result.toString();
	}
	
	
	@GetMapping("/removeAdmin")
	@ResponseBody
	public String removeUser( Model model ) throws Exception {
		JSONObject result = new JSONObject();
		return result.toString();
	}
	
	
	@GetMapping("/saveAdmin")
	@ResponseBody
	public String saveUser( Model model ) throws Exception {
		JSONObject result = new JSONObject();
		return result.toString();
	}
}
