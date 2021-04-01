package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpRsvtSch {
    
    private String id;
    private String rsvtUsrNm;
    private String rsvtCellNo;
    private String rsvtPhnNo;
    private String genTpCd;
    private String rsvtTpCd;
    private Date rsvtDt;

    private TbPpWorkTime wt;
    private TbCommCalendar cal;
}
