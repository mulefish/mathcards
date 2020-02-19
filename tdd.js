function floortest() {
    for ( let i = 0; i < 100; i++) {
        let over = 11
        let down = 11
        let xy1 = {
            x:Math.floor(Math.random() * over) + 1,
            y:Math.floor(Math.random() * down) + 1,
        }
        console.log( JSON.stringify( xy1 ))
    }
}
floortest() 


function euclidetest() {

    let x1 = 10
    let x2 = 10
    let y1 = 10
    let y2 = 11

    let a = x1 - x2;
    let b = y1 - y2;
    
    let c = Math.sqrt( a*a + b*b );

    // better be 1 
    console.log( "euclidetest: " + c  )


     x1 = 10
     x2 = 11
     y1 = 10
     y2 = 11

     a = x1 - x2;
     b = y1 - y2;
    
     c = Math.sqrt( a*a + b*b );

    // better be more than 1 and less than 2 
    console.log( "euclidetest: " + c  )

    x1 = 2
    x2 = 2
    y1 = 13
    y2 = 1

    a = x1 - x2;
    b = y1 - y2;   
    c = Math.sqrt( a*a + b*b );

   // about 125s
   console.log( "euclidetest: " + c  )




}

euclidetest()