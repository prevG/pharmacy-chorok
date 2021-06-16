$( document ).ready( function() {
	
	/**
	 * timepicker에 사용될 값 조회
	 */
	var allowTimeList = [];
	$(timeList).each(function(index, item) {
		var hhmm = moment( item["startHm"] ).format("HH:mm");
		allowTimeList.push( hhmm );
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
		$(this).autocomplete( "option", "appendTo", "#detailForm" );
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
            minLength: 1,
            autoFocus: false,
            delay: 200
        });
		$(this).autocomplete( "option", "appendTo", "#detailForm" );
    });

	/**************************************************************
     * 저장하기
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
					$(".modal").modal("hide");
					refreshTimeTable();
				} else {
					alert(result.errorMessage);
				}
            }
        });
	 });

	//저장후 타임테이블 새로고침
	refreshTimeTable = function () {
		var url = "/reservation/dashboard/reload";
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
			alert("예약자 [휴대전화번호]를 입력해주세요.");
			$("input[name='rsvtCellNo']").focus();
			return false;
		}
		return true;
	}
});

