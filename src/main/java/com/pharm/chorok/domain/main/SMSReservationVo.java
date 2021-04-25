package com.pharm.chorok.domain.main;

import lombok.Data;

@Data
public class SMSReservationVo {
    

    public String rsvtCellNo;
    public String rsctUsrNo;
    public String rsvtUsrNm;
    public String rsvtDt;

    public String sndMsg;
}
