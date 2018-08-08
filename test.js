function TryEdle(){
    
    var startTime = new Date();

    º().create({id:'board'});

    for (var x=0;2000>x;x++){

        º('#board').create({class:"card",html:`

            <h3>Felipe</h3>

            <div class="msg">

                <p>Hola buenos dias</p>

            </div>   

        `})
        
    }
    
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    console.log(timeDiff);
    
}

function TryOldEdleRender(){
    
    var startTime = new Date();

    º().create({id:'board'});

    for (var x=0;2000>x;x++){

        º(board).render(Templates['Post'],{nombre:'Felipe',mensaje:'Hola buenos dias'});
        
    }
    
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    console.log(timeDiff);
    
}

function TryNewEdleRender(){
    
    var startTime = new Date();

    º().create({id:'board'});

    for (var x=0;2000>x;x++){

        º('#board').render2(`

        <h3>{{nombre}} {{index}}</h3>

        <div class="msg">

            <p>{{mensaje}} {{index}}</p>

        </div>   

    `,{nombre:'Felipe ' ,mensaje:'Hola buenos dias' ,index:x});
 
    }
    
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    console.log(timeDiff);
    
}

function TryJquery(){
    
    var startTime = new Date();

    $( "body" ).add( "div" ).attr('id', 'board');
    
    for (var x=0;2000>x;x++){
    
        $( "#board" ).append('<div class="card"><h3>Felipe</h3><div class="msg"><p>Hola buenos dias</p></div></div>');
        
    }
    
    var endTime = new Date();
    var timeDiff = endTime - startTime;
    console.log(timeDiff);
    
}