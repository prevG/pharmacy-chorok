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
 * 상담 마일리지 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
@Table(name = "TB_PP_CNST_MILE")
public class TbPpCnstMile {

	@Id
	@Column(name = "CNST_ID")
	private long cnstId;
	
	@Column(name = "CUST_ID")
	private long custId;
	
	@Column(name = "PAY_TP_CD")
	private String payTpCd;
	
	@Column(name = "PAY_MILE")
	private double payMile;
	
	@Column(name = "USE_YN")
	private String useYn;
	
}
