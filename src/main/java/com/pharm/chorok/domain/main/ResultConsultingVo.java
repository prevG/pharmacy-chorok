package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.table.TbCommColumn;

import lombok.Data;

@Data
public class ResultConsultingVo extends TbCommColumn {
    
    private int seq;
    private Long num;
    private Long cnstId;
    private Long custId;
    private String cnstDt;
    private String custBirthDt;
    private String picUsrNo;
    private String delYn;
    private String presDesc;
    private String cnstDesc;
    private String orgWgt;
    private String tgtWgt;
    private String startDosgDt;
    
    private String picUsrNoNm;			// 상담약사 이름
    private String pic2UsrNo;			// 상담실장 번호
    private String pic2UsrNoNm;			// 상담실장 이름
    private String cnstHhCd;			// 상담가능시간 코드
    private String cnstHhCdNm;			// 상담가능시간 설명
    private String cnstHhMemo; 			// 상담가능시간 메모
    private String cateTpCd;			// 감량요요 코드
    private String cateTpCdNm;			// 감량요요 설명
    private int cateTpVal; 				// 감량요요 값
    private String cateTpValNm; 		// 감량요요 값설명
    private String dosgTpCd;			// 감량종류 코드
    private String dosgTpCdNm;			// 감량종류 설명
    private int dosgTpVal;				// 감량종류 값
    private String dosgTpValNm;			// 감량종류 값설명
    private String payTpCd;				// 결재유형 코드
    private String payTpCdNm;			// 결재유형 설명
    private String dlvDt;				// 택배발송일
    
}
