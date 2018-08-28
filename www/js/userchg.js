function userchg_first()
{
	
	var amount = $('#amount').val();
	var passwd = $('#pickuppasswd').val();
	var username = $('#username').val();
	var MCode = $("#MCode").val();
	var ReMCode = $("#ReMCode").text();
	var pStr = amount.substr(amount.indexOf(".")+1 );
	
	
	if(amount=='' || username=='' || MCode=='')
	  {
	  alert('请填写相关资料!');
	  return;
	  }
	
	 if(isNaN(amount)){  
   alert("请输入数字或数字与小数点组合的金额！");
   return;  
   } 
   
	if(amount < 100)
		{
		alert('金额请大于100');
		return;
		}
		if( amount.indexOf(".") > 1 && pStr.length > 2 )
		{
		alert('金额最多小数点2位');
		return;
		}
	
	
	  if(MCode!=ReMCode)
	    {
	   alert('验证码错误');
	return;
	    }
  
  
  
  jQuery.ajax({
		type: 'POST',
		url: './other/userchg_sec.php' ,
		data: 'IncomeUser=' + username + '&amount=' + amount + '&withdrawpassword=' + passwd ,		
		error: function(xhr) {
			alert('error');
			return false;
		},
					
		beforeSend:function(response)
		{
			$("#Modal_coverchgload").html('<div id="loadingend" class="Loading" style="margin-left:150px;margin-top:10px;"></div>');
		  $("#Modal_coverchgload").attr("style", "z-index:10000;display:block;position:relative");
		}, 
				 
		success: function(response) {
			//alert(response);
			 var ss = jQuery.trim(response);			 
			 var re_back = ss.split(':');
			  if(re_back[0]=='success')
			   {
			   stoploadpic();
			   $('#Modal_coverchg').attr("style", "display:none");
			   $('#Modal_coverchg_sec').attr("style", "display:block");
			   $('#IncomeUsers').val(re_back[3]);
			   $('#amounts').val(amount);
			   $('#PayUsers').html(re_back[2]);	
			   $('#IncomeUid').html(re_back[1]);	
			   }
			  else
			   {
			   	stoploadpic();
			   	alert(re_back[1]);
			   	return;
			   }

			      
		 }
    
	  	});
  
  
}

function mobilecode()
{
	 var na = $('#nationcode').val();
	 //alert(na);
	 jQuery.ajax({
		type: 'POST',
		url: './other/userchgphone.php' ,
		data: 'phone='+na+'',		
		error: function(xhr) {
			return false;
		},
			
		
		beforeSend:function(response)
		{
		 $("#Modal_coverchgload").html('<div id="loadingend" class="Loading" style="margin-left:150px;margin-top:10px;"></div>');
		 $("#Modal_coverchgload").attr("style", "z-index:10000;display:block;position:relative");
		
		}, 
		
		 
		success: function(response) {
			//alert(response);
			var ss = jQuery.trim(response);
			var re_back = ss.split(':');
			  if(re_back[0]=='T')
			    {
			  stoploadpic();
			  $('#ReMCode').html(re_back[1]);
			  $(".send_code").removeClass("resend_code");
        $(".send_code").text('传送验证码');
			  alert('验证码已送出');
	
			    }
			  else if(re_back[0]=='F')
			  	{
			  $(".send_code").removeClass("resend_code");
        $(".send_code").text('传送验证码');
			  stoploadpic();
			  alert(re_back[1]);
			  	}
			  else
			  	{
			 $(".send_code").removeClass("resend_code");
        $(".send_code").text('传送验证码');
			 stoploadpic();
			 alert('线路忙线中，请稍候再试');  		
			  	}
		 }
    
	  	});
	 
}

function finishuserchg()
{
	  
  	var amount = $('#amounts').val();
	  var passwd = $('#pickuppasswd').val();
	  var incomeUser = $('#IncomeUsers').val();
	  var incomeUid = $('#IncomeUid').text();
	
	//alert(amount+':'+passwd+':'+incomeUser+':'+incomeUid);
	 jQuery.ajax({
		type: 'POST',
		url: './other/userchg_finish.php' ,
		data: 'amount='+ amount +'&withdrawpassword=' + passwd + '&incomeUser=' + incomeUser + '&incomeUid=' + incomeUid,		
		error: function(xhr) {
			return false;
		},
			
		
		beforeSend:function(response)
		{
		 $("#Modal_coverchgload").html('<div id="loadingend" class="Loading" style="margin-left:150px;margin-top:10px;"></div>');
		 $("#Modal_coverchgload").attr("style", "z-index:10000;display:block;position:relative");
		}, 
		
		 
		success: function(response) {
			//alert(response);
			var ss = jQuery.trim(response);
			 var re_back = ss.split(':');
			  if(re_back[0]=='0000')
			  {
			   stoploadpic();
			   $('#Modal_coverchg').attr("style", "display:none");
			   $('#Modal_coverchg_sec').attr("style", "display:none");
			   $('#Modal_coverchg_thr').attr("style", "display:block");
			   $('#IncomeUsers_fi').html(re_back[2]);
			   $('#amounts_fi').html(re_back[3]);
			   $('#OrderId_fi').html(re_back[4]);
			   $('#times_fi').html(re_back[5]);	
			  }
			  else
			  {
			  	stoploadpic();
			  	alert(re_back[1]);
			  }
		 }
    
	 });
}

function stoploadpic()
{
	$('#loadingend').removeClass('Loading');
  $('#Modal_coverchgload').attr("style", "display:none");
}