package com.pharm.chorok.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 고객 추천인 마일리지 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
@Table(name = "TB_CUSTOMER_MILE")
public class TbCustomerMile {

	@Id
	@Column(name = "CUST_ID")
	private long custId;
	
	@Column(name = "RCMD_CUST_ID")
	private long rcmdCustId;
	
	@Column(name = "RCMD_CUST_NM")
	private String rcmdCustNm;

	@Column(name = "RCMD_CELL_NO")
	private String rcmdCellNo;

	@Column(name = "RCMD_MILE_PNT")
	private double rcmdMilePnt;

	@Column(name = "RCMD_MILE_MEMO")
	private String rcmdMileMemo;

	@Column(name = "RCMD_MILE_YN")
	private String rcmdMileYn;
	
}
