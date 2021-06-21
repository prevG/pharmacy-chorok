package com.pharm.chorok.common.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ExcelDownloadController{
	@GetMapping(path="/download/sample", produces = "application/vnd.ms-excel") 
	public String downloadExcel() { 
		return "sampleXls";
	}
}
