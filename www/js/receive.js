
$(document).ready(function() {
	var selects = jQuery('#testSelect').val();
	
  onchange = Chooseself(selects);
});
function Chooseself(a)
{
	var aa = a.split(':');
  //alert(aa[0]);
  jQuery(":input[id=bankaccount_self]").val();
	jQuery(':input[id=bankaccount_self]').val(aa[0])
	//jQuery( "#bankaccount_self" ).val(aa[0]);
	jQuery( "#bankaccountname" ).val(aa[1]);
	jQuery( ":select[id=bankaccountword]").val(aa[3]);
	//jQuery( "#bankaccountid" ).val(aa[2]);
	jQuery( ":input[id=bankaccount_self]" ).attr('disabled',true);
}

/*提領送出*/ 
 function pickupmoney()
		{
     
     
     //alert(_FEETIMES);
     
			var simple_ar = Array();
  	  var c2bet_st = new Object;
  	  var orderinfo_st = new Object;
  	  var re = /^[0-9]+(\.)?$/;
	    var re2 = /(?!^[0-9]{6,}$)(?!^[a-zA-Z]{6,}$)^[0-9a-zA-Z]{6,}$/;
	   //var sre = /^[0-9]+(\.[0-9]{0,0})?$/;
	   //var sre = /^[0-9]+(\.[0-9]{1,2})?$/;//小數點2位
	    var sre = /^[0-9]*$/;
	    var ans = '';
	    var strang = /[*!?@#\$%\^&\*+]+/g;
	    var strang_big = /[＊！？＠＃\$％\^＆\*＋]+/g;
			/*银行帐号*/
	      var bankaccount = jQuery("#bankaccount_self").val();
	    /*提款户名*/
	      var bankaccountname = jQuery("#bankaccountname").val();
	    /*银行名称*/
	      var bankaccountword = jQuery("#bankaccountword").val();
	      var bankaccountword_sp = bankaccountword.split(':');
	    /*提領金額*/  
	      var getmoney = jQuery("#getmoney").val();
	    /*提領密碼*/  
	      var sellpassword = jQuery("#sellpassword").val();
        var balance_money_chk_pick = jQuery("#balance_money_chk_pick").val();
      /*行政事務費*/
        var pickfee = jQuery("#pickfee").val();
       /*第一次提領*/
        var firstpick = jQuery("#firstpick").val(); 
       
        if(bankaccount=='' || bankaccountname=='' || bankaccountword=='' || getmoney=='' || sellpassword=='')
	           {
	           	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_INFO}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});
	           	alert(_JS_INFO);
	           	return;
	           }
	    
	    else if(jQuery.trim(getmoney.replace(/\s+/g,""))!==getmoney)
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_PICKUP_NO_EMPTY}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});
	    	alert(_JS_PICKUP_NO_EMPTY);
	    	return;
	    }
	    else if(bankaccount.length > 19 || bankaccount.length < 16)
	    	{
	    		//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_WITHDRAWALS_GREATER_16_19}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});	    	
	    	  alert(_JS_WITHDRAWALS_GREATER_16_19);
	    	  return;
	    	}
	    else if(jQuery.trim(bankaccountword_sp[2].replace(/\s+/g,""))!==bankaccountword_sp[2])
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_BANK_EMPTY}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});	    	
	    	alert(_JS_BANK_EMPTY);
	    	return;
	    }
	    
	    else if(bankaccountname.match(/\d/)){
	    	alert(JS_CHINESE);
	    	return;
	    }
	    
	    else if(bankaccountname.replace(/(^\s+)|(\s+$)/g,"")!==bankaccountname){
       alert(_JS_PICKUPNAME_EMPTY);
       return false; 
      }
      else if(strang_big.test(bankaccountname))
          {
       alert(_JS_THIRD_EMPTY);
       return false;      
          }     
      else if(strang.test(bankaccountname))
          {
       alert(_JS_THIRD_EMPTY);
       return false;     
          }
	    //else if(jQuery.trim(bankaccountname.replace(/\s+/g,""))!==bankaccountname)
	    //{
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_PICKUPNAME_EMPTY}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});	    	
	    	//alert('{_JS_PICKUPNAME_EMPTY}');
	    	//return;
	    //}
	    /*
	    else if(bankaccountname.replace(/^(?!\uFE30-\uFFA0)(?!\s)(?!.*?\uFF0E$)(?!.*?\s$)[\u4E00-\u9FA5a-zA-Z\s]/g,"")==bankaccountname)
	    {
	    		alert(JS_CHINESE);
	    	  return false;
	    }
	    */
	  /*全型．*/
	  /*  
	  else if(bankaccountname.replace(/[^\u4E00-\u9FA5a-zA-Z\s-\uFF0E-\uFF0E]/g,"")!==bankaccountname)
	    {
	    		alert(JS_CHINESE);
	    	  return false;
	    }
	    */
	    /*
	    else if( bankaccountname.replace(/^(?!\uFE30-\uFFA0)(?!.*?\uFF0E$)[\u4E00-\u9FA5]/g,"")==$('#accountName').val())
	    {
	    		alert('{JS_CHINESE}');
	    	  return false;
	    }

	    else if( bankaccountname.replace(/[^\u4E00-\u9FA5-\uFF0E-\uFF0E]/g,"")!==$('#accountName').val())
	    {
	    		alert('{JS_CHINESE}');
	    	  return false;
	    }
	    */
	    
	    else if(jQuery.trim(sellpassword.replace(/\s+/g,""))!==sellpassword)
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_PASSWD_EMPTY}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});	    	
	    	alert(_JS_PASSWD_EMPTY);
	    	return;
	    }
	    else if(!sre.test(getmoney))
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_PICKUP_INT}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});	    	
	      alert(_JS_PICKUP_INT);
	    	return;
	    }
	    else if(getmoney < 100)
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_WITHDRAWALS_GREATER_100}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});
	      alert(_JS_WITHDRAWALS_GREATER_100);
	    	return;
	    }
	    
	    else if(parseFloat(getmoney) > parseFloat(balance_money_chk_pick))
	    {
	    	//swal({title: '{_ERRER_MESSAGE}', text: '{_JS_WITHDRAWALS_GREATER_QUOTA}', confirmButtonText: '{_JS_SURE}',customClass: 'twitter'});         	
	    	alert(_JS_WITHDRAWALS_GREATER_QUOTA);
	    	return;
	    }
	    
	    else
	    {
	    	//alert('Y');
	    	//return;
	    }
	    
	    var jimDatass = {firstpick:firstpick, num:'7', types:'2', getmoney:getmoney, sellpassword:sellpassword, bankaccount: bankaccount, bankaccountname: bankaccountname, bankaccountword: bankaccountword_sp[2]}	  		
	    	simple_ar.push(jimDatass);
  	    orderinfo_st = simple_ar;
  	    c2bet_st["c2betorder"]=orderinfo_st;
  	  
  	  
  	  if(pickfee==6)
	    {
        getscript();
	    	$("#Modal_cover_fees").css('display','block');
	    	GetDaiLog(getmoney, _FEETPERCENT);
	    	
	      $("#next").click(function() {	    	        
        
        $("#Modal_cover_fees").css('display','none');
          
  	    //console.log(jimDatass);
  	    //return;
  	    jQuery.ajax({
					type: 'POST',
					url: './other/savepickupmod.php',
					data: c2bet_st ,		
					error: function(xhr) {
						//jQuery('#order').html('<font color=#FF0000>网路忙线中，请稍后再试!错误代码:992</font>');
						//alert('網路忙線中，請稍後再試!錯誤代碼:simp137');
						return false;
					},					
					beforeSend:function(response)
					{
				   jQuery('.content-2').html("<div class='Loading'></div>");
				  },
					success: function(response) {
           
					    var ss = jQuery.trim(response);
					    //alert(ss);
					    var sst = ss.split(":");
			           if(sst[0]=='empty')
							    {
							   alert(_JS_LOGOUTED);
							   document.location.href='./memberlogout.php';
										  	   	return;
							    }
							   else if(sst[0]=='NO_LOGIN')
							    {
							    
								alert(_ACCOUNT_OTHER_ONLINE);
								document.location.href='./memberlogout.php';
									return;
							    }
							   else if(sst[0]=='greater')
						  	 	 {
						    alert(_JS_WITHDRAWALS_GREATER_100);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
							   else if(sst[0]=='over')
						  	 	 {
						    alert(_PICKUP_THEN_QUOTA);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
							   else if(sst[0]=='over')
						  	 	 {
						    alert(_PICKUP_THEN_QUOTA);
						    return;	 	 	
						  	 	 }
						  	 	
						  	 	else if(sst[0]=='less24')
						  	 	 {
						    alert('户转之金额24小时之后方可提领!');
						    return;	 	 	
						  	 	 }
						  	 else if(sst[0]=='1')
						  	   {
						  	   	//alert(_JS_APPLICATION_SUCCESS);
						  	   	//SetDaiLog(_JS_APPLICATION_SUCCESS,sst[3]);
						  	   	if(sst[2] >= 5)
						  	   	{
						  	   		sst[2] = 5;
						  	   	}
						  	   	//new Charts("pie2","次").ratePie(sst[2]);
						  	   	//new Charts("pie1","次",sst[1],sst[2]).ratePie(1);
						  	   	//new Charts("pie1","次",2,3).ratePie(1);
						  	   	
						  	   	//$("#Modal_cover_fees_sec").css('display','block');
	    	            //getscript();
							      //SetDaiLog();
							        //$("#next2").click(function() {
							        	alert(_JS_APPLICATION_SUCCESS);
							        	document.location.href='./monrecord.php';
							        //});
						  	   	//document.location.href='./monrecord.php';
						  	   	return;
						  	   }
							   else
							     {
                   alert(_JS_APPLICATION_ERROR);
							     document.location.href='./receive.php';
							     return;
							     }
					}
				 });			
		    
		    });
	    	
	    }
	    
	    else
	    {    	  	    
  	    //console.log(jimDatass);
  	    //return;
  	    jQuery.ajax({
					type: 'POST',
					url: './other/savepickupmod.php',
					data: c2bet_st ,		
					error: function(xhr) {
						//jQuery('#order').html('<font color=#FF0000>网路忙线中，请稍后再试!错误代码:992</font>');
						//alert('網路忙線中，請稍後再試!錯誤代碼:simp137');
						return false;
					},					
					beforeSend:function(response)
					{
				   jQuery('.content-2').html("<div class='Loading'></div>");
				  },
					success: function(response) {
 
					    var ss = jQuery.trim(response);
					    //alert(ss);
					    var sst = ss.split(":");
			           if(sst[0]=='empty')
							    {
							   alert(_JS_LOGOUTED);
							   document.location.href='./memberlogout.php';
										  	   	return;
							    }
							   else if(sst[0]=='NO_LOGIN')
							    {
							    
								alert(_ACCOUNT_OTHER_ONLINE);
								document.location.href='./memberlogout.php';
									return;
							    }
							   else if(sst[0]=='greater')
						  	 	 {
						    alert(_JS_WITHDRAWALS_GREATER_100);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
							   else if(sst[0]=='over')
						  	 	 {
						    alert(_PICKUP_THEN_QUOTA);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
						  	 	else if(sst[0]=='less24')
						  	 	 {
						    alert('会员户转之金额24小时之后方可提领');
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
						  	 else if(sst[0]=='1')
						  	   {
						  	   	//alert(_JS_APPLICATION_SUCCESS);
						  	   	//SetDaiLog(_JS_APPLICATION_SUCCESS,sst[3]);
						  	   	if(sst[2] >= 5)
						  	   	{
						  	   		 sst[2] = 5;
						  	   		
						  	   	}
						  	   	//new Charts("pie2","次").ratePie(sst[2]);
						  	   	//new Charts("pie1","次").ratePie(sss);
						  	   	  getscript();
						  	   	  $("#Modal_cover_fees_sec").css('display','block');    	            
							        $("#next2").click(function() {
							        $("#Modal_cover_fees_sec").css('display','none');
							        	document.location.href='./monrecord.php';
							        });
						  	   	//document.location.href='./monrecord.php';
						  	   	return;
						  	   }
							   else
							     {
                    alert(_JS_APPLICATION_ERROR);
							     document.location.href='./receive.php';
							     return;
							     }
					}
				 });	
	    }
	    
  	  /*
	    jQuery.ajax({
					type: 'POST',
					url: './other/savepickupmod.php',
					data: c2bet_st ,		
					error: function(xhr) {
						//jQuery('#order').html('<font color=#FF0000>网路忙线中，请稍后再试!错误代码:992</font>');
						//alert('網路忙線中，請稍後再試!錯誤代碼:simp137');
						return false;
					},					
					beforeSend:function(response)
					{
				   jQuery('.content-2').html("<div class='Loading'></div>");
				  },
					success: function(response) {
 
					    var ss = jQuery.trim(response);
					    //alert(ss);
					    var sst = ss.split(":");
			           if(sst[0]=='empty')
							    {
							   alert(_JS_LOGOUTED);
							   document.location.href='./memberlogout.php';
										  	   	return;
							    }
							   else if(sst[0]=='NO_LOGIN')
							    {
							    
								alert(_ACCOUNT_OTHER_ONLINE);
								document.location.href='./memberlogout.php';
									return;
							    }
							   else if(sst[0]=='greater')
						  	 	 {
						    alert(_JS_WITHDRAWALS_GREATER_100);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
							   else if(sst[0]=='over')
						  	 	 {
						    alert(_PICKUP_THEN_QUOTA);
						    document.location.href='./receive.php';
						    return;	 	 	
						  	 	 }
						  	 else if(sst[0]=='1')
						  	   {
						  	   	alert(_JS_APPLICATION_SUCCESS);
						  	   	//SetDaiLog(_JS_APPLICATION_SUCCESS,sst[3]);
						  	   	//if(sst[2] >= 5)
						  	   	//{
						  	   		 //sst[2] = 5;
						  	   		
						  	   	//}
						  	   	//new Charts("pie2","次").ratePie(sst[2]);
						  	   	//new Charts("pie1","次").ratePie(sss);
						  	   	//$("#Modal_cover_fees_sec").css('display','block');
	    	            //getscript();
							        //$("#next2").click(function() {
							        	//document.location.href='./monrecord.php';
							        //});
						  	   	document.location.href='./monrecord.php';
						  	   	return;
						  	   }
							   else
							     {
                    alert(_JS_APPLICATION_ERROR);
							     document.location.href='./receive.php';
							     return;
							     }
					}
				 });
			*/
	  
		}

function SetDaiLog()
{
	//$("#Modal_cover2").css('display','block');
	
}

function GetDaiLog(a,b)
{
	 var ms = a*b;
	 //alert(a+'::'+b);
	$('#getmoneyfee').html(Math.ceil(ms));
	//$("#Modal_cover").css('display','block');
}

function closefeealert()
{
	$("#Modal_cover_fees").css('display','none');
	$("#Modal_cover_fees_sec").css('display','none');
	$('#fee_pickup').css('display','block');
	jQuery('.content-2').html("<div class='Loading'></div>");
	setTimeout("window.location.reload()",2000);
}