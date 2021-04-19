package com.pharm.chorok.api.main;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping(value = "/api/v1/main/customer")
@RestController
public class CustomerApi {

	@Autowired
	private CustomerService customerSvc;


	@PostMapping("/saveCustomer")
	public ResponseEntity<ResponseMessage> saveCustomer(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) {
		
		ResponseMessage resMsg = new ResponseMessage();
		try {
			customerSvc.saveCustomer( custInfo, rsvtInfo );

			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}
}
