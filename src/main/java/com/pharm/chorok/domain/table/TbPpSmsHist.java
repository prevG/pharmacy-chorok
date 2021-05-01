package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpSmsHist {
	long idx;
	String sndGrpKey;
	String rstCd;
	String rstMsg;
	String rcpNo;
	String rcpRstCd;
	String rcpRstMsg;
	String sndNo;
	Date reg_dt;
}
