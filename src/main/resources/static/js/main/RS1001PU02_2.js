var gPicUsers = [
	{ 'ditcCd' : '1', 'ditcNm' : '박정란' },
	{ 'ditcCd' : '2', 'ditcNm' : '황진영' },
	{ 'ditcCd' : '8', 'ditcNm' : '곽경준' }
];

function fnInit() {
	// 상담차트 목록
	$('#dg').datagrid({
	    url: '/api/v1/main/chart/findAllChartByCustId',
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'custId',
	    rownumbers: true,
		fitColumns: true, 
        fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        //pagination: true,
        //pageSize: 50,
        //pageList: [50],
        dragSelection: true,
        onLoadSuccess: function(data) {
        	let selectedIndex = $('#saveCnstFrm input[name=selectedIndex]').val();
        	if (selectedIndex)
        		$(this).datagrid('selectRow', selectedIndex);
        	else
        		$(this).datagrid('selectRow', 0);
        },
        onSelect: function(index, row) {
			// 복용차트
			$('#saveCnstFrm').form('load', {
				selectedIndex	: index,
				selectedCnstId 	: row.cnstId,
				cnstDt 			: row.cnstDt,
				picUsrNo		: row.picUsrNo,
				pic2UsrNo		: row.pic2UsrNo
			});
			$('#cnstDesc').textbox('setValue', row.cnstDesc);
			// 설문차트
			$('#saveDosgFrm').form('load', {
				orgWgt 			: row.orgWgt,
				tgtWgt			: row.tgtWgt,
				startDosgDt		: row.startDosgDt
			});

        	fnPaperChart();
        	fnDosingChart();
        },
        columns:[[
			{
				field: 'cnstId', 
				title: '상담번호',
				align: 'center',  
				width: '80',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
			},
        	{
        		field: 'cnstDt', 
        		title: '상담일시', 
        		align: 'center', 
        		width: '130', 
        		editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
        	{
        		field: 'picUsrNo', 
        		title: '상담한약사', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gPicUsers, required: true }
        		},
        		formatter: function(value, row) {
        			return row.picUsrNoVal;
        		}
        	},
        	{
        		field: 'pic2UsrNo', 
        		title: '상담실장', 
        		align: 'center', 
        		width: '100', 
        		editor: {
        			type: 'combobox',
        			options: { valueField: 'ditcCd', textField: 'ditcNm', data: gPicUsers, required: true }
        		},
        		formatter: function(value, row) {
        			return row.pic2UsrNoVal;
        		}
        	}/*,
        	{
        		field: '보기', 
        		title: '보기', 
        		align: 'center', 
        		width: '80', 
        		formatter: function(value, row, index) {
        			return '<a href="javascript:void(0)" onclick="selectCnstChart();">차트보기</a>';
        		}
        	}*/
        ]]
	});
	
	// 복용차트 목록
	$('#dg2').datagrid({
	    url: '/api/v1/main/chart/findDosingChartByCnstId',
	    singleSelect: true, 
	    ctrlSelect: true,
	    idField: 'custId',
	    rownumbers: true,
		fitColumns: true, 
        fit: true,
        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
        //pagination: true,
        //pageSize: 50,
        //pageList: [50],
        dragSelection: true,
        //onClickCell: function(index, field, value) {
        //	$(this).datagrid('endEdit', index);
        //},
        onDblClickCell: function(index, field, value) {
        	var row = $(this).datagrid('getRows')[index];
        	if (!row) return;
        	
        	$('#dosgDlgFrm input[name=dlg_dosgId]').val(row.dosgId);
        	$('#dosgDlgFrm input[textboxName=dlg_seqStr]').textbox('setValue', row.seqStr);
        	$('#dosgDlgFrm input[textboxName=dlg_dosgTpCd]').textbox('setValue', row.dosgTpCd);
        	$('#dosgDlgFrm input[textboxName=dlg_dosgDt]').datebox('setValue', row.dosgDt);
        	$('#dosgDlgFrm select[textboxName=dlg_callYn]').combobox('setValue', row.callYn);
        	$('#dosgDlgFrm select[textboxName=dlg_dosgYn]').combobox('setValue', row.dosgYn);
        	$('#dosgDlgFrm select[textboxName=dlg_pausYn]').combobox('setValue', row.pausYn);
        	$('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox('setValue', row.currWgt);
        	$('#dosgDlgFrm input[textboxName=dlg_lossWgt]').numberbox('setValue', row.lossWgt);
        	$('#dosgDlgFrm input[textboxName=dlg_rmiWgt]').numberbox('setValue', row.rmiWgt);
        	$('#dosgDlgFrm input[textboxName=dlg_dosgDesc1]').textbox('setValue', row.dosgDesc1);
        	$('#dosgDlgFrm input[textboxName=dlg_dosgDesc2]').textbox('setValue', row.dosgDesc2);
        
        	$('#dosgDlg').dialog('open').dialog('center').dialog('setTitle','복용차트 정보');
        	
        	//$(this).datagrid('beginEdit', index);
        	//var ed = $(this).datagrid('getEditor', { index: index, field: field });
        	//$(ed.target).focus();
        },
        columns:[[
			{
				field: 'dosgId', 
				title: '번호',
				align: 'center',  
				width: '80'
			},
        	{
        		field: 'seqStr', 
        		title: '일수', 
        		align: 'center', 
        		width: '150', 
        		editor: 'text',
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">'+ value +'</span>';
        		}
        	},
        	{
        		field: 'dosgTpCd', 
        		title: '복용단계', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'dosgDt', 
        		title: '복용일자', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'daysStrKor', 
        		title: '요일', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'callYn', 
        		title: '상담예약', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'dosgYn', 
        		title: '복용여부', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'dosgYn', 
        		title: '보류여부', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'currWgt', 
        		title: '현재체중', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'lossWgt', 
        		title: '감량체중', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'rmiWgt', 
        		title: '남은체중', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'dosgDesc1', 
        		title: '몸상태', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	},
        	{
        		field: 'dosgDesc1', 
        		title: '약반응', 
        		align: 'center', 
        		width: '100', 
        		editor: 'text'
        	}
        ]]/*,
        onBeforeEdit: function(index, row) {
        	alert('1');
        	row.editing = true;
        },
        onAfterEdit: function(index, row) {
        	alert('2');
        	row.editing = false;
        },
        onEndEdit: function(index, row) {
        	alert('3');
        }*/
	});
}

