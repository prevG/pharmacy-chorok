package com.pharm.chorok.domain.main;

import java.util.Date;

import lombok.Data;

@Data
public class ResultSrvVo {
	private Long srvId;
    private Long cnstId;
    private String srvDt;
    private String cnstPaperId;
    private long cnstPaperVer;
    private long cnstPaperNum;
    private String cnstPaperVal;
    private Date regDt;
    private long regUsrNo;
    private Date updDt;
    private long updUsrNo;
}
