package com.pharm.chorok.domain.main;

import lombok.Data;

@Data
public class CustomerPagination {

    private Long refRsvtId;
    private Long custId;
    private String custUsrNm;
    private String custCellNo;
    private String custBirthDt;
    private String custGenTpCd;
    private String mrgYn;
    private String pcrtChdCnt;
    private String lstPcrtYear;
    private String brstFdgYn;
    private String vistTpCd;
    private String zipCode;
    private String addr1;
    private String addr2;
}
