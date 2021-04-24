package com.pharm.chorok.domain.table;

import lombok.Data;

@Data
public class TbCustomer extends TbCommColumn {
	private long custId;
	private String custUsrNm;
	private String custCellNo;
	private String custBirthDt;
	private String custGenTpCd;
	private String mrgYn;
	private String pcrtChdCnt;
	private String lstPcrtYear;
	private String brstFdgYn;
	private String vistTpCd;
	private String zipCode;
	private String addr1;
	private String addr2;
}
