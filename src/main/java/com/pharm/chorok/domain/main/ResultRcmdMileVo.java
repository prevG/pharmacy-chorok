package com.pharm.chorok.domain.main;

import lombok.Data;

@Data
public class ResultRcmdMileVo {

	private long custId;
	
	private String custUsrNm;
	
	private String custCellNo;
	
	private long rcmdCustId;
	
	private double rcmdMilePnt;
	
	private String rcmdMileMemo;
	
	private String rcmdMileYn;
	
}
