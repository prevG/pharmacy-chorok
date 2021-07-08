package com.pharm.chorok.api.main;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.domain.comm.ResponseMessage;
import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.web.main.service.CustomerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
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
			//customerSvc.saveCustomer( custInfo, rsvtInfo );


			resMsg.setStatus("success");
			resMsg.setMessage("정상적으로 저장되었습니다.");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}

	@PostMapping("/findCustomer")
    public ResponseEntity<ResponseMessage> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) {
		ResponseMessage resMsg = new ResponseMessage();
		try {
			List<TbCustomer> result = customerSvc.selectCustomerByUsrNmOrCellNo( customerParam );
			
			
			resMsg.setData( result );
			resMsg.setStatus("success");
			
		} catch(Exception e) {
			resMsg.setStatus("error");
			resMsg.setMessage( e.getMessage() );
		}
		return new ResponseEntity<ResponseMessage>( resMsg, HttpStatus.OK );
	}

	/**
	 * 고객정보 마스터 목록(타뷸레이터 그리드)
	 * 
	 * @param inCustomer
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/findAllCustomer")
    public List<TbCustomer> selectAllCustomer(TbCustomer inCustomer) throws Exception {
		return customerSvc.findAllCustomer(inCustomer);
	}

	/**
	 * 금일복용상담 목록(타뷸레이터 그리드)
	 * @param inCustomer
	 * @return
	 * @throws Exception
	 */
	@PostMapping("/findCustomerByDosgDt")
    public List<ResultDosingVo> findCustomerByDosgDt(
		@RequestParam("dosgDt") String dosgDt,
		@RequestParam("picUsrNo") String picUsrNo,
		@RequestParam("pic2UsrNo") String pic2UsrNo
	) throws Exception {

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("dosgDt", dosgDt);
		params.put("picUsrNo", picUsrNo);
		params.put("pic2UsrNo", pic2UsrNo);
		return customerSvc.findCustomerByDosgDt( params );
	}
	
}
