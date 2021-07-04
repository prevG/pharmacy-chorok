$(document).ready(function () {

    var isExistChangedData = false;
    // $( document).off("change", "#reservation-detail INPUT,SELECT,TEXTAREA").on("change", "#reservation-detail INPUT,SELECT,TEXTAREA", function(e) {

    //     switch( this.name ){
    //         case "rsvtDtYyyymmdd" :
    //         case "rsvtDtHh" :
    //         case "rsvtDtMm" :
    //         case "rsvtTpCd" :
    //         case "rsvtUsrNm" :
    //         case "rsvtCellNo" :
    //         case "genTpCd" :
    //         case "rcmdUsrNm" :
    //         case "rcmdCellNo" :
    //         case "rsvtDesc" :
    //         case "picUsrNo" :
    //             isExistChangedData = true;
    //             break;
    //         default :
    //             break;
    //     }
    // })


    /**************************************************************
     * 주간스케줄표의 예약고객을 클릭할 경우
     **************************************************************/
    $(document).off("click", "button[name='rsvtSch']").on("click", "button[name='rsvtSch']", function (e) {
        
        e.preventDefault();

        //변경된 데이터가 있는지 확인
        if( !checkExistChangedData() ) {
            return false;
        }

        //예약상세정보 조회
        var params = {
            "rsvtId" : $(e.target ).closest("div").attr("data-id")
        };
        findReservationDetail( params, this );
    });

    /**************************************************************
     * 주간 스케쥴표에 빈칸을 클릭한 경우 
     **************************************************************/
    $(document).off("click", "#table-schedule tbody tr td").on("click", "#table-schedule tbody tr td", function (e) {
        
        //변경된 데이터가 있는지 확인
        if( !checkExistChangedData() ) {
            return false;
        }

        var rsvtSchBtn = $( this ).children().find("button");
        if( rsvtSchBtn == null || rsvtSchBtn.length ==0 ) {
            
            //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
            clearSelectedReservation();

            //예약상세스케쥴 폼 클리어
            $('#rsvtForm').form('clear');
        }
    });

    /**************************************************************
     * 상담하기
     **************************************************************/
     $(document).off("click", "button[name='btnNewChartView']").on("click", "button[name='btnNewChartView']", function (e) {
        e.preventDefault(); //remove href function

        var rsvtId = $("form[name='rsvtForm']").find("input[name='rsvtId']").val();
        var custId = $("form[name='rsvtForm']").find("input[name='custId']").val();

        if (rsvtId == null || rsvtId == "") {
            alert("선택된 예약정보가 없습니다.");
            return;
        }
        var params = {
            "rsvtId": rsvtId,
            "custId": custId
        };

        // $("#modalCnstChart .modal-body").load("/reservation/RS1001PU02", params, function (data, status, xhr) {
        //     $("#modalCnstChart").modal('show');
        // });
    });

    /**************************************************************
     * 새 스케쥴 등록하기
     **************************************************************/
    $(document).off("click", "button[name='btnNewSch']").on("click", "button[name='btnNewSch']", function (e) {
        
        e.preventDefault();
        
        //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
        clearSelectedReservation();

        //예약상세스케쥴 폼 클리어
        $('#rsvtForm').form('clear');
    });

    
    /**************************************************************
     * 지난주 스케쥴 보기
     **************************************************************/
    $(document).on("click", "button[name='prevWeek']", function (e) {

        e.preventDefault();
        var params = {
            "currDt": $("#currDt").val(),
            "interval": -7
        };
        moveWeekTimeTable(params);
    });


    /**************************************************************
     * 금주 스케쥴 보기
     **************************************************************/
    $(document).on("click", "button[name='thisWeek']", function (e) {

        e.preventDefault();
        var params = {
            "currDt": $("#currDt").val(),
            "interval": 0
        };
        moveWeekTimeTable(params);
    });


    /**************************************************************
     * 다음주 스케쥴 보기
     **************************************************************/
    $(document).off("click", "button[name='nextWeek']").on("click", "button[name='nextWeek']", function (e) {

        e.preventDefault();
        var params = {
            "currDt": $("#currDt").val(),
            "interval": 7
        };
        moveWeekTimeTable(params);

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
     * 추천인명  autocomplete 생성
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
                    "custUsrNm" : $("input[name='rcmdUsrNm']").val(),
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


    // /**************************************************************
    //  * 상담하기 팝업이 닫힐때 처음 상담한 고객인 경우 refresh
    //  **************************************************************/
    // $("#modalCnstChart").off("shown.bs.modal").on('shown.bs.modal', function () {
    //     var custId = $("form[name='rsvtForm']").find("input[name='custId']").val()
    //     if ($.trim(custId) == "" || custId == 0) {
    //         refreshTimeTable();
    //     }
    // });


    /**************************************************************
     * [저장]버튼 클릭 시
     **************************************************************/
	 $("a[name='btnSaveRsvtSch']").off("click").on("click", function(e) {

        var isOk = validateSubmit();
        if (!isOk) {
            return false;
        }

        isOk = confirm("예약정보를 저장하시겠습니까?");
        if (!isOk) {
            return false;
        }

        var params = $("form[name=rsvtForm]").serialize();
        $.ajax({
            type : 'post',
            url  : '/api/v1/main/reservation/saveReservation',
            data : params,
            success: function (result) {

                if (result.status == "success") {
                    alert("예약정보가 저장되었습니다.");
                    var data = result.data;

                    //예약스케쥴표 새로고침
                    refreshTimeTable( data.rsvtId );
                    
                    //예약PK 설정
                    $('#rsvtForm').form('load', {
                        rsvtId         : data.rsvtId,
                        custId         : data.custId
                    });
                    isExistChangedData = false;

                } else {
                    alert(result.errorMessage);
                }
            }
        });
    });

    /**************************************************************
     * [삭제] 버튼 클릭시
     **************************************************************/
    $("a[name='btnDeleteRsvtSch']").off("click").on("click", function (e) {

        isOk = confirm("예약정보를 삭제하시겠습니까?");
        if (!isOk) {
            return false;
        }

        var params = $("form[name=rsvtForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/main/reservation/deleteReservation',
            data: params,
            success: function (result) {

                if (result.status == "success") {
                    alert("예약정보가 삭제되었습니다.");
                    refreshTimeTable();
                   
                    //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
                    clearSelectedReservation();

                    //예약상세스케쥴 폼 클리어
                    $('#rsvtForm').form('clear');

                    isExistChangedData = false;
                } else {
                    alert(result.errorMessage);
                }
            }
        });
    });

    //저장하지 않고 다른 데이터 로딩시
    checkExistChangedData = function() {
    
        if( isExistChangedData ) {
            var isOk = confirm( "저장하지 않은 정보가 있습니다.\n저장하지 않고 이동하시겠습니까?");
            if( !isOk ) {
                return false;
            }
            isExistChangedData = false; //초기화
        }
        return true;
    }
        
    //예약 상세정보조회
    findReservationDetail = function (params, obj) {


        //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
        clearSelectedReservation();

        //선택해야할 object 가 있는 경우 선택 class 적용
        if( $isEmptyObj( obj )) {
            //선택된 경우 색상 변경
            if( $(obj).hasClass("btn-outline-primary") ) {
                $(obj).addClass("btn_primary_sel");

            } else if( $(obj).hasClass("btn-outline-success") ) {
                $(obj).addClass("btn_success_sel");

            } else {
                $(obj).addClass("btn_secondary_sel");
            }
        }

        //데이터 조회
        $.post('/api/v1/main/reservation/findByRsvtId', params, function(result) {
            if(result.status == 'success') {
                $('#rsvtForm').form('clear');
               
                var data = result.data;
                $('#rsvtForm').form('load', {
                   rsvtDtYyyymmdd : data.rsvtDtYyyymmdd,
                   rsvtDtHh       : data.rsvtDtHh,
                   rsvtDtMm       : data.rsvtDtMm,
                   rsvtTpCd       : data.rsvtTpCd,
                   rsvtUsrNm      : data.rsvtUsrNm,
                   genTpCd        : data.genTpCd,
                   rsvtCellNo     : data.rsvtCellNo,
                   rcmdUsrNm      : data.rcmdUsrNm,
                   rcmdCellNo     : data.rcmdCellNo,
                   rcmdCellNo     : data.rcmdCellNo,
                   rcmdUsrNo      : data.rcmdUsrNo,
                   rsvtDesc       : data.rsvtDesc,
                   picUsrNo       : data.picUsrNo,
                   rsvtId         : data.rsvtId,
                   custId         : data.custId
                });
            } else {
                $.messager.show({ title: 'Error', msg: result.Msg });
                return;
            }

            //예약번호가 존재할 경우 문자보내기버튼 활성화
            var rsvtId = $("#rsvtId").val();
            if( $isEmpty(rsvtId)) {
                 $("#btnDeleteRsvtSch").hide();
                 $("#btnNewChartView").hide();
                 // $("#reservation-detail").children().remove();
            } else {
                 $("#btnSendSms").show();
                 $("#btnDeleteRsvtSch").show();
                 $("#btnNewChartView").show();
            }

        }, 'json')
        .fail(function(xhr, status, error) {
            $.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
            return;
        });
    }


    //지난주/금주/다음주 조회
    moveWeekTimeTable = function (params) {
        var url = "/reservation/RS1001MV/moveWeek";
        $("#time-table").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#time-table").html(response);
            } else {
                console.log(response, status, xhr);
            }
        });
    }

    //저장후 타임테이블 새로고침
    refreshTimeTable = function ( rsvtId ) {
        var url = "/reservation/RS1001MV/reload";
        var params = {
            "currDt": moment($("#rsvtDtYyyymmdd").val()).format("YYYYMMDD")
        };

        $("#time-table").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#time-table").html(response);
                $("div[data-id='"+ rsvtId +"']").find("button").click();
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
			alert("예약 [일자]를 입력해주세요.");
			$("#rsvtDtYyyymmdd").textbox('clear').textbox('textbox').focus();
			return false;
		}if ($isEmpty(rsvtDtHh)) {
			alert("예약 [시]을 입력해주세요.");
			$("#rsvtDtHh").combobox('textbox').focus();
			return false;
		}if ($isEmpty(rsvtDtMm)) {
			alert("예약 [분]을 입력해주세요.");
			$("#rsvtDtMm").combobox('textbox').focus();
			return false;
		}
		if (rsvtTpCd == 0) {
			alert("[상담구분]을 선택해주세요.");
			// $("input[name='rsvtTpCd']").radiobutton('textbox').focus();
			return false;
		}
		if ($isEmpty(rsvtUsrNm)) {
			alert("[예약자명]을 입력해주세요.");
			$("#rsvtUsrNm").textbox('textbox').focus();
			return false;
		}		
        if (genTpCd == 0) {
			alert("[성별]을 선택해주세요.");
			// $("input[name='genTpCd']").radiobutton('textbox').focus();
			return false;
		}
		if ($isEmpty(rsvtCellNo)) {
			alert("예약자 [휴대전화번호]를 입력해주세요.");
			$("#rsvtCellNo").textbox('clear').textbox('textbox').focus();
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