/* Menu Action */
$(function(){
	  
	  var page = location.pathname.split('/').pop();
    //$('#nav li a[href="' + page + '"]').addClass('active')
		var w = $("#sMenu").width();
		var h;

		if( ( $('body').height() - 150 ) < 2570 ){ h = 550; }else{ h = ( $('body').height() - 150 ); }//每增加一Menu約200px
		$('#sMenu').css('height', h + 'px' ); //將區塊自動撐滿畫面高度

		$("#MenuButton1").click(function(){ //滑鼠滑入時
			$("#MenuButton0").css('display','block');
			$("#MenuButton1").css('display','none');
			$("#sMenu").animate({ left:'0px' }, 200 ,'swing');
		});

		$("#MenuButton0").click(function(){　//滑鼠離開後
			$("#MenuButton1").css('display','block');
			$("#MenuButton0").css('display','none');
			$("#sMenu").animate( { left:'-'+w+'px' }, 200 ,'swing');	
		});	

		$("#statisticsSelect").click(function(){
			if($("#statisticsMenu").css( 'display' ) == 'none' )
				$( "#statisticsMenu" ).slideDown( "slow", function() {});
			else
				$( "#statisticsMenu" ).slideUp( "slow", function() {});
			
		});
		  $('#footer').find( "*" ).css( "background-color", "" );
				if(page=='market.php' || page=='marketorder.php')
				 {
			$('#footer_aa').css('background-image', 'url("./icon/soccer-2.png")');
			$('#footer_aa').css( "background-color", "rgba(146,163,178,0.3)" );
			$('#footer_aa').css( "color", "#003690" );
				 }
				if(page=='orderinfo.php')
				 {
			$('#footer_bb').css('background-image', 'url("./icon/list-2.png")');
			$('#footer_bb').css( "background-color", "rgba(146,163,178,0.3)" );
			$('#footer_bb').css( "color", "#003690" );
				 }
				if(page=='history.php')
				 {
			$('#footer_dd').css('background-image', 'url("./icon/coin-2.png")');
			$('#footer_dd').css( "background-color", "rgba(146,163,178,0.3)" );
			$('#footer_dd').css( "color", "#003690" );
				 }
				if(page=='person.php' || page=='usercenter.php')
				 {
			$('#footer_ee').css('background-image', 'url("./icon/user-2.png")');
			$('#footer_ee').css( "background-color", "rgba(146,163,178,0.3)" );
			$('#footer_ee').css( "color", "#003690" );
				 }
			   if(location.search == '?uc=Receive')
			   {
			   	//$('#bottom_line1').removeClass('bottom_line');
			   	$('.nav-tabs #bottom_line2').addClass('bottom_line_right');
			   }
			   else
			   {
			    $('.nav-tabs #bottom_line1').addClass('bottom_line_left');
			   	//$('.nav-tabs #bottom_line2').addClass('bottom_line');
			   }
				
});

function gotourl(a)
  	{
  		document.location.href=a+'.php';
  		
  	}
/*footer*/
var highlightLink = function () {

        var active = null, colour = '#92a3b2';
        if (this.attachEvent) this.attachEvent('onunload', function () {
            active = null;
        });

        return function (element) {
        	
            if ((active != element) && element.style) {
                if (active) active.style.backgroundColor = '';
                element.style.backgroundColor = colour;
                active = element;
            }
        };
}();

/*left menu*/
var highlightLink_st = function () {
        var active = null, colour = '#003690';
        if (this.attachEvent) this.attachEvent('onunload', function () {
            active = null;
        });
        return function (element) {
            if ((active != element) && element.style) {
                if (active) active.style.backgroundColor = '';
                element.style.backgroundColor = colour;
                active = element;
            }
        };
}();

/*usercenter*/
var highlightLink_usercenter = function () {
        var active = null, colour = '#003690';
        if (this.attachEvent) this.attachEvent('onunload', function () {
            active = null;
        });
        return function (element) {
            if ((active != element) && element.style) {
                if (active) active.style.backgroundColor = '';
                element.style.backgroundColor = colour;
                element.style.color = "#ffffff";
                active = element;
            }
        };
    }();

function ReverseDisplay(d) {
		if(document.getElementById('open'+d).style.display == "none")
		{
		jQuery('#orderinfolistgame_four'+d+'').removeClass("orderinfolistgame_four").addClass("orderinfolistgame_four_open");	
		}
		else
		{
		jQuery('#orderinfolistgame_four'+d+'').removeClass("orderinfolistgame_four_open").addClass("orderinfolistgame_four");
	
		}
		jQuery('#opens'+d+'').toggleClass("green_st");
		jQuery('#open'+d+'').toggle();
		}

function ReverseDisplay_his(d) {
		if(document.getElementById('open'+d).style.display == "none")
		{
		jQuery('#res_orderinfolistgame_four'+d+'').removeClass("res_orderinfolistgame_four").addClass("res_orderinfolistgame_four_open");	
		}
		else
		{
		jQuery('#res_orderinfolistgame_four'+d+'').removeClass("res_orderinfolistgame_four_open").addClass("res_orderinfolistgame_four");
	
		}
		jQuery('#opens'+d+'').toggleClass("green_st");
		jQuery('#open'+d+'').toggle();
		}

function ReverseDisplay_history(d) {
		if(document.getElementById('open'+d).style.display == "none")
		{
		jQuery('#history_four'+d+'').removeClass("history_four").addClass("history_four_open");	
		}
		else
		{
		jQuery('#history_four'+d+'').removeClass("history_four_open").addClass("history_four");
	
		}
		jQuery('#opens'+d+'').toggleClass("green_st");
		jQuery('#open'+d+'').toggle();
		}



		