package com.pharm.chorok.domain.table;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class TbPpDosgChart extends TbCommColumn {
    
    private Long dosgId;
    private Long cnstId;
    private int dosgSeq;
    private Date dosgDt;
    private String dosgLvCd;
    private String callYn;
    private String pausYn;
    private String dosgYn;
    private long currWgt;
    private long lossWgt;
    private long rmiWgt;
    private String dosgDesc1;
    private String dosgDesc2;
}
