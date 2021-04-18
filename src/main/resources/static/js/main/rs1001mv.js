$(document).ready(function () {


    /**************************************************************
     * 예약고객의 상세스케쥴 보기
     **************************************************************/
    $(document).on("click", "button[name='rsvtSch']", function (e) {

        var params = {
            "rsvtId": $(e.target).closest("div").attr("data-id")
        }
        findReservationDetail(params);
    });

    /**************************************************************
     * 차트생성
     **************************************************************/
    $(document).on("click", "button[name='btnNewChart']", function (e) {

        e.preventDefault(); //remove href function
        var params = {
            "rsvtId": $("#rsvtId").val(),
            "custId": $("#custId").val()
        };

        $("#modalRsvtChart .modal-content").load("/reservation/RS1001PU02", params, function (data, status, xhr) {
            $("#modalRsvtChart").modal('show');
        });
    });

    /**************************************************************
     * 새 스케쥴 등록하기
     **************************************************************/
    $(document).on("click", "button[name='btnNewSch']", function (e) {
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
    $(document).on("click", "button[name='nextWeek']", function (e) {

        var params = {
            "currDt": $("#currDt").val(),
            "interval": 7
        };
        moveWeekTimeTable(params);

    });

    /**
	 * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
	 */
     $(document).on("change", "input[name=genTpCd]", function( e ){

        if($(this).prop('checked')){
            $('input[name="genTpCd"]').prop('checked',false);
            $(this).prop('checked',true);
        }
    });

    /**
     * tabindex 문제로 체크박스 변경 후 하나만 체크가능하도록 변경
     */
     $(document).on("change", "input[name=rsvtTpCd]", function( e ){
        
        if($(this).prop('checked')){
            $('input[name="rsvtTpCd"]').prop('checked',false);
            $(this).prop('checked',true);
        }
    });


    /**************************************************************
     * 저장하기
     **************************************************************/
    $(document).on("click", "button[name='btnSaveRsvtSch']", function (e) {

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
    refreshTimeTable = function (params) {
        var url = "/reservation/RS1001MV/refresh";
        var params = {
            "currDt": moment($("#rsvtDt").val()).format("YYYYMMDD")
        };

        console.log( params );
        $("#time-table").load(url, params, function (response, status, xhr) {

            if (200 == xhr.status) {
                $("#time-table").html(response);
            } else {
                console.log(response, status, xhr);
            }
        });
    }
});