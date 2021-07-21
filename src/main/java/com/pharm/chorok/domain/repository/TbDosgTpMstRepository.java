package com.pharm.chorok.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.entity.TbDosgTpMst;
import com.pharm.chorok.domain.entity.TbDosgTpMstPk;

/**
 * TbDosgTpMst entity repository
 * 
 * @author Jaratus
 *
 */
@Repository
public interface TbDosgTpMstRepository extends JpaRepository<TbDosgTpMst, TbDosgTpMstPk> {

}
