package com.pharm.chorok.domain.table;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


public class TbCommUser extends TbCommColumn implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private long   usrNo;	
	private String usrNm;
	private String usrPhnNo;
	private String usrEml;
	private String usrPwd;
	private String usrGrade;
	private String usrAuth;
	
	//화면에서 쓸거임..
	private String cb_srch;
	private String cb_auth;
	private String cb_appv;
	private String target;
	private String srchTxt;
	

	public TbCommUser() {
	}

	public TbCommUser(long usrNo, String usrNm, String usrPhnNo, String usrEml, String usrPwd) {
		this.usrNo = usrNo;
		this.usrNm = usrNm;
		this.usrPhnNo = usrPhnNo;
		this.usrEml = usrEml;
		this.usrPwd = usrPwd;
	}
	
	

	public String getCb_srch() {
		return cb_srch;
	}

	public void setCb_srch(String cb_srch) {
		this.cb_srch = cb_srch;
	}

	public String getCb_auth() {
		return cb_auth;
	}

	public void setCb_auth(String cb_auth) {
		this.cb_auth = cb_auth;
	}

	public String getCb_appv() {
		return cb_appv;
	}

	public void setCb_appv(String cb_appv) {
		this.cb_appv = cb_appv;
	}

	public String getTarget() {
		return target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getSrchTxt() {
		return srchTxt;
	}

	public void setSrchTxt(String srchTxt) {
		this.srchTxt = srchTxt;
	}

	public String getUsrGrade() {
		return usrGrade;
	}

	public void setUsrGrade(String usrGrade) {
		this.usrGrade = usrGrade;
	}

	public String getUsrAuth() {
		return usrAuth;
	}

	public void setUsrAuth(String usrAuth) {
		this.usrAuth = usrAuth;
	}

	public long getUsrNo() {
		return this.usrNo;
	}

	public void setUsrNo(long usrNo) {
		this.usrNo = usrNo;
	}

	public String getUsrNm() {
		return this.usrNm;
	}

	public void setUsrNm(String usrNm) {
		this.usrNm = usrNm;
	}

	public String getUsrPhnNo() {
		return this.usrPhnNo;
	}

	public void setUsrPhnNo(String usrPhnNo) {
		this.usrPhnNo = usrPhnNo;
	}

	public String getUsrEml() {
		return this.usrEml;
	}

	public void setUsrEml(String usrEml) {
		this.usrEml = usrEml;
	}

	public String getUsrPwd() {
		return this.usrPwd;
	}

	public void setUsrPwd(String usrPwd) {
		this.usrPwd = usrPwd;
	}

	public TbCommUser usrNo(long usrNo) {
		setUsrNo(usrNo);
		return this;
	}

	public TbCommUser usrNm(String usrNm) {
		setUsrNm(usrNm);
		return this;
	}

	public TbCommUser usrPhnNo(String usrPhnNo) {
		setUsrPhnNo(usrPhnNo);
		return this;
	}

	public TbCommUser usrEml(String usrEml) {
		setUsrEml(usrEml);
		return this;
	}

	public TbCommUser usrPwd(String usrPwd) {
		setUsrPwd(usrPwd);
		return this;
	}


	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.usrPwd;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return this.usrEml;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return false;
	}
}
