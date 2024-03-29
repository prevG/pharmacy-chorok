$(document).ready(function () {
    
    var RS1001MV = {
        init : function() {
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




            $("#searchRsvtTable").datagrid({        
                queryParams : {
                    "searchKeyword" : $("#searchKeyword").val(),
                },
                singleSelect: true, 
                ctrlSelect: true,
                idField: 'cnstId',
                rownumbers: true,
                fitColumns: true, 
                // fit: true,
                emptyMsg: '예약된 정보가 존재하지 않습니다.',
                dragSelection: true,
                columns:[[
                    {field: 'rsvtId'     	 , title: '예약번호'   , align: 'center', width: '80'},
                    {field: 'rsvtDt'     	 , title: '예약일시'   , align: 'center', width: '120'},
                    {field: 'rsvtDtYyyymmdd' , title: '예약일시'   , align: 'center', width: '120', hidden:true},
                    {field: 'rsvtUsrNm'		 , title: '예약자명'   , align: 'center', width: '70'},
                    {field: 'rsvtCellNo' 	 , title: '휴대전화번호', align: 'center', width: '90'},
                    {field: 'rsvtTpCd'     	 , title: '상담구분'   , align: 'center', width: '80',
                        formatter: function(value, row, index) {
                            if( value == 'C' ) {
                                return '전화';    
                            } else if( value == 'R' ) {
                                return '방문';
                            }
                        }
                    },
                    {field: 'genTpCd'   	 , title: '성별'    , align: 'center', width: '70',
                        formatter: function(value, row, index) {
                            if( value == 'F' ) {
                                return '여성';    
                            } else if( value == 'M' ) {
                                return '남성';
                            }
                        }
                    }
                ]],
                onDblClickRow: function(index, row) {
                    var rsvtId = row.rsvtId;
                    var rsvtDtYyyymmdd = row.rsvtDtYyyymmdd;
                    $('#searchRsvtDlg').dialog('close');
                    refreshTimeTable( rsvtId, rsvtDtYyyymmdd );
                },
            });

            /**************************************************************
             * 예약일자 선택에서 토/일요일 선택 안되게 처리
             **************************************************************/
            $("#rsvtDtYyyymmdd").datebox().datebox('calendar').calendar({
            	validator: function(date) {
            		var now = new Date();
                    //console.log( date );
                    
                    if( date.getDay()== 0 || date.getDay() == 6) {
                         return false;
                    }
                    return true;
                    // var d1 = c;
                    // var d2 = new Date(now.getFullYear(), now.getMonth(), now.getDate()+10);
                    // return d1<=date && date<=d2;
            	}
            });
            
            /**************************************************************
             * 예약자명 또는 전화번호로 예약정보 검색시
             **************************************************************/
            $("#searchKeyword").textbox('textbox').bind('keydown', function(e){
                if (e.keyCode == 13){	// when press ENTER key, accept the inputed value.
                    $("a[name='btnSearchRsvtSch']").click();
                }
            });


            /**************************************************************
             * [예약조회]버튼을 클릭할 경우
             **************************************************************/
            $(document).off("click", "a[name='btnSearchRsvtSch']").on("click", "a[name='btnSearchRsvtSch']", function (e) {
                
                e.preventDefault();

                $('#searchRsvtTable').datagrid('loadData', []);  
                $('#searchRsvtDlg').dialog('open').dialog('center').dialog('setTitle','예약조회');
                
                var queryParams = $("#searchRsvtTable").datagrid('options').queryParams;
                queryParams.searchKeyword = $("#searchKeyword").val();			
                $('#searchRsvtTable').datagrid('load', '/api/v1/main/reservation/findBySearchKeyword');
            });

            /**************************************************************
             * [상담하기] 팝업이 close 될경우 
             **************************************************************/
			/*$("#custDlg").dialog({
				onClose: function() {
                    var rsvtId = $("form[name='rsvtForm']").find("input[name='rsvtId']").val();
					refreshTimeTable( rsvtId );
				}
			});*/

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
				}

            });

            /**************************************************************
             * 새 스케쥴 등록하기
             **************************************************************/
            $(document).off("click", "button[name='btnNewSch']").on("click", "button[name='btnNewSch']", function (e) {
                
                e.preventDefault();
                
                //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
                clearSelectedReservation();

            });

            
            /**************************************************************
             * 지난주 스케쥴 보기
             **************************************************************/
            $(document).on("click", "#prevWeek", function (e) {

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
            $(document).on("click", "#thisWeek", function (e) {

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
            $(document).off("click", "#nextWeek").on("click", "#nextWeek", function (e) {

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
                        custId      : data.id,
                        rsvtCellNo  : !$isEmpty(data.cellNo ) ? data.cellNo  : $("input[name='rsvtCellNo").val(),
                        genTpCd     : !$isEmpty(data.genTpCd) ? data.genTpCd : $("input[name='genTpCd']:checked").val()
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
				onUnselect : function( record) {
					console.log( "onUnselect", record );
				},
                loader: function(param, succ){
                    if (!param.q){return;}
                    $.ajax({
                        type: 'post',
                        url : "/api/v1/main/customer/findCustomerWithAutocomplate",
                        data: {
                            "custUsrNm": $("input[name='rsvtUsrNm']").val(),
                            "custCellNo": $("input[name='rsvtCellNo']").val()
                        },
                        success: function(result){
                            
                            var rows = $.map(result.data, function(item){
								var tmpCustId = (item.custId > 0) ? (item.custId) : '';
								var tmpLabel  = (item.custId > 0) ? (item.custUsrNm + " / " + item.custCellNo) : (item.custUsrNm);
	
                                return { 
                                    label   : tmpLabel,    //UI 에서 보여지는 글자, 실제 검색어랑 비교 대상
                                    value   : item.custUsrNm,
                                    id      : tmpCustId,
                                    usrNm   : item.custUsrNm,
                                    cellNo  : item.custCellNo,
                                    genTpCd : item.custGenTpCd
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
             * 상담하기
             **************************************************************/
            $("a[name='btnNewChartView']").off("click").on("click", function(e) {             
                e.preventDefault(); //remove href function

				if($(this).linkbutton("options").disabled) {
					return true;
				}

                var rsvtId = $("form[name='rsvtForm']").find("input[name='rsvtId']").val();
                var custId = $("form[name='rsvtForm']").find("input[name='custId']").val();
                custId = $isEmpty( custId ) ? '0' : custId;

                if (rsvtId == null || rsvtId == "") {
                    $.messager.alert("경고","선택된 예약정보가 없습니다.");
                    return;
                }
                var params = {
                    "rsvtId": rsvtId
                };
                
                $("#custDlg").remove(); // need to clear...
                $("#custDlgWrap").load("/customer/CUS1001ML_D/"+ custId + "/0", params, function (data, status, xhr) {
					$.parser.parse($('#custDlgWrap'));
					$('#custDlg').window({
						onBeforeClose: function() {
							var rsvtId = $("form[name='rsvtForm']").find("input[name='rsvtId']").val();
							refreshTimeTable( rsvtId );						
						}
					})
					.window('open')
					.window('center')
					.window('setTitle', '고객상담정보');                
                
					//$.parser.parse($('#custDlgWrap'));
					//$('#custDlg').window('open').window('center').window('setTitle', '고객상담정보');
                });
            });

            /**************************************************************
             * [저장]버튼 클릭 시
             **************************************************************/
            $("a[name='btnSaveRsvtSch']").off("click").on("click", function(e) {

                var isOk = validateSubmit();
                if (!isOk) {
                    return false;
                }

                $.messager.confirm("확인", "예약정보를 저장하시겠습니까?", function(r) {

                    if(!r) return; 

                    var params = $("form[name=rsvtForm]").serialize();
                    $.ajax({
                        type : 'post',
                        url  : '/api/v1/main/reservation/saveReservation',
                        data : params,
                        success: function (result) {

                            if (result.status == "success") {
                                $.messager.show({ title: "알림", msg: "예약정보가 저장되었습니다."});
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
                                $.messager.alert("경고",result.errorMessage);
                            }
                        }
                    });
                });
            });

            /**************************************************************
             * [삭제] 버튼 클릭시
             **************************************************************/
            $("a[name='btnDeleteRsvtSch']").off("click").on("click", function (e) {

				if($(this).linkbutton("options").disabled) {
					return true;
				}
				
				
                $.messager.confirm("확인", "예약정보를 삭제하시겠습니까?", function(r) {

                    if(!r) return; 
            
                    var params = $("form[name=rsvtForm]").serialize();
                    $.ajax({
                        type: 'post',
                        url: '/api/v1/main/reservation/deleteReservation',
                        data: params,
                        success: function (result) {

                            if (result.status == "success") {
                                $.messager.show({ title: "알림", msg: "예약정보가 삭제되었습니다."});
                                refreshTimeTable();
                            
                                //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
                                clearSelectedReservation();

                                isExistChangedData = false;
                            } else {
                                $.messager.alert("경고",result.errorMessage);
                            }
                        }
                    });
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

		    /**************************************************************
		     * 예약문자보내기
		     **************************************************************/
		    $(document).off("click", "#btnSendSms").on("click", "#btnSendSms", function (e) {
		
		        var isOk = validateSubmit();
		        if( !isOk ) {
		            return false;
		        }


				var rsvtDt         = $("input[name='rsvtDt']").val(); //예약일시
                var rsvtDtYyyymmdd = $("input[name='rsvtDtYyyymmdd']").val(); //예약일시
                var rsvtDtHh       = $("input[name='rsvtDtHh']").val(); //예약일시
                var rsvtDtMm       = $("input[name='rsvtDtMm']").val(); //예약일시
                var rsvtUsrNm      = $("input[name='rsvtUsrNm']").val(); //예약자명
                var rsvtCellNo1    = $("input[name='rsvtCellNo1']").val(); //예약자휴대전화번호 앞자리
                var rsvtCellNo2    = $("input[name='rsvtCellNo2']").val(); //예약자휴대전화번호 중간자리
                var rsvtCellNo3    = $("input[name='rsvtCellNo3']").val(); //예약자휴대전화번호 끝자리
                
                var rsvtCellNo = rsvtCellNo1 + rsvtCellNo2 + rsvtCellNo3;		
				var rsvtTpCd   = $("input[name='rsvtTpCd']:checked").val();
				
				var m1 = moment(rsvtDtYyyymmdd + " " +rsvtDtHh + +":" + rsvtDtMm, 'YYYY-MM-DD HH:mm');
				var mDate  = m1.format("MM월 DD일 dddd");
				var mHours = m1.format("a h시 mm분");
				
				var smsMsg = "";
				if( rsvtTpCd == 'C' ) { 
					smsMsg += "[초록건강한약국] "+"\n";
					smsMsg += rsvtUsrNm + "님"+"\n";
					smsMsg += "전화상담 예약은"+"\n";
					smsMsg += mDate + "\n";
					smsMsg += mHours+ "입니다."+"\n";	
					smsMsg += "\n";				
					smsMsg += "★초록건강한약국 대표번호 (055-367-6763)로 전화 드리겠습니다."+"\n";
					smsMsg += "★예약변경시 사전에 꼭 연락부탁드립니다."+"\n";
					smsMsg += "상담이 예약제로 진행되므로 늦으실 경우 대기 또는 당일 상담이 어려울 수 있습니다. (초록건강한약국 대표전화 또는 채널로 연락 주시면 됩니다.)"+"\n";	
					smsMsg += "\n";				
					smsMsg += "▶영업시간: 평일 오전 9시 ~ 오후 6시"+"\n";
					smsMsg += "▶카카오톡문의: http://pf.kakao.com/_yqrhxb";
				} else {					
					smsMsg += "[초록건강한약국] "+"\n";
					smsMsg += rsvtUsrNm + "님"+"\n";
					smsMsg += "상담 예약은"+"\n";
					smsMsg += mDate + "\n";
					smsMsg += mHours+ "입니다."+"\n";	
					smsMsg += "\n";				
					smsMsg += "★예약변경시 사전에 꼭 연락부탁드립니다."+"\n";
					smsMsg += "상담이 예약제로 진행되므로 늦으실 경우 대기 또는 당일 상담이 어려울 수 있습니다. (초록건강한약국 대표전화 또는 채널로 연락 주시면 됩니다.)"+"\n";	
					smsMsg += "\n";				
					smsMsg += "★코로나19 예방을 위해 감기,발열,호흡기질환 증상이 있거나 마스크 미착용 경우 상담이 불가하오니 협조 부탁드립니다."+"\n";
                    smsMsg += "(상담자를 제외한 동행인원은 최소화 해주세요.)"+"\n";	
					smsMsg += "\n";				
					smsMsg += "▶영업시간: 평일 오전 9시 ~ 오후 6시"+"\n";
					smsMsg += "▶카카오톡문의: http://pf.kakao.com/_yqrhxb"+"\n";
					smsMsg += "▶주소: 경상남도 양산시 물금읍 청운로349 305호(본건물 지하1,2층 주차장 이용가능)";
					
				}
		        isOk = confirm("예약문자를 발송하시겠습니까?\n아래의 메세지가 즉시 전송됩니다.\n\n" + smsMsg );
		        if( !isOk ) {
		            return false;
		        }				
				var formData = {
					criteria : {
						"rsvtId" 		: 	$("#rsvtId").val(),
						"rsvtCellNo" 	: 	rsvtCellNo,
						"rsvtUsrNm" 	: 	rsvtUsrNm,
						"rsvtDt" 		: 	rsvtDt,
						"sndMsg" 		: 	smsMsg,
						"sndTitle" 		: 	"[초록건강한약국]상담예약 안내문자"
					}
				};
				
				$.ajax({
					url: '/api/v1/sms/reservation_2',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
							
						if (res.status === 'success') {
							var params = $("form[name=rsvtForm]").serialize();
							refreshTimeTable($("#rsvtId").val());
							
		                    //findReservationDetail(params);
		                    
							$.messager.show({ title: '예약문자 발송', msg: res.message });
						} else {
							$.messager.alert('예약문자 발송', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('예약문자 발송', xhr.responseJSON.message, 'error');
					}
				});
								
		        /*var params = $("form[name=detailForm]").serialize();
		        $.ajax({
		            type: 'post',
		            url: '/api/v1/sms/reservation_2',
		            data: params,
		            success: function (result) {
		
		                if (result.status == "success") {
		                    alert(result.message);
		                    refreshTimeTable();
		                    findReservationDetail(params);
		                } else {
		                    alert(result.errorMessage);
		                }
		            }
		        });*/
		    });
                
            //예약 상세정보조회
            findReservationDetail = function (params, obj) {


                //스케쥴표에서 선택된 예약이 있으면 스타일 초기화
                clearSelectedReservation();

                //선택해야할 object 가 있는 경우 선택 class 적용
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

                //데이터 조회
                $.post('/api/v1/main/reservation/findByRsvtId', params, function(result) {
                    if(result.status == 'success') {
                        $('#rsvtForm').form('clear');
//debugger;
                        var data = result.data;
                        $('#rsvtForm').form('load', {
                        rsvtDtYyyymmdd : data.rsvtDtYyyymmdd,
                        rsvtDtHh       : data.rsvtDtHh,
                        rsvtDtMm       : data.rsvtDtMm,
                        rsvtTpCd       : data.rsvtTpCd,
                        rsvtUsrNm      : data.rsvtUsrNm,
                        genTpCd        : data.genTpCd,
                        rsvtCellNo1    : data.rsvtCellNo1,
                        rsvtCellNo2    : data.rsvtCellNo2,
                        rsvtCellNo3    : data.rsvtCellNo3,
                        rcmdUsrNm      : data.rcmdUsrNm,
                        rcmdCellNo     : data.rcmdCellNo,
                        rcmdCellNo     : data.rcmdCellNo,
                        rcmdUsrNo      : data.rcmdUsrNo,
                        rsvtDesc       : data.rsvtDesc,
                        picUsrNo       : data.picUsrNo,
                        rsvtId         : data.rsvtId,
                        custId         : data.custId,
                        rsvtSmsDt      : data.rsvtSmsDt
                        });

						//예약번호가 존재할 경우 문자보내기버튼 활성화
		                var rsvtId = $("#rsvtId").val();
		                if( $isEmpty(rsvtId)) {
		
		                    $("#btnSendSms").hide();
			                $("#btnDeleteRsvtSch").linkbutton("disable");
			                $("#btnNewChartView").linkbutton("disable");
		                    // $("#reservation-detail").children().remove();
		                } else {
		                    $("#btnSendSms").show();
			                $("#btnDeleteRsvtSch").linkbutton("enable");
			                $("#btnNewChartView").linkbutton("enable");
		                }
	                    
                    } else {
                        $.messager.show({ title: 'Error', msg: result.Msg });
                        return;
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
            refreshTimeTable = function ( rsvtId, yyyymmdd ) {
            
                var params = {};
                if( $isEmpty( yyyymmdd )) {
                    params['currDt'] = moment($("#rsvtDtYyyymmdd").val()).format("YYYYMMDD");
                } else {
                    params['currDt'] = moment( yyyymmdd ).format("YYYYMMDD");
                }
                
                var url = "/reservation/RS1001MV/reload";
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
                var rsvtCellNo1    = $("input[name='rsvtCellNo1']").val(); //예약자휴대전화번호 앞자리
                var rsvtCellNo2    = $("input[name='rsvtCellNo2']").val(); //예약자휴대전화번호 중간자리
                var rsvtCellNo3    = $("input[name='rsvtCellNo3']").val(); //예약자휴대전화번호 끝자리

                // if ($isEmpty(rsvtDt)) {
                //     $.messager.alert("경고","예약일시를 입력해주세요.");
                //     $("input[name='rsvtDt']").focus();
                //     return false;
                // }
                if ($isEmpty(rsvtDtYyyymmdd)) {
                    $.messager.alert("경고","예약 [일자]를 입력해주세요.");
                    $("#rsvtDtYyyymmdd").textbox('clear').textbox('textbox').focus();
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
                    // $("input[name='rsvtTpCd']").radiobutton('textbox').focus();
                    return false;
                }
                if ($isEmpty(rsvtUsrNm)) {
                    $.messager.alert("경고","[예약자명]을 입력해주세요.");
                    $("#rsvtUsrNm").textbox('textbox').focus();
                    return false;
                }		
                if (genTpCd == 0) {
                    $.messager.alert("경고","[성별]을 선택해주세요.");
                    // $("input[name='genTpCd']").radiobutton('textbox').focus();
                    return false;
                }
                if ($isEmpty(rsvtCellNo2)) {
                    $.messager.alert("경고","예약자 [휴대전화번호]를 입력해주세요.");
                    $("#rsvtCellNo2").textbox('clear').textbox('textbox').focus();
                    return false;
                }
                if ($isEmpty(rsvtCellNo3)) {
                    $.messager.alert("경고","예약자 [휴대전화번호]를 입력해주세요.");
                    $("#rsvtCellNo3").textbox('clear').textbox('textbox').focus();
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

				//예약번호가 존재할 경우 문자보내기버튼 활성화
                $("#btnSendSms").hide();
                $("#btnDeleteRsvtSch").linkbutton("disable");
                $("#btnNewChartView").linkbutton("disable");



                //예약상세스케쥴 폼 클리어
                $('#rsvtForm').form('clear');
				$('#rsvtForm').form('load', {
                    rsvtDtHh       : "",
                    rsvtDtMm       : "",
                    rsvtCellNo1    : "010",
                    picUsrNo       : ""
                });
            }

			
			//버튼 초기화
			clearSelectedReservation();
        }

    };

    //페이지 로딩
    RS1001MV.init();
});


