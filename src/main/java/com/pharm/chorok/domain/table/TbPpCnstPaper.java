package com.pharm.chorok.domain.table;

import java.util.Date;
import lombok.Data;

@Data
public class TbPpCnstPaper {
	String id;
	long cnstVer;
	long num;
	String questText;
	String examCd;
	long examCnt;
	String exam1;
	String exam2;
	String exam3;
	String exam4;
	String exam5;
	String exam6;
	String exam7;
	String exam;
	String useYn;
	String regId;
	String updId;
	Date regDttm;
	Date updDttm;
	//임시
	long custId;
}
