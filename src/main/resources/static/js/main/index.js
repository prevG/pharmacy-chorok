$( document ).ready( function() {

    $("#table01").datagrid({
	    url: '/api/v1/main/chart/dashList01',           
        queryParams : {
            "dosgDt" 	: $("#currDt").val(),
            "callYn" 	: 'CHEMIST',
        },
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        dragSelection: true,
        columns:[[
            {field: 'cnstId'     , title: '차트번호'    , align: 'center', width: '70'},
        	{field: 'custUsrNm'  , title: '고객이름'    , align: 'center', halign: 'center', width: '70'},
            {field: 'custCellNo' , title: '핸드폰번호'   , align: 'center', width: '90', editor: 'numberbox'},
            {field: 'dosgDt'     , title: '복용일자'    , align: 'center', width: '80'},
            {field: 'dosgTpNm'	 , title: '복용유형'    , align: 'center', width: '100'},
            {field: 'dosgSeq'    , title: '복용일차'    , align: 'center', width: '70',
                formatter: function(value, row, index) {
                    if( value == 0 ) {
                        return '시작전날';    
                    } else {
                        return value +' 일차';
                    }
                }
            },
            {field: 'custGenTpNm', title: '성별'       , align: 'center', width: '100'}
        ]]
    });  
    $("#table02").datagrid({
	    url: '/api/v1/main/chart/dashList02',    
        queryParams : {
            "dosgDt" 	: $("#currDt").val(),
            "callYn" 	: 'COUNSELOR',
        },
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        dragSelection: true,
        columns:[[
            {field: 'cnstId'     , title: '차트번호'   , align: 'center', width: '70'},
        	{field: 'custUsrNm'  , title: '고객이름'   , align: 'center', halign: 'center', width: '70'},
            {field: 'custCellNo' , title: '핸드폰번호'  , align: 'center', width: '90', editor: 'numberbox'},
            {field: 'dosgDt'     , title: '복용일자'   , align: 'center', width: '80'},
            {field: 'dosgTpNm'	 , title: '복용유형'   , align: 'center', width: '100'},
            {field: 'dosgSeq'    , title: '복용일차'   , align: 'center', width: '70',
                formatter: function(value, row, index) {
                    if( value == 0 ) {
                        return '시작전날';    
                    } else {
                        return value +' 일차';
                    }
                }
            },
            {field: 'custGenTpNm', title: '성별'       , align: 'center', width: '100'}
        ]]
    });  
    $("#table03").datagrid({
	    url: '/api/v1/main/chart/dashList03',
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: "현재 복용 일시중지 중인 고객이 없습니다.",
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text'},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'},
            {field: 'lastDosgDt', title: '마지막복용일자', align: 'center', width: '100'},
            {field: 'passDays'  , title: '복용중단일수'  , align: 'center', width: '100'},
        ]]
    });
    $("#table04").datagrid({
	    // url: '/api/v1/main/chart/dashList04',
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'cnstId',
	    rownumbers: true,
		fitColumns: true, 
        // fit: true,
        emptyMsg: "금일 택배발송 해야할 목록이 없습니다.",
        dragSelection: true,
        columns:[[
            {field: 'cnstId'   , title: '차트번호', align: 'center'   , width: '80'},
        	{field: 'custUsrNm', title: '고객이름', align: 'center', width: '80', editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
            {field: 'custCellNo', title: '핸드폰번호'   , align: 'center', width: '100', editor: 'numberbox'}
        ]]
    });


    /**************************************************************
     * 금주 스케쥴보기
     **************************************************************/
    $( document ).on("click", "button[name='btnThisWeek']", function( e ) {    
        
        e.preventDefault(); //remove href function
        location.href = "/reservation/RS1001MV";
    });

    /**************************************************************
     * 복용상담스케쥴보기(약사님)
     **************************************************************/
    $( document ).on("click", "button[name='btnDosingListByChemist']", function( e ) {    
        
        e.preventDefault(); //remove href function
        location.href = "/customer/CUS2001ML";
    });

    /**************************************************************
     * 복용상담스케쥴보기(실장님님)
     **************************************************************/
    $( document ).on("click", "button[name='btnDosingListByCounselor']", function( e ) {    
        
        e.preventDefault();
        location.href = "/customer/CUS2001ML";
    });

    /**************************************************************
     * 복용상담스케쥴보기(약사님)
     **************************************************************/
    $( document ).on("click", "button[name='btnCustListByStopDosing']", function( e ) {    
    
        e.preventDefault(); //remove href function
        location.href = "/customer/CUS2001ML";
    });
    
    /**************************************************************
     * 복용상담스케쥴보기(실장님님)
     **************************************************************/
    $( document ).on("click", "button[name='btnTransitList']", function( e ) {    
        
        e.preventDefault();
        location.href = "/customer/CUS2001ML";
    });

    /**************************************************************
    * 예약고객 휴대전화번호 / 추천인 휴대전화번호 입력시 숫자만 입력되도록
    **************************************************************/
    $("#rsvtCellNo").textbox('textbox').bind('keyup', function(e){
        $onlyNum(this);
    });
    $("#rcmdCellNo").textbox('textbox').bind('keyup', function(e){
        $onlyNum(this);
    });

    /**************************************************************
     * 예약자명  autocomplete 생성
     **************************************************************/
    $('#rsvtUsrNm').combobox({
        mode        : 'remote',
        valueField  : 'value',
        textField   : 'value',
        panelHeight : 'auto',
        formatter: function(data){
            return data.label;
        },
        onSelect    : function( data ){

            $('#rsvtForm').form('load', {
                rsvtCellNo  : data.cellNo,
                custId      : data.id,
                genTpCd     : data.genTpCd
            });
        },
        onChange : function( newValue, oldValue ) {
            if ( $isEmpty( newValue )) {
                $('#rsvtForm').form('load', {
                    rsvtCellNo : '',
                    custId     : '',
                    genTpCd    : ''
                });
            }
        },
        loader: function(param, succ){
            if (!param.q){return;}
            $.ajax({
                type: 'post',
                url : "/api/v1/main/customer/findCustomer",
                data: {
                    "custUsrNm": $("input[name='rsvtUsrNm']").val(),
                    "custCellNo": $("input[name='rsvtCellNo']").val()
                },
                success: function(result){
                    
                    var rows = $.map(result.data, function(item){
                        return { 
                            label: item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                            value: item.custUsrNm,
                            id: item.custId,
                            usrNm: item.custUsrNm,
                            cellNo: item.custCellNo,
                            genTpCd: item.custGenTpCd
                        };
                    });
                    succ(rows)
                }
            })
        }
    });


    /**************************************************************
     * 추천인  autocomplete 생성
     **************************************************************/
    $('#rcmdUsrNm').combobox({
        mode        : 'remote',
        valueField  : 'value',
        textField   : 'value',
        panelHeight : 'auto',
        formatter: function(data){
            return data.label;
        },
        onSelect    : function( data ){
            console.log( data );
            $('#rsvtForm').form('load', {
                rcmdCellNo : data.cellNo,
                rcmdUsrNo  : data.id
            });
        },
        onChange : function( newValue, oldValue ) {
            if ( $isEmpty( newValue )) {
                $('#rsvtForm').form('load', {
                    rcmdCellNo : '',
                    rcmdUsrNo  : ''
                });
            }
        },
        loader: function(param, succ){
            if (!param.q){return;}
            $.ajax({
                type: 'post',
                url : "/api/v1/main/customer/findCustomer",
                data: {
                    "custUsrNm": $("input[name='rcmdUsrNm']").val(),
                    "custCellNo": $("input[name='rcmdCellNo']").val()
                },
                success: function(result){
                    
                    var rows = $.map(result.data, function(item){
                        return { 
                            label: item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                            value: item.custUsrNm,
                            id: item.custId,
                            usrNm: item.custUsrNm,
                            cellNo: item.custCellNo,
                            genTpCd: item.custGenTpCd
                        };
                    });
                    succ(rows)
                }
            })
        }
    });
	
	
    /**************************************************************
     * 예약고객 상세스케쥴 클릭시 상세스케쥴 확인
      **************************************************************/
    $( document ).on("click", "button[name='rsvtSch']", function( e ) {    
       
        e.preventDefault(); //remove href function

        //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
        clearSelectedReservation();
        
        //선택된 경우 색상 변경
        if( $(this).hasClass("btn-outline-primary") ) {
            $(this).addClass("btn_primary_sel");

        } else if( $(this).hasClass("btn-outline-success") ) {
            $(this).addClass("btn_success_sel");

        } else {
            $(this).addClass("btn_secondary_sel");
        }

        var params = {
            "rsvtId" : $(e.target ).closest("div").attr("data-id")
        };
        $.post('/api/v1/main/reservation/findByRsvtId', params, function(result) {
           if (result.status == 'success') {
               
			   $('#modalRsvtDtl').dialog('open').dialog('center').dialog('setTitle','예약상세');
               $('#rsvtForm').form('clear');
               
               var data = result.data;
               $('#rsvtForm').form('load', {
                   rsvtDtYyyymmdd : data.rsvtDtYyyymmdd,
                   rsvtDtHh   : data.rsvtDtHh,
                   rsvtDtMm   : data.rsvtDtMm,
                   rsvtTpCd   : data.rsvtTpCd,
                   rsvtUsrNm  : data.rsvtUsrNm,
                   genTpCd    : data.genTpCd,
                   rsvtCellNo : data.rsvtCellNo,
                   rcmdUsrNm  : data.rcmdUsrNm,
                   rcmdCellNo : data.rcmdCellNo,
                   rcmdCellNo : data.rcmdCellNo,
                   rcmdUsrNo  : data.rcmdUsrNo,
                   rsvtDesc   : data.rsvtDesc,
                   picUsrNo   : data.picUsrNo,
                   rsvtId     : data.rsvtId,
                   custId     : data.custId
               });
           } else {
               $.messager.show({ title: 'Error', msg: result.Msg });
               return;
           }
       }, 'json')
       .fail(function(xhr, status, error) {
           $.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
           return;
       });
   });

    /**************************************************************
     * 주간 스케쥴표에 빈칸을 클릭한 경우 
     **************************************************************/
    $(document).off("click", "#table-schedule tbody tr td").on("click", "#table-schedule tbody tr td", function (e) {
        var rsvtSchBtn = $( this ).children().find("button");
        if( rsvtSchBtn == null || rsvtSchBtn.length ==0 ) {
            clearSelectedReservation();
        }
    });

    /**************************************************************
     * 예약정보 저장하기
     **************************************************************/
	 $("a[name='btnSaveRsvtSch']").off("click").on("click", function(e) {

	    var isOk = validateSubmit();
        if (!isOk) {
           return false;
        }

        $.messager.confirm("확인", "예약정보를 저장하시겠습니까?", function(r) {

            if(!r) return; 
            var rsvtId = $("form[name=rsvtForm]").find("input[name='rsvtId']").val();
            var params = $("form[name=rsvtForm]").serialize();

            $.ajax({
                type : 'post',
                url  : '/api/v1/main/reservation/saveReservation',
                data : params,
                success: function (result) {
                    if(result.status == "success") {
                        $.messager.show({ title: "알림", msg: "예약정보가 저장되었습니다."});
                        $('#modalRsvtDtl').dialog('close');
                        refreshTimeTable( rsvtId );
                    } else {
                        $.messager.alert("경고",result.errorMessage);
                    }
                }
            });
        });
	 });

	//저장후 타임테이블 새로고침
	refreshTimeTable = function ( rsvtId ) {
		var url = "/reservation/dashboard/reload";
		var params = {
			"currDt": moment($("#rsvtDt").val()).format("YYYYMMDD")
		};

		$("#time-table").load( url, params, function (response, status, xhr) {

			if (200 == xhr.status) {
				$("#time-table").html(response);
                var obj = $("div[data-id='"+ rsvtId +"']").find("button");
                if( !$isEmptyObj( obj )) {
                    //선택된 경우 색상 변경
                    if( $(obj).hasClass("btn-outline-primary") ) {
                        $(obj).addClass("btn_primary_sel");

                    } else if( $(obj).hasClass("btn-outline-success") ) {
                        $(obj).addClass("btn_success_sel");

                    } else {
                        $(obj).addClass("btn_secondary_sel");
                    }
                }
			} else {
				console.log(response, status, xhr);
			}
		});
	}

	//저장하기전 데이터 검증
	validateSubmit = function () {
		var rsvtDt         = $("input[name='rsvtDt']").val(); //예약일시
		var rsvtDtYyyymmdd = $("input[name='rsvtDtYyyymmdd']").val(); //예약일시
		var rsvtDtHh       = $("input[name='rsvtDtHh']").val(); //예약일시
		var rsvtDtMm       = $("input[name='rsvtDtMm']").val(); //예약일시
		var rsvtTpCd       = $("input[name='rsvtTpCd']:checked").length; //상담구분
		var rsvtUsrNm      = $("input[name='rsvtUsrNm']").val(); //예약자명
		var genTpCd        = $("input[name='genTpCd']:checked").length; //예약자성별
		var rsvtCellNo     = $("input[name='rsvtCellNo']").val(); //예약자휴대전화번호


		// if ($isEmpty(rsvtDt)) {
		//     alert("예약일시를 입력해주세요.");
		//     $("input[name='rsvtDt']").focus();
		//     return false;
		// }
		if ($isEmpty(rsvtDtYyyymmdd)) {
			$.messager.alert("경고","예약 [일자]를 입력해주세요.");
			$("#rsvtDtYyyymmdd").textbox('textbox').focus();
			return false;
		}if ($isEmpty(rsvtDtHh)) {
			$.messager.alert("경고","예약 [시]을 입력해주세요.");
			$("#rsvtDtHh").combobox('textbox').focus();
			return false;
		}if ($isEmpty(rsvtDtMm)) {
			$.messager.alert("경고","예약 [분]을 입력해주세요.");
			$("#rsvtDtMm").combobox('textbox').focus();
			return false;
		}
		if (rsvtTpCd == 0) {
			$.messager.alert("경고","[상담구분]을 선택해주세요.");
			$("input[name='rsvtTpCd']").radiobutton('textbox').focus()
			return false;
		}
		if ($isEmpty(rsvtUsrNm)) {
			$.messager.alert("경고","[예약자명]을 입력해주세요.");
			$("#rsvtUsrNm").textbox('textbox').focus()
			return false;
		}		
        if (genTpCd == 0) {
			$.messager.alert("경고","[성별]을 선택해주세요.");
			$("input[name='genTpCd']").radiobutton('textbox').focus()
			return false;
		}
		if ($isEmpty(rsvtCellNo)) {
			$.messager.alert("경고","예약자 [휴대전화번호]를 입력해주세요.");
			$("#rsvtCellNo").textbox('textbox').focus();
			return false;
		}
		return true;
	}


    clearSelectedReservation = function() {
        //기존에 선택되어 있는 것 해제
        $("#time-table").find(".btn_primary_sel, .btn_success_sel, .btn_secondary_sel").each(function(index, item){
            $(item).removeClass("btn_primary_sel");
            $(item).removeClass("btn_success_sel");
            $(item).removeClass("btn_secondary_sel");
        });
    }

});