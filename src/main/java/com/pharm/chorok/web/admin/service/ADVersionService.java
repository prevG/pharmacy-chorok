package com.pharm.chorok.web.admin.service;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;

import com.pharm.chorok.domain.main.SMSReservationVo;
import com.pharm.chorok.domain.table.TbCommVer;
import com.pharm.chorok.domain.table.TbCustomer;
import com.pharm.chorok.web.admin.repository.ADSMSRepository;
import com.pharm.chorok.web.admin.repository.ADVersionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.minidev.json.JSONArray;
import net.minidev.json.JSONObject;

@Service
public class ADVersionService{

	@Autowired
	private ADVersionRepository versionRepository;

    public ArrayList<TbCommVer> selectVersions(TbCommVer tbCommVer) {
    	return versionRepository.selectVersions(tbCommVer);
	}
}