var gDataArr = new Array();
var temp = [
	{ditcCd:'A00',ditcNm:'승인'},
	{ditcCd:'A01',ditcNm:'비승인'}
];

var gC1003; //직윈 
var gC1002; //권한
var gC1010; //승인

function fnSearch(){
	var queryParams=$("#dg").datagrid('options').queryParams;
	queryParams.cbSrch= $('#cb_srch').combobox('getValue');
	queryParams.cbAuth= $('#cb_usrAuth').combobox('getValue');
	queryParams.cbAppv= $('#cb_usrAprv').combobox('getValue');
	queryParams.target= "grid";
	queryParams.srchTxt= $("#srchTxt").val();
	$('#dg').datagrid('reload');
}


function fnInit(){
	
	initComboBox($('#cb_usrAuth'), '/admin/getGrpCdWithCombo', {GrpCd:'C1002',target:'combo', targetKind:'0'});
	initComboBox($('#cb_usrAprv'), '/admin/getGrpCdWithCombo', {GrpCd:'C1010',target:'combo', targetKind:'0'});
	
	gC1003 = initCodeData('C1003');
	gC1002 = initCodeData('C1002');
	gC1010 = initCodeData('C1010');
	
	//console.log("gC1010",gC1010);
	
	$('#dg').datagrid({
	    url: '/admin/getAdmin',
	    saveUrl: '/admin/saveAdmin',
	    updateUrl: '/admin/modifyAdmin',
	    destroyUrl: '/admin/removeAdmin',
	    singleSelect:true, 
	    ctrlSelect:true,
	    idField:'usrNo',
	    rownumbers:true,
		fitColumns:true, 
        fit:true,
        emptyMsg:'검색 조건에 해당하는 자료가 없습니다.',
        pagination:true,pageSize:50,pageList:[50],
        dragSelection: true,
        columns:[[
        	{field:'usrNo', title:'사용자번호', hidden:true, width:'0'},
        	{field:'usrNm', title:'사용자이름', align:'center', width:'150', editor:'text'},
        	{field:'usrEml', title:'이메일', align:'center', width:'250', editor:{type:'validatebox',options:{required:true,validType:'email'}}},
        	{field:'usrPhnNo', title:'핸드폰번호', align:'center', width:'200', editor:'text'},
        	{field:'usrGrade', title:'직위', align:'center', width:'100', editor:{type:'combobox',options:{valueField:'ditcCd',textField:'ditcNm',data:gC1003,required:true}}, formatter:function(value,row){return row.usrGradeVal||value;}},
        	{field:'usrAuth', title:'권한', align:'center', width:'100', editor:{type:'combobox',options:{valueField:'ditcCd',textField:'ditcNm',data:gC1002,required:true}}, formatter:function(value,row){return row.usrAuthVal||value;}},
        	{field:'usrAprv', title:'승인여부', align:'center', width:'100', editor:{type:'combobox',options:{valueField:'ditcCd',textField:'ditcNm',data:gC1010,required:true}}, formatter:function(value,row){return row.usrAprvVal||value;}},
        	{field:'delYn', title:'삭제여부', align:'center', width:'150', editor:{type:'checkbox',options:{on:'Y',off:'N'}}},
        	{field:'regDt', title:'등록날짜', align:'center', width:'200', formatter:function formatDate(value, row){return value;}}
        ]],
	    onEndEdit:function(index,row){
            var ed = $(this).datagrid('getEditor', {
                index: index,
                field: 'productid'
            });
            row.productname = $(ed.target).combobox('getText');
        },
        onBeforeEdit:function(index,row){
            row.editing = true;
            $(this).datagrid('refreshRow', index);
        },
        onAfterEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        },
        onCancelEdit:function(index,row){
            row.editing = false;
            $(this).datagrid('refreshRow', index);
        }
	});
}



function getRowIndex(target){
    var tr = $(target).closest('tr.datagrid-row');
    return parseInt(tr.attr('datagrid-row-index'));
}
function editrow(target){
    $('#dg').datagrid('beginEdit', getRowIndex(target));
}
function deleterow(target){
    $.messager.confirm('Confirm','Are you sure?',function(r){
        if (r){
            $('#dg').datagrid('deleteRow', getRowIndex(target));
        }
    });
}
function saverow(target){
    $('#dg').datagrid('endEdit', getRowIndex(target));
}
function cancelrow(target){
    $('#dg').datagrid('cancelEdit', getRowIndex(target));
}


function removeAdmin(){
	var row = $("#dg").datagrid("getSelected");
	//console.log(row);
	if(row){
		$.messager.confirm('Confirm','사용자를 삭제하겠습니까?',function(r){
             if (r){
                 $.post('/admin/removeAdmin',{usrNo:row.usrNo},function(result){
                     if (result.success){
                         //$('#dg').datagrid('reload');    // reload the user data
                         
                          $.messager.show({    // show error message
                             title: 'Success',
                             msg: result.Msg
                         });
                         fnSearch();
                     } else {
                         $.messager.show({    // show error message
                             title: 'Error',
                             msg: result.Msg
                         });
                     }
                 },'json');
             }
       });
	}
	
}

function addAdmin(){
	 $('#addDlg').dialog('open').dialog('center').dialog('setTitle','관리자 추가');
     $('#addFrm').form('clear');
     
     initComboBox($('#dlg_usrGrade'), '/admin/getGrpCdWithCombo', {GrpCd:'C1003',target:'combo', targetKind:'1'});
     initComboBox($('#dlg_usrAuth'), '/admin/getGrpCdWithCombo', {GrpCd:'C1002',target:'combo', targetKind:'1'});
     initComboBox($('#dlg_usrAprv'), '/admin/getGrpCdWithCombo', {GrpCd:'C1010',target:'combo', targetKind:'1'});
     initComboBox($('#dlg_delYn'), '/admin/getGrpCdWithCombo', {GrpCd:'C1012',target:'combo', targetKind:'1'});
}


function saveDlgAdmin(){
	var param = {
		usrEml : $('#dlg_em').textbox('getValue'),
		usrPwd : $('#dlg_pw').textbox('getValue'),
		usrNm : $('#dlg_usrNm').textbox('getValue'),
		usrPhnNo : $('#dlg_usrPhnNo').textbox('getValue'),
		usrGrade : $('#dlg_usrGrade').combobox('getValue'),
		usrAuth : $('#dlg_usrAuth').combobox('getValue'),
		usrAprv : $('#dlg_usrAprv').combobox('getValue'),
		delYn : $('#dlg_delYn').textbox('getValue')
	};
	
	
	$.post('/admin/saveAdmin',param,function(result){
          if (result.success){
              
               $.messager.show({    // show error message
                  title: 'Success',
                  msg: result.Msg
              });
              
              fnSearch();
          } else {
              $.messager.show({    // show error message
                  title: 'Error',
                  msg: result.Msg
              });
          }
          
          $('#addDlg').dialog('close');
      },'json')
}

$(document).ready(function(){
	fnInit();
});

function editAdmin(){
	var idx = -1;
	var row = $('#dg').datagrid('getSelected');
	if (row){
	  idx = $('#dg').datagrid('getRowIndex', row);
	}
	
	if(idx < 0) return;
	
	$('#dg').datagrid('beginEdit', idx);
}