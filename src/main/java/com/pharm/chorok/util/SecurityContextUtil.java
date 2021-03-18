package com.pharm.chorok.util;

import org.springframework.security.core.context.SecurityContextHolder;

import com.pharm.chorok.domain.table.TbCommUser;

public class SecurityContextUtil {
	

    public static TbCommUser getAuthenticatedUser() {
		  TbCommUser comUsr = (TbCommUser)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		  return comUsr;
    }

}
