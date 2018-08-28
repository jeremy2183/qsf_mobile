
/**
 * [html: <canvas id="pie1"></canvas>]
 * [js: new Chart("pie1").ratePie(60);]
 * author:zhengyong
 * create:2016-05-11
 */
  window.Chart=function(domId,ART){
    var canvas = document.getElementById(domId);
    var ctx = canvas.getContext("2d");
        
    var W = canvas.width;
    var H = canvas.height;
    var deg=0,new_deg=0,dif=0;
    var text,text_w;
    var R=W<H?W:H;//先默认环半径为canvas宽度
    var bgR=(R-R/3)/2;//内环背景半径
    var linkW=R/2-bgR;//环宽度=(W/2-内半径)
    var inW=linkW/12;//内环宽度=环宽度*1/3
    var outW=linkW*2/12;//外环宽度=环宽度*2/3
    var inR=bgR+inW/2;//内环半径=内半径+内环宽度/2
    var outR=bgR+inW+outW/2;//外环半径=内半径+内环宽度+外环宽度/2
    var $this=this;
    
    var newstart = 0.7;
    var newend = 2.3;
    var sunum = newend - newstart;
    var nu = 0;
    /*
    jQuery('#canvas_chi').animate({
            left: '250px',
            opacity: '0',
            height: '150px',
            width: '150px'
        });
    */
    $this.ratePieNoAnimation=function(number){

        deg=360*number/5;
        deg_new=new Number((sunum/5)).toFixed(2);
        endfee = newstart+(deg_new*nu);

        //底色大
        ctx.clearRect(0,0,W,H);
        ctx.beginPath();
        //var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
            /*grd.addColorStop(1, "#FF0000");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");*/
          var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
              grd.addColorStop(1, "#FFFFFF");
              ctx.strokeStyle = "rgba(255,255,255,0.1)";//生成的颜色块赋值给样式*/
              ctx.lineWidth=outW;
              ctx.arc(W/2,H/2,outR,Math.PI*newstart, Math.PI*newend,false);
              /*ctx.arc(W/2,H/2,outR,0,Math.PI*2,false);*/
              /*ctx.arc(W/2,H/2,outR,0-90*Math.PI/180,r-90*Math.PI/180,false);*/
              ctx.stroke();
        
        //底色小
        /*ctx.beginPath();
        var grd = ctx.createLinearGradient(W, 0, 0,H);
           grd.addColorStop(0, "#74DE1C");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");
            ctx.strokeStyle = grd;
        ctx.lineWidth=inW;
        ctx.arc(W/2,H/2,inR,0,Math.PI*2,false);
        ctx.stroke();*/
        
        //圆心背景
        ctx.beginPath();
        /*ctx.fillStyle="#ffffff";*/
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.arc(W/2,H/2,bgR,0,Math.PI*2,false);
        ctx.fill();
        
        //外层
        var r = deg*Math.PI/180;
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            grd.addColorStop(0.1,"#ffffff");
            ctx.strokeStyle = grd;
            ctx.lineWidth=outW;
            ctx.arc(W/2,H/2,outR,Math.PI*newstart,Math.PI*endfee,false);
            ctx.stroke();
        
        //内层  
        var r = deg*Math.PI/180;      
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            ctx.fillStyle = "rgba(255,255,255,0)";            
            ctx.strokeStyle = grd;
        ctx.lineWidth=outW;
        ctx.arc(W/2,H/2,inR,0-90*Math.PI/180,r-90*Math.PI/180,false);
        ctx.stroke();
        
        fonts="bold 18px Arial";
        
        
        ctx.fillStyle="#fff";
        
        ctx.shadowColor = "#000";
        
        var ss = ['5','4','3','2','1','0'];
        text = Math.floor(ss[number]);
        text_w = ctx.measureText(text).width;
        
        ctx.font="bold 10px Arial";       
        ctx.fillText(ART,'90','95');
        
        ctx.font="bold "+R/4+"px Arial";
        //ctx.fillText(text,W/2 - text_w/2,H/2+R/5);
        ctx.fillText(text,'65','105');
        
        
    nu++;    
    };

    $this.ratePie=function(number){
          var i=0;
          var t= setInterval(function(){
            if(i==number){
                clearInterval(t);
            }else{
                number>0?i++:i--;
            }
            $this.ratePieNoAnimation(i);
            if(i > 100 || i < -100){//如果数字太大，取消动画效果
                $this.ratePieNoAnimation(number);
                clearInterval(t);
            }
          }, 2000/(number>0?number:-number));
    }
  }
  
 window.Charts=function(domId,ART){
    var canvas = document.getElementById(domId);
    var ctx = canvas.getContext("2d");
        
    var W = canvas.width;
    var H = canvas.height;
    var deg=0,new_deg=0,dif=0;
    var text,text_w;
    var R=W<H?W:H;//先默认环半径为canvas宽度
    var bgR=(R-R/3)/2;//内环背景半径
    var linkW=R/2-bgR;//环宽度=(W/2-内半径)
    var inW=linkW/12;//内环宽度=环宽度*1/3
    var outW=linkW*2/12;//外环宽度=环宽度*2/3
    var inR=bgR+inW/2;//内环半径=内半径+内环宽度/2
    var outR=bgR+inW+outW/2;//外环半径=内半径+内环宽度+外环宽度/2
    var $this=this;
    
    var newstart = 0.7;
    var newend = 2.3;
    var sunum = newend - newstart;
    var nu = 0;
    /*
    jQuery('#canvas_chi').animate({
            left: '250px',
            opacity: '0',
            height: '150px',
            width: '150px'
        });
    */
    $this.ratePieNoAnimation=function(number){

        deg=360*number/5;
        deg_new=new Number((sunum/5)).toFixed(2);
        endfee = newstart+(deg_new*nu);

        //底色大
        ctx.clearRect(0,0,W,H);
        ctx.beginPath();
        //var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
            /*grd.addColorStop(1, "#FF0000");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");*/
          var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
              grd.addColorStop(1, "#FFFFFF");
              ctx.strokeStyle = "rgba(255,255,255,0.1)";//生成的颜色块赋值给样式*/
              ctx.lineWidth=outW;
              ctx.arc(W/2,H/2,outR,Math.PI*newstart, Math.PI*newend,false);
              /*ctx.arc(W/2,H/2,outR,0,Math.PI*2,false);*/
              /*ctx.arc(W/2,H/2,outR,0-90*Math.PI/180,r-90*Math.PI/180,false);*/
              ctx.stroke();
        
        //底色小
        /*ctx.beginPath();
        var grd = ctx.createLinearGradient(W, 0, 0,H);
           grd.addColorStop(0, "#74DE1C");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");
            ctx.strokeStyle = grd;
        ctx.lineWidth=inW;
        ctx.arc(W/2,H/2,inR,0,Math.PI*2,false);
        ctx.stroke();*/
        
        //圆心背景
        ctx.beginPath();
        /*ctx.fillStyle="#ffffff";*/
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.arc(W/2,H/2,bgR,0,Math.PI*2,false);
        ctx.fill();
        
        //外层
        var r = deg*Math.PI/180;
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            grd.addColorStop(0.1,"#ffffff");
            ctx.strokeStyle = grd;
            ctx.lineWidth=outW;
            ctx.arc(W/2,H/2,outR,Math.PI*newstart,Math.PI*endfee,false);
            ctx.stroke();
        
        //内层  
        var r = deg*Math.PI/180;      
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            ctx.fillStyle = "rgba(255,255,255,0)";            
            ctx.strokeStyle = grd;
        ctx.lineWidth=outW;
        ctx.arc(W/2,H/2,inR,0-90*Math.PI/180,r-90*Math.PI/180,false);
        ctx.stroke();
        
        fonts="bold 18px Arial";
        
        
        ctx.fillStyle="#fff";
        
        ctx.shadowColor = "#000";
        
        var ss = ['5','4','3','2','1','0'];

        text = Math.floor(ss[number]);
        text_w = ctx.measureText(text).width;
        
        ctx.font="bold 10px Arial";       
        ctx.fillText(ART,'90','95');
        
        ctx.font="bold "+R/4+"px Arial";
        //ctx.fillText(text,W/2 - text_w/2,H/2+R/5);
        ctx.fillText(text,'65','105');
        
        
    nu++;    
    };

    $this.ratePie=function(number){
          var i=0;
          var t= setInterval(function(){
            if(i==number){
                clearInterval(t);
            }else{
                number>0?i++:i--;
            }
            $this.ratePieNoAnimation(i);
            if(i > 100 || i < -100){//如果数字太大，取消动画效果
                $this.ratePieNoAnimation(number);
                clearInterval(t);
            }
          }, 2000/(number>0?number:-number));
    }
  }

