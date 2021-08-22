package com.pharm.chorok.web.main.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.pharm.chorok.domain.main.ResultDosingVo;
import com.pharm.chorok.domain.main.TbCustomerMileVo;
import com.pharm.chorok.domain.main.TbPpCnstMileVo;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.web.main.repository.CustomerRepository;
import com.pharm.chorok.web.main.repository.ReservationRepository;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

    // @Autowired
    // private ConsultingRepository consultingRepo;

    @Autowired
    private ReservationRepository reservationRepo;   
    
    @Autowired
    private CustomerMileageService customerMileageService;
    
    @Autowired
    private ConsultingMileageService consultingMileageService;
    
    public Map<String,Object> getUsrTotInfo(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	/*
    	List<TbSurvey> tbSurveyHist = surveyRepository.selectSurveyHist(tbSurvey);
    	customerRepository.selectUsrInfo();
    	*/
    	return result;
    }
    
	@Transactional
	public long saveCustomer(TbCustomer custInfo) throws Exception {
		
		long rsvtId = custInfo.getRsvtId();

		//신규 고객번호 생성
		Long newCustId = customerRepo.selectNewCustId();

		//고객정보 저장
		custInfo.setCustId( newCustId );
		customerRepo.insertTbCustomer( custInfo );
		
		//추천인정보 저장
		TbCustomerMileVo custMileVo = custInfo.getCustMile();
		custMileVo.setCustId( newCustId );
		custMileVo.setRcmdMilePnt(20); // default 20 point
		custMileVo.setRcmdMileYn("N");
		if (custMileVo.getRcmdCustId() > 0) {
			customerMileageService.saveCustomerMile(custMileVo);
		}

		//예약테이블 고객번호 update
		if( rsvtId > 0 ) {
			TbPpRsvtSch rsvtInfo = new TbPpRsvtSch();
			rsvtInfo.setRsvtId( rsvtId );
			rsvtInfo.setCustId( newCustId );
			reservationRepo.updateCustIdByRsvtId( rsvtInfo );
		}
		return newCustId;
	}
	
    /**
     * save customer information.
     * 
     * @param custInfo
     * @return
     * @throws Exception
     */
	@Transactional
	public int saveCustomer_2(TbCustomer custInfo) throws Exception {
		int result = customerRepo.updateTbCustomer( custInfo );
		
		//기존 추천인 조회.
		TbCustomerMileVo custMileVo = customerMileageService.findByCustomerMileById(custInfo.getCustId());
		if (custMileVo != null) {
			//고객정보에서 마일리지 포인트와 사용여부는 저장 안함.
			custMileVo.setRcmdCustId(custInfo.getRcmdCustId());
			custMileVo.setRcmdCustNm(custInfo.getRcmdCustNm());
			custMileVo.setRcmdCellNo(custInfo.getRcmdCellNo());
			customerMileageService.saveCustomerMile(custMileVo);
		} else {
			custMileVo = TbCustomerMileVo.builder()
					.custId(custInfo.getCustId())
					.rcmdCustId(custInfo.getRcmdCustId())
					.rcmdCustNm(custInfo.getRcmdCustNm())
					.rcmdCellNo(custInfo.getCustCellNo())
					.build();
			custInfo.getCustMile();
			custMileVo.setRcmdMilePnt(20); // default 20 point
			custMileVo.setRcmdMileYn("N");
			customerMileageService.saveCustomerMile(custMileVo);
		}

		return result;
	}

	public TbCustomer findCustomerByCustIdOrRsvtId(TbCustomer custParam, TbPpRsvtSch rsvtParam) throws Exception {
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("custId", rsvtParam.getCustId() );
		TbCustomer custInfo = customerRepo.findCustomerByCustId( params );

		return custInfo;
	}

	/**
	 * 상담하기버튼을 클릭한 경우 예약고객정보를 가지고 고객테이블에서 기본정보 조회
	 * 신규고객일 경우 예약정보를 사용한다.
	 * 
	 * @param ModelAndView mv
	 * @param TbPpRsvtSch rsvtSch 
	 * @return
	 * @throws Exception
	 */
    public TbCustomer findCustomerByRsvtId( TbPpRsvtSch rsvtSch  ) throws Exception {


		Long rsvtId = rsvtSch.getRsvtId();

		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("rsvtId", rsvtId );

		TbCustomer custInfo = customerRepo.findCustomerByRsvtId( params );
		return custInfo;
    }
	public TbCustomer findCustomerByCustId(TbCustomer inCustomer) throws Exception {
		HashMap<String, Object> params = new HashMap<String, Object>();
		params.put("custId", inCustomer.getCustId() );
		TbCustomer custInfo = customerRepo.findCustomerByCustId( params );

		return custInfo;
	}


	public List<TbCustomer> findAllCustomer(TbCustomer inCustomer) throws Exception {
		List<TbCustomer> resultList = customerRepo.findAllCustomer(inCustomer);
		return resultList;
	}

	public List<ResultDosingVo> findCustomerByDosgDt(HashMap<String, Object> inParams ) throws Exception {
		List<ResultDosingVo> resultList = customerRepo.findCustomerByDosgDt(inParams);
		return resultList;
	}

    public List<TbCustomer> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) throws Exception {

		String cstUsrNm  = customerParam.getCustUsrNm();
		String custCellNo = customerParam.getCustCellNo();

		if( !StringUtils.hasLength(cstUsrNm) && !StringUtils.hasLength(custCellNo)) {
			return null;
		}
		return customerRepo.selectCustomerByUsrNmOrCellNo( customerParam );
	}

	public int countCustCellNo(TbCustomer tbCustomer) {
		return 0;
	}

	public int addCust(TbCustomer tbCustomer) {
		return 0;
	}

	public List<TbCustomerMileVo> findRcmdListByCustId(long custId) {
		if (custId == 0)
			return new ArrayList<TbCustomerMileVo>();
		
		return customerRepo.findRcmdListByCustId( custId );
	}

	@Transactional
	public void saveCustMileage(TbCustomer custInfo) {
		customerRepo.updateTbCustMileage( custInfo );
		//추천인 마일리지
		for (TbCustomerMileVo rcmdMileVo : custInfo.getRcmdMileList()) {
			TbCustomerMileVo custMileVo = customerMileageService.findByCustomerMileById(rcmdMileVo.getCustId());
			if (custMileVo != null) {
				custMileVo.setRcmdMilePnt(rcmdMileVo.getRcmdMilePnt());
				custMileVo.setRcmdMileMemo(rcmdMileVo.getRcmdMileMemo());
				custMileVo.setRcmdMileYn(rcmdMileVo.getRcmdMileYn());
				
				customerMileageService.saveCustomerMile(custMileVo);
			}
		}
		
		//상담결재 마일리지 
		for (TbPpCnstMileVo payMileVo : custInfo.getPayMileList()) {
			TbPpCnstMileVo cnstMileVo = consultingMileageService.findByCnstId(payMileVo.getCnstId());
			if (cnstMileVo != null) {
				cnstMileVo.setPayMilePnt(payMileVo.getPayMilePnt());
				cnstMileVo.setPayMileMemo(payMileVo.getPayMileMemo());
				cnstMileVo.setPayMileYn(payMileVo.getPayMileYn());
				
				consultingMileageService.saveCnstMile(cnstMileVo);
			}
		}
	}

	public List<TbPpCnstMileVo> findPayListByCustId(long custId) {
		if (custId == 0)
			return new ArrayList<TbPpCnstMileVo>();
		
		return customerRepo.findPayListByCustId( custId );
	}
}


