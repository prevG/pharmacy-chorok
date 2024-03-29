package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TbSurveyQuest{
	long surveyId;
	long questSeq;
	String grpExp;
	String questNo;
	String questNm;
	String examCd;
	long maxDupCnt;
	String useYn;
	String regId;
	Date regDttm;
	String updId;
	Date updDttm;
	
}
