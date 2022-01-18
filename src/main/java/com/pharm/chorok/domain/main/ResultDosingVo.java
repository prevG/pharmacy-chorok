package com.pharm.chorok.domain.main;

import com.pharm.chorok.domain.table.TbCommColumn;

import lombok.Data;

@Data
public class ResultDosingVo extends TbCommColumn {
    
    private Long dosgId;
    private Long cnstId;
    private int dosgSeq;
    private String dosgSeqStr;
    private String dosgDt;
    private String daysStrKor;
    private String dosgLvCd;
    private String dosgTpCd;
    private String callYn;
    private String dosgYn;
    private String pausYn;
    private String stopYn;
    private String mealTpCd;
    private float currWgt;
    private float lossWgt;
    private float rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;
    private String smsYn;

    private String dosgLvCdNm;
    private String dosgTpCdNm;
    private String callYnNm;
    private String dosgYnNm;
    private String pausYnNm;
    private String stopYnNm;
    private String mealTpCdNm;

    private String custUsrNm;
    private String custCellNo;
    private String custId;
    private int custAge;
    
    private String picUsrNm;
    private String pic2UsrNm;
    private String cateTpNm;
    private String cateTpNmDesc;
    private String cateTpValNm;
    private String dosgTpNm;
    private String dosgTpValNm;
    private String dosgTpNmDesc;
    private String zipCode;
    private String addr1;
    private String custGenTpNm;
    private String cnstHhCd;
    private String cnstHhNm;
    private String cnstHhMemo;
    private String payTpNm;
    
    private String cnstDt;
    private String dlvDt;
    private String dlvDpuYn;
    private String nextDosgDt;
    private String prevDosgDt;
    private String holidayYn;
    
    
    
}
