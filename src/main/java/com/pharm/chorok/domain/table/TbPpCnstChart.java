package com.pharm.chorok.domain.table;

import java.util.Date;

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
    private String curWgt;
    private String tgtWgt;
    private String startDosgDt;
}