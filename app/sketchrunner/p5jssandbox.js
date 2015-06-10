/*
  Adapted from p5js sandbox by Gene Kogan
  https://github.com/genekogan/p5js-sandbox
 */
var p5functions = ['preload','setup','draw','keyPressed','keyReleased','keyTyped','mouseMoved','mouseDragged','mousePressed','mouseReleased','mouseClicked','touchStarted','touchMoved','touchEnded'];
var p5constants = ['ARROW','CROSS','HAND','MOVE','TEXT','WAIT','HALF_PI','PI','QUARTER_PI','TAU','TWO_PI','DEGREES','RADIANS','CORNER','CORNERS','RADIUS','RIGHT','LEFT','CENTER','TOP','BOTTOM','BASELINE','POINTS','LINES','TRIANGLES','TRIANGLE_FAN','TRIANGLE_STRIP','QUADS','QUAD_STRIP','CLOSE','OPEN','CHORD','PIE','PROJECT','SQUARE','ROUND','BEVEL','MITER','RGB','HSB','AUTO','ALT','BACKSPACE','CONTROL','DELETE','DOWN_ARROW','ENTER','ESCAPE','LEFT_ARROW','OPTION','RETURN','RIGHT_ARROW','SHIFT','TAB','UP_ARROW','BLEND','ADD','DARKEST','LIGHTEST','DIFFERENCE','EXCLUSION','MULTIPLY','SCREEN','REPLACE','OVERLAY','HARD_LIGHT','SOFT_LIGHT','DODGE','BURN','THRESHOLD','GRAY','OPAQUE','INVERT','POSTERIZE','DILATE','ERODE','BLUR','NORMAL','ITALIC','BOLD','LINEAR','QUADRATIC','BEZIER','CURVE'];
var p5values =  ['frameCount','focused','displayWidth','displayHeight','windowWidth','windowHeight','windowResized','width','height','deviceOrientation','accelerationX','accelerationY','accelerationZ','pAccelerationX','pAccelerationY','pAccelerationZ','keyIsPressed','key','keyCode','mouseX','mouseY','pmouseX','pmouseY','winMouseX','winMouseY','pwinMouseX','pwinMouseY','mouseButton','mouseIsPressed','pixels[]','touchX','touchY','ptouchX','ptouchY','touches[]','touchIsDown']
var p5methods = ['alpha','blue','brightness','color','green','hue','lerpColor','red','saturation','background','clear','colorMode','fill','noFill','noStroke','stroke','remove','noLoop','loop','push','pop','redraw','append','arrayCopy','concat','reverse','shorten','shuffle','sort','splice','subset','float','int','join','match','matchAll','nf','nfc','nfp','nfs','split','splitTokens','trim','save','cursor','frameRate','noCursor','fullscreen','devicePixelScaling','getURL','getURLPath','getURLParams','createImage','loadImage','image','tint','noTint','imageMode','blend','copy','filter','get','loadPixels','set','updatePixels','setMoveThreshold','onDeviceMove','onDeviceTurn','loadJSON','loadStrings','loadTable','loadXML','httpGet','httpPost','httpDo','keyIsDown','mouseWheel','day','hour','minute','millis','month','second','year','createVector','abs','ceil','constrain','dist','exp','floor','lerp','log','mag','map','max','min','norm','pow','sq','sqrt','noise','noiseDetail','noiseSeed','randomSeed','random','randomGaussian','acos','asin','atan','atan2','cos','sin','tan','degrees','radians','angleMode','print','createCanvas','resizeCanvas','noCanvas','createGraphics','blendMode','arc','ellipse','line','point','quad','rect','triangle','ellipseMode','noSmooth','rectMode','smooth','strokeCap','strokeJoin','strokeWeight','bezier','bezierPoint','bezierTangent','curve','curveTightness','curvePoint','curveTangent','beginContour','beginShape','bezierVertex','curveVertex','endContour','endShape','quadraticVertex','vertex','applyMatrix','resetMatrix','rotate','scale','shearX','shearY','translate','textAlign','textLeading','textSize','textStyle','textWidth','text','textFont'];

var lastPlayedCodeText;
var activeSketch;

module.exports = {

  // there is almost definitely a better way to instantiate a new p5 script then doing this...
  parseSketchToP5Instance : function(s){
    for (var i=0; i<p5constants.length; i++) {
      s = s.replace(RegExp(p5constants[i], 'g'), 'p.'+p5constants[i]);
    }
    for (var i=0; i<p5values.length; i++) {
      s = s.replace(RegExp(p5values[i], 'g'), 'p.'+p5values[i]);
    }
    for (var i=0; i<p5methods.length; i++) {
      s = s.replace(RegExp(' ' +p5methods[i]+'( )*\\(', 'g'), 'p.'+p5methods[i]+'(');
    }
    for (var i=0; i<p5functions.length; i++) {
      s = s.replace(RegExp("function( )+"+p5functions[i]+"( )*\\(", 'g'), 'p.'+p5functions[i]+' = function (');
    }
    s = 'var sketch = function (p) {\n'+s+'\n};\nif(typeof(activeSketch) !== "undefined"){activeSketch.remove();}\nactiveSketch = new p5(sketch);\n';
    return s;
  },

  playCode: function(code) {
    lastPlayedCodeText = code;
    var instructions = this.parseSketchToP5Instance(code);
    var F = new Function (instructions);
    F();
  }

};