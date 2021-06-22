package com.pharm.chorok.domain.table;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class TbCustomer extends TbCommColumn {
	private long custId;
	private String custUsrNm;
	private String custCellNo;
	private String custBirthDt;
	private String custGenTpCd;
	private String mrgYn;
	private Integer pcrtChdCnt;
	private String lstPcrtYear;
	private String brstFdgYn;
	private String vistTpCd;
	private String zipCode;
	private String addr1;
	private String addr2;
	private String delYn;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date regDt;
	@DateTimeFormat(pattern = "yyyy-MM-dd")
	private Date updDt;
	
	//검색용으로 추가
	private String cbSrch;
	private String srchTxt;
	private String cbDelYn;
	private Date startDttm;
	private Date endDttm;
	
}
