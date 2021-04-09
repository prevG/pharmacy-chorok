package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TbSurveyExam{
	long surveyId;
	long questSeq;
	long examSeq;
	String grpExp;
	String examExp;
	String examVal;
	String etcYn;
	long vOrder;
	String useYn;
	String regId;
	Date regDttm;
	String updId;
}
