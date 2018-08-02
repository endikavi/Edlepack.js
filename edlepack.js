// Variables globales 
var E_Data={};
var E_Actual_Dom=[];

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
        class:false,
        id:false,
        type:'div',
        html:'',
        value:false,
        attr:{},
        first:true,
        before:false,
        childs:false
    }
    
    for(var _obj in defaults) foptions[_obj ]=defaults[_obj];
    for(var _obj in options) foptions[_obj ]=options[_obj];
    
    var x = document.createElement(foptions.type)
    
    var o = this.e.appendChild(x);
    
    o.innerHTML = foptions.html;
    if(foptions.id){
        o.id = foptions.id;
    }
    if(foptions.class){
        o.className = foptions.class;
    }
    if(foptions.value){
        o.value = foptions.value;
    }
    for( var attr in foptions.attr )o.setAttribute(attr,foptions.attr[attr]);
    
    if(foptions.first == true){
            
        this.e.insertBefore(o,this.e.firstChild)
            
    }
    
    if(foptions.before != false){
            
        this.e.insertBefore(o,º(foptions.before).e)
            
    }
    
    if(foptions.childs != false){
            
        º(o).render(foptions.childs);
            
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

DCO.prototype.render = function(Edle_template=[],data={}){
    
    var template = JSON.parse(JSON.stringify(Edle_template));
    
    for(var _obj in data) E_Data[_obj]=data[_obj];
    
    for(var x=0;template.length > x;x++ ){
        
        for( var typ in template[x] ){
            
            if(typeof template[x][typ].first === 'undefined'){
               template[x][typ].first = false;
            }
            
            template[x][typ].type = typ;
            
            for(var val in template[x][typ]){
                
                if(new RegExp('{{(.*?)}}').test(template[x][typ][val])){
                    
                    var vval = template[x][typ][val].replace(/{|}/g,'');
                    
                    if(new RegExp(']$').test(vval)){
                        
                        var vvval = vval.split('[');
                       
                        template[x][typ][val]=E_Data[vvval[0]][vvval[1].replace(']','')];
                        
                        for(var z=2; typeof template[x][typ][val]==='object' ;z++ ){
                            
                            template[x][typ][val]=template[x][typ][val][vvval[z].replace(']','')];
                            
                        }
                       
                    }else if(new RegExp(/\./).test(vval)){
                        
                        var vvval = vval.split('.');
                        
                        template[x][typ][val]=E_Data[vvval[0]][vvval[1]];
                        
                        for(var z=2; typeof template[x][typ][val]==='object' ;z++ ){
                            
                            template[x][typ][val]=template[x][typ][val][vvval[z]];
                            
                        }
                       
                    }else if(new RegExp('(/|raw)$').test(vval)){
                       
                        template[x][typ][val]=JSON.stringify(E_Data[vval.replace(/\|raw/g,'')]);
                       
                    }else{
                        
                        template[x][typ][val]=E_Data[vval];
                        
                    }
                    
                }
                
            }
            
            this.create(template[x][typ]);
            
        }
        
    }
 
    return this;
    
}

DCO.prototype.proccessDCOvar = function(val){
    
    return this;
    
}

DCO.prototype.promise = function(){
    
    return new Promise(
    
        function (resolve, reject){
            
            setTimeout(function(){resolve("¡Éxito!");}, 5000);
            
        }
    
    );
    
}

DCO.prototype.today = function(){
    
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd = '0'+dd
    } 

    if(mm<10) {
        mm = '0'+mm
    } 

    today = mm + '-' + dd + '-' + yyyy;
                
    return today;
    
}

DCO.prototype.Update = function(){
    
    var actualDom = this.e.innerHTML;
    
}

DCO.prototype.FuckYouAll = function(){
    
    var hate = 100000;
    
    for(var x=0;hate>x;x++){
        
        console.log('Fuck');
        
    }
    
}