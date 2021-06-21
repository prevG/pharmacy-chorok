$(document).ready(function () {

    var isExistChangedData = false;
    $( document).off("change", "#reservation-detail INPUT,SELECT,TEXTAREA").on("change", "#reservation-detail INPUT,SELECT,TEXTAREA", function(e) {

        switch( this.name ){
            case "rsvtDtYyyymmdd" :
            case "rsvtDtHh" :
            case "rsvtDtMm" :
            case "rsvtTpCd" :
            case "rsvtUsrNm" :
            case "rsvtCellNo" :
            case "genTpCd" :
            case "rcmdUsrNm" :
            case "rcmdCellNo" :
            case "rsvtDesc" :
            case "picUsrNo" :
                isExistChangedData = true;
                break;
            default :
                break;
        }
    })


    /**************************************************************
     * 주간스케줄표의 예약고객을 클릭할 경우
     **************************************************************/
    $(document).off("click", "button[name='rsvtSch']").on("click", "button[name='rsvtSch']", function (e) {

        //변경된 데이터가 있는지 확인
        if( !checkExistChangedData() ) {
            return false;
        }
        var params = {
            "rsvtId": $(e.target).closest("div").attr("data-id")
        }

        $( document ).removeClass("btn_sel");
        $( this ).addClass("btn_sel");
        findReservationDetail(params);
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
            findReservationDetail( "" );
        }
    });

    /**************************************************************
     * 상담하기
     **************************************************************/
     $(document).off("click", "button[name='btnNewChartView']").on("click", "button[name='btnNewChartView']", function (e) {
        e.preventDefault(); //remove href function

        var rsvtId = $("form[name='detailForm']").find("input[name='rsvtId']").val();
        var custId = $("form[name='detailForm']").find("input[name='custId']").val();

        if (rsvtId == null || rsvtId == "") {
            alert("선택된 예약정보가 없습니다.");
            return;
        }

        var params = {
            "rsvtId": rsvtId,
            "custId": custId
        };
        $("#modalCnstChart .modal-body").load("/reservation/RS1001PU02", params, function (data, status, xhr) {
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
    $(document).off("change", "input[name=genTpCd]").on("change", "input[name=genTpCd]", function (e) {

        if ($(this).prop('checked')) {
            $('input[name="genTpCd"]').prop('checked', false);
            $(this).prop('checked', true);
        }
    });

    /**************************************************************
     * tabindex 문제로 라디오버튼을 체크박스로 변경 후 하나만 체크가능하도록 변경(상담구분)
     **************************************************************/
    $(document).off("change", "input[name=rsvtTpCd]").on("change", "input[name=rsvtTpCd]", function (e) {

        if ($(this).prop('checked')) {
            $('input[name="rsvtTpCd"]').prop('checked', false);
            $(this).prop('checked', true);
        }
    });

    /**************************************************************
     * 예약고객 휴대전화번호 / 추천인 휴대전화번호 입력시 숫자만 입력되도록
     **************************************************************/
    $(document).on("keyup", "input[name='rsvtCellNo'], input[name='rcmdCellNo']", function (e) {
        $onlyNum(this);
    });


    /**************************************************************
     * 예약자명 포커스가 올 경우 autocomplete 생성
     **************************************************************/
    $(document).off("focus", "input[name='rsvtUsrNm']").on("focus", "input[name='rsvtUsrNm']", function (e) {

        $(this).autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'post',
                    url: "/api/v1/main/customer/findCustomer",
                    dataType: "json",
                    data: {
                        "custUsrNm": $("input[name='rsvtUsrNm']").val(),
                        "custCellNo": $("input[name='rsvtCellNo']").val()
                    },
                    success: function (result) {
                        response(
                            $.map(result.data, function (item) {    //json[i] 번째 에 있는게 item 임.
                                return {
                                    label: item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    value: item.custUsrNm,
                                    id: item.custId,
                                    usrNm: item.custUsrNm,
                                    cellNo: item.custCellNo,
                                    genTpCd: item.custGenTpCd
                                }
                            })
                        );
                    }
                });
            },
            select: function (event, ui) {
                $("input[name='rsvtCellNo']").val(ui.item.cellNo);
                $("input[name='custId']").val(ui.item.id);
                $("input[name='genTpCd']").each(function () {
                    if (this.value == ui.item.genTpCd) { //값 비교
                        this.checked = true; //checked 처리
                    } else {
                        this.checked = false; //checked 처리
                    }
                });
            },
            change: function (event, ui) {
                if (ui.item == null) {
                    $("input[name='custId']").val("");
                };
            },
            focus: function (event, ui) {
                return true;
            },
            minLength: 1,
            autoFocus: false,
            delay: 100
        });
    });


    /**************************************************************
     * 추천인 포커스가 올 경우 autocomplete 생성
     **************************************************************/
    $(document).off("focus", "input[name='rcmdUsrNm']").on("focus", "input[name='rcmdUsrNm']", function (e) {
        $(this).autocomplete({
            source: function (request, response) {
                $.ajax({
                    type: 'post',
                    url: "/api/v1/main/customer/findCustomer",
                    dataType: "json",
                    data: {
                        "custUsrNm": $("input[name='rcmdUsrNm']").val(),
                        "custCellNo": $("input[name='rcmdCellNo']").val()
                    },
                    success: function (result) {
                        response(
                            $.map(result.data, function (item) {    //json[i] 번째 에 있는게 item 임.
                                return {
                                    label: item.custUsrNm + " / " + item.custCellNo,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    value: item.custUsrNm,
                                    id: item.custId,
                                    usrNm: item.custUsrNm,
                                    cellNo: item.custCellNo
                                }
                            })
                        );
                    }
                });
            },
            select: function (event, ui) {
                $("input[name='rcmdCellNo']").val(ui.item.cellNo);
                $("input[name='rcmdUsrNo']").val(ui.item.id);
            },
            change: function (event, ui) {
                if (ui.item == null) {
                    $("input[name='rcmdUsrNo']").val("");
                }
            },
            focus: function (event, ui) {
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
        if ($.trim(custId) == "" || custId == 0) {
            refreshTimeTable();
        }
    });


    /**************************************************************
     * 에약정보 저장하기
     **************************************************************/
    $(document).off("click", "button[name='btnSaveRsvtSch']").on("click", "button[name='btnSaveRsvtSch']", function (e) {

        var isOk = validateSubmit();
        if (!isOk) {
            return false;
        }

        isOk = confirm("예약정보를 저장하시겠습니까?");
        if (!isOk) {
            return false;
        }

        var params = $("form[name=detailForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/main/reservation/saveReservation',
            data: params,
            success: function (result) {

                if (result.status == "success") {
                    alert("예약정보가 저장되었습니다.");
                    refreshTimeTable();
                    findReservationDetail(params);
                    isExistChangedData = false;
                } else {
                    alert(result.errorMessage);
                }
            }
        });
    });

    /**************************************************************
     * 삭제하기 버튼 클릭
     **************************************************************/
    $(document).off("click", "button[name='btnDeleteRsvtSch']").on("click", "button[name='btnDeleteRsvtSch']", function (e) {

        isOk = confirm("예약정보를 삭제하시겠습니까?");
        if (!isOk) {
            return false;
        }

        var params = $("form[name=detailForm]").serialize();
        $.ajax({
            type: 'post',
            url: '/api/v1/main/reservation/deleteReservation',
            data: params,
            success: function (result) {

                if (result.status == "success") {
                    alert("예약정보가 삭제되었습니다.");
                    refreshTimeTable();
                    findReservationDetail(params);
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
    findReservationDetail = function (params) {

        var url = "/reservation/RS1001MV/detail";
        $("#reservation-detail").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#reservation-detail").html(response);

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
        var url = "/reservation/RS1001MV/reload";
        var params = {
            "currDt": moment($("#rsvtDt").val()).format("YYYYMMDD")
        };

        $("#time-table").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#time-table").html(response);
            } else {
                console.log(response, status, xhr);
            }
        });
    }

    //저장하기전 데이터 검증
    validateSubmit = function () {
        var rsvtDt = $("input[name='rsvtDt']").val(); //예약일시
        var rsvtDtYyyymmdd = $("input[name='rsvtDtYyyymmdd']").val(); //예약일시
        var rsvtDtHh = $("SELECT[name='rsvtDtHh']").val(); //예약일시
        var rsvtDtMm = $("SELECT[name='rsvtDtMm']").val(); //예약일시
        var rsvtTpCd = $("input:checkbox[name=rsvtTpCd]:checked").length //상담구분
        var rsvtUsrNm = $("input[name='rsvtUsrNm']").val(); //예약자명
        var rsvtCellNo = $("input[name='rsvtCellNo']").val(); //예약자휴대전화번호

        // if ($isEmpty(rsvtDt)) {
        //     alert("예약일시를 입력해주세요.");
        //     $("input[name='rsvtDt']").focus();
        //     return false;
        // }
        if ($isEmpty(rsvtDtYyyymmdd)) {
            alert("예약 [일자]를 입력해주세요.");
            $("input[name='rsvtDtYyyymmdd']").focus();
            return false;
        }if ($isEmpty(rsvtDtHh)) {
            alert("예약 [시]을 입력해주세요.");
            $("input[name='rsvtDtHh']").focus();
            return false;
        }if ($isEmpty(rsvtDtMm)) {
            alert("예약 [분]을 입력해주세요.");
            $("input[name='rsvtDtMm']").focus();
            return false;
        }

        if (rsvtTpCd == 0) {
            alert("[상담구분]을 선택해주세요.");
            $("input[name='rsvtTpCd']").focus();
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
});