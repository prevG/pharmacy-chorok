$( document ).ready( function() {
	
	/**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
	//성별
	$(document).off("change", "input[name=custGenTpCd]").on("change", "input[name=custGenTpCd]", function(e){
		
		if($(this).prop('checked')){
     		$('input[name="custGenTpCd"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
   	});
	//결혼유무
	$(document).off("change", "input[name=mrgYn]").on("change", "input[name=mrgYn]", function(e){
		
		if($(this).prop('checked')){
     		$('input[name="mrgYn"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
	});
	//모유수유여부
	$(document).off("change", "input[name=brstFdgYn]").on("change", "input[name=brstFdgYn]", function(e){
		
		if($(this).prop('checked')){
     		$('input[name="brstFdgYn"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
	});
	//내원경로
	$(document).off("change", "input[name=vistTpCd]").on("change", "input[name=vistTpCd]", function(e){
		
		if($(this).prop('checked')){
     		$('input[name="vistTpCd"]').prop('checked',false);
     		$(this).prop('checked',true);
    	}
   	});

	//주소찾기
	$(document).off("click", "BUTTON[name=btnZipCode]").on("click", "BUTTON[name=btnZipCode]", function(e){
		e.preventDefault();

		sample2_execDaumPostcode();
   	});
	
    /**************************************************************
     * 고객정보 저장
     **************************************************************/
	$(document).off("click", "button[name='btnSaveCustomer']").on("click", "button[name='btnSaveCustomer']", function (e) {
		if( !confirm("고객정보를 저장하시겠습니까?")) {
			return false;
		}

        var url = "/reservation/RS1001PU02/saveCustomer";
        var params = $("form[name=saveCustForm]").serialize();
        $("#customer-table").load( url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
				alert("고객정보가 정상적으로 저장 되었습니다.")
                $("#customer-table").html(response);

				//고객정보가 생성된 후에 차트생성가능하도록 한다.
				$("#tab-charts").css("display", "block");
            } else {
                console.log(response, status, xhr);
            }
        });
	});
	

    /**************************************************************
     * 설문차트 저장버튼 클릭시
     **************************************************************/
	$(document).off("click", "button[name='bntSaveCnstChart']").on("click", "button[name='bntSaveCnstChart']", function (e) {
		saveSurveyChart( e );
		saveDosingChart( e );
	});	

	/**************************************************************
     * '차트생성" 클릭시
     **************************************************************/
	$(document).off("click", "button[name='btnNewChart']").on("click", "button[name='btnNewChart']", function (e) {
		createChart();
	});

	/**************************************************************
     * "복용차트생성" 클릭시
     **************************************************************/
	 $(document).off("click", "button[name='btnDosgChart']").on("click", "button[name='btnDosgChart']", function (e) {
		createDosingChart();
	 });
});

/*************************************************
 * 고객정보 저장 - 2
 **************************************************/
