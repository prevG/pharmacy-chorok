package com.pharm.chorok.domain.main;

import lombok.Data;

/**
 * 복용유형 발송문자 이력 정보를 전달하는 클래스
 * 
 * ResultDosingVo 클래스 참조해서 정리 필요.
 * 
 * @author Jaratus
 *
 */
@Data
public class ResultDosgTpSmsHistVo {

    private Long dosgId;
    private Long cnstId;
    private int dosgSeq;
    private String dosgSeqStr;
    private String dosgDt;
    private String daysStrKor;
    private String dosgLvCd;
    private String callYn;
    private String dosgYn;
    private String pausYn;
    private float currWgt;
    private float lossWgt;
    private float rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;

    private String dosgLvCdVal;
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
    
    //sms
    private long dosgSmsId;
    private String sendHhmi;
    private String smsTitle;
    private String smsContent;
    
}
