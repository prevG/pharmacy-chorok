package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpDosgChart extends TbCommColumn {
    
    private Long dosgId;
    private Long cnstId;
    private Date dosgDt;
    private String dosgTpCd;
    private String callYn;
    private String dosgYn;
    private String custWgt;
    private String dosgDesc1;
    private String dosgDesc2;
}
