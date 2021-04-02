package com.pharm.chorok.domain.table;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;

@Data
@NoArgsConstructor
public class TbCommUser extends TbCommColumn implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private long   usrNo;
	@NonNull
	private String usrNm;
	@NonNull
	private String usrPhnNo;
	@NonNull
	private String usrEml;
	@NonNull
	private String usrPwd;
	private String usrGrade;
	private String usrAuth;
	
	//화면에서 쓸거임..
	private String cbSrch;
	private String cbAuth;
	private String cbAppv;
	private String target;
	private String srchTxt;
	

	/*
	 * public TbCommUser() { }
	 */

	/*
	public TbCommUser(long usrNo, String usrNm, String usrPhnNo, String usrEml, String usrPwd) {
		this.usrNo = usrNo;
		this.usrNm = usrNm;
		this.usrPhnNo = usrPhnNo;
		this.usrEml = usrEml;
		this.usrPwd = usrPwd;
	}
	*/
	


	
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
