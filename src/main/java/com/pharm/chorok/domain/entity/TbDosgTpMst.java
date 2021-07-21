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
 * 복용유형 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
@Table(name = "TB_DOSG_TP_MST")
public class TbDosgTpMst {

	@EmbeddedId
	private TbDosgTpMstPk tbDosgTpMstPk;
	
	@Column(name = "DOSG_LV_CD")
    private String dosgLvCd;

}
