package com.pharm.chorok.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
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

}
