package com.pharm.chorok.domain.main;

import lombok.Data;

@Data
public class ResultRcmdVo {

	private long custId;
	
	private String custUsrNm;
	
	private String custCellNo;
	
	private long rcmdCustId;
	
	private String rcmdMilgYn;
	
}
