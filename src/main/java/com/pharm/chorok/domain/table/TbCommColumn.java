package com.pharm.chorok.domain.table;

import java.util.Date;

public class TbCommColumn {

	private String dataOwnrId;
	private Date regDt;
	private long regUsrNo;
	private Date updDt;
	private long updUsrNo;
	
	public String getDataOwnrId() {
		return dataOwnrId;
	}
	public void setDataOwnrId(String dataOwnrId) {
		this.dataOwnrId = dataOwnrId;
	}
	public long getRegUsrNo() {
		return regUsrNo;
	}
	public void setRegUsrNo(long regUsrNo) {
		this.regUsrNo = regUsrNo;
	}
	public long getUpdUsrNo() {
		return updUsrNo;
	}
	public void setUpdUsrNo(long updUsrNo) {
		this.updUsrNo = updUsrNo;
	}
	public Date getRegDt() {
		return regDt;
	}
	public void setRegDt(Date regDt) {
		this.regDt = regDt;
	}
	public Date getUpdDt() {
		return updDt;
	}
	public void setUpdDt(Date updDt) {
		this.updDt = updDt;
	}
}
