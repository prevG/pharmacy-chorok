package com.pharm.chorok.web.main.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.domain.table.TbSurveyAns;
import com.pharm.chorok.domain.table.TbSurveyAnsExam;
import com.pharm.chorok.domain.table.TbSurveyExam;
import com.pharm.chorok.domain.table.TbSurveyQuest;

@Mapper
@Repository
public interface SurveyRepository {
        
    public TbSurvey selectSurvey() throws Exception;
    
    public TbSurveyAns selectSurveyAns() throws Exception;
    
    public List<TbSurveyQuest> selectSurveyQuestList() throws Exception;
    
    public List<TbSurveyExam> selectSurveyExamList() throws Exception;
    
    public List<TbSurveyAnsExam> selectTbSurveyAnsExamList() throws Exception;
    
}
