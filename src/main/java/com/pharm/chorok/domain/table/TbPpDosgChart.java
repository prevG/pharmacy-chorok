package com.pharm.chorok.domain.table;

import lombok.Data;

@Data
public class TbPpDosgChart extends TbCommColumn {
    
    private Long dosgId;
    private Long cnstId;
    private int dosgSeq;

    private String dosgDt;
    
    private String dosgLvCd;
    private String callYn;
    private String pausYn;
    private String dosgYn;
    private String mealTpCd;
    private float currWgt;
    private float lossWgt;
    private float rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;
}
