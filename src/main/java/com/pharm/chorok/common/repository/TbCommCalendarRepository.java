package com.pharm.chorok.common.repository;

import com.pharm.chorok.domain.table.TbCommCalendar;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface TbCommCalendarRepository {

	public TbCommCalendar selectCurrentDate() throws DataAccessException;
}
