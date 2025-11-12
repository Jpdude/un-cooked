import {chromium} from "playwright";
import * as fs from 'fs';
import { type } from "os";
var _page:any; // THis is meant to be var _page: Page; and so are the rest but ill fix that l8r
var _context:any;
var _browser:any;

await check(); // Setting up the enviorments for all the classes
async function check() {
    

    return await (async () => {
    const browser = await chromium.launch({
        headless: true
    });
    const context = await browser.newContext();

    const page = await context.newPage();
    _page = page; 
    _context = context;
    _browser = browser;
    
    return {page,context,browser}
    })()
    
}
abstract class Base{
    _name:string;
    id:string;



    constructor( ){
        this._name = "null";
        this.id = "null";
        
    }

    get name():string{
        return this._name;
    }
    
    set name( name:string){
        this._name = name;
    } 

    save(){
        var keys = Object.keys(this);
        var vals = Object.values(this);
        var data =  keys.map((key,i)=> [{"name": key,"value":vals[i]}]);
        
        fs.writeFileSync(`${this.id}.txt`,JSON.stringify(data));
        console.log("Saved...")
        return data;
    }
    
}

class student extends Base{
    sessionId:string;
    sessionAuth: string;
    course_names: string[];
    courses: course[];
    


    constructor(){
        super();
        this.sessionId = "null";
        this.sessionAuth = "null";
        this.course_names = [""];
        this.courses = [{
            _name: "",
            name: "",
            save: function (): any[][] {
                throw new Error("Function not implemented.");
            },
            id: ""
        }];
        
    
        
    }
    async refresh(force = false){
        if (!force){

            try{
                var name = await _page.getByRole('heading', { name: /^Hi,\s([A-Za-z'-]+)!\s👋$/ }).innerText();
                name = name.replace("👋","");
                name = name.replace("Hi,","");
                name = name.replace("!","");
                name = name.trim();
                this._name = name
            }catch(e){
                console.error("Caught error:", e.message);
                throw e;
                return false;
            }
        }
        console.log(this.id);
        
        try{
            if (!force){
                 throw  "Save"
             }
            var data = fs.readFileSync(`${this.id}.txt`, 'utf8');
            data = JSON.parse(data);
            // console.log(typeof(data) );
            // console.log(data,data.length)
            //console.log(data,data.length);
            for (let i = 0 ;  i < data.length ; i++){
                console.log("id",this.id,i);

                console.log(data[i][0]["name"]);
                if (data[i][0]["name"] == "sessionId"){
                    
                    this.sessionId = data[i][0]["value"];
                    console.log(this.sessionId)
                }else if(data[i][0]["name"] == "sessionAuth"){
                    this.sessionAuth = data[i][0]["value"];
                }else if(data[i][0]["name"] == "courses"){
                    this.courses = data[i][0]["value"];

                }else if(data[i][0]["name"] == "course_names"){
                    this.course_names = data[i][0]["value"];

                }else if(data[i][0]["name"] == "_name"){
                    this._name = data[i][0]["value"];

                }else if(data[i][0]["name"] == "id"){
                    this.id = data[i][0]["value"];

                }
            }
            console.log(this.name);
            return true;


        }catch(e){
            // console.log
            // console.error("Caught error:", e.message);
            // throw e;
            if (force){
                return false
            }
            
            const cookies = await _context.cookies();
            for (let i = 0 ;  i < cookies.length ; i++){
                if (cookies[i]["name"] == "MDL_SSP_SessID"){
                    this.sessionId = cookies[i]["value"];
                }else if(cookies[i]["name"] == "MDL_SSP_AuthToken"){
                    this.sessionAuth = cookies[i]["value"];
                }
            }
            
        
           
            console.log(await this.getCourses());
            await this.save();
            return true;
           

        }
    }
    async signin(username:string, password:string){
        this.id = username.replace("@mytru.ca","");
        if( !(await this.login(username))){

            await _page.goto('https://login.microsoftonline.com/eb1c9d1a-e6e8-4097-87fe-bb01690935b7/saml2?SAMLRequest=jZLLbtswEEV%2FReCekijHMUXYBtwYRQ2krRG7XXRTUOQoJsCHyqH6%2BPvSUoomiwbdEcM5M%2FdezBqls4PYjeniH%2BDbCJiKn856FNPHhozRiyDRoPDSAYqkxGn3%2Fl40ZS2GGFJQwZJnyOuERISYTPCkOOw35Gu3YJq3ulW8XTYgW%2BBcdY1S7Ab0sqkbteA145rpnhSfIWImNyQPyjjiCAePSfqUS3WzpKymDT%2BzlVg0gvEvpNhnN8bLNFGXlAYUVWXDo%2FGlMyoGDH0K3hoPpQqugo6pVjNJ4RY4vanbFeWrHmjX1ey2rdvFsltVV48NKXZ%2FjNwFj6ODeIL43Sj49HD%2Fd5ULQVsoUxxLJSuZM57xCof5QaXCcrgMLztJcXwK9o3x2vjH1zPt5iYU787nIz1%2BPJ3Jdn0dL6aM4vZ%2F5DhIUsskr2rW1XN6PV%2FIh7z3sD8Ga9Sv4m2ITqZ%2Fy2IlmypG035qFaPHAZTpDegcnrXhx10EmWBDshwg1XZe%2BvISt78B&RelayState=https%3A%2F%2Fmoodle.tru.ca%2Fmy%2F&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=tfCAk3ipBzKKeWOqwAGYZ2Ugjvt1p2Ob0PjW5sQRkaBwmQDMjuLk1G54cyxECMqyK7s8VM9390JDZAm6dFd6jgXwOwsr2Oty1VyJ%2BzQDCOOzC4fXswwVJGEC7%2B%2BF%2FgWxzFaDEDEQg1pU0Xbanmsv4n2DwCwK2vM3Lr%2FdWr0b1tDO5t%2FEsw37g1QJLMEGuDhWXb2VtQOJ6Y9xIw7CNBP8tC%2F3SC2IR%2B88ThqxTSIC5KUHxkC%2FyMPMZyzaZh3UPj5AebAm396v8BResJNfoHqXQvIX1eMnw3toeuL9bYInuGTLG72Pvgk1O9aH1yNTOO6CrrtPfXk9VYBrhzkFziRa1w%3D%3D&sso_reload=true');
            await _page.getByRole('textbox', { name: 'someone@example.com' }).click();
            await _page.getByRole('textbox', { name: 'someone@example.com' }).fill(username);
            await _page.getByRole('button', { name: 'Next' }).click();
            await _page.getByRole('textbox', { name: 'Enter the password for' }).click();
            await _page.getByRole('textbox', { name: 'Enter the password for' }).fill(password);
            await _page.getByRole('button', { name: 'Sign in' }).click();
            await _page.getByRole('button', { name: 'Yes' }).click();
            var success = await this.refresh();
            if (!success){
                return false;
    
            }
            return true;
        }else{
            console.log("Logged In")
            return true;
        }
        

    }

    async login(id:string , sessionId:string = "", sessionAuth:string = ""){
        id = id.replace("@mytru.ca","");
        this.id = id;
        console.log("Logging In");
        if(!sessionAuth && !sessionId){
            if(await this.refresh(true)){
                sessionId = this.sessionId;
                sessionAuth = this.sessionAuth;
            }else{
                return false;
            }
        }
        _context.addCookies([{name:"MDL_SSP_AuthToken", value: sessionAuth , path:"/",domain:"moodle.tru.ca",httpOnly:true , secure:true},
            {name:"MDL_SSP_SessID", value: sessionId, path:"/",httpOnly:true , secure:true ,domain:"moodle.tru.ca"}])
        
        console.log(sessionId,sessionAuth)
        await _page.goto('https://moodle.tru.ca/');
        await _page.locator('text=Log in').first().click();
        console.log(_page.url());
        if (_page.url() != "https://moodle.tru.ca/my/"){
            //change everything to id's because when someone is using a different language you can't use english to query it.
            //console.log("hmmmm");
            return false; 
        }

        return true;
        

    }

    async getCourses(){// refacroring needed here make this a core fucntion , make duplicate function for purely retrival purposes
        await _page.locator('text=My courses').first().click();
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > 1000){
            break;
            }
        }
        
        await _page.waitForSelector('text=My courses',{state:'visible'});
        console.log("---------------------------",await _page.getByRole('listitem').all());
        console.log(await _page.getByRole('list').all());
        
        var count = await _page.getByRole('listitem').count();
        console.log(count)
        count = 0;
        for (const row of await _page.getByRole('listitem').all()){
            console.log("-------------------------------",count,"--------------------------------------------------");
            var data = await row.innerText();
            var dataList = data.split("\n");
    
            console.log(dataList[0]);
            this.course_names.push(dataList[0])
            console.log("-------------------------------",count,"--------------------------------------------------");
            count++;
        };

        return this.course_names

    }

    async release(){
        await _context.close();
        await _browser.close();

    }
}
class course extends Base{

    constructor(name:string ){
        super();
        
        
    }

}
class week extends Base{

    constructor(name:string ){
        super();
        
        
    }

}
class resource extends Base{

    constructor(name:string ){
        super();
        
        
    }

}

var stan = new student();

if ((await stan.signin("t00749160@mytru.ca","#D1"))){
    console.log("Signed In");
}else{
    console.log("Unsucessful")
}

//stan.release();
export {Base,student,course,week,resource};