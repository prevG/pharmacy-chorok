package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.entity.TbCustomerMile;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 고객 추천인 마일리지 데이터 전송 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class TbCustomerMileVo {

	private long custId;
	
	private long rcmdCustId;
	
	private String rcmdCustNm;

	private String rcmdCellNo;

	private double rcmdMilePnt;
	
	private String rcmdMileMemo;

	private String rcmdMileYn;
	
	private String custUsrNm;
	
	private String custCellNo;
	
	public TbCustomerMile toEntity() {
		return TbCustomerMile.builder()
				.custId(custId)
				.rcmdCustId(rcmdCustId)
				.rcmdCustNm(rcmdCustNm)
				.rcmdCellNo(rcmdCellNo)
				.rcmdMilePnt(rcmdMilePnt)
				.rcmdMileMemo(rcmdMileMemo)
				.rcmdMileYn(rcmdMileYn)
				.build();
	}

	public TbCustomerMileVo(TbCustomerMile entity) {
		this.custId = entity.getCustId();
		this.rcmdCustId = entity.getRcmdCustId();
		this.rcmdCustNm = entity.getRcmdCustNm();
		this.rcmdCellNo = entity.getRcmdCellNo();
		this.rcmdMilePnt = entity.getRcmdMilePnt();
		this.rcmdMileMemo = entity.getRcmdMileMemo();
		this.rcmdMileYn = entity.getRcmdMileYn();
	}
	
}
