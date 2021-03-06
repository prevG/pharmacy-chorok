package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbCommCode {
	private String grpCd;
	private String ditcCd;
	private String ditcNm;
	private String ditcNmEng;
	private String valueCd;
	private String valueCd2;
	private String cdExp;
	private String cdExpEng;
	private long vOrder;
	private String lockYn;
	private String useYn;
	private String regId;
	private Date regDttm;
	private String updId;
	private Date updDttm;
	
	private String ditcCdKind;
	
}
