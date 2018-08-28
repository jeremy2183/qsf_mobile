/*千分號(下注預估獲利)*/
	var thousandComma = function(number)
	{
	 var num = number.toString();
	 var pattern = /(-?\d+)(\d{3})/;
	  
	 while(pattern.test(num))
	 {
	  num = num.replace(pattern, "$1,$2");
	  
	 }
	 return num;
	 
	}
	
	function closeorderdiv()
	{
		
		$( ".cover" ).css("display","none");
		//jQuery("#order_wa99", window.parent.document).dialog("close");
		//$( "#Modal_cover" ).css("display","none");
	}

/*下注資料確定後送出*/
function getorder()
  {
  	    
    //alert('hh');
  	var simple_ar = Array();
  	var c2bet_st = new Object;
  	var orderinfo_st = new Object;
  	var ee = /^\d+$/;
  	//var re = /^[0-9]+(\.)?$/;
  	var re = /^[0-9]*$/;
  	var MarketId = jQuery('#MarketId').val();
  	var gameid = jQuery('#gameid').val();
  	var SelectionId = jQuery('#SelectionId').val();
  	var BetType = jQuery('#BetType').val();
  	var name_st = jQuery('#name').val();
  	var gamename = jQuery('#gamename').val();
    var marketname = jQuery('#marketname_st').val();
    var Rate = jQuery('#Rate').val();
    //var momey = jQuery('#momey').val();
    var percent = jQuery('#percent').val();
    var betfairori = jQuery('#betfairori').val();
    var Bet = jQuery('#Bet').val();
    var markettype = jQuery('#markettype').val();
    var time = jQuery('#time').val();
    var selectname = jQuery('#selectname').val();
    var inplay = jQuery('#inplay').val();
    var handicap = jQuery('#handicap').val();
    var selectrateL1 = jQuery('#selectrateL1').val();
    var gc12 = jQuery('#gc12').val();
    var mid = jQuery('#mid').val();
    var who = jQuery('#who').val();
    var mname = jQuery('#mname').val();
    var category = jQuery('#category').val();
    var sel = jQuery('#sel').val();
    var balance_money = jQuery('#balance_money').val();
  	var ckNumber = /^[0-9]+(\.[0-9]{2})?$/;//小數點2位	
  	//var userreg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
  		
    var ssB = ((Bet)*(1-percent)*(Rate-1)).toFixed(2);   
    var ss = ((Bet)*(Rate)*(1-percent)).toFixed(2);
    var hh = ((Bet)*(1-percent)).toFixed(2);
    
	 
	if(parseFloat(Bet) > parseFloat(balance_money))
	{
	 //swal({title: "{ERRORMESSAGE}",text: "{GREATER_QUOTA}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
	 alert(GREATER_QUOTA);
	 return;
	}
  
	var pStr = Bet.substr(Bet.indexOf(".")+1 );		
		if( Bet.indexOf(".") > 1 && pStr.length > 2 )
		{
			alert(MONEY_LESS_POINT_2);
			return;
		}
	//if(!ckNumber.test(Bet))   
       //{    
     //swal({title: "{ERRORMESSAGE}",text: "{MONEY_LESS_POINT_2}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
     //alert(MONEY_LESS_POINT_2);
     //return;
       //}
  
       
 if(Bet < 100 || Bet=="")
  	{
  	//swal({title: "{ERRORMESSAGE}",text: "{MONEY_GREATER100}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
  		alert(MONEY_GREATER100);
  		return;
  	}



jQuery("#order1").hide();
jQuery("#order2").show();
    
var jimDatass = {handicap: handicap,inplay: inplay,selectname: selectname, time: time, gameid: gameid, markettype: markettype, gamename: gamename, marketname: marketname, Rate: Rate, Bet: Bet, name_st: name_st, BetType: BetType, MarketId: MarketId, SelectionId: SelectionId, betfairori: betfairori, percent: percent, chk: 'order', selectrateL1: selectrateL1, category:category, sel:sel, gc12:gc12}
  	simple_ar.push(jimDatass);
  	orderinfo_st = simple_ar;
  	c2bet_st["c2betorder"]=orderinfo_st;
 //console.log(c2bet_st);
 //return;	      
jQuery("#btnTest").click(function() {	    	
  
 	    
 	    jQuery.ajax({
		type: 'POST',
		url: './order_finish.php' ,
		data: c2bet_st ,		
		error: function(xhr) {
			return false;
		},
			
		
		beforeSend:function(response)
		{
		 jQuery('#Modal_cover').html("<div class='Loading'></div>"); 	
		}, 
		
		 
		success: function(response) {
			//alert(response);
			      console.log( 'submitResponse:'+response);
			      var ss = jQuery.trim(response);
			      var re_back = ss.split(':');

			      if(re_back[0]=='F')
			      {
					      alert(re_back[1]);
					      location.reload();
			      }
			      else
			      {
			      
			         jQuery('#Modal_cover').html(response);	
			      }
		 }
    
	  	});
	 

 
 });
 
  }

	/*檢查下注預估獲利相關資料*/
	function checkorder(bb)
	{
		a_add=0;
		var d = jQuery('#BetType').val();
		var c = jQuery('#Rate').val();
		var f = jQuery('#percent').val();
		var reg = /^[0-9]*$/;

		if(c=="")
		{
			alert(ODDS_EMPTY);
			return;
		}
		$('#Bet').val(bb);
		var pStr = bb.substr( bb.indexOf(".")+1 );

		if( bb.indexOf(".") > 1 && pStr.length > 2 )
		{
			alert(MONEY_LESS_POINT_2);
			$( "#Bet" ).focus();
			return;
		}
		
		/*
		var ss = ((bb)*(c)*(1-f)).toFixed(2);
		var hh = ((bb)*    (1-f)).toFixed(2);
		jQuery('#ordertotal').html(hh);
		*///20180605修正小數兩位無條件捨去
		ss = Calculate( bb, c );

		jQuery('#orderrisk').html(ss);
		jQuery('#orderrisk_st').html(ss);
		jQuery('#Bet_st').html(bb);
	}
	
	//計算預估獲利(手續費0.05)
	function Calculate( inputAmount, itemProfit )
	{
		CacheSize = parseFloat( inputAmount );
		var size = Math.pow( 10, 2 );
		var result = Math.floor( ( CacheSize * itemProfit * 0.95 ) * size ) / size ;//計算預估獲利
		return result;
	}
  
