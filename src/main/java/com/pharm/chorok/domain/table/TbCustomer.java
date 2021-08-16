package com.pharm.chorok.domain.table;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

import com.pharm.chorok.domain.main.ResultRcmdMileVo;
import com.pharm.chorok.domain.main.TbCustomerMileVo;
import com.pharm.chorok.domain.main.TbPpCnstMileVo;

import lombok.Data;

@Data
public class TbCustomer extends TbCommColumn {
	private long custId;
	private String custUsrNm;
	private String custCellNo;
	private String custBirthDt;
	private String custGenTpCd;
	private int custAge;
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
	private String rcmdMilgYn;		// 추천인 마일리지 적용여부
	private String custGenTpCdNm;	// 남성/여성 
	private String mrgYnNm;			// 기혼/미혼
	private int mileage;			// 마일리지 점수(총계)
	private double payMileage;		// 현금결재 마일리지 점수
	private double rcmdMileage; 	// 추천결재 마일리지 점수
	private String mileageMemo;		// 마일리지 메모
	private int rcmdCnt;			// 추천인수
	private String custRegYear;		// 고객등록년월
	
	//검색용으로 추가
	private String cbSrch;
	private String srchTxt;
	private String cbDelYn;
	private Date startDttm;
	private Date endDttm;

	//예약정보로 고객정보 생성시
	private long rsvtId;
	
	//추천인 마일리지 목록
	private List<ResultRcmdMileVo> rcmdMileList;
	//상담결재 마일리지 목록
	private List<TbPpCnstMileVo> payMileList;
	
	//추천인 정보
	private TbCustomerMileVo custMile;
}
