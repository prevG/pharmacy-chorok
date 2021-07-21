package com.pharm.chorok.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pharm.chorok.domain.entity.TbDosgTpSms;

/**
 * TbDosgTpSms entity repository
 * 
 * @author Jaratus
 *
 */
@Repository
public interface TbDosgTpSmsRepository extends JpaRepository<TbDosgTpSms, Long> {

	public long countByDosgTpCdAndDosgSeqAndSendHhmi(String dosgTpCd, int dosgSeq, String sendHhmi);

}
