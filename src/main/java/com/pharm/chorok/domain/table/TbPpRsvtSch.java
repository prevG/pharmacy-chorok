package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpRsvtSch {
    
    private String id;
    private String rsvtUsrNm;
    private String rsvtPhnNo;
    private Date rsvtDt;

    private TbPpWorkTime wt;
    private TbCommCalendar cal;
}
