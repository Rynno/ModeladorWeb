var selectedElement = 0;
var currentX = 0;
var currentY = 0;
var currentMatrix = 0;
var group = 0;
var groupx = 0;
var groupy = 0;


function cloneToTop(oldEl){
	// already at top, don't go farther…
	if(oldEl.atTop==true) return oldEl;
	// make a copy of this node
	var el = oldEl.cloneNode(true);
 	// select all draggable elements, none of them are at top anymore
	var dragEls= oldEl.ownerDocument.documentElement.querySelectorAll('.draggable');
	for(i=0; i<dragEls.length; i++){
	    dragEls[i].atTop=null;
	}
	var parent = oldEl.parentNode;
	// remove the original node
	parent.removeChild(oldEl);
	// insert our new node at top (last element drawn is first visible in svg)
  	parent.appendChild(el);
  	// Tell the world that our new element is at Top
	el.atTop= true;
	return el;
}


function selectElement(evt) {
    selectedElement = cloneToTop(evt.target);
    currentX = evt.clientX;
    currentY = evt.clientY;
    currentMatrix = selectedElement.getAttributeNS(null, "transform").slice(7,-1).split(' ');
    
    for(var i=0; i<currentMatrix.length; i++) {
    currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
      
    selectedElement.setAttributeNS(null, "onmousemove", "moveElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseout", "deselectElement(evt)");
    selectedElement.setAttributeNS(null, "onmouseup", "deselectElement(evt)");
}
        
function moveElement(evt) {
    var dx = evt.clientX - currentX;
    var dy = evt.clientY - currentY;
    currentMatrix[4] += dx;
    currentMatrix[5] += dy;
      
    selectedElement.setAttributeNS(null, "transform", "matrix(" + currentMatrix.join(' ') + ")");
    currentX = evt.clientX;
    currentY = evt.clientY;
}
        
function deselectElement(evt) {
    if(selectedElement != 0){
        selectedElement.removeAttributeNS(null, "onmousemove");
        selectedElement.removeAttributeNS(null, "onmouseout");
        selectedElement.removeAttributeNS(null, "onmouseup");
        selectedElement = 0;
    }
}

////////////////////////////////////////////////////////////////////////////////////////////

function startMove(evt) {

    group = cloneToTop(evt.target.parentNode);

    groupx = evt.clientX;
    groupy = evt.clientY;
    
    currentMatrix = group.getAttributeNS(null, "transform").slice(10,-1).split(' ');
    
    for(var i=0; i<currentMatrix.length; i++) {
        currentMatrix[i] = parseFloat(currentMatrix[i]);
    }
    
    //window.alert(currentMatrix);

    group.setAttributeNS(null, "onmousemove", "moveIt(evt)");
    group.setAttributeNS(null, "onmouseout", "drop(evt)");
    group.setAttributeNS(null, "onmouseup", "drop(evt)");
}

function moveIt(evt){
  var dx = evt.clientX - groupx;
  var dy = evt.clientY - groupy;
  //window.alert(group.getAttribute("transform"));

  currentMatrix[0] += dx;
  currentMatrix[1] += dy;
      
  group.setAttributeNS(null, "transform", "translate(" + currentMatrix.join(' ') + ")");
    
  groupx = evt.clientX;
  groupy= evt.clientY;
}
function drop(evt){
  if(group != 0){
        group.removeAttributeNS(null, "onmousemove");
        group.removeAttributeNS(null, "onmouseout");
        group.removeAttributeNS(null, "onmouseup");
        group = 0;
    }
}