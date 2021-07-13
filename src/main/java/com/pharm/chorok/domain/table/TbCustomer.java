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
	
	private String custMemo;		// 고객 메모
	private String custMemo2;		// 고객 특이사항
	private long rcmdCustId;		// 추천인 ID
	private String rcmdCustNm;		// 추천인 이름
	private String rcmdCellNo;		// 추천인 연락처
	private String custGenTpCdVal;	// 남성/여성 
	private String mrgYnVal;		// 기혼/미혼
	private int rcmdCnt;			// 추천인수
	private int mileage;			// 마일리지
	
	//검색용으로 추가
	private String cbSrch;
	private String srchTxt;
	private String cbDelYn;
	private Date startDttm;
	private Date endDttm;

	//예약정보로 고객정보 생성시
	private long rsvtId;
	
}