window.Chartss_t=function(domId,ART){
    var canvas = document.getElementById(domId);
    var ctx = canvas.getContext("2d");
        
    var W = canvas.width;
    var H = canvas.height;
    var deg=0,new_deg=0,dif=0;
    var text,text_w;
    var R=W<H?W:H;//先默认环半径为canvas宽度
    var bgR=(R-R/3)/2;//内环背景半径
    var linkW=R/2-bgR;//环宽度=(W/2-内半径)
    var inW=linkW/12;//内环宽度=环宽度*1/3
    var outW=linkW*2/12;//外环宽度=环宽度*2/3
    var inR=bgR+inW/2;//内环半径=内半径+内环宽度/2
    var outR=bgR+inW+outW/2;//外环半径=内半径+内环宽度+外环宽度/2
    var $this=this;
    
    var newstart = 0.7;
    var newend = 2.3;
    var sunum = newend - newstart;
    var nu = 0;
    /*
    jQuery('#canvas_chi').animate({
            left: '250px',
            opacity: '0',
            height: '150px',
            width: '150px'
        });
    */
    $this.ratePieNoAnimation=function(number,AA,BB){

        deg=360*BB/5;
        deg_new=new Number((sunum/5)).toFixed(2);
        endfee = newstart+(deg_new*nu);

        //底色大
        ctx.clearRect(0,0,W,H);
        ctx.beginPath();
        //var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
            /*grd.addColorStop(1, "#FF0000");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");*/
          var grd = ctx.createLinearGradient(0,H, W, 0);//颜色渐变的起始坐标和终点坐标
              grd.addColorStop(1, "#FFFFFF");
              ctx.strokeStyle = "rgba(255,255,255,0.1)";//生成的颜色块赋值给样式*/
              ctx.lineWidth=outW;
              ctx.arc(W/2,H/2,outR,Math.PI*newstart, Math.PI*newend,false);
              /*ctx.arc(W/2,H/2,outR,0,Math.PI*2,false);*/
              /*ctx.arc(W/2,H/2,outR,0-90*Math.PI/180,r-90*Math.PI/180,false);*/
              ctx.stroke();
        
        //底色小
        /*ctx.beginPath();
        var grd = ctx.createLinearGradient(W, 0, 0,H);
           grd.addColorStop(0, "#74DE1C");
            grd.addColorStop(0.3, "#9DDE12");
            grd.addColorStop(0.6, "#B2ED2E");
            grd.addColorStop(1, "#CBF76C");
            ctx.strokeStyle = grd;
        ctx.lineWidth=inW;
        ctx.arc(W/2,H/2,inR,0,Math.PI*2,false);
        ctx.stroke();*/
        
        //圆心背景
        ctx.beginPath();
        /*ctx.fillStyle="#ffffff";*/
        ctx.fillStyle = "rgba(255,255,255,0)";
        ctx.arc(W/2,H/2,bgR,0,Math.PI*2,false);
        ctx.fill();
        
        //外层
        var r = deg*Math.PI/180;
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            grd.addColorStop(0.1,"#ffffff");
            ctx.strokeStyle = grd;
            ctx.lineWidth=outW;
            ctx.arc(W/2,H/2,outR,Math.PI*newstart,Math.PI*endfee,false);
            ctx.stroke();
        
        //内层  
        var r = deg*Math.PI/180;      
        ctx.beginPath();
        var grd = ctx.createLinearGradient(0,H, W, 0);
            ctx.fillStyle = "rgba(255,255,255,0)";            
            ctx.strokeStyle = grd;
        ctx.lineWidth=outW;
        ctx.arc(W/2,H/2,inR,0-90*Math.PI/180,r-90*Math.PI/180,false);
        ctx.stroke();
        
        fonts="bold 18px Arial";
        
        
        ctx.fillStyle="#fff";
        
        ctx.shadowColor = "#000";
        
        var ss = ['5','4','3','2','1','0'];
        text = Math.floor(ss[number]);
        text_w = ctx.measureText(text).width;
        
        ctx.font="bold 10px Arial";       
        ctx.fillText(ART,'90','95');
        
        ctx.font="bold "+R/4+"px Arial";
        //ctx.fillText(text,W/2 - text_w/2,H/2+R/5);
        ctx.fillText(text,'65','105');
        
        
    nu++;    
    };

    $this.ratePie=function(number,AA,BB){
    	alert(number);
          var i=0;
          var t= setInterval(function(){
            if(i==number){
                clearInterval(t);
            }else{
                number>0?i++:i--;
            }
            $this.ratePieNoAnimation(i);
            if(i > 100 || i < -100){//如果数字太大，取消动画效果
                $this.ratePieNoAnimation(number,AA,BB);
                clearInterval(t);
            }
          }, 2000/(number>0?number:-number));
    }
  }