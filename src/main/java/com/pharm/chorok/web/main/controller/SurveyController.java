package com.pharm.chorok.web.main.controller;

import com.common.exception.CustomException;
import com.common.exception.DatabaseInsertException;
import com.common.exception.EmailCheckException;
import com.common.exception.EmptyCheckException;
import com.common.exception.ExceptionItem;
import com.common.exception.NumberCheckException;
import com.common.exception.SizeCheckException;
import com.common.util.Check;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCommUser;
import com.pharm.chorok.web.admin.service.ADUserService;
import com.pharm.chorok.web.main.service.SurveyService;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@RequestMapping(value = "/cst")
@Controller
public class SurveyController {

	@Autowired
	private SurveyService surveyService;

	// 로그인 페이지
	@GetMapping("/surveyList")
	public String login() {
		return "account/login";
	}

	

	
}
