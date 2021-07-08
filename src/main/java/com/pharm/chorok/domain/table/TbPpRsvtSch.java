package com.pharm.chorok.domain.table;

import lombok.Data;

@Data
public class TbPpRsvtSch extends TbCommColumn {

    private Long rsvtId;
    private String rsvtUsrNm;
    private String rsvtCellNo;
    private String rsvtPhnNo;
    private String genTpCd;
    private String rsvtTpCd;
    private Long custId;

    
    private String rsvtDt;
    private String rsvtDtYyyymmdd;
    private String rsvtDtHh;
    private String rsvtDtMm;
    private String rsvtDesc;
    private String picUsrNo;
    private Long rcmdUsrNo;
    private String rcmdUsrNm;
    private String rcmdCellNo;

    private TbPpWorkTime wt;
    private TbCommCalendar cal;
    private String searchKeyword;
}
