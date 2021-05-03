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
	
    /**************************************************************
     * 고객정보 저장
     **************************************************************/
	$(document).off("click", "button[name='btnSaveCustomer']").on("click", "button[name='btnSaveCustomer']", function (e) {


        var url = "/reservation/RS1001PU02/saveCustomer";
        var params = $("form[name=saveCustForm]").serialize();
        $("#customer-table").load( url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
				alert("고객정보가 정상적으로 저장 되었습니다.")
                $("#customer-table").html(response);
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
 * 차트삭제 (차트마스터/설문차트/복용차트)
 **************************************************/
 function deleteChartByCnstId(e, cell) {
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
 * 차트목록에서 '차트보기' 버튼 클릭시 - 설문차트/복용차트 조회
 **************************************************/
function loadChartByCnstId( e, cell ) {

	var row    = cell.getRow();
	var cnstId = row.getCell("cnstId").getValue();

	$("input[name='selectedCnstId']").val( cnstId );
	var params = {
		"cnstId" : cnstId
	};
	var url = "/reservation/RS1001PU02/findChartByCnstId";
	$("#chart-area").load( url, params, function (response, status, xhr) {

		if (200 == xhr.status) {
			$("#chart-area").html(response);
		} else {
			console.log(response, status, xhr);
			alert("관리자에게 문의하세요 : loadChartByCnstId");
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

