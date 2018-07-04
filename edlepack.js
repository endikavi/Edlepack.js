//Funcion que crea una nueva instancia DCO a partir del elemento elegido

var º = function(x=document.getElementsByTagName("BODY")[0]) {
    
    if(typeof x === 'string'){
        
        if(x.charAt(0)==='#'){
            
            return new DCO(document.getElementById(x.replace('#', '')));
            
        }else if(x.charAt(0)==='.'){
            
            return new DCO(document.getElementsByClassName(x.replace('.', ''))[0]);
            
        }
        
    }
    
    if(x instanceof Element){
        
        return new DCO(x);
        
    }else{
        
        console.log('no existe ese elemento');
        
    }
}

//Clase Dom Component Object

function DCO(x){
    
    this.e = x;
    
}

//funcion que ayuda a normalizar el formato de fecha

DCO.prototype.formatDate = function(t=false) {

    if(t==false){

        var o = this.e.value.split('-');

        var val = o[2]+'-'+o[1]+'-'+o[0];

        return val;

    }else{

        var o = t.split('-');

        var val = o[2]+'-'+o[1]+'-'+o[0];

        this.e.value=val;

        return this;

    }

}

//funcion que pasa un formulario a json

DCO.prototype.formToJSON = function (){
    
    var array = {};
    
    for (var x=0;this.e.elements.length>x;x++){
        
        if ((
                typeof this.e.elements[x].name !== 'undefined' &&
                this.e.elements[x].name !== ''
            ) && (
                this.e.elements[x].type !== 'checkbox' ||
                this.e.elements[x].checked)
        ) {
            
            array[this.e.elements[x].name] = this.e.elements[x].value
        
        }
    }
    
    return array;
        
}

//funcion que hace un submit de un formulario en ajax

DCO.prototype.ajaxSubmit = function (callback = function(request){console.log(request.response)}){
    
    this.ajax({url:this.e.getAttribute('action'),type:'POST',data:new FormData(this.e),callback:callback});
    return this;
    
}

//Llamada ajax parametrizada

DCO.prototype.ajax = function (options = {}){
    
    var foptions = {};
    
    var defaults = {
        callback:undefined,
        url:'',
        type:'GET',
        data:undefined,
        datatype:undefined
    }
    
    for(var _obj in defaults) foptions[_obj ]=defaults[_obj];
    for(var _obj in options) foptions[_obj ]=options[_obj];
    
    var request = new XMLHttpRequest();
    
    request.open( foptions.type , foptions.url );
    
    request.onreadystatechange = function() {
        
        if(request.readyState === 4) {
            
            if(typeof foptions.callback !== 'undefined'){
                
                foptions.callback(request)
                
            }else{
                
                console.log(request.status)
            
            }
                
        }
                                             
    };
    
    request.send(foptions.data);
    
    return this;
    
}

// Funcion para crear un elemento parametrizado

DCO.prototype.create = function(options = {}){
    
    var foptions = {};
    
    var defaults = {
        class:'',
        id:'',
        type:'div',
        html:'',
        value:'',
        attr:{},
        first:true,
        before:false
    }
    
    for(var _obj in defaults) foptions[_obj ]=defaults[_obj];
    for(var _obj in options) foptions[_obj ]=options[_obj];
    
    var x = document.createElement(foptions.type)
    
    var o = this.e.appendChild(x);
    
    o.innerHTML = foptions.html;
    o.id = foptions.id;
    o.className = foptions.class;
    o.value = foptions.value;
    
    for( var attr in foptions.attr )o.setAttribute(attr,foptions.attr[attr]);
    
    if(foptions.first == true){
            
        this.e.insertBefore(o,this.e.firstChild)
            
    }
    
    if(foptions.before != false){
            
        this.e.insertBefore(o,º(foptions.before).e)
            
    }
    
    return new DCO(o);
    
}

// crear al principo

DCO.prototype.on = function(event,callback){
    
    this.e.addEventListener(event,callback)
    return this;
    
}

DCO.prototype.modify = function(options={}){
    
    for( var attr in options )this.e.setAttribute(attr,options[attr]);
    return this;
    
}

DCO.prototype.style = function(options={}){
    
    for( var attr in foptions.attr )this.e.setAttribute('style',nstyle);
    return this;
    
}

DCO.prototype.style = function(options={}){
    
    for( var attr in foptions.attr )this.e.setAttribute('style',nstyle);
    return this;
    
}

DCO.prototype.show = function(options={}){
    
    for( var attr in foptions.attr )this.e.setAttribute('style',nstyle);
    return this;
    
}

DCO.prototype.hide = function(options={}){
    
    for( var attr in foptions.attr )this.e.setAttribute('style',nstyle);
    return this;
    
}