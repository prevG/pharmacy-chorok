package com.pharm.chorok.domain.entity;

import lombok.Builder;
import lombok.Data;

/**
 * 복용유형 엔티티 클래스
 * 
 * @author Jaratus
 *
 */
@Data
@Builder
public class TbDosgTpMst {

    private String dosgTpCd;		// 복용유형 코드
    private int dosgSeq;
    private String dosgLvCd;

}
