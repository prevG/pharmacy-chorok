package com.pharm.chorok.domain.table;

import java.util.Date;
import java.util.List;

import lombok.Data;

@Data
public class TbPpCnstChart extends TbCommColumn {
    
    private Long cnstId;
    private Long custId;
    private Date cnstDt;
    private String custBirthDt;
    private String picUsrNo;
    private String delYn;
    private String cnstDesc;
    
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
    private String dosgTpCd;		// 복용유형 코드
    
    private List<TbPpSrvChart> srvChartList; // 설문차트
}
