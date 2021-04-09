package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TbSurveyAnsExam{
	long surveyId;
	long ansSeq;
	long questSeq;
	long examSeq;
	long examVal;
	String examAns;
	Date regDttm;
}
