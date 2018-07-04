//Clase Dom Component Object

function DCO(x){
    
    this.obj = x;
    
}

//Funcion que crea una nueva instancia DCO a partir del elemento elegido

function º(x=false) {
    
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
        
        return new DCO(document.getElementsByTagName("BODY")[0]);
        
    }
}

//funcion que ayuda a normalizar el formato de fecha

DCO.prototype.formatDate = function(t=false) {

    if(t==false){

        var o = this.obj.value.split('-');

        var val = o[2]+'-'+o[1]+'-'+o[0];

        return val;

    }else{

        var o = t.split('-');

        var val = o[2]+'-'+o[1]+'-'+o[0];

        this.obj.value=val;

        return;

    }

}

//funcion que pasa un formulario a json

DCO.prototype.formToJSON = function (){
    
    var array = {};
    
    for (var x=0;this.obj.elements.length>x;x++){
        
        if ((
                typeof this.obj.elements[x].name !== 'undefined' &&
                this.obj.elements[x].name !== ''
            ) && (
                this.obj.elements[x].type !== 'checkbox' ||
                this.obj.elements[x].checked)
        ) {
            
            array[this.obj.elements[x].name] = this.obj.elements[x].value
        
        }
    }
    
    return array;
        
}

//funcion que hace un submit de un formulario en ajax

DCO.prototype.ajaxSubmit = function (callback = function(request){console.log(request.response)}){
    
    this.ajax({url:this.obj.getAttribute('action'),type:'POST',data:new FormData(this.obj),callback:callback});
    
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
    
    var o = this.obj.appendChild(x);
    
    o.innerHTML = foptions.html;
    o.id = foptions.id;
    o.className = foptions.class;
    o.value = foptions.value;
    
    for( var attr in foptions.attr )o.setAttribute(attr,foptions.attr[attr]);
    
    if(foptions.first == true){
            
        this.obj.insertBefore(o,this.obj.firstChild)
            
    }
    
    if(foptions.before != false){
            
        this.obj.insertBefore(o,º(foptions.before).obj)
            
    }
    
}

// crear al principo

DCO.prototype.after = function(options){
    
    console.log(options)
    
}