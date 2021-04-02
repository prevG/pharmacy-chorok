package com.pharm.chorok.domain.table;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class TbPpRsvtSch extends TbCommColumn { 
    
    private String id;
    private String rsvtUsrNm;
    private String rsvtCellNo;
    private String rsvtPhnNo;
    private String genTpCd;
    private String rsvtTpCd;
    
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm")
    private Date rsvtDt;
    
    private String rsvtDesc;
    private String picUsrNo;
    private Long rcmdUsrNo;

    private TbPpWorkTime wt;
    private TbCommCalendar cal;
}
