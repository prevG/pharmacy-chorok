package com.pharm.chorok.common.repository;

import java.util.List;

import com.pharm.chorok.domain.table.TbCommCalendar;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TbCommCalendarRepository {

	public TbCommCalendar selectCurrentDate() throws Exception;

	public List<TbCommCalendar> selectSameWeekDateListByDt( TbCommCalendar cal ) throws Exception;
}
