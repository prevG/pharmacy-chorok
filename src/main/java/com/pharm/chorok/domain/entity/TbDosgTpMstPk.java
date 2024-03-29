package com.pharm.chorok.domain.entity;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 복용차트 마스터 PK 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Embeddable
public class TbDosgTpMstPk implements Serializable {
	
	private static final long serialVersionUID = 1L;

	@Column(name = "DOSG_TP_CD")
    private String dosgTpCd;		// 복용유형 코드
	
	@Column(name = "DOSG_SEQ")
    private int dosgSeq;
	
}
