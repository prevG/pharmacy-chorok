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
        	
        	$('#saveCnstFrm input[textboxName=cnstDt]').textbox('setValue', row.cnstDt);
        	fnDosingChart(row.cnstId);
        },
        columns:[[
			{
				field: 'cnstId', 
				title: '상담번호',
				align: 'center',  
				width: '80'
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
        		editor: 'text'
        	},
        	{
        		field: '보기', 
        		title: '보기', 
        		align: 'center', 
        		width: '80', 
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">차트보기</span>';
        		}
        	},
        	{
        		field: '삭제', 
        		title: '삭제', 
        		align: 'center', 
        		width: '80', 
        		formatter: function(value, row, index) {
        			return '<span style="font-weight:bold;">삭제</span>';
        		}
        	}
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
 * 상담차트 조회
 **************************************************************/
function fnCnstChart() {
	var queryParams = $("#dg").datagrid('options').queryParams;
	queryParams.custId = $('#saveCustForm input[textboxName=dlg_custId]').textbox('getValue');
	
	$('#dg').datagrid('reload');
}

/**************************************************************
 * 복용차트 조회
 **************************************************************/
function fnDosingChart(cnstId) {
	var queryParams = $("#dg2").datagrid('options').queryParams;
	queryParams.custId = $('#saveCustForm input[textboxName=dlg_custId]').textbox('getValue');
	queryParams.cnstId = cnstId;
	
	$('#dg2').datagrid('reload');
}

/*************************************************
 * 상담차트 생성 (상담차트/설문차트)
 **************************************************/
function createCnstChart() {
	$.messager.confirm('Confirm', '신규 상담차트를 생성하시겠습니까?', function(r) {
		if (!r) return;
		
		let formData = {
			custId: $('#saveCustForm input[textboxName=dlg_custId]').textbox('getValue')
		};
		$.post('/api/v1/main/chart/createCnstChart', formData, function(res) {
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
				custId : $('#saveCustForm input[textboxName=dlg_custId]').textbox('getValue'),
				custUsrNm : $('#saveCustForm input[textboxName=dlg_custUsrNm]').textbox('getValue'),
				custCellNo : $('#saveCustForm input[textboxName=dlg_custCellNo]').textbox('getValue'),
				custBirthDt : $('#saveCustForm input[textboxName=dlg_custBirthDt]').textbox('getValue'),
				custGenTpCd : $('#saveCustForm input[name=dlg_custGenTpCd]:checked').val(),
				mrgYn : $('#saveCustForm input[name=dlg_mrgYn]:checked').val(),
				pcrtChdCnt : $('#saveCustForm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
				lstPcrtYear : $('#saveCustForm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
				brstFdgYn : $('#saveCustForm input[name=dlg_brstFdgYn]:checked').val(),
				vistTpCd : $('#saveCustForm input[name=dlg_vistTpCd]:checked').val(),
				zipCode : $('#saveCustForm input[textboxName=dlg_zipCode]').textbox('getValue'),
				addr1 : $('#saveCustForm input[textboxName=dlg_addr1]').textbox('getValue'),
				addr2 : $('#saveCustForm input[textboxName=dlg_addr2]').textbox('getValue'),
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
