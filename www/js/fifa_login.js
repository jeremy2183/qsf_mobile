
	function getLoginInfo()
	{
		//var loginStr = $.cookie( 'loginInfo_cookie' );
		if( $.cookie( "loginInfo_cookie" ) == null )
		{
			/*
			alert( 'getLoginInfo() no Set' );
			$("input[name='checbox_input']").each(function() {
				$(this).prop("checked", false);
			});
			*/
		}
		else
		{
			//alert( 'checked true'+$.cookie( "loginInfo_cookie" ) );
			var loginInfo = JSON.parse( $.cookie( "loginInfo_cookie"  ) );
			if( loginInfo.account == '' || loginInfo.pwd == '' ) return false;
			$( '#account' ).val( loginInfo.account );
			$( '#pwd' ).val( loginInfo.pwd );
			$("input[name='checbox_input']").each(function() {
				$(this).prop("checked", true);
			});
			
		}
	}
	function saveLoginInfo()
	{
		if( $( '#account' ).val() == '' || $( '#pwd' ).val() == '' ) return false;
		var saveLoginVar = JSON.stringify( { "account":$( '#account' ).val(), "pwd":$( '#pwd' ).val() } );
		$.cookie("loginInfo_cookie", saveLoginVar, { expires: 5 ,path:'/'});
		//alert( saveLoginVar );
	}
	function clearLoginInfo()
	{
		//alert( 'clearLoginInfo' );
		$.cookie( 'loginInfo_cookie', '', { expires: -1 ,path:'/' } );
	}
	$(function () {
		getLoginInfo();
		setTimeout(function () {
			$(document).ready(function() {

				$("#saveLogin").click(function() {

					if($("#saveLogin").prop("checked"))
					{
						saveLoginInfo();
						$("input[name='checbox_input']").each(function() {
							$(this).prop("checked", true);
						});
					}
					else
					{
						clearLoginInfo();
						$("input[name='checbox_input']").each(function() {
							$(this).prop("checked", false);
						});           
					}
				});
				
				$(".dropdown img.flag").addClass("flagvisibility");

				$(".dropdown dt a").click(function() {
					$(".dropdown dd ul").toggle();
				});

				$(".dropdown dd ul li a").click(function() {
					var text = $(this).html();
					$(".dropdown dt a span").html(text);
					$(".dropdown dd ul").hide();
					$("#result").html("Selected value is: " + getSelectedValue("sample"));
				});

				function getSelectedValue(id) {
					return $("#" + id).find("dt a span.value").html();
				}

				$(document).bind('click', function(e) {
					var $clicked = $(e.target);
					if (! $clicked.parents().hasClass("dropdown"))
						$(".dropdown dd ul").hide();
					/*e.preventDefault();*//*取消預設動作*/
				});


				$("#flagSwitcher").click(function() {
					$(".dropdown img.flag").toggleClass("flagvisibility");
				});
			});

			var cover = document.getElementById('Modal_cover');
			var cover2 = document.getElementById('Modal_cover2');

			$("#qq").on('click',function () {

				$("#Modal_cover").css('display','block');
			});
			$(".close_x").on('click', function () {
				$("#Modal_cover").css('display', 'none');
				$("#myModa2").css('display', 'none');

			});
			$(".close_btn").on('click', function () {
				$("#Modal_cover").css('display', 'none');

			});
			$("#weixin").on('click',function () {
				$("#Modal_cover2").css('display','block');
			});
			$(".close_x").on('click', function () {
				$("#Modal_cover2").css('display', 'none');

			});
			$(".close_btn").on('click', function () {
				$("#Modal_cover2").css('display', 'none');

			});

			window.onclick = function (event) {
				if (event.target == cover) {
					cover.style.display = "none";
				}
				if (event.target == cover2) {
					cover2.style.display = "none";
				}
			}
		}, 500);
	});

	function checkuserform() 
	{
		//checkcookie();
		var account = $('#account').val().trim();
		var pwd = $('#pwd').val().trim();
		if(account=='' || pwd=='')
		{  	
			alert(_ABOUT_SAME_INFO);
			return false;
		}

		jQuery.ajax({
				type: 'POST',
				url: './other/login.php',
				data: 'account=' + account + '&pwd=' + pwd,
				error: function(xhr) {
				//alert('網路忙線中，請稍後再試!login18');
				},
				beforeSend:function(response)
				{

				},
				success: function(response)
				{
					qumoney = response.trim();
					//alert(qumoney);
					money_qui = qumoney.split(':');
					response = money_qui[0];
					if(response=="60")
					{
						alert( money_qui[2] );
						return false;
					}						
					if(response=="13")
					{
						alert(money_qui[2]);
						return false;
					}
					if(response=="0")
					{
						alert(_JS_PASS_ERROR_LESS_6);
						return false;
					}
					if(response=="4")
					{
						//alert(_JS_ERROR_FIVE);
						
						//alert('密码错误' + money_qui[1] + '次');
						alert('密码错误' + money_qui[1] + '次');
						return false;
					}
					if(response=="5")
					{
						alert(_JS_ACCOUNT_LOCK);
						return false;
					}
					if(response=="104")
					{
						alert(_JS_MANY_LOGIN);
						return false;
					}
					if(response=="105")
					{
						alert(_JS_SPEC_LOGIN_EVER_LOCK);
						return false;
					}
					if(response=="6")
					{
						alert(_JS_SPEC_LOGIN);
						return false;
					}   
					if(response=="3")
					{
						alert(_JS_NONE_ACCOUNT);	
						return false;
					}
					if(response=="1")
					{
						if($("#saveLogin").prop("checked"))
						{
							saveLoginInfo();
						}
						else
						{
							clearLoginInfo();
						}
						location.href='market.php';
						return;
					}
					else
					{
						
					}
				}
		});
	}
	function register(a)
	{
		if(a=='')
		{
			alert(_NOT_OPEN);
		}
		else
		{
			location.href='register.php?agent='+a+''; 		
		}
	}