function saveCust() {
	var param = {
		custId : $('#saveCustForm input[name=dlg_custId]').val(),
		custUsrNm : $('#saveCustForm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
		custCellNo : $('#saveCustForm input[textboxName=dlg_custCellNo]').textbox('getValue'),
		custBirthDt : $('#saveCustForm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
		custGenTpCd : $('#saveCustForm input[name=dlg_custGenTpCd]:checked').val(),
		mrgYn : $('#saveCustForm input[name=dlg_mrgYn]:checked').val(),
		pcrtChdCnt : $('#saveCustForm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
		lstPcrtYear : $('#saveCustForm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
		brstFdgYn : $('#saveCustForm input[name=dlg_brstFdgYn]:checked').val(),
		vistTpCd : $('#saveCustForm input[name=dlg_vistTpCd]:checked').val(),
		zipCode : $('#saveCustForm input[textboxName=dlg_zipCode]').textbox('getValue'),
		addr1 : $('#saveCustForm input[textboxName=dlg_addr1]').textbox('getValue'),
		addr2 : $('#saveCustForm input[textboxName=dlg_addr2]').textbox('getValue'),
		delYn : 'N'
	};
	$.post('/reservation/RS1001PU02/saveCustomer_2', param, function(result) {
		if (result.success === 'success') {
			$.messager.show({ title: 'Success', msg: result.message });
			fnSearch();
		} else {
			$.messager.show({ title: 'Error', msg: result.message });
			return;
		}
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

function setDataOnSrvChart(data){
	alert("setDataOnSrvChart");
}


/*************************************************
 * 차트생성 (차트마스터/설문차트)
 **************************************************/
function createChart() {
	var params = $("form[name=saveCustForm]").serialize();
	$.ajax({
		type : 'post',
		url  : '/api/v1/main/chart/createChart',
		data : params,
		success : function( result ) {

			if( result.status == "success" ) {
				alert( result.message );
				reloadTabulator( table01 );
			} else {
				alert( result.errorMessage );
			}
		}
	});
}


/*************************************************
 * 복용차트 생성
 **************************************************/
 function createDosingChart() {
	var selectedCnstId = $("#selectedCnstId").val();
	var startDosgDt    = $("#startDosgDt").val();
	if( selectedCnstId == "" ) {
		alert( "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	if( startDosgDt == "" ) {
		alert( "복용시작일자를 입력 후 [복용차트생성] 버튼을 클릭 해주세요.\n복용시작일자 하루전부터 스케쥴이 자동생성됩니다.");
		return false;
	}
	var params = {
		"cnstId" 	  : selectedCnstId,
		"startDosgDt" : startDosgDt	
	};

	$.ajax({
		type : 'post',
		url  : '/api/v1/main/chart/createDosingChart',
		data : params,
		success : function( result ) {

			if( result.status == "success" ) {
				alert( result.message );
				reloadTabulator( table02 );
			} else {
				alert( result.errorMessage );
			}
		}
	});
}
/*************************************************
 * 차트삭제 (차트마스터/설문차트/복용차트)
 **************************************************/
 function deleteChart(e, cell) {
	var row = cell.getRow();
	var cnstId = row.getCell("cnstId").getValue();

	deleteChartByCnstId( cnstId );
}

function deleteChartByCnstId( cnstId ) {
	if( confirm("삭제하시겠습니까?") ) {
		var cnstId = cell.getRow().getCell("cnstId").getValue();
		var params = {
			"cnstId" : cnstId
		};
		$.ajax({
			type : 'post',
			url  : '/api/v1/main/chart/deleteChart',
			data : params,
			success : function( result ) {
	
				if( result.status == "success" ) {
					alert( result.message );
					reloadTabulator( table01 );
				} else {
					alert( result.errorMessage );
				}
			}
		});
	}
}


/*************************************************
 * 차트목록에서 '차트보기' 버튼 클릭시 - 설문차트/복용차트 조회
 **************************************************/
function loadChart( e, cell ) {

	var row    = cell.getRow();
	var cnstId = row.getCell("cnstId").getValue();
	
	$("#selectedCnstId").val( cnstId );
	loadChartByCnstId();
}

function loadChartByCnstId() {

	var params = {
		"cnstId" : $("#selectedCnstId").val()
	};
	var url = "/reservation/RS1001PU02/findChartByCnstId";
	$("#chart-area").load( url, params, function (response, status, xhr) {

		if (200 == xhr.status) {
			$("#chart-area").html(response);
		} else {
			console.log(response, status, xhr);
			alert("관리자에게 문의하세요 : loadChart");
		}
	});
}

/*************************************************
 * 차트번호에 해당하는 복용차트 조회
 **************************************************/
function callDosingChart( row ) {

	var cnstDt = row.getCell("cnstDt").getValue();
	var orgWgt = row.getCell("orgWgt").getValue();
	var tgtWgt = row.getCell("tgtWgt").getValue();
	$("#cnstDt").text( cnstDt );
	$("#orgWgt").val( orgWgt );
	$("#tgtWgt").val( tgtWgt) ;


	var params = {
		"cnstId" : row.getCell("cnstId").getValue()
	};
	$.ajax({
		type : 'post',
		url  : '/api/v1/main/dosing/selectDosingChartByDosgId',
		data : params,
		success : function( result ) {

			if( result.status == "success" ) {
				table02.setData( result.data );
			} else {
				alert( result.errorMessage );
			}
		}
	});
}

/*************************************************
 * 차트목록 Row 클릭시 - 차트번호에 해당하는 설문차트 조회
 **************************************************/
function callSrvChart(row){
	
	var params = {
		"cnstId" : row.getCell("cnstId").getValue()
	};
	$.ajax({
		type : 'post',
		url  : '/api/v1/main/survey/selectSurveyChartByCnstId',
		data : params,
		success : function( result ) {

			if( result.status == "success" ) {
				
				var data = result.data;
				
				for(var i=0; i<data.length; i++){
					var examCd = data[i].examCd;
					var examCnt = data[i].examCnt;
					var cnstPaperVal = data[i].cnstPaperVal;
					var id = data[i].id;
					
					
					if(examCd == "TEXT"){
						$("input[type='text'][name='"+id+"']").val(cnstPaperVal);
					}else if(examCd == "RADIO"){
						$("input:radio[name='"+id+"']:input[value='"+cnstPaperVal+"']").attr("checked", true);
					}						
				}
				
				
			} else {
				alert( result.errorMessage );
			}
		}
	});
	
}

/*************************************************
 * 설문차트 저장버튼 클릭시 - 설문내용을 저장한다.
 **************************************************/
 function saveSurveyChart( e ){
	var len = $("#surveyTbl tbody tr").length;
	var cnstId = $("#selectedCnstId").val();
	var params = [];

	for(var i=0; i<len; i++){
		var cnstPaperId = "";
		var cnstPaperVer = "";
		var cnstPaperNum = "";
		var cnstPaperVal = "";
		
		var elKind = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).attr("data-el");
		
		if(elKind == "TEXT"){
			cnstPaperId = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='text']").attr("name");
			cnstPaperVer = cnstPaperId.split("_")[0];
			cnstPaperNum = cnstPaperId.split("_")[1];
			cnstPaperVal = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='text']").val();
			
		}else if(elKind == "RADIO"){
			cnstPaperId = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='radio']").attr("name");
			cnstPaperVer = cnstPaperId.split("_")[0];
			cnstPaperNum = cnstPaperId.split("_")[1];
			cnstPaperVal = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='radio']:checked").val();

		}else if(elKind == "CHECK"){
			cnstPaperId = $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='checkbox']").attr("name");
			cnstPaperVer = cnstPaperId.split("_")[0];
			cnstPaperNum = cnstPaperId.split("_")[1];
			
			var c = 0; 
			for ( var j = 0; j < $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='checkbox']").length; j++) { 
				if ($("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='checkbox']")[j].checked == true ) { 
					if (c > 0) cnstPaperVal = cnstPaperVal + "," ; 
					cnstPaperVal = cnstPaperVal + $("#surveyTbl tbody tr").eq(i).find("td").eq(1).find("input[type='checkbox']")[j].value; 
					c++; 
				} 
			}
		}
		
		params.push({
			"cnstId":cnstId,
			"cnstPaperId":cnstPaperId,
			"cnstPaperVer":cnstPaperVer,
			"cnstPaperNum":cnstPaperNum,
			"cnstPaperVal":cnstPaperVal
		});
	}


	$.ajax({
		type: 'post',
		url: '/api/v1/main/survey/saveSrvChart',
		data: {
			"jsonData":JSON.stringify(params)	
		},
		success: function (result) {

			if (result.status == "success") {
				alert(result.message);
			} else {
				alert(result.errorMessage);
			}
			
		}
	});
}


/*************************************************
 * 설문차트 저장버튼 클릭시 - 복용차트내용을 저장한다.
 **************************************************/
 function saveDosingChart( e ){
	const changedRowsSet    = new Set();   //수정된 행의 DB ID 를 중복 없이 저장하기 위함
	const changedDosingList = new Array(); // 수정된 행, patch 할 정보  --> controller로 보낼 친구
	let editedCells = table02.getEditedCells(); // 수정된 "Cell" arrays, 중복 있음

	//변경된 객체 가져오기
	if(editedCells.length>0){

		var data = table02.getData();
	    for(var i = 0 ; i < data.length ; i++){
			var tmpRow = data[i]; // 수정된 "행"

			let changedDoing = {
				"dosgId"    : tmpRow.dosgId,
				"dosgDt"    : tmpRow.dosgDt,
				"callYn"    : tmpRow.callYn,
				"dosgYn"    : tmpRow.dosgYn,
				"dosgTpCd"  : tmpRow.dosgTpCd,
				"pauseYn"   : tmpRow.pauseYn,
				"currWgt"   : tmpRow.currWgt,
				"lossWgt"   : tmpRow.lossWgt,
				"rmiWgt"    : tmpRow.rmiWgt,
				"dosgDesc1" : tmpRow.dosgDesc1,
				"dosgDesc1" : tmpRow.dosgDesc1
			};
			changedDosingList.push(changedDoing);
			// //set 에 해당 id 가 없는지 체크하고, 없을 때만 해당 id 에 해당하는 class 를 Array 에 넣는다. 
			// if(!changedRowsSet.has(tmpRow.getCell("dosgId").getValue())){
			// 	changedRowsSet.add(tmpRow.getCell("dosgId").getValue());
			// 	changedDosingList.push(changedDoing);
			// }
	   }
	}

	$.ajax({
		type: 'post',
		url: '/api/v1/main/survey/saveDosingChart',
		data: {
			"jsonData":JSON.stringify(changedDosingList)	
	    }, 
		success: function (result) {

			if (result.status == "success") {
				alert(result.message);
			} else {
				alert(result.errorMessage);
			}
			
		}
	});
}

function cellEditCheck( cell ) {
	return true;
}
function weightCheck( cell ) {
	var currWgt = cell.getValue();
	if( isNaN( currWgt) ){
		alert("숫자 또는 .만 입력할 수 있습니다.");
		cell.setValue("");
		return;
	}
	var orgWgt = $("#orgWgt").val();
	if( !isNaN(orgWgt) ) {
		var lossWgt = (currWgt - orgWgt).toFixed(1); //감량체중
		cell.getRow().getCell("lossWgt").setValue( lossWgt );

	}
	var tgtWgt = $("#tgtWgt").val();
	if( !isNaN(tgtWgt) ) {
		var rmiWgt  = (currWgt - tgtWgt).toFixed(1); //남은체중
		cell.getRow().getCell("rmiWgt").setValue( rmiWgt );
	}
	return true;
}
function getBtnViewChart(cell, formatterParams, onRendered){ //plain text value
    return "<i class='bi'>차트보기</i>";
}
function getBtnDelChart(cell, formatterParams, onRendered){ //plain text value
    return "<i class='bi bi-trash'></i>";
}
function doChangeNextDate( cell ) {
	var row = cell.getRow();
	var nextRow = row.getNextRow();

	console.log( "nextRow", nextRow );
	if( nextRow ) {

		//오늘날짜 구하기
		var dosgDt = row.getCell("dosgDt").getValue();

		//오늘 날짜의 요일바꾸기
		var dosgDtStrKor = getDaysStrKorByDayNum(moment( dosgDt ).day());
		row.getCell("daysStrKor").setValue( dosgDtStrKor );

		//다음행의 날짜 1씩 더하기
		var dosgDt = row.getCell("dosgDt").getValue();
		var nextDt = moment( dosgDt ).add(1, 'day');
		var nextDtStr = nextDt.format("YYYY-MM-DD"); 
		var nextDaysStrKor = getDaysStrKorByDayNum(nextDt.day());
		nextRow.getCell("dosgDt").setValue( nextDtStr );
		nextRow.getCell("daysStrKor").setValue( nextDaysStrKor );
	}
}


function getDaysStrKorByDayNum( dayNum) {
	var result = "";
	switch( dayNum ) {
		case 0:  result = "일"; break;
		case 1:  result = "월"; break;
		case 2:  result = "화"; break;
		case 3:  result = "수"; break;
		case 4:  result = "목"; break;
		case 5:  result = "금"; break;
		case 6:  result = "토"; break;
		default :break;
	}
	return result;
}

/*************************************************
 * 고객의 특정 차트를 선택한 경우
 **************************************************/
function reloadTabulator( obj ) {

	obj.setData().then(function(){
	})
	.catch(function( err){
	   console.log( err );
	});
}


/*************************************************
 * 복용차트 생성
 **************************************************/
function validateCustomer() {

	var custUsrNmObj		= $("#input[name='custUsrNm']");
	var custCellNoObj 		= $("#input[name='custCellNo']");
	var custBirthYearObj 	= $("#input[name='custBirthYear']");
	var custBirthMonthObj 	= $("#input[name='custBirthMonth']");
	var custBirthDayObj 	= $("#input[name='custBirthDay']");
	var custGenTpCdObj 		= $("#input[name='custGenTpCd']:checked"); //성별
	var mrgYnObj 			= $("#input[name='mrgYn']:checked"); //성별

	mrgYn

	//고객명
	if ($isEmpty( custUsrNmObj.val() )) {
		alert("[고격명]을 입력해주세요.");
		custUsrNmObj.focus();
		return false;
	}
	//휴대전화번호
	if ($isEmpty( custCellNoObj.val() )) {
		alert("[휴대전화번호]를 입력해주세요.");
		custCellNoObj.focus();
		return false;
	}
	//태어난해
	if ($isEmpty(custBirthYearObj.val() )) {
		alert("[생년월일]을 입력해주세요.");
		custBirthYearObj.focus();
		return false;
	}
	//태어난 월
	if ($isEmpty(custBirthMonthObj.val() )) {
		alert("[생년월일]을 입력해주세요.");
		custBirthMonthObj.focus();
		return false;
	}
	//태어난 일자
	if ($isEmpty(custBirthDayObj.val() )) {
		alert("[생년월일]을 입력해주세요.");
		custBirthDayObj.focus();
		return false;
	}
	//성별
	if (custGenTpCdObj.length == 0) {
		alert("[성별]을 선택해주세요.");
		custGenTpCdObj.focus();
		return false;
	}
	if (mrgYnObj.length == 0) {
		alert("[결혼유무]를 선택해주세요.");
		mrgYnObj.focus();
		return false;
	}

	if ($isEmpty(rsvtUsrNm)) {
		alert("[예약자명]을 입력해주세요.");
		$("input[name='rsvtUsrNm']").focus();
		return false;
	}
	if ($isEmpty(rsvtCellNo)) {
		alert("[예약자 휴대전화번호]를 입력해주세요.");
		$("input[name='rsvtCellNo']").focus();
		return false;
	}
	return true;
	

}

