package com.pharm.chorok.domain.table;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class TbPpCnstChart extends TbCommColumn {
    
    private Long cnstId;
    private Long custId;
    private String cnstDt;
    private String cnstDtHh;
    private String cnstDtMm;
    private String custBirthDt;
    private String picUsrNo;
    private String delYn;
    private String presDesc;
    private String cnstDesc;
    private String payDesc;
    
    /**
     * @deprecated orgWgt 으로 데체함.
     */
    private float curWgt;
    private float tgtWgt;
    private String startDosgDt;
    
    private float orgWgt;			// 시작체중
    private String pic2UsrNo;		// 상담실장 아이디
    private String cnstHhCd;		// 상담가능시간 코드
    private String cnstHhMemo; 		// 상담가능시간 메모
    private String cateTpCd;		// 감량요요 코드
    private int cateTpVal;			// 감량요요 값
    private String dosgTpCd;		// 감량종류 코드
    private int dosgTpVal;			// 감량종류 값
    private String payTpCd;			// 결재유형 코드
    private String dlvDt;			// 택배발송일
    private String dlvDpuYn;		// 택배직접수령여부(Direct Pick Up
    
    private List<TbPpSrvChart> srvChartList; // 설문차트
}
