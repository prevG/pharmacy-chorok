package com.pharm.chorok.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.entity.TbPpCnstMile;

/**
 * TbPpCnstMile entity repository
 * 
 * @author Jaratus
 *
 */
@Repository
public interface TbPpCnstMileRepository extends JpaRepository<TbPpCnstMile, Long> {

}
