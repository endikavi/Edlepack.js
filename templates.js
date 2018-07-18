//Templates de prueba

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
            {input:{attr:{id:'name',name:'name'},value:'{{nombre}}'}},
            {br:{}},
            {label:{html:'Apellido'}},
            {input:{attr:{id:'surname',name:'surname'},value:'{{array.apellido.primero}}'}},
            {br:{}},
            {label:{html:'Edad'}},
            {input:{attr:{id:'age',type:'number',name:'age'},value:21}}
            
        ]}},
        
        {input:{attr:{id:'pepe',name:'miinput'},value:'Muy bien'}}
    
    ],
    
    Post : [
        
        {div:{id:'{{id}}',class:'card',childs:[
            
            {h3:{html:'{{nombre}}'}},
            
            {div:{class:'msg',childs:[
            
                {p:{html:'{{mensaje}}'}}
            
            ]}}
            
        ]}}
        
    ]

}