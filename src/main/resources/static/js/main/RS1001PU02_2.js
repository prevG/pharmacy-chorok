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
	var gC1016 = [];
	var gC1017 = [];
	var gC1021 = [];

	var RS1001PU02 = {
		dg2EditIndex: -1,
		dg2EndEditing: function() {
			if (RS1001PU02.dg2EditIndex === -1) return true;
			$('#dg2').datagrid('endEdit', RS1001PU02.dg2EditIndex);
			RS1001PU02.dg2EditIndex = -1;
			return true;
		},
		init: function() {
			gC1016 = getCodeData('C1016'); // 한약사/상담실장
			gC1017 = getCodeData('C1017'); // 예/아니오
			gC1021 = getCodeData('C1021'); // 통화여부 코드
			
            /**************************************************************
             * 상담차트 목록
             **************************************************************/
			$('#dg').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'custId',
			    rownumbers: true,
				fitColumns: true, 
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
					$('#saveCnstFrm').form('load', {
						selectedIndex	: index,
						selectedCnstId 	: row.cnstId,
						cnstDt 			: row.cnstDt,
						picUsrNo		: row.picUsrNo,
						pic2UsrNo		: row.pic2UsrNo,
						cnstHhCd		: row.cnstHhCd,
						cnstHhMemo		: row.cnstHhMemo,
						dosgTpCd		: row.dosgTpCd,
						payTpCd 		: row.payTpCd,
						dlvDt 			: row.dlvDt,
						cnstDesc 		: row.cnstDesc
					});
					// 설문차트
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
						field: 'cnstId', 
						title: '상담번호',
						align: 'center',  
						width: '70',
		        		formatter: function(value, row, index) { return '<span style="font-weight:bold;">'+ value +'</span>'; }
					},
		        	{
		        		field: 'cnstDt', 
		        		title: '상담일시', 
		        		align: 'center', 
		        		width: '110', 
		        		editor: 'text',
		        		formatter: function(value, row, index) { return '<span style="font-weight:bold;">'+ value +'</span>'; }
		        	},
		        	{
		        		field: 'picUsrNoVal', 
		        		title: '상담한약사', 
		        		align: 'center', 
		        		width: '70', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'pic2UsrNoVal', 
		        		title: '상담실장', 
		        		align: 'center', 
		        		width: '70', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'dosgTpCd', 
		        		title: '복용유형', 
		        		align: 'center', 
		        		width: '120', 
		        		editor: 'text',
		        		formatter: function(value, row) { return row.dosgTpCdVal; }
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
			    idField: 'custId',
			    rownumbers: true,
				fitColumns: true, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        dragSelection: true,
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
		        },
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
		        },
		        onDblClickCell: function(index, field, value) {
		        	/*
		        	var row = $(this).datagrid('getRows')[index];
		        	if (!row) return;
		        	
		        	$('#dosgDlgFrm').form('load', {
		        		dlg_dosgId 		: row.dosgId,
		        		dlg_dosgSeq		: row.dosgSeq,
		        		dlg_dosgSeqStr 	: row.dosgSeqStr,
		        		dlg_dosgLvCd 	: row.dosgLvCd,
		        		dlg_dosgLvCdVal : row.dosgLvCdVal,
		        		dlg_dosgDt 		: row.dosgDt,
		        		dlg_callYn 		: row.callYn,
		        		dlg_dosgYn 		: row.dosgYn,
		        		dlg_pausYn 		: row.pausYn,
		        		dlg_currWgt 	: row.currWgt,
		        		dlg_lossWgt 	: row.lossWgt,
		        		dlg_rmiWgt 		: row.rmiWgt,
		        		dlg_dosgDesc1 	: row.dosgDesc1,
		        		dlg_dosgDesc2 	: row.dosgDesc2
		        	});
		        
		        	$('#dosgDlg').dialog('open').dialog('center').dialog('setTitle','복용차트 정보');
		        	*/
		        },
		        columns:[[
					{
		        		field: 'dosgLvCd', 
		        		title: '복용단계', 
		        		align: 'center', 
		        		width: '110', 
		        		formatter: function(value, row, index) { return '<span style="font-weight:bold;">'+ row.dosgLvCdVal +'</span>'; }
		        	},
		        	{
		        		field: 'dosgSeq', 
		        		title: '일수', 
		        		align: 'center', 
		        		width: '80', 
		        		formatter: function(value, row) { return row.dosgSeqStr; }
		        	},
		        	{
		        		field: 'dosgDt', 
		        		title: '복용일자', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'datebox',
		        		formatter: function(value, row) {
		        			return myformatter(value);
		        		},
		        		parser: function(value) {
		        			return myparser(value);
		        		}
		        	},
		        	{
		        		field: 'daysStrKor', 
		        		title: '요일', 
		        		align: 'center', 
		        		width: '70'
		        	},
		        	{
		        		field: 'callYn', 
		        		title: '상담예약', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: {
		        			type: 'combobox',
		        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1016, required: true }
		        		}, 
		        		formatter: function(value, row) { return row.callYnVal; }
		        	},
		        	{
		        		field: 'dosgYn', 
		        		title: '복용여부', 
		        		align: 'center', 
		        		width: '90', 
		        		editor: {
		        			type: 'combobox',
		        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1017, required: true }
		        		}, 
		        		formatter: function(value, row) { return row.dosgYnVal; }
		        	},
		        	{
		        		field: 'pausYn', 
		        		title: '통화여부', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: {
		        			type: 'combobox',
		        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gC1021, required: true }
		        		}, 
		        		formatter: function(value, row) { return row.pausYnVal; }
		        	},
		        	{
		        		field: 'currWgt', 
		        		title: '현재체중', 
		        		align: 'center', 
		        		width: '90', 
		        		editor: 'numberbox'
		        	},
		        	{
		        		field: 'lossWgt', 
		        		title: '감량체중', 
		        		align: 'center', 
		        		width: '90'
		        	},
		        	{
		        		field: 'rmiWgt', 
		        		title: '남은체중', 
		        		align: 'center', 
		        		width: '90'
		        	},
		        	{
		        		field: 'dosgDesc1', 
		        		title: '몸상태', 
		        		align: 'center', 
		        		width: '120', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'dosgDesc1', 
		        		title: '약반응', 
		        		align: 'center', 
		        		width: '120', 
		        		editor: 'text'
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
                    if (!param.q) { return; }
                    $.ajax({
                        type: 'post',
                        url : "/api/v1/main/customer/findCustomer",
                        data: {
                            "custUsrNm" : $('#saveCustFrm input[name=dlg_rcmdCustNm]').val(),
                            "custCellNo": $('#saveCustFrm input[name=dlg_rcmdCellNo]').val()
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
		     * "고객정보 저장" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveCustomer").on("click", "#btnSaveCustomer", function (e) {

				RS1001PU02.saveCust();
			});
			
			/**************************************************************
		     * "상담차트 생성" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewCnstChart").on("click", "#btnNewCnstChart", function (e) {
				RS1001PU02.createCnstChart();
			});
			
			/**************************************************************
		     * "상담정보 저장" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveCnstChart").on("click", "#btnSaveCnstChart", function (e) {
				$.messager.confirm('Confirm', '차트정보를 저장하시겠습니까?', function(r) {
					if (!r) return;
					
					RS1001PU02.saveCnstChart();
				});
			});
			
			/**************************************************************
		     * "복용차트 생성" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnNewDosgChart").on("click", "#btnNewDosgChart", function (e) {
				RS1001PU02.createDosingChart();
			});
			
			/**************************************************************
		     * 복용차트 체중 수정시
		     **************************************************************/
		    $('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox({
		    	onChange: function(value) {
		    		var orgWgt = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
		    		var tgtWgt = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
		    		var lossWgt = Number(orgWgt) - Number(value);
		    		var rmiWgt = Number(value) - Number(tgtWgt);
		    		
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

		},
		saveCust: function() {
			var custUsrNm = $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue');
			if ($isEmpty(custUsrNm)) {
				$.messager.alert('고객정보 저장', '고객이름을 입력하세요.');
				return;
			}
			var custCellNo = $('#saveCustFrm input[textboxName=dlg_custCellNo]').textbox('getValue');
			if ($isEmpty(custCellNo)) {
				$.messager.alert('고객정보 저장', '휴대폰번호를 입력하세요.');
				return;
			}
			var custBirthYy = $('#saveCustFrm select[textboxName=dlg_custBirthYy]').combobox('getValue');
			if ($isEmpty(custBirthYy)) {
				$.messager.alert('고객정보 저장', '생년월일 출생년도를 선택하세요.');
				return;
			}
			var custBirthMm = $('#saveCustFrm select[textboxName=dlg_custBirthMm]').combobox('getValue');
			if ($isEmpty(custBirthMm)) {
				$.messager.alert('고객정보 저장', '생년월일 출생월을 선택하세요.');
				return;
			}
			var custBirthDd = $('#saveCustFrm select[textboxName=dlg_custBirthDd]').combobox('getValue');
			if ($isEmpty(custBirthDd)) {
				$.messager.alert('고객정보 저장', '생년월일 출생일을 선택하세요.');
				return;
			}
			var custBirthDt = custBirthYy + custBirthMm + custBirthDd;
			if ($isEmpty(custBirthDt) || custBirthDt.length != 8) {
				$.messager.alert('고객정보 저장', '생년월일을 입력하세요.');
				return;
			}
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
						"custId" 		: 	$('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue'),
						"custUsrNm" 	: 	custUsrNm,
						"custCellNo" 	: 	custCellNo,
						"custBirthDt" 	: 	custBirthDt,
						"custGenTpCd" 	: 	custGenTpCd,
						"mrgYn" 		: 	$('#saveCustFrm input[name=dlg_mrgYn]:checked').val(),
						"pcrtChdCnt" 	: 	$('#saveCustFrm select[textboxName=dlg_pcrtChdCnt]').combobox('getValue'),
						"lstPcrtYear" 	: 	$('#saveCustFrm select[textboxName=dlg_lstPcrtYear]').combobox('getValue'),
						"brstFdgYn" 	: 	$('#saveCustFrm input[name=dlg_brstFdgYn]:checked').val(),
						"vistTpCd" 		: 	$('#saveCustFrm input[name=dlg_vistTpCd]:checked').val(),
						"zipCode" 		: 	$('#saveCustFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
						"addr1" 		: 	$('#saveCustFrm input[textboxName=dlg_addr1]').textbox('getValue'),
						"addr2" 		: 	$('#saveCustFrm input[textboxName=dlg_addr2]').textbox('getValue'),
						"delYn" 		: 	$('#saveCustFrm input[name=dlg_delYn]').val(),
						"custMemo" 		:	$('#saveCustFrm input[textboxName=dlg_custMemo]').textbox('getValue'),
						"custMemo2" 	:	$('#saveCustFrm input[textboxName=dlg_custMemo2]').textbox('getValue'),
						"rcmdCustId" 	:	$('#saveCustFrm input[name=dlg_rcmdCustId]').val(),
						"rcmdCustNm" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCustNm]').textbox('getValue'),
						"rcmdCellNo" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCellNo]').numberbox('getValue')
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
							var custUsrNm = $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue');

							//고객차트탭의 고객번호 업데이트
							$('#saveCustFrm input[textboxName=dlg_custId]').textbox('setValue', custId);

							//차트정보탭의 고객명/고객번호 업데이트(고객테이블정보사용)
							$('input[textboxName=selectedCustId]').textbox('setValue', custId);
							$('input[textboxName=selectedCustUsrNm]').textbox('setValue', custUsrNm);

							//고객번호 있는 경우 차트탭 활성화
							$('#custTabs').tabs('enableTab', 1);
							
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
			var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			var cnstDesc 	   = $('#saveCnstFrm textarea[textboxName=cnstDesc]').textbox('getValue');
			var picUsrNo 	   = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getValue');
			var picUsrNoVal    = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getText');
			var pic2UsrNo 	   = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getValue');
			var pic2UsrNoVal   = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getText');
			var orgWgt 		   = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
			var tgtWgt 		   = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
			var startDosgDt    = $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
			var cnstHhCd 	   = $('#saveCnstFrm select[textboxName=cnstHhCd]').combobox('getValue');
			var cnstHhMemo 	   = $('#saveCnstFrm input[textboxName=cnstHhMemo]').textbox('getValue');
			var dosgTpCd 	   = $('#saveCnstFrm select[textboxName=dosgTpCd]').combobox('getValue');
			var payTpCd 	   = $('#saveCnstFrm select[textboxName=payTpCd]').combobox('getValue');
			var dlvDt 		   = $('#saveCnstFrm input[textboxName=dlvDt]').datebox('getValue');
			if( selectedCnstId == "" ) {
				$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
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
				if (cnstPaperAttr === 'ORG_WGT') orgWgt = Number(cnstPaperVal);
				if (cnstPaperAttr === 'TGT_WGT') tgtWgt = Number(cnstPaperVal);
			}
			
			var formData = {
				criteria: {
					"cnstId" 		: selectedCnstId,
					"cnstDesc" 		: cnstDesc,
					"picUsrNo"		: picUsrNo,
					"pic2UsrNo"		: pic2UsrNo,
					"orgWgt"		: orgWgt,
					"tgtWgt"		: tgtWgt,
					"startDosgDt" 	: startDosgDt,
					"cnstHhCd"		: cnstHhCd,
					"cnstHhMemo"	: cnstHhMemo,
					"dosgTpCd"		: dosgTpCd,
					"payTpCd" 		: payTpCd,
					"dlvDt" 		: moment(dlvDt).format("YYYYMMDD"),
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
			var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			var cnstDesc = $('#cnstDesc').textbox('getValue');
			var picUsrNo = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getValue');
			var picUsrNoVal = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getText');
			var pic2UsrNo = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getValue');
			var pic2UsrNoVal = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getText');
			var orgWgt = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
			var tgtWgt = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
			var startDosgDt = $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
			var cnstHhCd = $('#saveCnstFrm select[textboxName=cnstHhCd]').combobox('getValue');
			var cnstHhMemo = $('#saveCnstFrm input[textboxName=cnstHhMemo]').textbox('getValue');
			var dosgTpCd = $('#saveCnstFrm select[textboxName=dosgTpCd]').combobox('getValue');
			if( selectedCnstId == "" ) {
				$.messager.alert("상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나<br>신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			if( dosgTpCd == "" ) {
				$.messager.alert("복용유형 선택", "상담정보에서 '복용유형'를 선택해 주세요.");
				return false;
			}
			if( startDosgDt == "" ) {
				$.messager.alert("복용시작일자 선택", "복용시작일자를 입력 후 [복용차트생성] 버튼을 클릭 해주세요.<br>복용시작일자 하루전부터 스케쥴이 자동생성됩니다.");
				return false;
			}
			var formData = {
				criteria: {
					"cnstId" 		: selectedCnstId,
					"cnstDesc" 		: cnstDesc,
					"picUsrNo"		: picUsrNo,
					"pic2UsrNo"		: pic2UsrNo,
					"orgWgt"		: orgWgt,
					"tgtWgt"		: tgtWgt,
					"startDosgDt" 	: startDosgDt,
					"cnstHhCd"		: cnstHhCd,
					"cnstHhMemo"	: cnstHhMemo,
					"dosgTpCd"		: dosgTpCd
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
		saveDosingChart: function() {
			var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
			if( selectedCnstId == "" ) {
				$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나<br>신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
				return false;
			}
			var dosgId     = $('#dosgDlgFrm input[name=dlg_dosgId]').val();
			var dosgSeq    = $('#dosgDlgFrm input[name=dlg_dosgSeq]').val();
			var dosgLvCd   = $('#dosgDlgFrm input[name=dlg_dosgLvCd]').val();
			var dosgDt     = $('#dosgDlgFrm input[textboxName=dlg_dosgDt]').datebox('getValue');
			var callYn     = $('#dosgDlgFrm select[textboxName=dlg_callYn]').combobox('getValue');
			var dosgYn     = $('#dosgDlgFrm select[textboxName=dlg_dosgYn]').combobox('getValue');
			var pausYn     = $('#dosgDlgFrm select[textboxName=dlg_pausYn]').combobox('getValue');
			var currWgt    = $('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox('getValue');
			var lossWgt    = $('#dosgDlgFrm input[textboxName=dlg_lossWgt]').numberbox('getValue');
			var rmiWgt     = $('#dosgDlgFrm input[textboxName=dlg_rmiWgt]').numberbox('getValue');
			var dosgDesc1  = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc1]').textbox('getValue');
			var dosgDesc2  = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc2]').textbox('getValue');

			var formData = {
				criteria: {
					"cnstId":	    selectedCnstId,
					"dosgId":		dosgId,
					"dosgSeq": 		dosgSeq,
					"dosgLvCd":		dosgLvCd,
					"dosgDt":		moment(dosgDt).format("YYYYMMDD"),
					"callYn":		callYn,
					"dosgYn": 		dosgYn,
					"pausYn": 		pausYn,
					"currWgt": 		currWgt,
					"lossWgt":		lossWgt,
					"rmiWgt":		rmiWgt,
					"dosgDesc1":	dosgDesc1,
					"dosgDesc2": 	dosgDesc2
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
		}
	};
	
	// init
	RS1001PU02.init();
	RS1001PU02.fnCnstChart();
});
