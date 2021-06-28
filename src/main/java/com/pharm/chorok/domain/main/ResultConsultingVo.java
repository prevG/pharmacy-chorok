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
}
