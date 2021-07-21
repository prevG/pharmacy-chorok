package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.entity.TbDosgTpMst;
import com.pharm.chorok.domain.entity.TbDosgTpMstPk;
import com.pharm.chorok.domain.entity.TbDosgTpSms;

import lombok.Data;

/**
 * 복용유형 마스터 데이터 전송 클래스
 * 
 * @author Jaratus
 *
 */
@Data
public class DosgTpSmsVo {
	
	private long smsId;				// 복용문자 번호
    private String dosgTpCd;		// 복용유형 코드
    private int dosgSeq;
    private String sendHhmi;
    private String smsTitle;
    private String smsContent;
    private String dosgLvCd;
    
    private String dosgTpCdNm;
    private String dosgLvCdNm;
    
    public TbDosgTpSms toEntity() {
    	return TbDosgTpSms.builder()
    			.smsId(smsId == 0 ? null : smsId)
    			.dosgTpCd(dosgTpCd)
    			.dosgSeq(dosgSeq)
    			.sendHhmi(sendHhmi)
    			.smsTitle(smsTitle)
    			.smsContent(smsContent)
    			.build();
    }
    
    public TbDosgTpMst toMstEntity() {
		return TbDosgTpMst.builder()
				.tbDosgTpMstPk(TbDosgTpMstPk.builder()
						.dosgTpCd(dosgTpCd)
						.dosgSeq(dosgSeq)
						.build())
    			.dosgLvCd(dosgLvCd)
    			.build();
    }
    
}
