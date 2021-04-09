package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TbSurvey{
	long surveyId;
	String surveyNm;
	String surveyPpose;
	String startDttm;
	String endDttm;
	String user1Yn;
	String user2Yn;
	String useYn;
	String regId;
	Date regDttm;
	String updId;
	Date updDttm;
	String surveyAgreeText;
	String thirdPsnAgrofferDes;
}
