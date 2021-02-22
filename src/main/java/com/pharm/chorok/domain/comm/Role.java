package com.pharm.chorok.domain.comm;

public enum Role {
    ADMIN,
    MEMBER;

    private String value;
    
    public String getKey() {
    	return name();
    }
}