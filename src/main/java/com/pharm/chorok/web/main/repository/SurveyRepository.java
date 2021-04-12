package com.pharm.chorok.web.main.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.domain.table.TbSurveyAns;
import com.pharm.chorok.domain.table.TbSurveyAnsExam;
import com.pharm.chorok.domain.table.TbSurveyExam;
import com.pharm.chorok.domain.table.TbSurveyQuest;
import com.pharm.chorok.domain.table.TbSurveyQuestExam;

@Mapper
@Repository
public interface SurveyRepository {
        
    public TbSurvey selectSurvey(TbSurvey tbSurvey) throws Exception;
    
    public List<TbSurveyQuestExam> getSurveyQuestionExam(TbSurvey tbSurvey) throws Exception;
    
    public TbSurveyAns selectSurveyAns(TbSurvey tbSurvey) throws Exception;
    
    public List<TbSurveyQuest> selectSurveyQuestList(TbSurvey tbSurvey) throws Exception;
    
    public List<TbSurveyExam> selectSurveyExamList(TbSurvey tbSurvey) throws Exception;
    
    public List<TbSurveyAnsExam> selectTbSurveyAnsExamList(TbSurvey tbSurvey) throws Exception;
    
}
