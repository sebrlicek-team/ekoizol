	var xmlHttp;
	var form_id_global;
	var formular_global;
		
  function GetXmlHttpObject(){ 
    var objXMLHttp=null;
    if (window.XMLHttpRequest){
      objXMLHttp=new XMLHttpRequest();
    }else if (window.ActiveXObject){
      objXMLHttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
  } 
  
  function check_data(form, webRoot){
  	xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Prohlížeč nepodporuje HTTP Request");
      return;
    }
    var data = '';
    var f_length = form.length;
    var form_id = 0;
    for(i=0;i<f_length;i++){
    	if(form.elements[i].name=="form_contact_id"){
    		form_id = form.elements[i].value;
    	}
    	if(form.elements[i].type=="checkbox"){
    		
    		if(form.elements[i].checked){
    			data += form.elements[i].name + '=' + 1 + '&';
    		}else{
    			data += form.elements[i].name + '=' + 0 + '&';
    		}
    	}else{
    		data += form.elements[i].name + '=' + form.elements[i].value + '&';
    	}
    }
    var url= webRoot + "inc/contact_check_data.inc.php";
    xmlHttp.onreadystatechange=stateChangedCheckData;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(data);
    formular_global = form.id;
    form_id_global = form_id;
  } 
  
  
  function stateChangedCheckData(){ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
      var text = xmlHttp.responseText;
    	if(text == "ok"){
    		document.getElementById("error_contact_"+form_id_global).style.display="none";
      	document.getElementById("save_form_"+form_id_global).value="1";
      	document.getElementById(formular_global).submit();
      }else{
      	document.getElementById("error_contact_"+form_id_global).style.display="block";
      	document.getElementById("error_contact_"+form_id_global).innerHTML=text;
      }
    } 
  }
  
  function check_reg_data(typ, form, webRoot){
  	xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Prohlížeč nepodporuje HTTP Request");
      return;
    }
    var data = '';
    var f_length = form.length;
    var form_id = 0;
    data += "typ_kontroly=" + typ + '&';
    for(i=0;i<f_length;i++){
    	if(form.elements[i].name=="form_contact_id"){
    		form_id = form.elements[i].value;
    	}
    	if(form.elements[i].type=="checkbox"){
    		
    		if(form.elements[i].checked){
    			data += form.elements[i].name + '=' + 1 + '&';
    		}else{
    			data += form.elements[i].name + '=' + 0 + '&';
    		}
    	}else{
    		data += form.elements[i].name + '=' + form.elements[i].value + '&';
    	}
    	
    }
    var url= webRoot + "inc/contact_check_reg_data.inc.php";
    xmlHttp.onreadystatechange=stateChangedCheckRegData;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(data);
    formular_global = form.id;
    form_id_global = form_id;
  } 
  
  
  function stateChangedCheckRegData(){ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
      var b = xmlHttp.responseText;
			var rozdelene = new Array();      
    	rozdelene = b.split('@@@@@@');

      if(rozdelene[1] == "ok"){
    		document.getElementById(rozdelene[0]+"_error").innerHTML="V pořádku.";
    		document.getElementById(rozdelene[0]+"_error").className="formGood";
    		document.getElementById(rozdelene[0]).style.backgroundColor="#F1FCE2";
				document.getElementById(rozdelene[0]).style.borderColor="#73C300";
    		
      }else{
    		document.getElementById(rozdelene[0]+"_error").innerHTML=rozdelene[1];
    		document.getElementById(rozdelene[0]+"_error").className="formError";
    			document.getElementById(rozdelene[0]).style.backgroundColor="#FFEBE4";
					document.getElementById(rozdelene[0]).style.borderColor="#FF0000";     		
    		
      }
      if(rozdelene[2]=="ok"){
      	document.getElementById("form-send").disabled=false;
      	document.getElementById("form-send").className="button";
      	document.getElementById("form-send").value=" Aktivovat WWW stránky ";
      	document.getElementById("buttonIe").className = "buttonIe";
      }else{
      	document.getElementById("form-send").disabled=true;
      	document.getElementById("form-send").className="button bad";
      	document.getElementById("form-send").value=" Vyplňte formulář ";
      	document.getElementById("buttonIe").className = "buttonIe bad";
      }
    } 
  }
  
  
  function changeImageAndText(fotoId,imgId, divId){
  	xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Prohlížeč nepodporuje HTTP Request");
      return;
    }
    var url="/inc/foto_big_change_foto.inc.php?foto_id="+fotoId;
    xmlHttp.onreadystatechange=stateChangedCheckDataImage;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);
    xmlHttp.imgId = imgId;
    xmlHttp.divId = divId;
  } 
  
  
  function stateChangedCheckDataImage(){ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
      var text = xmlHttp.responseText;
      document.getElementById("PhotoDetail").innerHTML=text;
    } 
  }
  
  
  function guestbook_check_data(form, webRoot){
  	xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Prohlížeč nepodporuje HTTP Request");
      return;
    }
    var data = '';
    var f_length = form.length;
    for(i=0;i<f_length;i++){
    	data += form.elements[i].name + '=' + form.elements[i].value + '&';
    }
    var url=webRoot + "inc/guestbook_check_data.inc.php";
    xmlHttp.onreadystatechange=stateChangedGuestbookCheckData;
    xmlHttp.open("POST",url,true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.send(data);
  } 
  
  
  function stateChangedGuestbookCheckData(){ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
      var text = xmlHttp.responseText;
    	if(text == "ok"){
    		document.getElementById("error_guestbook").style.display="none";
      	document.getElementById("save_form").value="1";
      	document.getElementById("guestbookForm").submit();
      }else{
      	document.getElementById("error_guestbook").style.display="inline";
      	document.getElementById("error_guestbook").innerHTML=text;
      }
    } 
  }
  
  function setCheckedMenu(webRoot, id){
  	xmlHttp=GetXmlHttpObject();
    if (xmlHttp==null){
      alert ("Prohlížeč nepodporuje HTTP Request");
      return;
    }
    var url= webRoot + "/inc/set_checked_menu.inc.php?id="+id;
    xmlHttp.onreadystatechange=stateChangedChecked;
    xmlHttp.open("GET",url,true);
    xmlHttp.send(null);    
  } 
  
  
  function stateChangedChecked(){ 
    if (xmlHttp.readyState==4 || xmlHttp.readyState=="complete"){ 
    	return true;
    } 
  }
  
  /* otevírací Top menu pro IE*/
  sfHover = function() {
    if (!document.getElementById('Menu')) return;
    var sfEls = document.getElementById("Menu").getElementsByTagName("li");
    for (var i=0; i<sfEls.length; i++) {
        sfEls[i].onmouseover=function() {
            this.className+=" sfhover";
        }
        sfEls[i].onmouseout=function() {
            this.className=this.className.replace(new RegExp(" sfhover\\b"), "");
        }
    }
    }
    if (window.attachEvent) window.attachEvent("onload", sfHover);

  
