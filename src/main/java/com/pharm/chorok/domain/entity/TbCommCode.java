package com.pharm.chorok.domain.entity;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 공통코드 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
@Table(name = "TB_COMM_CODE")
public class TbCommCode {

	@EmbeddedId
	private TbCommCodePk tbCommCodePk;
	
	@Column(name = "DITC_NM")
    private String ditcNm;

	@Column(name = "DITC_NM_ENG")
    private String ditcNmEng;

	@Column(name = "VALUE_CD")
    private String valueCd;

	@Column(name = "VALUE_CD2")
    private String valueCd2;

	@Column(name = "CD_EXP")
    private String cdExp;

	@Column(name = "CD_EXP_ENG")
    private String cdExpEng;

	@Column(name = "V_ORDER")
    private int sortNo;

	@Column(name = "LOCK_YN")
    private String lockYn;

	@Column(name = "USE_YN")
    private String useYn;

}
