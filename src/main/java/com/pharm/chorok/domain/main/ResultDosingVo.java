package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.table.TbCommColumn;

import lombok.Data;

@Data
public class ResultDosingVo extends TbCommColumn {
    
    private int seq;
    private String seqStr;
    private Long dosgId;
    private Long cnstId;
    private String dosgDt;
    private String daysStrKor;
    private String dosgTpCd;
    private String callYn;
    private String dosgYn;
    private String pausYn;
    private String currWgt;
    private String lossWgt;
    private String rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;

    private String callYnVal;
    private String dosgYnVal;
    private String pausYnVal;

    private String custUsrNm;
    private String custCellNo;
    private String custId;
    
    private String picUsrNm;
    private String pic2UsrNm;
    private String dosgTpNm;
    private String zipCode;
    private String addr1;
    private String custGenTpNm;
    private String cnstHhCd;
    private String cnstHhNm;
    private String cnstHhMemo;
    
    
    
}
