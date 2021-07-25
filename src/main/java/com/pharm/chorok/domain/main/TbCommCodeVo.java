package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.entity.TbCommCode;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 공통코드 데이터 전송 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
public class TbCommCodeVo {

    private String grpCd;
	
    private String ditcCd;
	
    private String ditcNm;

    private String ditcNmEng;

    private String valueCd;

    private String valueCd2;

    private String cdExp;

    private String cdExpEng;

    private int vOrder;

    private String lockYn;

    private String useYn;
    
    //검색값
	private String srchKind;

	private String srchTxt;
	
	public TbCommCodeVo(TbCommCode entity) {
		TbCommCodeVo.builder()
			.grpCd(entity.getTbCommCodePk().getGrpCd())
			.ditcCd(entity.getTbCommCodePk().getDitcCd())
			.ditcNm(entity.getDitcNm())
			.ditcNm(entity.getDitcNmEng())
			.valueCd(entity.getValueCd())
			.valueCd2(entity.getValueCd2())
			.cdExp(entity.getCdExp())
			.cdExpEng(entity.getCdExpEng())
			.vOrder(entity.getSortNo())
			.lockYn(entity.getLockYn())
			.useYn(entity.getUseYn())
			.build();
	}

	public TbCommCodeVo(String grpCd, String useYn) {
		this.grpCd = grpCd;
		this.useYn = useYn;
	}
    
}
