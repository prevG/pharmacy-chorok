package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.entity.TbPpCnstMile;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 상담 마일리지 데이터 전송 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class TbPpCnstMileVo {

	private long cnstId;
	
	private String cnstDt;
	
	private long custId;
	
	private String payTpCd;
	
	private String payTpCdNm;
	
	private double payMilePnt;
	
	private String payMileMemo;
	
	private String payMileYn;
	
	public TbPpCnstMile toEntity() {
		return TbPpCnstMile.builder()
				.cnstId(cnstId)
				.custId(custId)
				.payTpCd(payTpCd)
				.payMilePnt(payMilePnt)
				.payMileMemo(payMileMemo)
				.payMileYn(payMileYn)
				.build();
	}

	public TbPpCnstMileVo(TbPpCnstMile entity) {
		this.cnstId = entity.getCnstId();
		this.custId = entity.getCustId();
		this.payTpCd = entity.getPayTpCd();
		this.payMilePnt = entity.getPayMilePnt();
		this.payMileMemo = entity.getPayMileMemo();
		this.payMileYn = entity.getPayMileYn();
	}
	
}
