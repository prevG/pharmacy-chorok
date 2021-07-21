package com.pharm.chorok.domain.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 복용유형 발송문자 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
@AllArgsConstructor(access = AccessLevel.PACKAGE)
@NoArgsConstructor(access = AccessLevel.PACKAGE)
@Entity
@Table(name = "TB_DOSG_TP_SMS")
public class TbDosgTpSms {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "SMS_ID")
	private Long smsId;
	
	@Column(name = "DOSG_TP_CD")
	private String dosgTpCd;
	
	@Column(name = "DOSG_SEQ")
	private int dosgSeq;
	
	@Column(name = "SEND_HHMI")
	private String sendHhmi;
	
	@Column(name = "SMS_TITLE")
	private String smsTitle;
	
	@Column(name = "SMS_CONTENT")
	private String smsContent;

}
