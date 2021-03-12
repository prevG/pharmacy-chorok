package com.pharm.chorok.web.common.service;

import java.io.IOException;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.pharm.chorok.web.common.repository.UploadFileServiceRepository;

@Service
public class UploadFileService {
	@Autowired
	UploadFileServiceRepository uploadFileRepository;

	public void storeFile(MultipartFile file, Long projectId) {
		String fileName = StringUtils.cleanPath(file.getOriginalFilename());

		/* try{
	        if(fileName.contains("..")){
	            throw new Exception("invalid path : "+fileName );
	        }

	        UploadFile uploadFile = new UploadFile(projectId, fileName, file.getContentType(), file.getBytes());

	        uploadFileRepository.save(uploadFile);
		 } catch (IOException ex){
	    	throw new Exception("Could not store file " + fileName + ". Please try again!", ex);
		 }*/
	}
}
