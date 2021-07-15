package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.table.TbCommColumn;

import lombok.Data;

@Data
public class ResultConsultingVo extends TbCommColumn {
    
    private int seq;
    private Long cnstId;
    private Long custId;
    private String cnstDt;
    private String custBirthDt;
    private String picUsrNo;
    private String delYn;
    private String cnstDesc;
    private String orgWgt;
    private String tgtWgt;
    private String startDosgDt;
    
    private String picUsrNoVal;			// 상담약사 이름
    private String pic2UsrNo;			// 상담실장 번호
    private String pic2UsrNoVal;		// 상담실장 이름
    private String cnstHhCd;			// 상담가능시간 코드
    private String cnstHhVal;			// 상담가능시간 설명
    private String cnstHhMemo; 			// 상담가능시간 메모
    private String dosgTpCd;			// 복용유형 코드
    private String dosgTpCdVal;			// 복용유형 설명
    private String payTpCd;				// 결재유형 코드
    private String payTpCdVal;			// 결재유형 설명
    private String dlvDt;				// 택배발송일
    
}