/**************************************************************
 * 상담차트 선택
 **************************************************************/
/*function selectCnstChart() {
	alert('abc');
}*/

/**************************************************************
 * 상담차트 조회
 **************************************************************/
function fnCnstChart() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
	
	$('#dg').datagrid('reload');
}

/**************************************************************
 * 설문차트 조회
 **************************************************************/
function fnPaperChart() {
	let formData = {
		cnstId : $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue')
	};
	$.post('/reservation/RS1001PU02/findPaperChartByCnstId_2', formData, function(res) {
		if (res.status === 'success') {
			var html = '';
			$.each(res.data, function(index, item) {
				html += item.paperHtml;
			});
			$('#cnstPaper').html(html);
			$.parser.parse($('#cnstPaper'));
		} else {
			$.messager.show({ title: 'Error', msg: res.message });
			return;
		}
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

/**************************************************************
 * 복용차트 조회
 **************************************************************/
function fnDosingChart() {
	var queryParams = $("#dg2").datagrid('options').queryParams;
	queryParams.custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
	queryParams.cnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	
	$('#dg2').datagrid('reload');
}

/*************************************************
 * 상담차트 생성 (상담차트/설문차트)
 **************************************************/
function createCnstChart() {
	var custId = $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue');
	let formData = {
		"custId" 	: custId
	};
	
	$.messager.confirm('Confirm', '신규 상담차트를 생성하시겠습니까?', function(r) {
		if (!r) return;
		
		$.post('/api/v1/main/chart/createCnstChart', formData, function(res) {
			if (res.status === 'success') {
				$.messager.show({ title: 'Success', msg: res.message });
    			fnCnstChart(); // 상담차트 조회
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
}

/*************************************************
 * 상담차트 삭제 (상담차트/설문차트)
 **************************************************/
function removeCnstChart() {
	var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	let formData = {
		"cnstId" 	  : selectedCnstId
	};

	$.messager.confirm('Confirm', '선택한 상담차트를 삭제하시겠습니까?', function(r) {
		if (!r) return;
		
		$.post('/api/v1/main/chart/deleteChart', formData, function(res) {
			if (res.status === 'success') {
				$.messager.show({ title: 'Success', msg: res.message });
				
				$('#saveCnstFrm')[0].reset();
				$('#saveSurvFrm')[0].reset();
				$('#saveCnstFrm input[name=selectedIndex]').val('');
				fnCnstChart(); // 상담차트 조회
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
}

/*************************************************
 * 복용차트 생성
 **************************************************/
function createDosingChart() {
	var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	var startDosgDt    = $('#saveDosgFrm input[textboxName=startDosgDt]').textbox('getValue');
	
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	if( startDosgDt == "" ) {
		$.messager.alert( "복용시작일자 선택", "복용시작일자를 입력 후 [복용차트생성] 버튼을 클릭 해주세요.\n복용시작일자 하루전부터 스케쥴이 자동생성됩니다.");
		return false;
	}
	let formData = {
		"cnstId" 	  : selectedCnstId,
		"startDosgDt" : startDosgDt	
	};
	
	$.messager.confirm('Confirm', '신규 복용차트를 생성하시겠습니까?', function(r) {
		if (!r) return;
		
		$.post('/api/v1/main/chart/createDosingChart', formData, function(res) {
			if (res.status === 'success') {
				$.messager.show({ title: 'Success', msg: res.message });
				fnDosingChart(); // 복용차트 조회
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
}

/*************************************************
 * 상담차트 저장 (상담차트/설문차트)
 **************************************************/
function saveCnstChart( evt ) {
	var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	var cnstDesc = $('#cnstDesc').textbox('getValue');
	var picUsrNo = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getValue');
	var picUsrNoVal = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getText');
	var pic2UsrNo = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getValue');
	var pic2UsrNoVal = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getText');
	var orgWgt = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
	var tgtWgt = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
	var startDosgDt = $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	let formData = {
		"cnstId" 		: selectedCnstId,
		"cnstDesc" 		: cnstDesc,
		"picUsrNo"		: picUsrNo,
		"pic2UsrNo"		: pic2UsrNo,
		"orgWgt"		: orgWgt,
		"tgtWgt"		: tgtWgt,
		"startDosgDt" 	: startDosgDt
	};

	$.post('/api/v1/main/chart/saveCnstChart', formData, function(res) {
		if (res.status === 'success') {
			$.messager.show({ title: 'Success', msg: res.message });
			
			fnCnstChart(); // 상담차트 조회
		} else {
			$.messager.show({ title: 'Error', msg: res.message });
			return;
		}
	}, 'json')
	.fail(function(xhr, status, error) {
		$.messager.show({ title: 'Error', msg: xhr.responseJSON.message });
		return;
	});
}

/*************************************************
 * 설문차트 저장
 **************************************************/
function saveSurveyChart( evt ) {
	let selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	let cnstPaperNum = $('#cnstPaper tr').length;
	let cnstPaperList = [];
	for (let i = 0; i < cnstPaperNum; i++) {
		let cnstPaperKind = $("#cnstPaper tr").eq(i).find("td").eq(1).attr("data-el");
		let cnstPaperId = $("#cnstPaper tr").eq(i).find("td").eq(1).attr("data-nm");
		let cnstPaperVer = $("#cnstPaper tr").eq(i).find("td").eq(1).attr("data-ver");
		let cnstPaperNum = $("#cnstPaper tr").eq(i).find("td").eq(1).attr("data-num");
		let cnstPaperVal = "";
		if (cnstPaperKind === "TEXT") {
			cnstPaperVal = $("#cnstPaper tr").eq(i).find("td").eq(1).find("input[type='text']").val();
		} else if (cnstPaperKind === "CHECK") {
			let len = $("#cnstPaper tr").eq(i).find("td").eq(1).find("input[type='checkbox']").length;
			let c = 0;
			for (let j = 0; j < len; j++) { 
				if ($("#cnstPaper tr").eq(i).find("td").eq(1).find("input[type='checkbox']")[j].checked) { 
					if (c > 0) cnstPaperVal = cnstPaperVal + "," ; 
					cnstPaperVal = cnstPaperVal + $("#cnstPaper tr").eq(i).find("td").eq(1).find("input[type='checkbox']")[j].value; 
					c++; 
				}
			}
		} else if (cnstPaperKind === "RADIO") {
			cnstPaperVal = $("#cnstPaper tr").eq(i).find("td").eq(1).find("input[type='radio']:checked").val();
		}
		
		cnstPaperList.push({
			"cnstId" 		: selectedCnstId,
			"cnstPaperId" 	: cnstPaperId,
			"cnstPaperVer" 	: cnstPaperVer,
			"cnstPaperNum" 	: cnstPaperNum,
			"cnstPaperVal" 	: cnstPaperVal
		});
	}
	let formData = {
		criteria: cnstPaperList
	};
	
	$.ajax({
		url: '/api/v1/main/survey/saveSrvChart_2',
		method: 'post',
		contentType: 'application/json',
		dataType: 'json',
		data: JSON.stringify(formData),
		success: function(res) {
			if (res.status === 'success') {
				$.messager.show({ title: 'Success', msg: res.message });
			} else {
				$.messager.show({ title: 'Error', msg: res.message });
				return;
			}
		}
	});
}

/*************************************************
 * 복용차트 저장
 **************************************************/
function saveDosingChart( evt ) {
	let selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	let dosgId = $('#dosgDlgFrm input[name=dlg_dosgId]').val();
	let dosgTpCd = $('#dosgDlgFrm input[textboxName=dlg_dosgTpCd]').textbox('getValue');
	let dosgDt = $('#dosgDlgFrm input[textboxName=dlg_dosgDt]').datebox('getValue');
	let callYn = $('#dosgDlgFrm select[textboxName=dlg_callYn]').combobox('getValue');
	let dosgYn = $('#dosgDlgFrm select[textboxName=dlg_dosgYn]').combobox('getValue');
	let pausYn = $('#dosgDlgFrm select[textboxName=dlg_pausYn]').combobox('getValue');
	let currWgt = $('#dosgDlgFrm input[textboxName=dlg_currWgt]').numberbox('getValue');
	let lossWgt = $('#dosgDlgFrm input[textboxName=dlg_lossWgt]').numberbox('getValue');
	let rmiWgt =  $('#dosgDlgFrm input[textboxName=dlg_rmiWgt]').numberbox('getValue');
	let dosgDesc1 = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc1]').textbox('getValue');
	let dosgDesc2 = $('#dosgDlgFrm input[textboxName=dlg_dosgDesc2]').textbox('getValue');
	let formData = {
		criteria: {
			"dosgId":		dosgId,
			"dosgTpCd":		dosgTpCd,
			"dosgDt":		dosgDt,
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
				$.messager.show({ title: 'Success', msg: res.message });
				
				fnDosingChart(); // 복용차트 조회
			} else {
				$.messager.show({ title: 'Error', msg: res.message });
				return;
			}
		}
	});
}

$( document ).ready( function() {

	fnInit();
	// 상담차트 조회
    fnCnstChart();
	
    /**************************************************************
     * 고객정보 저장
     **************************************************************/
    $('#btnSaveCustomer').click(function(e) {
		e.preventDefault();
		$.messager.confirm('Confirm', '고객정보를 저장하시겠습니까?', function(r) {
			if (!r) return;
			let formData = {
				custId : $('#saveCustFrm input[textboxName=dlg_custId]').textbox('getValue'),
				custUsrNm : $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
				custCellNo : $('#saveCustFrm input[textboxName=dlg_custCellNo]').textbox('getValue'),
				custBirthDt : $('#saveCustFrm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
				custGenTpCd : $('#saveCustFrm input[name=dlg_custGenTpCd]:checked').val(),
				mrgYn : $('#saveCustFrm input[name=dlg_mrgYn]:checked').val(),
				pcrtChdCnt : $('#saveCustFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
				lstPcrtYear : $('#saveCustFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
				brstFdgYn : $('#saveCustFrm input[name=dlg_brstFdgYn]:checked').val(),
				vistTpCd : $('#saveCustFrm input[name=dlg_vistTpCd]:checked').val(),
				zipCode : $('#saveCustFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
				addr1 : $('#saveCustFrm input[textboxName=dlg_addr1]').textbox('getValue'),
				addr2 : $('#saveCustFrm input[textboxName=dlg_addr2]').textbox('getValue'),
				delYn : 'N'
			};
			
			$.post('/reservation/RS1001PU02/saveCustomer_2', formData, function(res) {
				if (res.status === 'success') {
					$.messager.show({ title: 'Success', msg: res.message });
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
	});

	/**************************************************************
     * "상담차트 생성" 클릭시
     **************************************************************/
	$(document).off("click", "#btnNewCnstChart").on("click", "#btnNewCnstChart", function (e) {
		createCnstChart();
	});
	
	/**************************************************************
     * "상담차트 삭제" 클릭시
     **************************************************************/
	$(document).off("click", "#btnDelCnstChart").on("click", "#btnDelCnstChart", function (e) {
		removeCnstChart();
	});
	
	/**************************************************************
     * "복용차트 생성" 클릭시
     **************************************************************/
	$(document).off("click", "#btnNewDosgChart").on("click", "#btnNewDosgChart", function (e) {
		createDosingChart();
	});

	/**************************************************************
     * "상담정보 저장" 클릭시
     **************************************************************/
	$(document).off("click", "#btnSaveCnstChart").on("click", "#btnSaveCnstChart", function (e) {
		$.messager.confirm('Confirm', '차트정보를 저장하시겠습니까?', function(r) {
			if (!r) return;
			
			saveCnstChart( e );
			saveSurveyChart( e );
			//saveDosingChart( e );
		});
	});
	
	/**************************************************************
     * "설문차트 저장" 클릭시
     **************************************************************/
	$(document).off("click", "#btnSaveSurvChart").on("click", "#btnSaveSurvChart", function (e) {
		$.messager.confirm('Confirm', '설문차트 정보를 저장하시겠습니까?', function(r) {
			if (!r) return;
			
			saveSurveyChart( e );
		});
	});
	
	/**************************************************************
     * "복용차트 저장" 클릭시
     **************************************************************/
	$(document).off("click", "#btnSaveDosgChart").on("click", "#btnSaveDosgChart", function (e) {
		//$.messager.confirm('Confirm', '복용차트 정보를 저장하시겠습니까?', function(r) {
		//	if (!r) return;
			
			saveDosingChart( e );
		//});
	});
	
});

function myformatter(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
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
