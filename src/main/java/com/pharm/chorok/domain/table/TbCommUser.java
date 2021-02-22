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
	
	public long getUsrNo() {
		return usrNo;
	}
	public void setUsrNo(long usrNo) {
		this.usrNo = usrNo;
	}
	public String getUsrNm() {
		return usrNm;
	}
	public void setUsrNm(String usrNm) {
		this.usrNm = usrNm;
	}
	public String getUsrPhnNo() {
		return usrPhnNo;
	}
	public void setUsrPhnNo(String usrPhnNo) {
		this.usrPhnNo = usrPhnNo;
	}
	public String getUsrEml() {
		return usrEml;
	}
	public void setUsrEml(String usrEml) {
		this.usrEml = usrEml;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return this.usrPhnNo;
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
