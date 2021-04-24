package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpDosgChart extends TbCommColumn {
    
    private int seq;
    private Long dosgId;
    private Long cnstId;
    private Date dosgDt;
    private String dosgTpCd;
    private String callYn;
    private String dosgYn;
    private long currWgt;
    private long lossWgt;
    private long rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;
}
