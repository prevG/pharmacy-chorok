/******************************************************
 * 
 * 공통코드 관리 - 공통코드 (AD1002MV)
 * 
 ******************************************************/

$(document).ready(function() {
	var AD1002MV = {
		init: function() {
			$('#dg').datagrid({
			    singleSelect: true, 
			    ctrlSelect: true,
			    idField: 'usrNo',
			    rownumbers: true,
				fitColumns: false, 
		        fit: true,
		        emptyMsg: '검색 조건에 해당하는 자료가 없습니다.',
		        pagination: true,
		        pageSize: 50,
		        pageList: [50],
		        dragSelection: true,
		        columns:[[
		        	{
		        		field: 'grpCd', 
		        		title: '그룹코드', 
		        		align: 'center', 
		        		width: '80'
		        	},
		        	{
		        		field: 'ditcCd', 
		        		title: '코드', 
		        		align: 'center', 
		        		width: '80'
		        	},
		        	{
		        		field: 'ditcNm', 
		        		title: '코드명', 
		        		width: '130'
		        	},
		        	{
		        		field: 'ditcNmEng', 
		        		title: '코드명(영문)', 
		        		width: '130'
		        	},
		        	{
		        		field: 'valueCd', 
		        		title: '코드값', 
		        		width: '100'
		        	},
		        	{
		        		field: 'cdExp', 
		        		title: '코드값 설명', 
		        		width: '100'
		        	},
		        	{
		        		field: 'valueCd2', 
		        		title: '코드값2', 
		        		width: '100'
		        	},
		        	{
		        		field: 'cdExp2', 
		        		title: '코드값2 설명', 
		        		width: '100'
		        	},
		        	{
		        		field: 'vOrder', 
		        		title: '순번', 
		        		align: 'center', 
		        		width: '70'
		        	},
		        	{
		        		field: 'useYn', 
		        		title: '사용유무', 
		        		align: 'center', 
		        		width: '70'
		        	},
		        	{
		        		field: 'lockYn', 
		        		title: '잠금여부', 
		        		align: 'center', 
		        		width: '70'
		        	}
		        ]]
			});		
		
			/**************************************************************
		     * 초기 바인딩
		     **************************************************************/
			$('#srchTxt').textbox('textbox').bind('keydown', function(e) {
				if (e.keyCode === 13) AD1002MV.search();
			});

			/**************************************************************
		     * "검색" 버튼 클릭시
		     **************************************************************/
			$('#btnSearch').click(function(e) {
				AD1002MV.search();
			});
			
			/**************************************************************
		     * "추가" 버튼 클릭시
		     **************************************************************/
			$('#btnAddCodePop').click(function(e) {
				$('#codeDlg').dialog('open').dialog('center').dialog('setTitle','공통코드 추가');
			    $('#codeFrm').form('clear');
			    $('#codeFrm').form('load', {
			    	dlg_usrNo 	 : '',
					dlg_usrGrade : '',
					dlg_usrAuth  : '',
					dlg_usrAprv  : '',
			    	dlg_delYn 	 : 'N'
				});
			});

			/**************************************************************
		     * "삭제" 버튼 클릭시
		     **************************************************************/
			$('#btnRemoveUser').click(function(e) {
				AD1002MV.removeUser();
			});

			/**************************************************************
		     * "편집" 버튼 클릭시
		     **************************************************************/
			$('#btnModifyUserPop').click(function(e) {
				var row = $('#dg').datagrid('getSelected');
				if (!row) {
					$.messager.alert('공통코드 관리', '공통코드 목록에서 편집할 항목을 선택하세요.');
					return false;
				}
				
				$('#codeFrm [textboxName=dlg_usrPwd]').parent().hide(); // 비밀번호 숨김 처리.
				$('#codeDlg').dialog('open').dialog('center').dialog('setTitle','관리자 수정');
				$('#codeFrm').form('clear');
				$('#codeFrm').form('load', {
					dlg_usrNo 	 : row.usrNo,
					dlg_usrEml 	 : row.usrEml,
					dlg_usrNm 	 : row.usrNm,
					dlg_usrPhnNo : row.usrPhnNo,
					dlg_usrGrade : row.usrGrade,
					dlg_usrAuth  : row.usrAuth,
					dlg_usrAprv  : row.usrAprv,
					dlg_delYn 	 : row.delYn
				});
			});

			/**************************************************************
		     * "관리자 저장" 클릭시
		     **************************************************************/
			$('#btnSaveUser').click(function(e) {
				AD1002MV.saveUser();
			});
		},
		search: function() {
			var queryParams = $("#dg").datagrid('options').queryParams;
			queryParams.srchKind 	= $('#cb_srchKind').combobox('getValue');
			queryParams.srchTxt 	= $("#srchTxt").val();
			queryParams.grpCd 		= $('#cb_grpCd').combobox('getValue');
			queryParams.useYn 		= $('#cb_useYn').combobox('getValue');
			queryParams.target 		= "grid";
			
			$('#dg').datagrid('load', '/admin/getCodesByGrpCd_2');			
		},
		saveUser: function() {
			var usrNo 	 = $('#userFrm input[name=dlg_usrNo]').val();
			var formData = {
				criteria: {
					"usrNo" 	: usrNo,
					"usrEml" 	: $('#userFrm input[textboxName=dlg_usrEml]').textbox('getValue'),
					"usrPwd" 	: $('#userFrm input[textboxName=dlg_usrPwd]').passwordbox('getValue'),
					"usrNm" 	: $('#userFrm input[textboxName=dlg_usrNm]').textbox('getValue'),
					"usrPhnNo" 	: $('#userFrm input[textboxName=dlg_usrPhnNo]').textbox('getValue'),
					"usrGrade" 	: $('#userFrm select[textboxName=dlg_usrGrade]').combobox('getValue'),
					"usrAuth" 	: $('#userFrm select[textboxName=dlg_usrAuth]').combobox('getValue'),
					"usrAprv" 	: $('#userFrm select[textboxName=dlg_usrAprv]').combobox('getValue'),
					"delYn" 	: $('#userFrm select[textboxName=dlg_delYn]').combobox('getValue')
				}
			}
			
			$.messager.confirm('Confirm', '사용자 정보를 저장하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: (usrNo === '') ? '/admin/addAdmin' : '/admin/modifyAdmin',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '관리자 저장', msg: res.message });
							AD1002MV.search();
							$('#codeDlg').dialog('close');
						} else {
							$.messager.alert('관리자 저장', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('관리자 저장', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		},
		removeUser: function() {
			var row = $('#dg').datagrid('getSelected');
			if (!row) {
				$.messager.alert('관리자 삭제', '관리자 목록에서 삭제할 항목을 선택하세요.');
				return false;
			}
			
			var formData = {
				criteria: {
					"usrNo": 	row.usrNo
				}
			} 
			$.messager.confirm('Confirm', '사용자를 삭제하겠습니까?', function(r) {
				if (!r) return;
				
				$.ajax({
					url: '/admin/removeAdmin',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							$.messager.show({ title: '관리자 삭제', msg: res.message });
							AD1002MV.search();
						} else {
							$.messager.alert('관리자 삭제', res.message);
							return;
						}
					},
					error: function(xhr, status, error) {
						$.messager.alert('관리자 삭제', xhr.responseJSON.message, 'error');
					}
				});
		   	});
		}
	};
	
	AD1002MV.init();
	AD1002MV.search();
});
