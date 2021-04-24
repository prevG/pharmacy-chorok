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
	
	public static final String USR_NO = "usrNo";
	public static final String USR_NM = "usrNm";
	public static final String USR_PHN_NO = "usrPhnNo";
	public static final String USR_EML = "usrEml";
	public static final String USR_PWD = "usrPwd";

	private static final long serialVersionUID = 1L;
	
	@NonNull
	private String usrNo;
	@NonNull
	private String usrNm;
	@NonNull
	private String usrPhnNo;

	public String getUsrNo() {
		return this.usrNo;
	}

	@NonNull
	private String usrEml;
	@NonNull
	private String usrPwd;
	private String usrGrade;
	private String usrAuth;
	private String usrAprv;
	private String delYn;
	//private String dataOwnrId;
	//private String regUsrNo;
	
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


	public void setUsrNo(String usrNo) {
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

	public String getUsrGrade() {
		return this.usrGrade;
	}

	public void setUsrGrade(String usrGrade) {
		this.usrGrade = usrGrade;
	}

	public String getUsrAuth() {
		return this.usrAuth;
	}

	public void setUsrAuth(String usrAuth) {
		this.usrAuth = usrAuth;
	}

	public String getUsrAprv() {
		return this.usrAprv;
	}

	public void setUsrAprv(String usrAprv) {
		this.usrAprv = usrAprv;
	}

	public String getDelYn() {
		return this.delYn;
	}

	public void setDelYn(String delYn) {
		this.delYn = delYn;
	}

	public String getCbSrch() {
		return this.cbSrch;
	}

	public void setCbSrch(String cbSrch) {
		this.cbSrch = cbSrch;
	}

	public String getCbAuth() {
		return this.cbAuth;
	}

	public void setCbAuth(String cbAuth) {
		this.cbAuth = cbAuth;
	}

	public String getCbAppv() {
		return this.cbAppv;
	}

	public void setCbAppv(String cbAppv) {
		this.cbAppv = cbAppv;
	}

	public String getTarget() {
		return this.target;
	}

	public void setTarget(String target) {
		this.target = target;
	}

	public String getSrchTxt() {
		return this.srchTxt;
	}

	public void setSrchTxt(String srchTxt) {
		this.srchTxt = srchTxt;
	}
}
