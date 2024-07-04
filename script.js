const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
var timeout;
//  when mouse move then cursor or circle skew littele bit
function mouseCursorSkew(){
    // define default scale value
    var xscale = 1 ;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove", function(dets){
        clearTimeout(timeout);
        var xdiff = dets.clientX - xprev;
        var ydiff = dets.clientY - yprev;

        xprev = dets.clientX;
        yprev = dets.clientY;
        
        // gsap clamp in which we limitized the cursor range to skew
        xscale = gsap.utils.clamp(.5,1.5,xdiff);
        yscale = gsap.utils.clamp(.5,1.5,ydiff);

        circleMouseFollower(xscale,yscale);
        // when mouse stop cursor regain it shape again
        timeout = setTimeout(function(){
            document.querySelector("#minimousesursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
        })
    })

}
function firstPageAnim(){
    var timeline  = gsap.timeline();
    // navigation animation
    timeline.from("#nav",{
        y : '-10',
        opacity : 0,
        duration :1.5,
        ease : Expo.easeInOut
    })
    // element animation movement to top or into dev
    // stagger cause delay in each element block
    .to(".boundingelem",{
        y : 0,
        duration :1.5,
        delay:-1,
        ease : Expo.easeInOut,
        stagger : .2
    })
    .from(".headfooter",{
        y : '-10',
        opacity : 0,
        duration :1.5,
        delay:-1,
        ease : Expo.easeInOut
    })
}
// when mouse move then a circle cursor in movement
function circleMouseFollower(xscale,yscale) {
    window.addEventListener("mousemove", function (dets) {
        document.querySelector("#minimousesursor").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale},${yscale})`;
    });
}

circleMouseFollower();
firstPageAnim();
mouseCursorSkew();

// animation of images
// 1st you have to select all images
//  2nd then locate the image according to mouse in which we subtract distance of div from top to the mouse height from top so that image dont dislocate
// 3rd then showing that img using gsap
// 4th the rotation of that image

document.querySelectorAll(".elem").forEach(function(elem){
    var rotate = 0;
    var rotdiff = 0;
    elem.addEventListener("mousemove",function(dets){
        var diff = dets.clientY - elem.getBoundingClientRect().top;

        var rotdiff = dets.clientX - rotate;
        rotate = rotdiff;

        gsap.to(elem.querySelector("img"),{
            opacity: 1,
            ease : Power3,
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,rotdiff)
        });
    });

    elem.addEventListener("mouseleave",function(dets){
        gsap.to(elem.querySelector("img"),{
            opacity: 0,
            ease : Power3,
            duration:0.5
        });
    });
});