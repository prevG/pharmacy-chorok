$( document ).ready( function() {
	
	setDataOnConsultingChart( cnstList );

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
	

	$(document).off("click", "button[name='bntSaveCnstChart']").on("click", "button[name='bntSaveCnstChart']", function (e) {
		var len = $("#surveyTbl tbody tr").length;
		var cnstId = $("#cnstId").val();
		var params = [];
		
		alert(cnstId);
		
		console.log("kkj");
		
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
                    //refreshTimeTable();
                    //findReservationDetail( params );
                } else {
                    alert(result.errorMessage);
                }
                
            }
        });
		

		//console.log(param);
	});	
	

	/**************************************************************
     * 차트 생성
     **************************************************************/
	$(document).off("click", "button[name='btnNewChart']").on("click", "button[name='btnNewChart']", function (e) {

		var params = $("form[name=saveCustForm]").serialize();
		$.ajax({
			type : 'post',
	        url  : '/api/v1/main/customer/createNewChart',
	        data : params,
			success : function( result ) {
				if( result.status == "success" ) {

					alert( result.message );
					// console.log("result.data.cnstList", result.data.cnstList);
					// console.log("result.data.dosgList", result.data.dosgList);
					setDataOnConsultingChart( result.data.cnstList );
					setDataOnDosingChart( result.data.dosgList );
					console.log('aa');
					setDataOnSrvChart(result.data.srvList);
					console.log('aa1');
				} else {
					alert( result.errorMessage );
				}
			}
		});
	});
});



function setDataOnConsultingChart( data ) {
	table01.setData( data )
}
function setDataOnDosingChart( data ) {
	table02.setData( data )
}

function setDataOnSrvChart(data){
	alert("setDataOnSrvChart");
}

/*************************************************
 * 고객의 특정 차트를 선택한 경우
 **************************************************/
function loadChartByCnstId( row ) {

	var params = {
		"cnstId" : row.getCell("cnstId").getValue()
	};

	var url = "/reservation/RS1001PU02/findChartByCnstId";
	$("#chart-area").load( url, params, function (response, status, xhr) {

		if (200 == xhr.status) {
			$("#chart-area").html(response);
			table02.setData( dosgList );
		} else {
			console.log(response, status, xhr);
			alert("관리자에게 문의하세요.");
		}
	});

}


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


function callSrvChart(row){
	
	var params = {
		"cnstId" : row.getCell("cnstId").getValue()
	};
	
	console.log("param",params);

	$.ajax({
		type : 'post',
		url  : '/api/v1/main/survey/selectSurveyChartByCnstId',
		data : params,
		success : function( result ) {

			if( result.status == "success" ) {
				//table02.setData( result.data )
				console.log(result.data);
			} else {
				alert( result.errorMessage );
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
function trashIcon(cell, formatterParams, onRendered){ //plain text value
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
function deleteConsultingChart(e, cell) {
	var cnstId = cell.getRow().getCell("cnstId").getValue();
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