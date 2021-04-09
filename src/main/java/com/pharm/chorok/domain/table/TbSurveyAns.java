package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class TbSurveyAns{
	long surveyId;
	long ansSeq;
	String userCd;
	String ansCd;
	String ansNm;
	String andTel;
	String ansEmail;
	String ansSex;
	String ansAgeCd;
	String ansJobCd;
	String agreeYn;
	Date agreeDttm;
	Date regDttm;
}
