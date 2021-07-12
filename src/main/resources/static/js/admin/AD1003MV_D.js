/******************************************************
 * 
 * 사용자 관리 - 고객정보
 * 
 ******************************************************/

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

$( document ).ready( function() {

	var AD1003MV_D = {
		init: function() {
			
		    /**************************************************************
		     * "고객정보 저장" 클릭시
		     **************************************************************/
			$(document).off("click", "#btnSaveCustomer").on("click", "#btnSaveCustomer", function (e) {

				AD1003MV_D.saveCust();
			});
		},
		saveCust: function() {
			var custUsrNm = $('#saveCustFrm input[textboxName=dlg_custUsrNm]').textbox('getValue');
			if (custUsrNm === '') {
				$.messager.alert('고객정보 저장', '고객이름을 입력하세요.');
				return;
			}
			var custCellNo = $('#saveCustFrm input[textboxName=dlg_custCellNo]').textbox('getValue');
			if (custCellNo === '') {
				$.messager.alert('고객정보 저장', '휴대폰번호를 입력하세요.');
				return;
			}
			var custBirthDt = $('#saveCustFrm input[textboxName=dlg_custBirthDt]').numberbox('getValue');
			if (custBirthDt === '') {
				$.messager.alert('고객정보 저장', '생년월일을 입력하세요.');
				return;
			}
			var custGenTpCd = $('#saveCustFrm input[name=dlg_custGenTpCd]:checked').val();
			alert(custGenTpCd);
			if (custGenTpCd === undefined || custGenTpCd === '') {
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
						"pcrtChdCnt" 	: 	$('#saveCustFrm input[textboxName=dlg_pcrtChdCnt]').textbox('getValue'),
						"lstPcrtYear" 	: 	$('#saveCustFrm input[textboxName=dlg_lstPcrtYear]').textbox('getValue'),
						"brstFdgYn" 	: 	$('#saveCustFrm input[name=dlg_brstFdgYn]:checked').val(),
						"vistTpCd" 		: 	$('#saveCustFrm input[name=dlg_vistTpCd]:checked').val(),
						"zipCode" 		: 	$('#saveCustFrm input[textboxName=dlg_zipCode]').textbox('getValue'),
						"addr1" 		: 	$('#saveCustFrm input[textboxName=dlg_addr1]').textbox('getValue'),
						"addr2" 		: 	$('#saveCustFrm input[textboxName=dlg_addr2]').textbox('getValue'),
						"custMemo" 		:	$('#saveCustFrm input[textboxName=dlg_custMemo]').textbox('getValue'),
						"rcmdCustId" 	:	$('#saveCustFrm input[name=dlg_rcmdCustId]').val(),
						"rcmdCustNm" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCustNm]').textbox('getValue'),
						"rcmdCellNo" 	:	$('#saveCustFrm input[textboxName=dlg_rcmdCellNo]').numberbox('getValue'),
						"delYn" 		: 	'N'
					}
				};
				
				$.ajax({
					url: '/admin/saveUser',
					method: 'post',
					contentType: 'application/json',
					dataType: 'json',
					data: JSON.stringify(formData),
					success: function(res) {
						if (res.status === 'success') {
							var custId 	  = res.data;

							//고객차트탭의 고객번호 업데이트
							$('#saveCustFrm input[textboxName=dlg_custId]').textbox('setValue', custId);

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
		}
	};
	
	// init
	AD1003MV_D.init();
});
