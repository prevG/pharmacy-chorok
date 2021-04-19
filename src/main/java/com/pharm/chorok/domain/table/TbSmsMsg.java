package com.pharm.chorok.domain.table;
import java.util.Date;
import lombok.Data;
import lombok.NonNull;


@Data
public class TbSmsMsg {
	@NonNull
	long smsVer;
	@NonNull
	String smsGrpType;
	@NonNull
	String smsType;
	String smsTitle;
	String smsContent;
	String smsUseType;
	String smsPeriod;
	String useYn;
	String regId;
	Date regDttm;
	String updId;
	Date updDttm;
	
	
}
