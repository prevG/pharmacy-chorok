package com.pharm.chorok.web.main.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.domain.table.TbPpRsvtSch;
import com.pharm.chorok.domain.table.TbSurvey;
import com.pharm.chorok.web.main.repository.CustomerRepository;
import com.pharm.chorok.web.main.repository.ReservationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepo;

    // @Autowired
    // private ConsultingRepository consultingRepo;

    @Autowired
    private ReservationRepository reservationRepo;    
    
    public Map<String,Object> getUsrTotInfo(TbSurvey tbSurvey) throws Exception {
    	Map<String,Object> result = new HashMap<String, Object>();
    	
    	/*
    	List<TbSurvey> tbSurveyHist = surveyRepository.selectSurveyHist(tbSurvey);
    	customerRepository.selectUsrInfo();
    	*/
    	return result;
    }
    
	@Transactional
	public int saveCustomer(TbCustomer custInfo, TbPpRsvtSch rsvtInfo) throws Exception {
		
		int result = -1;

		Long rsvtId = rsvtInfo.getRsvtId();
		Long custId = custInfo.getCustId();
		if( custId != null && custId > 0) {
			result = customerRepo.updateTbCustomer( custInfo );

		} else {

			//신규 고객번호 생성
			Long newCustId = customerRepo.selectNewCustId();

			//고객정보저장
			custInfo.setCustId( newCustId );
			result = customerRepo.insertTbCustomer( custInfo );

			//예약테이블 고객번호 update
			if( rsvtId != null && rsvtId > 0) {
				rsvtInfo.setCustId( newCustId );
				result = reservationRepo.updateCustIdByRsvtId( rsvtInfo );
			}

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


    public List<TbCustomer> selectCustomerByUsrNmOrCellNo(TbCustomer customerParam) throws Exception {

		String cstUsrNm  = customerParam.getCustUsrNm();
		String custCellNo = customerParam.getCustCellNo();

		if( !StringUtils.hasLength(cstUsrNm) && !StringUtils.hasLength(custCellNo)) {
			return null;
		}
		return customerRepo.selectCustomerByUsrNmOrCellNo( customerParam );
	}
}