/* 快捷金額設定-執行 */
	function changeCommon(pwdType)
	{
		//var pwdType = $('#pType').val();
		if( pwdType != 'common' )
		{
			alert('{_WRONG_USE_}');
			return;
		}
		var simple_ar = Array();
		var c2bet_st = new Object;
		var orderinfo_st = new Object;

		var re = /^[0-9]*$/;
		var common1 = jQuery("#common1").val();
		var common2 = jQuery("#common2").val();
		var common3 = jQuery("#common3").val();
		var common4 = jQuery("#quotas").val();
    
		if(common1=='' || common2=='' || common3=='')
		{
			alert(_PLEASEINPUTNUM_);
			//alert('请输入数字');
			return;
		}
		if( !common1.match( re ) || !common2.match( re ) || !common3.match( re ) )
		{
			alert(_PLEASEINPUTNUM_);
			//alert('请输入数字');
			return;
		}

		if( common1 ) c2bet_st["common1"] = common1;
		if( common2 ) c2bet_st["common2"] = common2;
		if( common3 ) c2bet_st["common3"] = common3;
		if( common4 ) c2bet_st["common4"] = common4;

		jQuery.ajax({
			type: 'POST',
			url: 'ActionEditCommon.php',
			data: c2bet_st,		
			error: function(xhr)
			{
				alert(_BREAK_CHECK_INFO);
				return false;
			},
			beforeSend:function(response)
			{
				//Loading();
			}, 
			success: function(response)
			{
				$('.btn_group').html(response);
				//alert(response);
				//response = jQuery.trim(response);
				//location.reload();
				//return;
			}
		 }); 
	}


  /*賠率變更下注資料確定後送出*/
	function re_getorder()
  {
  	    
    //alert('hh');
  	var simple_ar = Array();
  	var c2bet_st = new Object;
  	var orderinfo_st = new Object;
  	var ee = /^\d+$/;
  	//var re = /^[0-9]+(\.)?$/;
  	var re = /^[0-9]*$/;
  	var MarketId = jQuery('#MarketId').val();
  	var gameid = jQuery('#gameid').val();
  	var SelectionId = jQuery('#SelectionId').val();
  	var BetType = jQuery('#BetType').val();
  	var name_st = jQuery('#name').val();
  	var gamename = jQuery('#gamename').val();
    var marketname = jQuery('#marketname_st').val();
    var Rate = jQuery('#Rate').val();
    var percent = jQuery('#percent').val();
    var betfairori = jQuery('#betfairori').val();
    var Bet = jQuery('#Bet').val();
    var markettype = jQuery('#markettype').val();
    var time = jQuery('#time').val();
    var selectname = jQuery('#selectname').val();
    var inplay = jQuery('#inplay').val();
    var handicap = jQuery('#handicap').val();
    var selectrateL1 = jQuery('#selectrateL1').val();
    var gc12 = jQuery('#gc12').val();
    var mid = jQuery('#mid').val();
    var who = jQuery('#who').val();
    var mname = jQuery('#mname').val();
    var category = jQuery('#category').val();
    var sel = jQuery('#sel').val();
    var balance_money = jQuery('#balance_money').val();
  	var sre = /^[0-9]+(\.[0-9]{1,2})?$/;//小數點2位	
  		
    var ssB = ((Bet)*(1-percent)*(Rate-1)).toFixed(2);   
    var ss = ((Bet)*(Rate)*(1-percent)).toFixed(2);
    var hh = ((Bet)*(1-percent)).toFixed(2);
    
    		
			   
		
	if(parseFloat(Bet) > parseFloat(balance_money))
	{
	 //swal({title: "{ERRORMESSAGE}",text: "{GREATER_QUOTA}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
	 alert("{GREATER_QUOTA}");
	 return;
	}
  
	
	if(!sre.test(Bet))   
       {    
     //swal({title: "{ERRORMESSAGE}",text: "{MONEY_LESS_POINT_2}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
     //change_alert('#FF0000','Error','金額请勿有其他文字!','#FFFFFF');
     alert("{MONEY_LESS_POINT_2}");
     return;
       }
       
 if(Bet < 100 || Bet=="")
  	{
  	//swal({title: "{ERRORMESSAGE}",text: "{MONEY_GREATER100}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
  		//change_alert('#FF0000','Error','金額请大于1','#FFFFFF');
  		//alert('金額请大于1');
  		alert("{MONEY_GREATER100}");
  		return;
  	}

var jimDatass = {handicap: handicap,inplay: inplay,selectname: selectname, time: time, gameid: gameid, markettype: markettype, gamename: gamename, marketname: marketname, Rate: Rate, Bet: Bet, name_st: name_st, BetType: BetType, MarketId: MarketId, SelectionId: SelectionId, betfairori: betfairori, percent: percent, chk: 'order', selectrateL1: selectrateL1, category:category, sel:sel, gc12:gc12}
  	simple_ar.push(jimDatass);
  	orderinfo_st = simple_ar;
  	c2bet_st["c2betorder"]=orderinfo_st;
 	  
 	  //console.log(jimDatass);
 	  //return;
 	 jQuery.ajax({
		type: 'POST',
		url: './order.php' ,
		data: c2bet_st ,		
		error: function(xhr) {
			//parent.window.frames.jQuery('#movemore_ss').html('<font color=#FF0000>网路忙线中，请稍后再试!错误代码:681</font>');
			//alert('網路忙線中，請稍後再試!錯誤代碼:simp367');
			return false;
		},
			
		
		beforeSend:function(response)
		{
		    jQuery( "#order_wa99" ).html('...loading...'); 	
		}, 
		
		 
		success: function(response) {
			//alert(response);
			  //window.clearInterval(count_night);
			  //countdowntime=0;
			  //openallselwill(who,mid,encodeURI(category),gameid,gc12,encodeURI(gamename),time);
			  //checkquota_orderfinish();
			  //checkquota_st();
			  //jQuery('#selfmoney_reag').load("./controler/re_order_reorder.php");//無千分號
			  //jQuery('#selfmoney').load("./controler/re_order_login.php");//千分號顯示
				/*更新頁面資料*/
				reloadgamemarket(gameid,gc12,gamename,category,time);
				jQuery( "#order_wa99" ).html(response); 
				  
		 }
    
	  	});
 
  }
  
	/*快速按鈕注額*/
	function checkorder_add(bb,b)
	{
		if(b=='all')
		{
			var bet = '0';   	
		}
		else
		{
			var bet = jQuery('#Bet').val();  		
		}
		var d = jQuery('#BetType').val();
		var c = jQuery('#Rate').val();
		var f = jQuery('#percent').val();  	

		var balance_money = jQuery('#balance_money').val();

		if(bet=='')
		{
			bet=0;
		}
		if(c=="")
		{
			alert(ODDS_EMPTY);
			return;
		}
		var total_ss = ((bet-0)+(bb-0));

		if((total_ss+0) > (balance_money+0))
		{
			alert(GREATER_QUOTA);
			return;
		}
		//var ss = ((total_ss)*(c)*(1-f)).toFixed(2);
		//20180605修正無條件捨去
		var ss = Calculate( total_ss, c );
		jQuery('#orderrisk_st').html(ss);
		jQuery('#Bet').val(total_ss);
		jQuery('#orderrisk').html(ss);
		jQuery('#Bet_st').html(total_ss);  
	}
  
  /*設定快速鍵值*/
  function userinfo_setup()
  {
  	jQuery('#betsizeorder').hide();
  	jQuery('#betsizeorder_after').show();
  	jQuery('#betsizebutton').hide();
  	jQuery('#betsizebutton_after').show();
  }
  
  /*設定快速鍵值2*/
  function userinfo_setup_finish()
  {
  	var si1 =jQuery('#betsize_af1').val();
  	var si2 =jQuery('#betsize_af2').val();
  	var si3 =jQuery('#betsize_af3').val();
  	
  	jQuery.ajax({
		    type: 'POST',
		    url: './other/betsize.php',
		    data: 'quiky='+si1+','+si2+','+si3 ,		
		    error: function(xhr)
		      {
			   //jQuery('#order').html('<font color=#FF0000>网路忙线中，请稍后再试!错误代码:681</font>');
			    //alert('網路忙線中，請稍後再試!錯誤代碼:150');
			    return false;
		      },
			   beforeSend:function(response)
					{   
					}, 
	      success: function(response)
	        {
	        	var ss = jQuery.trim(response);
	        	var str =ss.split(":");
	        	var money_quiss =str[1].split(",");
	        	var totalss = '';		         
			    
			    totalss=totalss+'<table style="width:100%;padding-left:25px;padding-top:10px;"><tr><td><button class="orderbutton_setp" type="submit" onclick=checkorder_add('+money_quiss[0]+') class="btn_money_order">'+money_quiss[0]+'</button></td>';
	        totalss=totalss+'<td><button class="orderbutton_setp" type="submit" onclick=checkorder_add('+money_quiss[1]+') class="btn_money_order">'+money_quiss[1]+'</button></td>';
	        totalss=totalss+'<td><button class="orderbutton_setp" type="submit" onclick=checkorder_add('+money_quiss[2]+') class="btn_money_order">'+money_quiss[2]+'</button></td>';
	        totalss=totalss+'<td><button class="orderbutton_setp" type="submit" onclick=checkorder_add('+money_quiss[3]+',"all") class="btn_money_order">{ALL}</button></td></tr></table>';

			          if(str[0]=='S')
			           {
			        swal({title: "{EDIT_SUCCESS}", text: "{EDIT_SUCCESS}", confirmButtonText: "{DETERMINE}",customClass: 'twitter'});	           	
			      
			        jQuery('#betsizeorder').show();
			        jQuery('#betsizeorder').html(totalss);
			        jQuery('#betsizeorder_after').hide();
			        jQuery('#betsizebutton_after').hide();
			        jQuery('#betsizebutton').show();
			      //parent.window.top.jQuery("#userinfo_setup").dialog('close');
			           }
			          else
			           {
			        //alert('Fails');
			        swal({title: "{EDIT_FAILES}", text: "{EDIT_FAILES}", confirmButtonText: "{DETERMINE}",customClass: 'twitter'});	           	
			        	
			           }
		      }
    
	  	       }); 
  }
  
  function reser()
	{
		//alert('TT');
		jQuery('[name="first"]').hide();
		jQuery('[name="secand"]').hide();
		jQuery('[name="res"]').show();
		//$('#reser_confirmTable').show();
		//$('#OrderMsg').css({'height':1350 + 'px'});
	}
	
