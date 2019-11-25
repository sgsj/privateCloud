window.onload=function(){
    var an = document.getElementById("animation");

    an.width = window.innerWidth;
    an.height = window.innerHeight;

    var dotarry = [],mouse = {};
    for ( var i = 0; i < 80; i++) {
        dotarry.push({
            x: Math.floor(Math.random()*an.width),
            y: Math.floor(Math.random()*an.height),
            speedX: Math.floor(Math.random()*10)-5,
            speedY: Math.floor(Math.random()*10)-5,
            radius: 3
        });
    }

    document.onmousemove = function (event) {
        let e = event || window.event;
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.mass = 666;
        mouse.radius = 8;
    }

    var cxt = an.getContext('2d');

    function draw(){
        for(var i=0;i<dotarry.length;i++){
            cxt.fillStyle="#aeaeae";
            cxt.beginPath();
            cxt.arc(dotarry[i].x+dotarry[i].speedX,dotarry[i].y+dotarry[i].speedY,dotarry[i].radius,0,Math.PI*2,true);
            cxt.closePath();
            cxt.fill();

            dotarry[i].x += dotarry[i].speedX;
            dotarry[i].y += dotarry[i].speedY;

            for (let j = i; j < dotarry.length; j++) {
                if( Math.abs(dotarry[i].x - dotarry[j].x)<100 && Math.abs(dotarry[i].y - dotarry[j].y)<100 ){
                    
                    cxt.moveTo(dotarry[i].x,dotarry[i].y);
                    cxt.lineTo(dotarry[j].x,dotarry[j].y);
                    cxt.stroke();
                    cxt.strokeStyle="#ccc";
                };
            }

            if( dotarry[i].x > an.width || dotarry[i].x < 0 || dotarry[i].y > an.height || dotarry[i].y < 0){
                dotarry[i] = {
                    x: Math.floor(Math.random()*1000),
                    y: Math.floor(Math.random()*1000),
                    speedX: Math.floor(Math.random()*10)-5,
                    speedY: Math.floor(Math.random()*10)-5,
                    radius: 3
                }
            }
            if(dotarry[i].speedX == 0 && dotarry[i].speedY == 0){
                dotarry[i].speedX = Math.floor(Math.random()*10)-5;
                dotarry[i].speedY = Math.floor(Math.random()*10)-5;
            }
            // if(dotarry[i].radius < 5){
            //     dotarry[i].radius += Math.floor(Math.random()*10);
            // }

        };
    };

    function gravitation(mos) {
        console.log(Math.floor(Math.random()));
        if(mos.x == undefined && mos.y == undefined) return;
        for (let i = 0; i < dotarry.length; i++) {
            let dX = dotarry[i].x - mos.x;
            let dY = dotarry[i].y - mos.y;
            let distQ = dX*dX + dY*dY;
            let dist = Math.sqrt(distQ);

            let F = (mos.mass * dotarry[i].radius) / distQ; //引力公式

            let ax = F * dX/dist; //作用力作用于加速度
            let ay = F * dY/dist;

            dotarry[i].speedX -= ax / dotarry[i].radius;
            dotarry[i].speedY -= ay / dotarry[i].radius;

            // if( Math.abs(mouseX) <= 50 && Math.abs(mouseY) <= 50 ){
            //     dotarry[i].speedX = parseInt(mouseX/dotarry[i].speedX);
            //     dotarry[i].speedY = parseInt(mouseY/dotarry[i].speedY);

            //     console.log('Xspeed:',dotarry[i].speedX,'Yspeed:',dotarry[i].speedY);
            // }
        }
    }

    this.setInterval( function(){
        cxt.clearRect(0,0,an.width,an.height);
        draw()
        gravitation(mouse)
    },30);
}