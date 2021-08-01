package com.pharm.chorok.domain.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.entity.TbCommCode;
import com.pharm.chorok.domain.entity.TbCommCodePk;

/**
 * TbCommCode entity repository
 * 
 * @author Jaratus
 *
 */
@Repository
public interface TbCommCodeRepository extends JpaRepository<TbCommCode, TbCommCodePk> {

	public List<TbCommCode> findByTbCommCodePkGrpCdAndCdExpAndValueCd2OrderBySortNo(@Param("grpCd") String grpCd, 
			@Param("cdExp") String cateTpCd,
			@Param("valueCd2") String dosgTpCd);

}
