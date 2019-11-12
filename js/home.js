window.onload=function(){
    var an = document.getElementById("animation");

    an.width = window.innerWidth;
    an.height = window.innerHeight;

    var dotarry = [],mouse = {};
    for ( var i = 0; i < 50; i++) {
        dotarry.push({
            x: Math.floor(Math.random()*1000),
            y: Math.floor(Math.random()*1000),
            speedX: Math.floor(Math.random()*10)-5,
            speedY: Math.floor(Math.random()*10)-5,
            radius: Math.floor(Math.random()*10)
        });
    }

    document.onmousemove = function (event) {
        let e = event || window.event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        console.log(e.clientX,e.clientY);
    }

    var cxt = an.getContext('2d');

    function draw(){
        cxt.clearRect(0,0,an.width,an.height);
        console.log("1");
        for(var i=0;i<dotarry.length;i++){
            cxt.fillStyle="#000000";
            cxt.beginPath();
            cxt.arc(dotarry[i].x+dotarry[i].speedX,dotarry[i].y+dotarry[i].speedY,dotarry[i].radius,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();
            
            console.log(dotarry[i].x);

            dotarry[i].x += dotarry[i].speedX;
            dotarry[i].y += dotarry[i].speedY;

            for (let j = i; j < dotarry.length; j++) {
                if( Math.abs(dotarry[i].x - dotarry[j].x)<100 && Math.abs(dotarry[i].y - dotarry[j].y)<100 ){
                    cxt.moveTo(dotarry[i].x,dotarry[i].y);
                    cxt.lineTo(dotarry[j].x,dotarry[j].y);
                    cxt.stroke();
                };
            }

            if( dotarry[i].x > an.width || dotarry[i].x < 0 || dotarry[i].y > an.height || dotarry[i].y < 0){
                dotarry[i] = {
                    x: Math.floor(Math.random()*1000),
                    y: Math.floor(Math.random()*1000),
                    speedX: Math.floor(Math.random()*10)-5,
                    speedY: Math.floor(Math.random()*10)-5,
                    radius: Math.floor(Math.random()*10)
                }
            }
            if(dotarry[i].speedX == 0 && dotarry[i].speedY == 0){
                dotarry[i].speedX = Math.floor(Math.random()*10)-5;
                dotarry[i].speedY = Math.floor(Math.random()*10)-5;
            }
            if(dotarry[i].radius < 5){
                dotarry[i].radius += Math.floor(Math.random()*10);
            }

        };
    };

    function gravitation(mos) {
        for (let i = 0; i < dotarry.length; i++) {
            let mouseX = dotarry[i].x - mos.x;
            let mouseY = dotarry[i].y - mos.y
            if( Math.abs(mouseX) <= 50 && Math.abs(mouseY) <= 50 ){
                dotarry[i].speedX -= mouseX;
                dotarry[i].speedY -= mouseY;
            }
        }
    }

    this.setInterval( function(){
        draw()
        gravitation(mouse)
    },30);
}