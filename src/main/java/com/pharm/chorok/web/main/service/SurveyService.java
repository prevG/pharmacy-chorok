package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;

import com.pharm.chorok.common.service.CalendarService;
import com.pharm.chorok.domain.main.ReservationPagination;
import com.pharm.chorok.domain.table.TbCommCalendar;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbPpWorkTime;
import com.pharm.chorok.web.main.repository.SurveyRepository;
import com.pharm.chorok.web.main.repository.ReservationScheduleRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.ModelAndView;

@Service
public class SurveyService {
    

    @Autowired
    private SurveyRepository cstChtRepo;

    public ModelAndView getCstChrtList() throws Exception {
    	
    	ModelAndView mv = new ModelAndView();
	
    	return mv;
    } 


}
