package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @deprecated vo 클래스로 대체함.
 * 
 * @author Jaratus
 *
 */
@Data
@NoArgsConstructor
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
	private String ditcCdNm;
	
	//html 요소에 따라 다르게 조회
	private String target;
	private String targetKind;
	//검색조건(ko:코드명,en:코드명(영문))
	private String srchKind;
	//검색값
	private String srchTxt;
	
	public TbCommCode(String grpCd, String useYn) {
		this.grpCd = grpCd;
		this.useYn = useYn;
	}
	
}
