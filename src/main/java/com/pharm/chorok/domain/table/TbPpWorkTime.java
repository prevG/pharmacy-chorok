package com.pharm.chorok.domain.table;

import java.util.Date;

import lombok.Data;

@Data
public class TbPpWorkTime {
    
    private int id;
    private int workVer;
    private Date startHm;
    private Date endHm;
    private String useYn;
}
