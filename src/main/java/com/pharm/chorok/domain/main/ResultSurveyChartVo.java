package com.pharm.chorok.domain.main;
		
import com.pharm.chorok.domain.table.TbCommColumn;

import lombok.Data;

@Data
public class ResultSurveyChartVo extends TbCommColumn {
    private String id;
    
    private long cnstVer;
    private long num;
    
    private String questText;
    private String examCd;
    private long examCnt;
    private String exam1;
    private String exam2;
    private String exam3;
    private String exam4;
    private String exam5;
    private String exam6;
    private String exam7;
    private String exam;
    private String useYn; 
    private String refAttrCd;
    private String cnstPaperVal;
    private String dataType;

    private String paperHtml;
}
