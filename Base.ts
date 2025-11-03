abstract class Base{
    _name:string;

    constructor(name:string ){
        this._name = name;
        
    }

    get name():string{
        return this._name;
    }
    
    set name( name:string){
        this._name = name;
    } 
}

class student extends Base{

    constructor(name:string ){
        super(name);
        
        
    }

}
class course extends Base{

    constructor(name:string ){
        super(name);
        
        
    }

}
class week extends Base{

    constructor(name:string ){
        super(name);
        
        
    }

}
class resource extends Base{

    constructor(name:string ){
        super(name);
        
        
    }

}



export {Base,student,course,week,resource};