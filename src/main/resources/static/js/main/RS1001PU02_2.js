/******************************************************
 * 
 * 고객정보 / 상담차트
 * 
 ******************************************************/

function myformatter(date) {
	var dt = new Date(date || Date.now());
	var y = dt.getFullYear();
	var m = dt.getMonth() + 1;
	var d = dt.getDate();
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}

function myparser(s) {
	if (!s) return new Date();
	var ss = (s.split('-'));
	var y = parseInt(ss[0],10);
	var m = parseInt(ss[1],10);
	var d = parseInt(ss[2],10);
	if (!isNaN(y) && !isNaN(m) && !isNaN(d)) {
		return new Date(y,m-1,d);
	} else {
		return new Date();
	}
}

function fnZipCode() {
	sample2_execDaumPostcode2();
}

$( document ).ready( function() {
	var RS1001PU02 = {
		dg2EditIndex: -1,
		dg2EndEditing: function() {
			if (RS1001PU02.dg2EditIndex === -1) return true;
			$('#dg2').datagrid('endEdit', RS1001PU02.dg2EditIndex);
			RS1001PU02.dg2EditIndex = -1;
			return true;
		},
		init: function() {
			
            /**************************************************************
             * 상담차트 목록
             **************************************************************/
			$('#dg').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'cnstId',
			    rownumbers: false,
				fitColumns: false, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        dragSelection: true,
		        onLoadSuccess: function(data) {
		        	if (data.rows.length === 0) {
						$('#saveCnstFrm')[0].reset();
						$('#saveSurvFrm')[0].reset();
						$('#saveCnstFrm input[name=selectedIndex]').val('');
						$('#cnstPaper').empty();
						
			        	RS1001PU02.fnPaperChart();
			        	RS1001PU02.fnDosingChart();						
		        	} else {
			        	// linkbutton 활성화
			        	$(this).datagrid('getPanel').find('a.easyui-linkbutton').linkbutton();
			        	
			        	// 상담차트 수정/삭제 후 선택행 처리
			        	var selectedIndex = $('#saveCnstFrm input[name=selectedIndex]').val();
			        	if (selectedIndex)
			        		$(this).datagrid('selectRow', selectedIndex);
			        	else
			        		$(this).datagrid('selectRow', 0);
		        	}
		        },
		        onSelect: function(index, row) {
					// 상담정보
					$('#saveCnstFrm').form('clear');
					$('#saveCnstFrm').form('load', {
						selectedIndex	: index,
						selectedCnstId 	: row.cnstId,
						cnstDt 			: row.cnstDt.substring(0,10),
						cnstDtHh 		: row.cnstDt.substring(11,13),
						cnstDtMm 		: row.cnstDt.substring(14,16),
						picUsrNo		: row.picUsrNo,
						pic2UsrNo		: row.pic2UsrNo,
						cnstHhCd		: row.cnstHhCd,
						cnstHhMemo		: row.cnstHhMemo,
						cateTpCd		: row.cateTpCd,
						cateTpVal		: row.cateTpVal,
						dosgTpCd		: row.dosgTpCd,
						dosgTpVal		: row.dosgTpVal,
						payTpCd 		: row.payTpCd,
						dlvDt 			: row.dlvDt,
						presDesc 		: row.presDesc,
						cnstDesc 		: row.cnstDesc,
						payDesc         : row.payDesc,
					});
					if( row.dlvDpuYn == 'Y' ) {
						$('#saveCnstFrm input[checkboxname=dlvDpuYn]').checkbox({checked :true});
					} else {
						$('#saveCnstFrm input[checkboxname=dlvDpuYn]').checkbox({checked :false});
					}
					
					// 설문차트
					$('#saveDosgFrm').form('clear');
					$('#saveDosgFrm').form('load', {
						orgWgt 			: row.orgWgt,
						tgtWgt			: row.tgtWgt,
						startDosgDt		: row.startDosgDt
					});
		
		        	RS1001PU02.fnPaperChart();
		        	RS1001PU02.fnDosingChart();
		        },
		        onClickCell: function(index, field, value) {
		        	if (field === '삭제') {
		        		var row = $(this).datagrid('getRows')[index];
		        		RS1001PU02.removeCnstChart(row.cnstId);
		        	}
		        },
		        columns:[[
					{
						field: 'num', 
						title: '상담차수',
						align: 'center',  
						width: '70',
		        		formatter: function(value, row, index) { return '<span>'+ value +'</span>'; }
					},
					{
						field: 'cnstId', 
						title: '상담번호',
						align: 'center',  
						width: '70',
		        		formatter: function(value, row, index) { return '<span>'+ value +'</span>'; }
					},
		        	{
		        		field: 'cnstDt', 
		        		title: '상담일시', 
		        		align: 'center', 
		        		width: '110', 
		        		formatter: function(value, row, index) { return '<span>'+ value +'</span>'; }
		        	},
		        	{
		        		field: 'picUsrNoNm', 
		        		title: '상담한약사', 
		        		align: 'center', 
		        		width: '70'
		        	},
		        	{
		        		field: 'pic2UsrNoNm', 
		        		title: '상담실장', 
		        		align: 'center', 
		        		width: '70'
		        	},
		        	{
		        		field: 'dosgTpCd', 
		        		title: '감량종류', 
		        		align: 'center', 
		        		width: '120', 
		        		formatter: function(value, row) { return row.dosgTpCdNm; }
		        	},
		        	{
		        		field: '삭제', 
		        		title: '삭제', 
		        		align: 'center', 
		        		width: '70', 
		        		formatter: function(value, row, index) {
		        			return '<a href="javascript:void(0);" class="easyui-linkbutton" iconCls="icon-remove" style="width:40px;height:20px;">';
		        		}
		        	}
		        ]]
			});
			
            /**************************************************************
             * 복용차트 목록
             **************************************************************/
			$('#dg2').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'dosgId',
			    rownumbers: true,
				fitColumns: false, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        dragSelection: true,
		        rowStyler: function(index, row) {
		        	if (!$isEmpty(row.dosgDesc1) || !$isEmpty(row.dosgDesc1)) {
		        		return 'background-color:#63cc63;';
		        	}
					
					if( row.holidayYn =='Y' ) {
						return "color:red";
					}
		        },
		        onLoadSuccess: function(data) {
		        	var merges = [];
		        	var rows = data.rows;
		        	var k = 0;
		        	while (k < rows.length) {
		        		var c = 0;
		        		for (var l = k; l < rows.length; l++) {
		        			if (rows[k].dosgLvCd === rows[l].dosgLvCd)
		        				c++;
		        		}
		        		merges.push({ index: k, rowspan: c });
		        		k += c;
		        	}
		        	
		        	for (var i = 0; i < merges.length; i++) {
		        		$(this).datagrid('mergeCells', {
		        			index: merges[i].index,
		        			field: 'dosgLvCd',
		        			rowspan: merges[i].rowspan
		        		});
		        	}
		        	
		        	//$(this).datagrid('enableCellEditing');
		        },
		        /*
				onEndEdit: function(index, row) {
					console.log(index, row);
					
					//$(this).datagrid('reload');
				},
		        onClickCell: function(index, field, value) {
		        	if (RS1001PU02.dg2EditIndex !== index) {
		        		if (RS1001PU02.dg2EndEditing()) {
							$(this).datagrid('selectRow', index).datagrid('beginEdit', index);
							RS1001PU02.dg2EditIndex = index;
						} else {
							setTimeout(function() {
                        		$(this).datagrid('selectRow', RS1001PU02.dg2EditIndex);
                    		},0);
						}
		        	} else {
		        		RS1001PU02.dg2EditIndex = -1;
		        	}
		        },*/
		        onDblClickCell: function(index, field, value) {
		        	var row = $(this).datagrid('getRows')[index];
		        	if (!row) return;
		        	
		        	$('#dosgDlgFrm').form('load', {
		        		dlg_dosgId 		: row.dosgId,
		        		dlg_dosgSeq		: row.dosgSeq,
		        		dlg_dosgSeqStr 	: row.dosgSeqStr,
		        		dlg_dosgLvCd 	: row.dosgLvCd,
		        		dlg_dosgLvCdNm  : row.dosgLvCdNm,
		        		dlg_dosgTpCd 	: row.dosgTpCd,
		        		dlg_dosgDt 		: row.dosgDt,
		        		dlg_callYn 		: row.callYn,
		        		dlg_dosgYn 		: row.dosgYn,
		        		dlg_mealTpCd 	: row.mealTpCd,
		        		dlg_pausYn 		: row.pausYn,
		        		dlg_stopYn 	    : row.stopYn,
		        		dlg_currWgt 	: row.currWgt,
		        		dlg_lossWgt 	: row.lossWgt,
		        		dlg_rmiWgt 		: row.rmiWgt,
		        		dlg_dosgDesc1 	: row.dosgDesc1,
		        		dlg_dosgDesc2 	: row.dosgDesc2,
		        		dlg_smsYn 		: row.smsYn
		        	});
		        
		        	$('#dosgDlg').window('open').window('center').window('setTitle', '복용차트 정보');

					//팝업생성후 현재체중 입력컬럼 WIDTH가 적용이 안되서 별도 추가
					$('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox({width:"100%"});
		        },
		        columns:[[
					{
		        		field: 'dosgLvCd', 
		        		title: '복용단계', 
		        		align: 'center', 
		        		width: '110', 
						formatter: function(value, row, index) { return '<span>'+ row.dosgLvCdNm +'</span>'; }
		        		//formatter: function(value, row, index) { return '<span style="font-weight:bold;">'+ row.dosgLvCdNm +'</span>'; }
		        	},
		        	{
		        		field: 'dosgTpCd', 
		        		title: '감량종류', 
		        		align: 'center', 
		        		width: '70', 
		        		formatter: function(value, row) { return '<span>'+ row.dosgTpCdNm +'</span>'; }
		        		//formatter: function(value, row) { return '<span style="font-weight:bold;">'+ row.dosgTpCdNm +'</span>'; }
		        	},
		        	{
		        		field: 'dosgSeq', 
		        		title: '일수', 
		        		align: 'center', 
		        		width: '70', 
		        		formatter: function(value, row) { return '<span>'+ row.dosgSeqStr +'</span>'; }
		        		//formatter: function(value, row) { return '<span style="font-weight:bold;text-decoration:underline;">'+ row.dosgSeqStr +'</span>'; }
		        	},
		        	{
		        		field: 'dosgDt', 
		        		title: '복용일자', 
		        		align: 'center', 
		        		width: '90', 
		        		formatter: function(value, row) { return myformatter(value); },
		        		parser: function(value) { return myparser(value); }
		        	},
		        	{
		        		field: 'daysStrKor', 
		        		title: '요일', 
		        		align: 'center', 
		        		width: '50'
		        	},
		        	{
		        		field: 'smsYn', 
		        		title: '문자전송', 
		        		align: 'center', 
		        		width: '60'
		        	},
		        	{
		        		field: 'dosgDesc1', 
		        		title: '몸상태', 
		        		align: 'center', 
		        		width: '120'
		        	},
		        	{
		        		field: 'dosgDesc2', 
		        		title: '약반응', 
		        		align: 'center', 
		        		width: '120'
		        	},
		        	{
		        		field: 'callYn', 
		        		title: '상담예약', 
		        		align: 'center', 
		        		width: '80', 
		        		formatter: function(value, row) { return row.callYnNm; }
		        	},
		        	{
		        		field: 'pausYn', 
		        		title: '통화여부', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return row.pausYnNm; }
		        	},
		        	{
		        		field: 'currWgt', 
		        		title: '현재체중', 
		        		align: 'center', 
		        		width: '60'
		        	},
		        	{
		        		field: 'lossWgt', 
		        		title: '감량체중', 
		        		align: 'center', 
		        		width: '60'
		        	},
		        	{
		        		field: 'rmiWgt', 
		        		title: '남은체중', 
		        		align: 'center', 
		        		width: '60'
		        	},
		        	{
		        		field: 'dosgYn', 
		        		title: '특별식', 
		        		align: 'center', 
		        		width: '80', 
		        		formatter: function(value, row) { return row.dosgYnNm; }
		        	},
		        	{
		        		field: 'mealTpCd', 
		        		title: '식사', 
		        		align: 'center', 
		        		width: '60', 
		        		formatter: function(value, row) { return row.mealTpCdNm; }
		        	},
		        	{
		        		field: 'stopYn', 
		        		title: '보류여부', 
		        		align: 'center', 
		        		width: '100', 
		        		formatter: function(value, row) { return row.stopYnNm; }
		        	}
		        ]]
			});
			
            /**************************************************************
             * 추천인명  autocomplete 생성
             **************************************************************/
            $('#saveCustFrm input[textboxName=dlg_rcmdCustNm]').combobox({
                mode        : 'remote',
                valueField  : 'value',
                textField   : 'value',
                panelHeight : 'auto',
                formatter 	: function( data) { return data.label; },
                onSelect    : function( data ) {
                    $('#saveCustFrm').form('load', {
                        dlg_rcmdCellNo  : data.cellNo,
                        dlg_rcmdCustId 	: data.id
                    });
                },
                onChange : function( newValue, oldValue ) {
                    if ( $isEmpty( newValue )) {
                        $('#saveCustFrm').form('load', {
                            dlg_rcmdCellNo  : '',
                            dlg_rcmdCustId 	: ''
                        });
                    }
                },
                loader: function(param, succ) {
	
                    //if ( $isEmpty(param.q)) { 
					//	return; 
					//}
                    $.ajax({
                        type: 'post',
                        url : "/api/v1/main/customer/findCustomer",
                        data: {
                            "custUsrNm" : $('#saveCustFrm input[textboxName=dlg_rcmdCustNm]').textbox('getValue'),
                            "custCellNo": $('#saveCustFrm input[textboxName=dlg_rcmdCellNo]').numberbox('getValue')
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
		     * 초기 바인딩
		     **************************************************************/
			//$('#saveCustFrm input[textboxName=dlg_custCellNo]').textbox('textbox').attr('maxlength', 11);
			/*$('#saveCustFrm input[textboxName=dlg_custCellNo2]').textbox({
				inputEvents: {
					keypress: function(e) {
						var tmp = $('<span></span>');
						tmp.html(String.fromCharCode(e.which));
						var c = tmp.text();
						tmp.remove();
						if ('0123456789'.indexOf(c) >= 0) {
							return true;
						} else {
							return false;
						}
					}
				}
			});*/
			$('#saveCustFrm input[textboxName=dlg_custCellNo2]').textbox('textbox').attr('maxlength', 4);
			/*$('#saveCustFrm input[textboxName=dlg_custCellNo3]').textbox({
				inputEvents: {
					keypress: function(e) {
						var tmp = $('<span></span>');
						tmp.html(String.fromCharCode(e.which));
						var c = tmp.text();
						tmp.remove();
						if ('0123456789'.indexOf(c) >= 0) {
							return true;
						} else {
							return false;
						}
					}
				}
			});*/
			$('#saveCustFrm input[textboxName=dlg_custCellNo3]').textbox('textbox').attr('maxlength', 4);
			$('#saveCustFrm input[textboxName=dlg_custBirthYy]').numberbox('textbox').attr('maxlength', 4);
			$('#saveCustFrm input[textboxName=dlg_custAge]').numberbox('textbox').attr('maxlength', 3);
			$('#saveCustFrm input[textboxName=dlg_custBirthYy]').numberbox({
				onChange: function(value) {
					var custAge = '';
					if (value.length === 4) {
						custAge = new Date().getFullYear() - Number(value) + 1;
						custAge = custAge > 0 ? custAge : '';
					}
					$('#saveCustFrm input[textboxName=dlg_custAge]').textbox('setValue', custAge);
				}
			});
			$('#custTabs').tabs({
				onSelect: function(title) {
					if (title === '마일리지') {
						RS1001PU02.syncCustMileage();
					}
				}
			});

		    /**************************************************************
		     * "고객정보 저장" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveCustomer").on("click", "#btnSaveCustomer", function (e) {

				RS1001PU02.saveCustInfo();
			});
			
		    /**************************************************************
		     * "마일리지 다시계산" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnCalcMileage").on("click", "#btnCalcMileage", function (e) {

				RS1001PU02.calcMileage();
			});
			
			/**************************************************************
		     * "상담차트 생성" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewCnstChart").on("click", "#btnNewCnstChart", function (e) {
				RS1001PU02.createCnstChart();
			});
			
			/**************************************************************
		     * "상담정보 저장" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveCnstChart").on("click", "#btnSaveCnstChart", function (e) {
				$.messager.confirm('Confirm', '차트정보를 저장하시겠습니까?', function(r) {
					if (!r) return;
					
					RS1001PU02.saveCnstChart();
				});
			});
			
			/**************************************************************
		     * "복용차트 생성" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewDosgChart").on("click", "#btnNewDosgChart", function (e) {
				RS1001PU02.createDosingChart();
			});
			
			/**************************************************************
		     * "복용차트 삭제" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnRemoveDosgChart").on("click", "#btnRemoveDosgChart", function (e) {
				RS1001PU02.removeDosingChart();
			});
			
			/**************************************************************
		     * 복용차트 체중 수정시
		     **************************************************************/
		    $('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox({
		    	onChange: function(value) {
		    		var orgWgt = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
		    		var tgtWgt = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
		    		var lossWgt = Number(orgWgt) - Number(value);
		    		var rmiWgt  = Number(value) - Number(tgtWgt);
		    		
		    		$('#dosgDlgFrm input[textboxName=dlg_lossWgt]').numberbox('setValue', lossWgt);
		    		$('#dosgDlgFrm input[textboxName=dlg_rmiWgt]').numberbox('setValue', rmiWgt);
		    	}
		    });
		    
			/**************************************************************
		     * "복용차트 저장" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveDosgChart").on("click", "#btnSaveDosgChart", function (e) {
				//$.messager.confirm('Confirm', '복용차트 정보를 저장하시겠습니까?', function(r) {
				//	if (!r) return;
					
					RS1001PU02.saveDosingChart();
				//});
			});
			
		    /**************************************************************
		     * "마일리지 다시계산" 버튼 클릭시 - 2
		     **************************************************************/
			$(document).off("click", "#btnCalcMileage2").on("click", "#btnCalcMileage2", function (e) {

				RS1001PU02.calcMileage2();
			});
			
			/**************************************************************
		     * "마일리지 저장" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveMileage").on("click", "#btnSaveMileage", function (e) {
				//$.messager.confirm('Confirm', '마일리지 정보를 저장하시겠습니까?', function(r) {
				//	if (!r) return;
					
					RS1001PU02.saveCustMileage();
				//});
			});
			
			
			/**************************************************************
		     * "마일리지 삭제" 버튼 클릭시
		     **************************************************************/
			$(document).off("click", "#btnDelMile").on("click", "#btnDelMile", function (e) {
				//$.messager.confirm('Confirm', '마일리지 정보를 저장하시겠습니까?', function(r) {
				//	if (!r) return;
					
					RS1001PU02.deleteCustMileage();
				//});
			});
		},
		saveCustInfo: function() {
			
			var custId    = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			var custUsrNm = $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue');
			if ($isEmpty(custUsrNm)) {
				$.messager.alert('고객정보 저장', '고객이름을 입력하세요.');
				return;
			}
			var custCellNo1 = $('#saveCustFrm select[textboxName=dlg_custCellNo1]').combobox('getValue');
			var custCellNo2 = $('#saveCustFrm input[textboxName=dlg_custCellNo2]').textbox('getValue');
			var custCellNo3 = $('#saveCustFrm input[textboxName=dlg_custCellNo3]').textbox('getValue');
			var custCellNo = custCellNo1 + custCellNo2 + custCellNo3;
			if ($isEmpty(custCellNo) || custCellNo.length < 10) {
				$.messager.alert('고객정보 저장', '휴대폰번호를 입력하세요.');
				return;
			}
			
			var custBirthYy = $('#saveCustFrm input[textboxName=dlg_custBirthYy]').numberbox('getValue');
			var custBirthMm = $('#saveCustFrm select[textboxName=dlg_custBirthMm]').combobox('getValue');
			var custBirthDd = $('#saveCustFrm select[textboxName=dlg_custBirthDd]').combobox('getValue');
			var custBirthDt = custBirthYy + custBirthMm + custBirthDd;
			var custGenTpCd = $('#saveCustFrm input[name=dlg_custGenTpCd]:checked').val();
			if ($isEmpty(custGenTpCd)) {
				$.messager.alert('고객정보 저장', '성별을 선택하세요.');
				return;
			}
			
			$.messager.confirm('Confirm', '고객정보를 저장하시겠습니까?', function(r) {
				if (!r) return;
				
				var formData = {
					criteria : {
						//"rsvtId" 		: 	$('#saveCustFrm input[textboxName=dlg_rsvtId]').textbox('getValue'),
						"rsvtId" 		: 	$('#saveCustFrm input[name=dlg_rsvtId]').val(),
						"custId" 		: 	custId,
						"custUsrNm" 	: 	custUsrNm,
						"custCellNo" 	: 	custCellNo,
						"custBirthDt" 	: 	custBirthDt,
						"custGenTpCd" 	: 	custGenTpCd,
						"custAge" 		:   $('#saveCustFrm input[textboxName=dlg_custAge]').numberbox('getValue'),
						"zipCode" 		: 	$('#saveCustFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
						"addr1" 		: 	$('#saveCustFrm input[textboxName=dlg_addr1]').textbox('getValue'),
						"addr2" 		: 	$('#saveCustFrm input[textboxName=dlg_addr2]').textbox('getValue'),
						"delYn" 		: 	$('#saveCustFrm input[name=dlg_delYn]').val(),
						"custMemo" 		:	$('#saveCustFrm textarea[textboxName=dlg_custMemo]').textbox('getValue'),
						"custMemo2" 	:	$('#saveCustFrm textarea[textboxName=dlg_custMemo2]').textbox('getValue'),
						"rcmdCustId" 	:	$('#saveCustFrm input[name=dlg_rcmdCustId]').val(),
						"rcmdCustNm" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCustNm]').textbox('getValue'),
						"rcmdCellNo" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCellNo]').numberbox('getValue'),
						"custRegYear" 	:   $('#saveCustFrm input[textboxName=dlg_custRegYear]').numberbox('getValue')
					}
				};
				
				$.ajax({
					url: '/reservation/RS1001PU02/saveCustomer_2',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							var custId 	  = res.data;

							var custUsrNm   = $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue');
							var custAge     = $('#saveCustFrm input[textboxName=dlg_custAge]').numberbox('getValue');
							var custCellNo1 = $('#saveCustFrm select[textboxName=dlg_custCellNo1]').combobox('getValue');
							var custCellNo2 = $('#saveCustFrm input[textboxName=dlg_custCellNo2]').textbox('getValue');
							var custCellNo3 = $('#saveCustFrm input[textboxName=dlg_custCellNo3]').textbox('getValue');
							var custCellNo  = custCellNo1 + "-" + custCellNo2 +"-" + custCellNo3;
/*							var custGenTpNm = $('#saveCustFrm input[textboxName=dlg_custGenTpCd]').radiobutton('getValue');
							var selectedcustRegYear = $('#saveCustFrm input[textboxName=dlg_custRegYear]').numberbox('getValue');*/

							//고객차트탭의 고객번호 업데이트
							$('#saveCustFrm input[textboxName=dlg_custId]').textbox('setValue', custId);

							//차트정보탭의 고객명/고객번호 업데이트(고객테이블정보사용)
							$('input[textboxName=selectedCustId]').textbox('setValue'    , custId);
							$('input[textboxName=selectedCustUsrNm]').textbox('setValue' , custUsrNm);
							$('input[textboxName=selectedCustAge]').textbox('setValue'   , custAge);
							$('input[textboxName=selectedCustCellNo]').textbox('setValue', custCellNo );
							
							
							

							//고객번호 있는 경우 차트탭 활성화
							$('#custTabs').tabs('enableTab', 1);
							$('#custTabs').tabs('enableTab', 2);
							
							$.messager.show({ title: '고객정보 저장', msg: res.message });
						} else {
							$.messager.alert('고객정보 저장', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('고객정보 저장', xhr.responseJSON.message, 'error');
					}
				});
			});
		},
		calcMileage: function() {
			// 고객 마일리지 점수 계산.
			$.messager.confirm('Confirm', '마일리지 점수를 다시 계산하시겠습니까?<br>마일리지 점수 변경 후에는 반드시 고객정보를 저장하셔야 합니다.', function(r) {
				if (!r) return;
				
				var mileageCnt = 0;
				$('#rcmdIds').find('input[checkboxname="dlg_rcmdYn[]"]').each(function(index, item) {
					if (!$(item).checkbox('options').checked) {
						mileageCnt++;
					}
				});
				$('#saveCustFrm input[textboxName=dlg_mileage]').numberbox('setValue', mileageCnt * 10);
			});
		},
		createCnstChart: function() {
			var custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			var formData = {
				criteria : {
					"custId" 	: custId		
				}
			};
			
			$.messager.confirm('Confirm', '신규 상담차트를 생성하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/main/chart/createCnstChart',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: 'Success', msg: res.message });
							
							RS1001PU02.fnCnstChart(); // 상담차트 조회
						} else {
							$.messager.alert('Error', res.message);
							return;
						}
					}
				});
			});
		},
		fnCnstChart: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			//queryParams.custId = gCustId;
			
			$('#dg').datagrid('load', '/api/v1/main/chart/findAllChartByCustId');
		},
		fnPaperChart: function() {
			var formData = {
				criteria: {
					cnstId : $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue')
				}
			};
			
			$.ajax({
				url: '/reservation/RS1001PU02/findPaperChartByCnstId_2',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(formData),
				success: function(res) {
					if (res.status === 'success') {
						var html = '';
						$.each(res.data, function(index, item) {
							html += item.paperHtml;
						});
						$('#cnstPaper').html(html);
						$.parser.parse($('#cnstPaper'));
									
						//화면 그린후에 textarea dp 
						$("#cnstPaper textarea").on('keydown keyup', function ( e ) {
							$(this).height(1).height( $(this).prop('scrollHeight') );	
							
							//RS1001PU02.textareaAutoHeight( $(this) );
						});
						setTimeout(function() {
							$("#cnstPaper textarea").keyup();
						}, 1000);

					} else {
						$.messager.alert('Error', res.message);
						return;
					}
				}
			});
		},
		fnDosingChart: function() {
			var queryParams = $("#dg2").datagrid('options').queryParams;
			queryParams.custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			queryParams.cnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			
			$('#dg2').datagrid('load', '/api/v1/main/chart/findDosingChartByCnstId');
		},
		saveCnstChart: function() {
			
			// 상담차트
			var selectedCustId 	= $('#custCnstFrm input[textboxName=selectedCustId]').textbox('getValue');
			var selectedCnstId 	= $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			var cnstDt          = $('#saveCnstFrm input[textboxName=cnstDt]').datebox('getValue');
			var cnstDtHh        = $('#saveCnstFrm select[textboxName=cnstDtHh]').combobox('getValue');
			var cnstDtMm        = $('#saveCnstFrm select[textboxName=cnstDtMm]').combobox('getValue');
			var presDesc 	   	= $('#saveCnstFrm textarea[textboxName=presDesc]').textbox('getValue');
			var cnstDesc 	   	= $('#saveCnstFrm textarea[textboxName=cnstDesc]').textbox('getValue');
			var payDesc 	   	= $('#saveCnstFrm textarea[textboxName=payDesc]').textbox('getValue');
			var picUsrNo 	   	= $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getValue');
			var picUsrNoNm     	= $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getText');
			var pic2UsrNo 	   	= $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getValue');
			var pic2UsrNoNm    	= $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getText');
			
			var orgWgt 		   	= $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
			var tgtWgt 		   	= $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
			var startDosgDt    	= $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
			var cnstHhCd 	   	= $('#saveCnstFrm select[textboxName=cnstHhCd]').combobox('getValue');
			var cnstHhMemo 	   	= $('#saveCnstFrm input[textboxName=cnstHhMemo]').textbox('getValue');
			var cateTpCd 	   	= $('#saveCnstFrm select[textboxName=cateTpCd]').combobox('getValue');
			var cateTpVal 	   	= $('#saveCnstFrm select[textboxName=cateTpVal]').combobox('getValue');
			var dosgTpCd 	   	= $('#saveCnstFrm select[textboxName=dosgTpCd]').combobox('getValue');
			var dosgTpVal 	   	= $('#saveCnstFrm select[textboxName=dosgTpVal]').combobox('getValue');
			var payTpCd 	   	= $('#saveCnstFrm select[textboxName=payTpCd]').combobox('getValue');
			var dlvDt 		   	= $('#saveCnstFrm input[textboxName=dlvDt]').datebox('getValue');
			var dlvDpuYn        = $('#saveCnstFrm input[checkboxname=dlvDpuYn]').checkbox('options').checked;


			if( $isEmpty(selectedCnstId) ) {
				$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			if( $isEmpty(cnstDt) ) {
				$.messager.alert( "상담차트 선택", "상담정보 상담일시에서 '상담일'을 선택해 주세요.");
				return false;
			}
			if( $isEmpty(cnstDtHh) ) {
				$.messager.alert( "상담차트 선택", "상담정보 상담일시에서 '시간'을 선택해 주세요.");
				return false;
			}
			if( $isEmpty(cnstDtMm) ) {
				$.messager.alert( "상담차트 선택", "상담정보 상담일시에서 '분'을 선택해 주세요.");
				return false;
			}
			// 설문차트
			var cnstPaperSize = $('#cnstPaper tr').length;
			var cnstPaperList = [];
			for (var i = 0; i < cnstPaperSize; i++) {
				var paperObj = $("#cnstPaper tr").eq(i).find("td").eq(1);
				var cnstPaperKind = paperObj.attr("data-el");
				var cnstPaperId = paperObj.attr("data-nm");
				var cnstPaperVer = paperObj.attr("data-ver");
				var cnstPaperNum = paperObj.attr("data-num");
				var cnstPaperAttr = paperObj.attr("data-attr");
				var cnstPaperVal = "";
				if (cnstPaperKind === "TEXT") {
					cnstPaperVal = paperObj.find("input[type='text']").val();
				} else if (cnstPaperKind === "TEXTAREA") {
					cnstPaperVal = paperObj.find("TEXTAREA").val();
				} else if (cnstPaperKind === "CHECK") {
					var len = paperObj.find("input[type='checkbox']").length;
					var c = 0;
					for (var j = 0; j < len; j++) { 
						if (paperObj.find("input[type='checkbox']")[j].checked) {
							if (c === 0) 
								cnstPaperVal = paperObj.find("input[type='checkbox']")[j].value;
							else
								cnstPaperVal += ','+ cnstPaperVal + paperObj.find("input[type='checkbox']")[j].value;
							c++; 
						}
					}
				} else if (cnstPaperKind === "RADIO") {
					cnstPaperVal = paperObj.find("input[type='radio']:checked").val();
				}
				
				cnstPaperList.push({
					"cnstId" 		: selectedCnstId,
					"cnstPaperId" 	: cnstPaperId,
					"cnstPaperVer" 	: cnstPaperVer,
					"cnstPaperNum" 	: cnstPaperNum,
					"cnstPaperVal" 	: cnstPaperVal
				});
				
				// 상담차트 체중 업데이트
				//if (cnstPaperAttr === 'ORG_WGT') orgWgt = orgWgt != null ? orgWgt : Number(cnstPaperVal);
				//if (cnstPaperAttr === 'TGT_WGT') tgtWgt = tgtWgt != null ? tgtWgt : Number(cnstPaperVal);
			}
			
			var formData = {
				criteria: {
					"cnstId" 		: selectedCnstId,
					"custId" 		: selectedCustId,
					"cnstDt" 		: $isEmpty(cnstDt) ? "" : moment(cnstDt).format("YYYYMMDD"),
					"cnstDtHh" 		: cnstDtHh,
					"cnstDtMm" 		: cnstDtMm,
					"presDesc" 		: presDesc,
					"cnstDesc" 		: cnstDesc,
					"picUsrNo"		: picUsrNo,
					"pic2UsrNo"		: pic2UsrNo,
					"orgWgt"		: orgWgt,
					"tgtWgt"		: tgtWgt,
					"startDosgDt" 	: startDosgDt,
					"cnstHhCd"		: cnstHhCd,
					"cnstHhMemo"	: cnstHhMemo,
					"cateTpCd"		: cateTpCd,
					"cateTpVal"		: cateTpVal,
					"dosgTpCd"		: dosgTpCd,
					"dosgTpVal"		: dosgTpVal,
					"payTpCd" 		: payTpCd,
					"payDesc"       : payDesc,
					"dlvDt" 		: $isEmpty(dlvDt) ? "" : moment(dlvDt).format("YYYYMMDD"),
					"dlvDpuYn"      : dlvDpuYn ? "Y" : "N",
					"srvChartList" 	: cnstPaperList
				}
			};
			
			$.ajax({
				url: '/api/v1/main/chart/saveCnstChart_2',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(formData),
				success: function(res) {
					if (res.status === 'success') {
						$.messager.show({ title: '상당차트 저장', msg: res.message });
						
						RS1001PU02.fnCnstChart(); // 상담차트 조회
					} else {
						$.messager.alert('상당차트 저장', res.message);
						return;
					}
				},
				error: function(xhr, status, error) {
					$.messager.alert('상당차트 저장', xhr.responseJSON.message, 'error');
				}
			});
		},
		removeCnstChart: function(selectedCnstId) {
			/*************************************************
			 * 상담차트 삭제 (상담차트/설문차트)
			 **************************************************/
			if( selectedCnstId == "" ) {
				$.messager.alert( "상담차트 삭제", "상담차트 목록에서 '삭제' 버튼을 클릭해 주세요.");
				return false;
			}
			var formData = {
				"cnstId" 	  : selectedCnstId
			};
		
			$.messager.confirm('Confirm', '선택한 상담차트를 삭제하시겠습니까?', function(r) {
				if (!r) return;
				
				$.post('/api/v1/main/chart/deleteChart', formData, function(res) {
					if (res.status === 'success') {
						$.messager.show({ title: 'Success', msg: res.message });
						
						RS1001PU02.fnCnstChart(); // 상담차트 조회
					} else {
						$.messager.show({ title: 'Error', msg: res.message });
						return;
					}
				}, 'json')
				.fail(function(xhr, status, error) {
					$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
					return;
				});
			});
		},
		createDosingChart: function() {
			// 상담차트
			var selectedCnstId 	= $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			var startDosgDt 	= $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
			var cateTpCd 	    = $('#saveCnstFrm select[textboxName=cateTpCd]').combobox('getValue');
			var cateTpVal 	    = $('#saveCnstFrm select[textboxName=cateTpVal]').combobox('getValue');
			var dosgTpCd 	    = $('#saveCnstFrm select[textboxName=dosgTpCd]').combobox('getValue');
			var dosgTpVal 	    = $('#saveCnstFrm select[textboxName=dosgTpVal]').combobox('getValue');

			if( $isEmpty(selectedCnstId) ) {
				$.messager.alert("상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나<br>신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			if( $isEmpty(cateTpCd) || cateTpCd == 0) {
				$.messager.alert("복용차트 생성", "상담정보에서 '감량/요요' 유형을 선택해 주세요.");
				return false;
			}
			if( $isEmpty(cateTpVal) || cateTpVal == 0) {
				$.messager.alert("복용차트 생성", "상담정보에서 '감량/요요' 월을 선택해 주세요.");
				return false;
			}
			if( $isEmpty(dosgTpCd) || dosgTpCd == 0) {
				$.messager.alert("복용차트 생성", "상담정보에서 '감량종류' 유형을 선택해 주세요.");
				return false;
			}
			if( $isEmpty(dosgTpVal) || dosgTpVal == 0) {
				$.messager.alert("복용차트 생성", "상담정보에서 '감량종류' 일을 선택해 주세요.");
				return false;
			}
			
			if( $isEmpty(startDosgDt) ) {
				$.messager.alert("복용시작일자 선택", "복용시작일자를 입력 후 [복용차트생성] 버튼을 클릭 해주세요.<br>복용시작일자 하루전부터 스케쥴이 자동생성됩니다.");
				return false;
			}
			var formData = {
				criteria: {
					"cnstId" 		: selectedCnstId,
					"startDosgDt" 	: startDosgDt,
					"cateTpCd" 		: cateTpCd,
					"cateTpVal" 	: cateTpVal,
					"dosgTpCd" 		: dosgTpCd,
					"dosgTpVal"		: dosgTpVal
				}
			};
			//이미 복용차트가 생성되어 있는 경우 삭제후 다시 생성될 것인지를 확인한다.
			var gridList = $('#dg2').datagrid('getRows');
			if( gridList != null && gridList.length > 0) {
				$.messager.alert("Warning","이미 복용차트가 생성되어 있습니다.<br>복용스케쥴의 일자를 변경하시기 바랍니다.");
				return false;
			}
			
			$.messager.confirm('Confirm', '신규 복용차트를 생성하시겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/main/chart/createDosingChart_2',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '복용차트 생성', msg: res.message });
							
							RS1001PU02.fnCnstChart(); // 상담차트 조회
						} else {
							$.messager.alert('복용차트 생성', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('복용차트 생성', xhr.responseJSON.message, 'error');
					}
				});
			});
		},
		removeDosingChart: function() {
			// 상담차트
			var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			if( $isEmpty(selectedCnstId) ) {
				$.messager.alert("상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나<br>신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			var formData = {
				criteria: {
					"cnstId" 		: selectedCnstId
				}
			};
			//이미 복용차트가 생성되어 있는 경우 삭제후 다시 생성될 것인지를 확인한다.
			var gridList = $('#dg2').datagrid('getRows');
			if (gridList == null || gridList.length === 0) {
				$.messager.alert("Warning","생성된 복용차트가 존재하지 않습니다.");
				return false;
			}
			
			$.messager.confirm('Confirm', '현재 복용차트를 삭제하시겠습니까?<br>복용차트의 모든 스케줄이 삭제 처리됩니다.', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/api/v1/main/chart/removeDosingChart_2',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '복용차트 삭제', msg: res.message });
							
							RS1001PU02.fnCnstChart(); // 상담차트 조회
						} else {
							$.messager.alert('복용차트 삭제', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('복용차트 삭제', xhr.responseJSON.message, 'error');
					}
				});
			});
		},
		saveDosingChart: function() {
			var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			if( selectedCnstId == "" ) {
				$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나<br>신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			var dosgId     = $('#dosgDlgFrm input[name=dlg_dosgId]').val();
			var dosgSeq    = $('#dosgDlgFrm input[name=dlg_dosgSeq]').val();
			var dosgLvCd   = $('#dosgDlgFrm input[name=dlg_dosgLvCd]').val();
			var dosgTpCd   = $('#dosgDlgFrm select[textboxName=dlg_dosgTpCd]').combobox('getValue');
			var dosgDt     = $('#dosgDlgFrm input[textboxName=dlg_dosgDt]').datebox('getValue');
			var callYn     = $('#dosgDlgFrm select[textboxName=dlg_callYn]').combobox('getValue');
			var dosgYn     = $('#dosgDlgFrm select[textboxName=dlg_dosgYn]').combobox('getValue');
			var pausYn     = $('#dosgDlgFrm select[textboxName=dlg_pausYn]').combobox('getValue');
			var stopYn     = $('#dosgDlgFrm select[textboxName=dlg_stopYn]').combobox('getValue');
			var mealTpCd   = $('#dosgDlgFrm select[textboxName=dlg_mealTpCd]').combobox('getValue');
			var currWgt    = $('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox('getValue');
			var lossWgt    = $('#dosgDlgFrm input[textboxName=dlg_lossWgt]').numberbox('getValue');
			var rmiWgt     = $('#dosgDlgFrm input[textboxName=dlg_rmiWgt]').numberbox('getValue');
			var dosgDesc1  = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc1]').textbox('getValue');
			var dosgDesc2  = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc2]').textbox('getValue');
			var smsYn      = $('#dosgDlgFrm select[textboxName=dlg_smsYn]').combobox('getValue');
			
			var formData = {
				criteria: {
					"cnstId" 	:	selectedCnstId,
					"dosgId" 	:	dosgId,
					"dosgSeq" 	: 	dosgSeq,
					"dosgLvCd" 	:	dosgLvCd,
					"dosgTpCd" 	:   dosgTpCd,
					"dosgDt" 	:	moment(dosgDt).format("YYYYMMDD"),
					"callYn" 	:	callYn,
					"dosgYn" 	: 	dosgYn,
					"pausYn" 	: 	pausYn,
					"stopYn" 	: 	stopYn,
					"mealTpCd" 	: 	mealTpCd,
					"currWgt" 	: 	currWgt,
					"lossWgt" 	:	lossWgt,
					"rmiWgt" 	:	rmiWgt,
					"dosgDesc1" :	dosgDesc1,
					"dosgDesc2" : 	dosgDesc2,
					"smsYn" 	:   smsYn
				}
			};
			
			$.ajax({
				url: '/api/v1/main/survey/saveDosingChart_2',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(formData),
				success: function(res) {
					if (res.status === 'success') {
						$.messager.show({ title: '복용차트 저장', msg: res.message });
						
						RS1001PU02.fnDosingChart(); // 복용차트 조회
					} else {
						$.messager.alert('복용차트 저장', res.message);
						return;
					}
				},
				error: function(xhr, status, error) {
					$.messager.alert('복용차트 저장', xhr.responseJSON.message, 'error');
				}
			});
		},
		calcMileage2: function() {
			// 고객 마일리지 점수 계산.
			$.messager.confirm('Confirm', '마일리지 점수를 다시 계산하시겠습니까?<br>마일리지 점수 계산 후에는 반드시 마일리지정보를 저장하셔야 합니다.', function(r) {
				if (!r) return;
				
				var mileage = 0;
				var rcmdMileage = 0;
				var rcmdMileYn = [];
				var rcmdMilePnt = [];
				$('#rcmdMileIds').find('input[checkboxname="dlg_rcmdMileYn[]"]').each(function(index, item) {
					rcmdMileYn.push( ($(item).checkbox('options').checked) ? 'Y' : 'N' );
				});
				$('#rcmdMileIds').find('input[textboxName="dlg_rcmdMilePnt[]"]').each(function(index, item) {
					rcmdMilePnt.push( $(item).val() );
				});
				for (var i = 0; i < rcmdMileYn.length; i++) {
					if (rcmdMileYn[i] === 'N') {
						rcmdMileage = rcmdMileage + Number(rcmdMilePnt[i]);
					}
				}
				
				var payMileage = 0;
				var payMileYn = [];
				var payMilePnt = [];
				$('#payMileIds').find('input[checkboxname="dlg_payMileYn[]"]').each(function(index, item) {
					payMileYn.push( ($(item).checkbox('options').checked) ? 'Y' : 'N' );
				});
				$('#payMileIds').find('input[textboxName="dlg_payMilePnt[]"]').each(function(index, item) {
					payMilePnt.push( $(item).val() );
				});
				for (var i = 0; i < payMileYn.length; i++) {
					if (payMileYn[i] === 'N') {
						payMileage = payMileage + Number(payMilePnt[i]);
					}
				}
				mileage = Number(rcmdMileage) + Number(payMileage); 
				
				$('#saveMileFrm input[textboxName=dlg_rcmdMileage]').numberbox('setValue', rcmdMileage);
				$('#saveMileFrm input[textboxName=dlg_payMileage]').numberbox('setValue', payMileage);
				$('#saveMileFrm input[textboxName=dlg_mileage]').numberbox('setValue', mileage);
			});
		},
		saveCustMileage: function() {
			var custId    	 = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			var mileage 	 = $('#saveMileFrm input[textboxName=dlg_mileage]').numberbox('getValue');
			var mileageMemo  = $('#saveMileFrm input[textboxName=dlg_mileageMemo]').textbox('getValue');
			
			// 추천인 마일리지 사용 목록
			var rcmdMileList = [];
			var rcmdCustId = [];
			var rcmdMileYn = [];
			var rcmdMilePnt = [];
			var rcmdMileMemo = [];
			$('#rcmdMileIds').find('input[checkboxname="dlg_rcmdMileYn[]"]').each(function(index, item) {
				rcmdCustId.push( $(item).val() );
				rcmdMileYn.push( ($(item).checkbox('options').checked) ? 'Y' : 'N' );
			});
			$('#rcmdMileIds').find('input[textboxName="dlg_rcmdMilePnt[]"]').each(function(index, item) {
				rcmdMilePnt.push( $(item).val() );
			});
			$('#rcmdMileIds').find('input[textboxName="dlg_rcmdMileMemo[]"]').each(function(index, item) {
				rcmdMileMemo.push( $(item).val() );
			});
			for (var i = 0; i < rcmdCustId.length; i++) {
				rcmdMileList.push({
					"custId" 	 	: rcmdCustId[i],
					"rcmdCustId" 	: custId,
					"rcmdMileYn" 	: rcmdMileYn[i],
					"rcmdMilePnt" 	: rcmdMilePnt[i],
					"rcmdMileMemo" 	: rcmdMileMemo[i]
				});
			}
			
			// 상담결재 마일리지 사용 목록
			var payMileList = [];
			var payCnstId = [];
			var payMileYn = [];
			var payMilePnt = [];
			var payMileMemo = [];
			$('#payMileIds').find('input[checkboxname="dlg_payMileYn[]"]').each(function(index, item) {
				payCnstId.push( $(item).val() );
				payMileYn.push( ($(item).checkbox('options').checked) ? 'Y' : 'N' );
			});
			$('#payMileIds').find('input[textboxName="dlg_payMilePnt[]"]').each(function(index, item) {
				payMilePnt.push( $(item).val() );
			});
			$('#payMileIds').find('input[textboxName="dlg_payMileMemo[]"]').each(function(index, item) {
				payMileMemo.push( $(item).val() );
			});
			for (var i = 0; i < payCnstId.length; i++) {
				payMileList.push({
					"cnstId" 	 	: payCnstId[i],
					"cstId" 		: custId,
					"payMileYn" 	: payMileYn[i],
					"payMilePnt" 	: payMilePnt[i],
					"payMileMemo" 	: payMileMemo[i]
				});
			}
			// 마일리지 다시 계산
			var mileage = 0;
			var rcmdMileage = 0;
			for (var i = 0; i < rcmdMileYn.length; i++) {
				if (rcmdMileYn[i] === 'N') {
					rcmdMileage = rcmdMileage + Number(rcmdMilePnt[i]);
				}
			}
			var payMileage = 0;
			for (var i = 0; i < payMileYn.length; i++) {
				if (payMileYn[i] === 'N') {
					payMileage = payMileage + Number(payMilePnt[i]);
				}
			}
			mileage = Number(rcmdMileage) + Number(payMileage); 
			
			$('#saveMileFrm input[textboxName=dlg_rcmdMileage]').numberbox('setValue', rcmdMileage);
			$('#saveMileFrm input[textboxName=dlg_payMileage]').numberbox('setValue', payMileage);
			$('#saveMileFrm input[textboxName=dlg_mileage]').numberbox('setValue', mileage);
							
			var formData = {
				criteria: {
					"custId" 		:	custId,
					"mileage" 		:	mileage,
					"mileageMemo" 	: 	mileageMemo,
					"rcmdMileList" 	:   rcmdMileList,
					"payMileList" 	:   payMileList
				}
			};
			
			$.ajax({
				url: '/reservation/RS1001PU02/saveCustMileage',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(formData),
				success: function(res) {
					if (res.status === 'success') {
						$.messager.show({ title: '마일리지 저장', msg: res.message });
					} else {
						$.messager.alert('마일리지 저장', res.message);
						return;
					}
				},
				error: function(xhr, status, error) {
					$.messager.alert('마일리지 저장', xhr.responseJSON.message, 'error');
				}
			});
		},
		syncCustMileage: function() {
			var custId    	 = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
			var formData = {
				criteria: {
					"custId" 		:	custId
				}
			};

			$.ajax({
				url: '/reservation/RS1001PU02/syncCustMileage',
				method: 'post',
				contentType: 'application/json',
				dataType: 'json',
				data: JSON.stringify(formData),
				success: function(res) {
					if (res.status === 'success') {
						var data = res.data;
						var mileage = Number(data.rcmdMileage) + Number(data.payMileage); 
			
						$('#saveMileFrm input[textboxName=dlg_rcmdMileage]').numberbox('setValue', data.rcmdMileage);
						$('#saveMileFrm input[textboxName=dlg_payMileage]').numberbox('setValue', data.payMileage);
						$('#saveMileFrm input[textboxName=dlg_mileage]').numberbox('setValue', mileage);
						
						// 상담결재 마일리지
						$('#payMileIds').empty();
						var html = '';
						for (var i = 0; i < data.payMileList.length; i++) {
							html += '<tr>';
							html += '<th scope="row" class="col-2" style="vertical-align: middle;">'+ data.payMileList[i].cnstDt +'</th>';
							html += '<td class="col-3" style="vertical-align: middle;">'+ data.payMileList[i].payTpCdNm +'</td>';
							html += '<td class="col-2" style="vertical-align: middle;text-align: center;">';
							html += '	<input class="easyui-checkbox" name="dlg_payMileYn[]" value="'+ data.payMileList[i].cnstId +'" '+ (data.payMileList[i].payMileYn === 'Y' ? 'checked="checked"' : '') +'>';
							html += '</td>';
							html += '<td class="col-2">';
							html += '	<input class="easyui-numberbox" name="dlg_payMilePnt[]" style="width: 100%;height: 26px;text-align: center;" value="'+ data.payMileList[i].payMilePnt +'">';
							html += '</td>';
							html += '<td class="col-3">';
							html += '	<input class="easyui-textbox" name="dlg_payMileMemo[]" style="width: 100%;height: 26px;" value="'+ data.payMileList[i].payMileMemo +'">';
							html += '</td>';
							html += '</tr>';
						}
						$('#payMileIds').append(html);
						$.parser.parse($('#payMileIds'));
						
						//추천 마일리지
						$('#rcmdMileIds').empty();
						html = '';
						for (var i = 0; i < data.rcmdMileList.length; i++) {
							html += '<tr>';
							html += '<th scope="row" class="col-2" style="vertical-align: middle;">'+ data.rcmdMileList[i].custUsrNm +'</th>';
							html += '<td class="col-3" style="vertical-align: middle;">'+ data.rcmdMileList[i].custCellNo +'</td>';
							html += '<td class="col-2" style="vertical-align: middle;text-align: center;">';
							html += '	<input class="easyui-checkbox" name="dlg_rcmdMileYn[]" value="'+ data.rcmdMileList[i].custId +'" '+ (data.rcmdMileList[i].rcmdMileYn === 'Y' ? 'checked="checked"' : '') +'>';
							html += '</td>';
							html += '<td class="col-2">';
							html += '	<input class="easyui-numberbox" name="dlg_rcmdMilePnt[]" style="width: 100%;height: 26px;text-align: center;" value="'+ data.rcmdMileList[i].rcmdMilePnt +'">';
							html += '</td>';
							html += '<td class="col-3">';
							html += '	<input class="easyui-textbox" name="dlg_rcmdMileMemo[]" style="width: 100%;height: 26px;" value="'+ data.rcmdMileList[i].rcmdMileMemo +'">';
							html += '</td>';
							html += '</tr>';
						}
						html += '</tr>';
						$('#rcmdMileIds').append(html);
						$.parser.parse($('#rcmdMileIds'));
					} else {
						$.messager.alert('마일리지', res.message);
						return;
					}
				},
				error: function(xhr, status, error) {
					$.messager.alert('마일리지', xhr.responseJSON.message, 'error');
				}
			});
		},
		textareaAutoHeight : function(textEle) {
			textEle.css("height", 'auto');
			var textEleHeight = textEle.prop('scrollHeight');
			textEle.css('height', textEleHeight);
		}

	};
	
	// init
	RS1001PU02.init();
	RS1001PU02.fnCnstChart();
});