/*預約下注checkbox全部*/
	function res_check_all_money(a,b,c,d)
	{
    var c = parseFloat(c);
		var a1 = ((a / 100)*(c)*(d)).toFixed(2);
		var b1 = ((b / 100)*(c)*(d)).toFixed(2);
		jQuery( '#res_check_all_c').addClass("ff0000");
		jQuery( '#res_check_all_c').html(a1+'~'+b1);
     if(!sre_sec.test(c))
		    {
		    	alert('{MONEY_LESS_POINT_2}');
		    	return;
		    }
	}
	
	function res_check_all(a)
	{
		if( jQuery( '#res_allcach').prop("checked") )
		{
			jQuery( '#size_s').attr( 'disabled', true );
			jQuery('#maxprofit').attr( 'disabled', true );
			jQuery('#minprofit').attr( 'disabled', true );
			jQuery( '#size_s').val(a);
			jQuery( '#res_check_all_c').addClass("ff0000");
			jQuery( '#res_check_all_c').html('{_RES_PERCENT_CHANGE}');
		}
		else
		{
			jQuery( '#res_check_all_c').html('');
			jQuery( '#size_s').val('');
			jQuery( '#size_s').attr( 'disabled', false );
			jQuery('#maxprofit').attr( 'disabled', false );
			jQuery('#minprofit').attr( 'disabled', false );
		}
	}
	
	function res_check_range_risk(a,b,d)
	{
		var c = jQuery('#size_s').val();
		if(b=='1')
		 {
		var a1 = ((a / 100)*(c)*(d)).toFixed(2);
		var aa = jQuery('#maxprofit').val();
		var b1 = ((aa / 100)*(c)*(d)).toFixed(2);
		jQuery( '#res_check_all_c').html(a1+'~'+b1);
		 }
		else
		 {
		var b1 = ((a / 100)*(c)*(d)).toFixed(2);
		var aa = jQuery('#minprofit').val();
		var a1 = ((aa / 100)*(c)*(d)).toFixed(2);
		jQuery( '#res_check_all_c').html(a1+'~'+b1); 	
		 }
	}
	
	/* 預約下注投資項目popup */
	function res_toActionOrderPopup(){
		
		var simple_ar = Array();
  	var c2bet_st = new Object;
  	var orderinfo_st = new Object;
  	
		//var sre = /^[0-9]+(\.[0-9]{1,2})?$/;//小數點2位
		var maxprofit = jQuery('#maxprofit').val();
		var minprofit = jQuery('#minprofit').val();
		var s = jQuery('#size_s').val();
		
		var MarketId = jQuery('#MarketId').val();
  	var gameid = jQuery('#gameid').val();
  	var SelectionId = jQuery('#SelectionId').val();
  	var BetType = jQuery('#BetType').val();
  	var name_st = jQuery('#name').val();
  	var gamename = jQuery('#gamename').val();
    var marketname = jQuery('#marketname_st').val();
    var Rate = jQuery('#Rate').val();
    var percent = jQuery('#percent').val();
    var betfairori = jQuery('#betfairori').val();
    var Bet = jQuery('#Bet').val();
    var markettype = jQuery('#markettype').val();
    var time = jQuery('#time').val();
    var selectname = jQuery('#selectname').val();
    var inplay = jQuery('#inplay').val();
    var handicap = jQuery('#handicap').val();
    var selectrateL1 = jQuery('#selectrateL1').val();
    var gc12 = jQuery('#gc12').val();
    var mid = jQuery('#mid').val();
    var who = jQuery('#who').val();
    var mname = jQuery('#mname').val();
    var category = jQuery('#category').val();
    var sel = jQuery('#sel').val();
		
		 //if(s=='' || minprofit=='' || maxprofit=='')
		 //{
		 	  //alert("请输入相关讯息!");
				//return;
		 //}
		 
		 if( isNaN(maxprofit) || isNaN(minprofit) || isNaN(s))
			{
			swal({title: "{ERRORMESSAGE}",text: "{_RANGE_CURRENT_NUM}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});	
				return;
			}
	
		if(!sre_sec.test(maxprofit))
		{
		swal({title: "{ERRORMESSAGE}",text: "{_PROFIT_RANGE_POINT_2}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
			jQuery('#maxprofit').focus();
			return;
		}
  
		if(!sre_sec.test(minprofit))
		{
			swal({title: "{ERRORMESSAGE}",text: "{_PROFIT_RANGE_POINT_2}",confirmButtonText: "{DETERMINE}",customClass: 'twitter'});
			jQuery('#minprofit').focus();
			return;
		}
	
	
		if(!sre_sec.test(s))
			{
				alert("{_BET_MONEY_POINT_2}");
				return;
			}
	
		if(jQuery('#res_allcach').prop("checked") )
		{
			var allcach = '1';
		}
	
	
var jimDatass = {allcach:allcach, size:s, minprofit:minprofit, maxprofit:maxprofit, handicap: handicap,inplay: inplay,selectname: selectname, time: time, gameid: gameid, markettype: markettype, gamename: gamename, marketname: marketname, Rate: Rate, Bet: Bet, name_st: name_st, BetType: BetType, MarketId: MarketId, SelectionId: SelectionId, betfairori: betfairori, percent: percent, chk: 'order', selectrateL1: selectrateL1, category:category, sel:sel, gc12:gc12}
  	simple_ar.push(jimDatass);
  	orderinfo_st = simple_ar;
  	c2bet_st["c2betorder"]=orderinfo_st;
 	  
 	  //console.log(jimDatass);
 	  //return;
		jQuery.ajax({
			type: 'POST',
			url: './res_order_finish.php',
		  data: c2bet_st ,
		  error: function(xhr) {
				return false;
			},
			beforeSend:function(response)
			{
				jQuery('#myModa1_2').html("<div class='Loading'></div>");
			},
			success: function(response) {
			  jQuery('#myModa1_2').html(response);
			}
		});
	}
	
	function res_actionorder()
	 {
	 	$('#myModa1_1').css('display', 'none');
	 	$('#myModa1_2').css('display', 'block');
	 }

