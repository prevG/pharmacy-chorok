package com.pharm.chorok.domain.main;

import lombok.Data;

/**
 * 상담예약문자 발송 VO 클래스
 * 
 * @author Jaratus
 *
 */
@Data
public class SMSReservationVo {

	public Long rsvtId;
    public String rsvtCellNo;
    public String rsctUsrNo;
    public String rsvtUsrNm;
    public String rsvtDt;

    public String sndMsg;
}
