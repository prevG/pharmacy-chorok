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
    private String curWgt;
    private String tgtWgt;
    private String startDosgDt;
}
