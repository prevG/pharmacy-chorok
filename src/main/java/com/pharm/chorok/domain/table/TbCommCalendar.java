package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbCommCalendar {

    private Date baseDt;
    private String baseDtStr;
    private String daysStrEng;
    private String daysStrKor;
    private int daysNum;
    private String wkNum;
    private Date monLastDt;
    private String holidayYn;
    private String todayYn;
}
