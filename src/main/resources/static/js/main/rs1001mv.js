$(document).ready(function () {


    /**************************************************************
     * 예약고객의 상세스케쥴 보기
     **************************************************************/
    $(document).off("click", "button[name='rsvtSch']").on("click", "button[name='rsvtSch']", function (e) {

        var params = {
            "rsvtId": $(e.target).closest("div").attr("data-id")
        }
        findReservationDetail(params);
    });

    /**************************************************************
     * 상담하기
     **************************************************************/
    $(document).off("click", "button[name='btnNewChartView']").on("click", "button[name='btnNewChartView']", function (e) {
        e.preventDefault(); //remove href function

        var rsvtId = $("form[name='detailForm']").find("input[name='rsvtId']").val();
        var custId = $("form[name='detailForm']").find("input[name='custId']").val();

        if( rsvtId == null || rsvtId == "" ) {
            alert("선택된 예약정보가 없습니다.");
            return;
        }

        var params = {
            "rsvtId": rsvtId,
            "custId": custId
        };
        $("#modalCnstChart .modal-content").load("/reservation/RS1001PU02", params, function (data, status, xhr) {
            $("#modalCnstChart").modal('show');
        });
    });

    /**************************************************************
     * 새 스케쥴 등록하기
     **************************************************************/
    $(document).off("click", "button[name='btnNewSch']").on("click", "button[name='btnNewSch']", function (e) {
        var params = {
            "rsvtId": ""
        }
        findReservationDetail(params);
    });

    /**************************************************************
     * 지난주 스케쥴 보기
     **************************************************************/
    $(document).on("click", "button[name='prevWeek']", function (e) {

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

        var params = {
            "currDt": $("#currDt").val(),
            "interval": 7
        };
        moveWeekTimeTable(params);

    });

    /**************************************************************
     * tabindex 문제로 라디오버튼을 체크박스로 변경 후 하나만 체크가능하도록 수정(성별)
     **************************************************************/
     $(document).off("change", "input[name=genTpCd]").on("change", "input[name=genTpCd]", function( e ){

        if($(this).prop('checked')){
            $('input[name="genTpCd"]').prop('checked',false);
            $(this).prop('checked',true);
        }
    });

    /**************************************************************
     * tabindex 문제로 라디오버튼을 체크박스로 변경 후 하나만 체크가능하도록 변경(상담구분)
     **************************************************************/
     $(document).off("change", "input[name=rsvtTpCd]").on("change", "input[name=rsvtTpCd]", function( e ){
        
        if($(this).prop('checked')){
            $('input[name="rsvtTpCd"]').prop('checked',false);
            $(this).prop('checked',true);
        }
    });


    /**************************************************************
     * 예약자명 포커스가 올 경우 autocomplete 생성
     **************************************************************/
    $( document ).off("focus", "input[name='rsvtUsrNm']").on("focus", "input[name='rsvtUsrNm']", function(e){
        
        $( this ).autocomplete({
            source : function( request, response ) {
                $.ajax({
                    type: 'post',
                    url: "/api/v1/main/customer/findCustomer",
                    dataType: "json",
                    data: {
                        "custUsrNm"  : $("input[name='rsvtUsrNm']" ).val(),
                        "custCellNo" : $("input[name='rsvtCellNo']").val()
                    },
                    success: function(result) {
                        response(
                            $.map(result.data, function(item) {    //json[i] 번째 에 있는게 item 임.
                                return {
                                    label   : item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    value   : item.custUsrNm,
                                    id      : item.custId,
                                    usrNm   : item.custUsrNm,
                                    cellNo  : item.custCellNo,
                                    genTpCd : item.custGenTpCd
                                }
                            })
                        );
                    }
                });
            },
            select : function(event, ui) {
                $("input[name='rsvtCellNo']").val( ui.item.cellNo  );
                $("input[name='custId']"    ).val( ui.item.id );
                $("input[name='genTpCd']"   ).each(function() {
                    if(this.value == ui.item.genTpCd){ //값 비교
                        this.checked = true; //checked 처리
                    } else {
                        this.checked = false; //checked 처리
                    }
                });
            },
            change : function(event, ui) {
                if( ui.item == null ) {
                    $("input[name='custId']").val("");
                };
            },
            focus : function(event, ui) {
                return true;
            },
            minLength: 2,
            autoFocus: false, 
            delay: 200
        });
    });


    /**************************************************************
     * 추천인 포커스가 올 경우 autocomplete 생성
     **************************************************************/
    $( document ).off("focus", "input[name='rcmdUsrNm']").on("focus", "input[name='rcmdUsrNm']", function(e){
        $( this ).autocomplete({
            source : function( request, response ) {
                $.ajax({
                    type: 'post',
                    url: "/api/v1/main/customer/findCustomer",
                    dataType: "json",
                    data: {
                        "custUsrNm"  : $("input[name='rcmdUsrNm']" ).val(),
                        "custCellNo" : $("input[name='rcmdCellNo']").val()
                    },
                    success: function(result) {
                        response(
                            $.map(result.data, function(item) {    //json[i] 번째 에 있는게 item 임.
                                return {
                                    label  : item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    value  : item.custUsrNm,
                                    id     : item.custId,
                                    usrNm  : item.custUsrNm,
                                    cellNo : item.custCellNo
                                }
                            })
                        );
                    }
                });
            },
            select : function(event, ui) {
                $("input[name='rcmdCellNo']").val( ui.item.cellNo  );
                $("input[name='rcmdUsrNo']" ).val( ui.item.id    );
            },
            change : function(event, ui) {
                if( ui.item == null ) {
                    $("input[name='rcmdUsrNo']").val("");
                }
            },
            focus : function(event, ui) {
                return true;
            },
            minLength: 2,
            autoFocus: false, 
            delay: 200
        });
    });

    /**************************************************************
     * 상담하기 팝업이 닫힐때 처음 상담한 고객인 경우 refresh
     **************************************************************/
    $("#modalCnstChart").off("shown.bs.modal").on('shown.bs.modal', function () {
        var custId = $("form[name='detailForm']").find("input[name='custId']").val()
        if( $.trim(custId)=="" || custId == 0) {
            refreshTimeTable();
        }
    });


    /**************************************************************
     * 저장하기
     **************************************************************/
    $(document).off("click", "button[name='btnSaveRsvtSch']").on("click", "button[name='btnSaveRsvtSch']", function (e) {

        var params = $("form[name=detailForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/main/reservation/saveRsvtSch',
            data: params,
            success: function (result) {

                if (result.status == "success") {
                    alert(result.message);
                    refreshTimeTable();
                    findReservationDetail( params );
                } else {
                    alert(result.errorMessage);
                }
            }
        });
    });

    /**************************************************************
     * 예약문자보내기
     **************************************************************/
     $(document).off("click", "button[name='btnSendSms']").on("click", "button[name='btnSendSms']", function (e) {

        var params = $("form[name=detailForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/sms/reservation',
            data: params,
            success: function (result) {

                if (result.status == "success") {
                    alert(result.message);
                    refreshTimeTable();
                    findReservationDetail( params );
                } else {
                    alert(result.errorMessage);
                }
            }
        });
    });

    //예약 상세정보조회
    findReservationDetail = function (params) {

        var url = "/reservation/RS1001MV/detail";
        $("#reservation-detail").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#reservation-detail").html(response);
            } else {
                console.log(response, status, xhr);
            }
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
    refreshTimeTable = function () {
        var url = "/reservation/RS1001MV/refresh";
        var params = {
            "currDt": moment($("#rsvtDt").val()).format("YYYYMMDD")
        };

        $("#time-table").load( url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#time-table").html(response);
            } else {
                console.log(response, status, xhr);
            }
        });
    }
});