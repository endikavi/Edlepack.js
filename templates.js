var E_Data={};

var Templates = {
    
    Content : [
    
        {div:{html:'Hola',id:'fat',childs:[
            
            {h2:{html:'Mi querido'}},
            {h3:{html:'{{nombre}}'}}
            
        ]}},
        
        {h1:{html:'Buenas'}},
        
        {div:{html:'Que tal?'}},
        
        {form:{attr:{id:'dos',action:'/prueba',method:'post'},childs:[
            
            {label:{html:'Nombre',id:'labeltext',class:'mylabel'}},
            //'<label id="labeltext" class="mylabel">Nombre</label>'
            {input:{attr:{id:'name',name:'name'},value:'{{nombre}}'}},
            {br:{}},
            {label:{html:'Apellido'}},
            {input:{attr:{id:'surname',name:'surname'},value:'{{array.apellido.primero}}'}},
            //'<input id="surname" name="surname" value="'+array[apellido][primero]+'">'
            {br:{}},
            {label:{html:'Edad'}},
            {input:{attr:{id:'age',type:'number',name:'age'},value:21}}
            
        ]}},
        
        {input:{attr:{id:'pepe',name:'miinput'},value:'Muy bien'}}
    
    ]

}