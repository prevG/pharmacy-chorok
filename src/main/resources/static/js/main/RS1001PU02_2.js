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
        onDblClickRow: function(index) {
        	let row = $('#dg').datagrid('getRows')[index];
        	if (!row) return;
			
			// 복용차트 시트
			$('#saveCnstFrm').form('load', {
				selectedCnstId 	: row.cnstId,
				cnstDt 			: row.cnstDt,
				picUsrNo		: row.picUsrNo,
				pic2UsrNo		: row.pic2UsrNo
			});
			$('#cnstDesc').textbox('setValue', row.cnstDesc);
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
        		title: '상담약사', 
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
        onDblClickRow: function(value) {
        	//fnCustInfo();
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
        ]]
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
			$('#cnstPaper').html(res.data);
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
				
				$('#saveSurvFrm')[0].reset();
				$('#saveCnstFrm')[0].reset();
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
	var startDosgDt    = $('#saveCnstFrm input[textboxName=startDosgDt]').textbox('getValue');
	
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
 * 상담차트 수정 (상담차트/설문차트)
 **************************************************/
function saveCnstChart( evt ) {
	var selectedCnstId = $('#saveCnstFrm input[textboxName=selectedCnstId]').textbox('getValue');
	var cnstDesc = $('#cnstDesc').textbox('getValue');
	var picUsrNo = $('#saveCnstFrm select[textboxName=picUsrNo]').combobox('getValue');
	var pic2UsrNo = $('#saveCnstFrm select[textboxName=pic2UsrNo]').combobox('getValue');
	var orgWgt = $('#saveDosgFrm input[textboxName=orgWgt]').numberbox('getValue');
	var tgtWgt = $('#saveDosgFrm input[textboxName=tgtWgt]').numberbox('getValue');
	var startDosgDt = $('#saveDosgFrm input[textboxName=startDosgDt]').datebox('getValue');
	if( selectedCnstId == "" ) {
		$.messager.alert( "상담차트 선택", "상담차트 목록에서 '차트보기'를 선택하시거나\n신규상담인 경우 '차트생성' 버튼을 클릭해 주세요.");
		return false;
	}
	let formData = {
		"cnstId" 	: selectedCnstId,
		"cnstDesc" 	: cnstDesc,
		"picUsrNo"	: picUsrNo,
		"pic2UsrNo"	: pic2UsrNo,
		"orgWgt"	: orgWgt,
		"tgtWgt"	: tgtWgt,
		"startDosgDt" : startDosgDt
	};

	$.post('/api/v1/main/chart/saveCnstChart', formData, function(res) {
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
     * 차트정보 저장 클릭시
     **************************************************************/
	$(document).off("click", "#btnSaveCnstChart").on("click", "#btnSaveCnstChart", function (e) {
		$.messager.confirm('Confirm', '차트정보를 저장하시겠습니까?', function(r) {
			if (!r) return;
			
			saveCnstChart( e );
			/*saveSurveyChart( e );
			saveDosingChart( e );*/
		});
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
