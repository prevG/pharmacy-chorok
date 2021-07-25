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
 * 공통코드 PK 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Embeddable
public class TbCommCodePk implements Serializable {

	private static final long serialVersionUID = 1L;

	@Column(name = "GRP_CD")
    private String grpCd;
	
	@Column(name = "DITC_CD")
    private String ditcCd;
	
}
