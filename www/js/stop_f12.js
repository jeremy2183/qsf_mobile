function fuckyou() {

    window.close(); //关闭当前窗口(防抽)
    //alert('ha ha ha');
    window.location = "about:blank" //将当前窗口跳转置空白页

}

function ck() {

    console.profile();

    console.profileEnd();

    if (console.clear) {

        console.clear()

    }

//我们判断一下profiles里面有没有东西，如果有，肯定有人按F12了，没错！！

    if (typeof console.profiles == "object") {

        return console.profiles.length > 0

    }

}

function hehe() {

    if ((window.console && (console.firebug || console.table && /firebug/i.test(console.table()))) || (typeof opera == "object" && typeof opera.postError == "function" && console.profile.length > 0)) {

        fuckyou()

    }

    if (typeof console.profiles == "object" && console.profiles.length > 0) {

        fuckyou()

    }

}

hehe();

window.onload=function(){

//判断当前窗口内页高度和窗口高度，如果差值大于200，那么呵呵

    //if ((window.outerHeight - window.innerHeight) > 50) {
    //568-736(737)
      if((window.outerHeight) > 0){
      	//alert('T');
        //fuckyou()
        //window.location = "about:blank" //将当前窗口跳转置空白页
      }

};

//if (window.outerHeight > 0) {
      	//alert('use mobile');
        //fuckyou()
//}

//alert(navigator.userAgent);
//alert(window.outerHeight);
//alert(window.innerHeight);