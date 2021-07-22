/******************************************************
 * 
 * 사용자 관리 - 고객 관리 (AD1003MV)
 * 
 ******************************************************/

$(document).ready(function() {
	var AD1003MV = {
		init: function() {
		
		    /**************************************************************
		     * 고객목록 테이블
		     **************************************************************/
			$('#dg').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'custId',
			    rownumbers: true,
				fitColumns: true, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        pagination: true,
		        pageSize: 50,
		        pageList: [50],
		        dragSelection: true,
		        onDblClickRow: function(value) {
		        	$("#btnCustInfo").trigger('click');
		        },
		        columns:[[
					{
						field: 'custId', 
						title: '고객번호',
						align: 'center',  
						width: '100'
					},
		        	{
		        		field: 'custUsrNm', 
		        		title: '고객이름', 
		        		align: 'center', 
		        		width: '150', 
		        		editor: 'text',
		        		formatter: function(value, row, index) {
		        			return '<span style="font-weight:bold;">'+ value +'</span>';
		        		}
		        	},
		        	{
		        		field: 'custCellNo', 
		        		title: '핸드폰번호', 
		        		align: 'center', 
		        		width: '120', 
		        		editor: 'numberbox'
		        	},
		        	{
		        		field: 'custBirthDt', 
		        		title: '생년월일', 
		        		align: 'center', 
		        		width: '120', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'custGenTpCd', 
		        		title: '성별', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.custGenTpCdVal;
		        		}
		        	},
		        	{
		        		field: 'mrgYn', 
		        		title: '결혼유무', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.mrgYnVal;
		        		}
		        	},
		        	{
		        		field: 'custMemo2', 
		        		title: '특이사항', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return $isEmpty(row.custMemo2) ? '' : '***';
		        		}
		        	},
		        	{
		        		field: 'rcmdCnt', 
		        		title: '추천인수', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return row.rcmdCnt > 0 ? row.rcmdCnt : '';
		        		}
		        	},
		        	{
		        		field: 'mileage', 
		        		title: '마일리지', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row) {
		        			return Number(row.mileage) === 0 ? '' : Number(row.mileage);
		        		}
		        	},
		        	{
		        		field: 'zipCode', 
		        		title: '우편번호', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'addr1', 
		        		title: '주소', 
		        		align: 'center', 
		        		width: '200', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'addr2', 
		        		title: '상세주소', 
		        		align: 'center', 
		        		width: '150', 
		        		editor: 'text'
		        	},
		        	{
		        		field: 'delYn', 
		        		title: '삭제여부', 
		        		align: 'center', 
		        		width: '100', 
		        		editor: 'text',
		        		formatter: function(value, row, index) {
		        			return '<span>'+ (value) ? value : 'N' +'</span>';
		        		}
		        	},
		        ]]
			});
		
			/**************************************************************
		     * 초기 바인딩
		     **************************************************************/
			$('#srchTxt').textbox('textbox').bind('keydown', function(e) {
				if (e.keyCode === 13) AD1003MV.search();
			});
			$("#custDlg").dialog({
				onClose: function() {
					AD1003MV.search();
				}
			});
			
			/**************************************************************
		     * "조회 버튼" 클릭시
		     **************************************************************/
		    $(document).off("click", "#btnUsrSearch").on("click", "#btnUsrSearch", function (e) {
				AD1003MV.search();
			});
			
			/**************************************************************
		     * "고객정보" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnCustInfo").on("click", "#btnCustInfo", function (e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.confirm('고객목록', '고객목록에서 고객을 선택해 주세요');
					return;	
				}
	
				$("#custDlg").load("/admin/AD1003MV_D/"+ row.custId, function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객상담정보');
					$.parser.parse($('#custDlg'));
		        });
			});
			
			/**************************************************************
		     * "추가 버튼" 클릭시
		     **************************************************************/
		    $(document).off("click", "#btnAddUserPop").on("click", "#btnAddUserPop", function (e) {
				$("#custDlg").load("/admin/AD1003MV_D/0", function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객상담정보');
					$.parser.parse($('#custDlg'));
					$('#saveCustFrm').form('clear'); // 위치 중요함 (dialog 앞에 위치하면 안됨)
		        });
			});

			/**************************************************************
		     * "삭제 버튼" 클릭시
		     **************************************************************/
		    $(document).off("click", "#btnRemoveUser").on("click", "#btnRemoveUser", function (e) {
				AD1003MV.removeUser();
			});

			/**************************************************************
		     * "편집 버튼" 클릭시
		     **************************************************************/
		    $(document).off("click", "#btnModifyUserPop").on("click", "#btnModifyUserPop", function (e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.confirm('사용자 관리', '사용자 목록에서 항목을 선택해 주세요');
					return;	
				}
	
				$("#custDlg").load("/admin/AD1003MV_D/"+ row.custId, function (data, status, xhr) {
					$('#custDlg').dialog('open').dialog('center').dialog('setTitle','고객정보');
					$.parser.parse($('#custDlg'));
		        });
			});
		},
		search: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.cbSrch = $('#cbSrch').combobox('getValue');
			queryParams.srchTxt = $("#srchTxt").val();
			queryParams.cbDelYn = $('#cbDelYn').combobox('getValue');
			queryParams.startDttm = $('#startDttm').datebox('getValue');
			queryParams.endDttm = $('#endDttm').datebox('getValue');
			
			$('#dg').datagrid('load', '/admin/getUser');
		},
		removeUser: function() {
			var row = $("#dg").datagrid("getSelected");
			if (!row) {
				$.messager.alert('사용자 관리', '사용자 목록에서 삭제할 항목을 선택하세요.');
				return false;
			}
			
			var formData = {
				criteria: {
					"custId": 	row.custId
				}
			}
			$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/admin/removeUser',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '사용자 관리', msg: res.message });
							AD1001MV.search();
						} else {
							$.messager.alert('사용자 관리', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('사용자 관리', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		}
	};

	// init
	AD1003MV.init();
	AD1003MV.search();	
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
