class Controls{
    constructor(type){
        this.forward=false;
        this.left=false;
        this.right=false;
        this.reverse=false;

        switch(type){
            case "KEYS":
                this.#addKeyboardListeners();//keyboardinput readers
                break;
            case "DUMMY":
                this.forward=true;
                break;
        }

        
    }//this is for moving the car
    // #means private method kind of thing
    #addKeyboardListeners(){
        document.onkeydown=(event)=>{//=> prettysimilar to function(event) but then "this" will refer to the function not the instances created above
            switch(event.key){
                case "ArrowLeft":
                    this.left=true;
                    break;
                case "ArrowRight":
                    this.right=true;
                    break;
                case "ArrowUp":
                    this.forward=true;
                    break;
                case "ArrowDown":
                    this.reverse=true;
                    break;
            }
            console.table(this);//debugging to see if its taking everything as planned(check console)
        }
        document.onkeyup=(event)=>{
            switch(event.key){
                case "ArrowLeft":
                    this.left=false;
                    break;
                case "ArrowRight":
                    this.right=false;
                    break;
                case "ArrowUp":
                    this.forward=false;
                    break;
                case "ArrowDown":
                    this.reverse=false;
                    break;
            }
            console.table(this);
        }


    }
}