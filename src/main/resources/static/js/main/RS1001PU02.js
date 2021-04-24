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

function callDosingChart( row ) {

	var orgWgt = row.getCell("orgWgt").getValue();
	var tgtWgt = row.getCell("tgtWgt").getValue();
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

	$.ajax({
		type : 'post',
		url  : '/api/v1/main/dosing/selectSurveyChartByCnstId',
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
		var lossWgt = (currWgt - orgWgt); //감량체중
		cell.getRow().getCell("lossWgt").setValue( lossWgt );

	}
	var tgtWgt = $("#tgtWgt").val();
	if( !isNaN(tgtWgt) ) {
		var rmiWgt  = (currWgt - tgtWgt); //남은체중
		cell.getRow().getCell("rmiWgt").setValue( rmiWgt );
	}
	return true;
}