import {chromium} from "playwright";
import readline from 'node:readline';
import * as fs from 'fs';
import { type } from "os";
var _page:any; // THis is meant to be var _page: Page; and so are the rest but ill fix that l8r
var _context:any;
var _browser:any;
console.log("here")
await setUp(); // Setting up the enviorments for all the classes

//Skipping all getters and setters will probably add later if necessary
async function setUp() {
    

    return await (async () => {
    const browser = await chromium.launch({
        headless: true,
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
    //student:student;



    constructor( ){
        this._name = "null";
        this.id = "null";
        //this.student = new student;
    
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

class Student extends Base{
    sessionId:string;
    sessionAuth: string;
    moodleSess: string;
    course_names: string[];
    courses: Course[];
    
    currSub = "temp";

    constructor(){
        super();
        this.sessionId = "null";
        this.sessionAuth = "null";
        this.moodleSess = "null";
        this.course_names = [];
        
        this.courses = [new Course("null","null","null",[new Week("null",0)])];
        
    
        
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
            }catch(e:any){
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
                }else if(data[i][0]["name"] == "moodleSess"){
                    this.moodleSess = data[i][0]["value"];
                    console.log(this.moodleSess);
                }else if(data[i][0]["name"] == "courses"){
                    //this.courses = data[i][0]["value"];

                }else if(data[i][0]["name"] == "course_names"){
                    this.course_names = data[i][0]["value"];

                }else if(data[i][0]["name"] == "_name"){
                    this._name = data[i][0]["value"];

                }else if(data[i][0]["name"] == "id"){
                    this.id = data[i][0]["value"];

                }
            }
            console.log(this._name);
            return true;


        }catch(e){
            // console.log
            // console.error("Caught error:", e.message);
            // throw e;
            if (force){
                return false;
            }
            
            const cookies = await _context.cookies();
            for (let i = 0 ;  i < cookies.length ; i++){
                if (cookies[i]["name"] == "MDL_SSP_SessID"){
                    this.sessionId = cookies[i]["value"];
                }else if(cookies[i]["name"] == "MDL_SSP_AuthToken"){
                    this.sessionAuth = cookies[i]["value"];
                }else if(cookies[i]["name"] == "MoodleSession"){
                    this.moodleSess = cookies[i]["value"];
                    console.log(":"+this.moodleSess)
                }
            }
            
        
            this.save();
            console.log(await this.initialData());// this might be blocking session from saving
            this.save();
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
            if (await _page.getByText("This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.").isVisible()){
                return false;
            }
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

    async login(id:string , sessionId:string = "", sessionAuth:string = "" , moodleSess:string = ""){
        id = id.replace("@mytru.ca","");
        this.id = id;
        console.log("Logging In");
        if(!sessionAuth && !sessionId){
            if(await this.refresh(true)){
                sessionId = this.sessionId;
                sessionAuth = this.sessionAuth;
                moodleSess = this.moodleSess;
            }else{
                return false;
            }
        }
        _context.addCookies([{name:"MDL_SSP_AuthToken", value: sessionAuth , path:"/",domain:"moodle.tru.ca",httpOnly:true , secure:true},
            {name:"MDL_SSP_SessID", value: sessionId, path:"/",httpOnly:true , secure:true ,domain:"moodle.tru.ca"},
            {name:"MoodleSession", value: moodleSess, path:"/",httpOnly:false , secure:false ,domain:"moodle.tru.ca"}])//add Moodle Session
        
        console.log(sessionId,sessionAuth)
        await _page.goto('https://moodle.tru.ca/');
        //await _page.locator('text=Log in').first().click();
        console.log(_page.url());
        if (_page.url() != "https://moodle.tru.ca/my/"){
            //change everything to id's because when someone is using a different language you can't use english to query it.
            //console.log("hmmmm");
            return false; 
        }

        return true;
        

    }
    async getToTreePage(download:boolean = true){
        
        if(await _page.getByRole('Button',{name:"Open course index"}).isVisible()){// Use this logic for all the other operations in this class
            await _page.getByRole('Button',{name:"Open course index"}).click();
        }
        
        await _page.getByRole('Button',{name:"Course index options"}).click();
        await _page.getByRole('Button',{name:"Course index options"}).click();
        if(!(_page.getByRole('Link',{name:"Expand all"}).isVisible())){
            await _page.getByRole('Link',{name:"Expand all"}).click();
        }
        
        
        
        var old_url = _page.url();
        this.currSub = this.currSub.replaceAll(" ","_");
        console.log(this.currSub);
        return old_url;        
    }

    async getWeeks():Promise<Week[]>{
        await this.getToTreePage(true);
        // if(await _page.getByRole('Link',{name:"Collapse all"}).isVisible()){
        //     await _page.getByRole('Button',{name:"Collapse all"}).click();
        // }
        var weekCount = 0;
        var weeks:Week[] = [];
        var resCount = 0;
        
        


        for (const row of await _page.getByRole("tree").getByRole("link").all()){
            var tName = await row.innerText(); 
            
            
            if (tName == "Collapse" || tName == "Expand"){

            }else{

                try{
                    var snap = await row.ariaSnapshot();
                }catch(e){
                    console.log("failed");
                    await _page.reload({waitUntil:"load"});
                    await _page.isVisible(`text='${tName}`)
                    var snap = await row.ariaSnapshot({ force: true });
                }
                if (snap.includes("/course/")){
                    weekCount++;
                    weeks.push(new Week(tName, resCount));
                    console.log("Week "+ weekCount + ": " + tName);
                    resCount = 0;
                }else{
                    resCount+=1;
                }
                
            }
            
        
        }
        return weeks;


    }
    async downloader(){
        var old_url = await this.getToTreePage();
        var save = `./${this.id.replace("@mytru.ca","")}/${this.currSub}/`;
        var fold = "/general/";
        var missing = false;
            
        for (const row of await _page.getByRole("tree").getByRole("link").all()){
        
        var week;
        
        
        try{
            var tName = await row.innerText();
            await row.click();
            console.log(_page.url());
        }catch(TimeoutError){
            await row.click({ force: true });
            console.log(_page.url());
            console.log("failed");
            await _page.reload({waitUntil:"load"});
            missing = true;
        }
        console.log(tName);
        
        
        if (tName == "Collapse" || tName == "Expand"){

        }else{

            try{
                var snap = await row.ariaSnapshot();
            }catch(e){
                console.log("failed");
                await _page.reload({waitUntil:"load"});
                await _page.isVisible(`text='${tName}`)

                missing = true;
            }
            
            if (snap.includes("/course/")){
                fold = "/"+tName+"/";
            }
            // if (reg.test(tName)){
                
            //     console.log(snap.includes("/course/"));
            //     fold = "/"+tName+"/";
            // }
            
            if (_page.url() != old_url){
                console.log("yessir");
                await _page.goBack();
                console.log("old:"+_page.url());
            }else{
                const waitforD = _page.waitForEvent("download");
                await row.click();
                const down = await waitforD;
                await down.saveAs(save+fold+ down.suggestedFilename());
            }
            

                // week = await row.innerText();
                // week = week.replace("Expand","");
                // console.log(week);
        }
        
        
    }

        
        
    }
    

    async initialData(download:boolean = false){// refacroring needed here make this a core fucntion , make duplicate function for purely retrival purposes
        var start = new Date().getTime();
        await _page.locator('text=My courses').first().click();
        var data;
        var dataList;
        var tempCourseList = [];
        
        await _page.waitForSelector('div[data-course-id]',{state:'visible'});
        
        console.log("---------------------------",await _page.getByRole('listitem').all());
        console.log(await _page.getByRole('list').all());
        
        var count = await _page.getByRole('listitem').count();
        console.log(count)
        count = 0;
        var currUrl = _page.url();
        for (const row of await _page.getByRole('listitem').all()){
            
            await _page.getByText(this.currSub).first().isVisible();
            
            data = await row.innerText();
            dataList = data.split("\n");
            this.currSub =  dataList[0];
            await row.click();
            console.log("-------------------------------",count,"--------------------------------------------------");
            if (download) {
                await this.downloader();
            }else{
                var weeks = [new Week("",0)];
                //console.log(data);
                var weeks = await this.getWeeks();
                console.log("Fac"+dataList[5]);
                console.log(dataList[0]);
                tempCourseList.push(dataList[0])
                count++;
                let c = new Course(dataList[0],this.id,dataList[5],weeks);
                this.courses.push(c);
            }
            
            if( currUrl != _page.url()){
                await _page.goto(currUrl,{waitUntil:"networkidle"});// the docs say networkidle is discourged(for testing atleast), but it works fine for me
                console.log("yeahsirr")
            }
            console.log("-------------------------------",count,"--------------------------------------------------");
             // dataList has some possible useful info print to find out
        };
        //Instantiainting the course objects
        if (!(download)){
            this.course_names = tempCourseList;
        }
        console.log(`Time Taken ${(new Date().getTime() - start)/1000} seconds`)
        return this.course_names;

    }

    async release(){
        await _context.close();
        await _browser.close();

    }
}
class Course extends Base{
    facutly:string;
    weeks: Week[];

    constructor(name:string, id:string ,faculty:string , weeks:Week[]){
        super();
        this._name = name;
        this.id = id;
        this.facutly = "null";
        this.weeks = weeks;
        
    }

    getCourse(){
        
    }

    

}
class Week extends Base{
    resourceAmount: number
    constructor(name:string, resCount:number ){
        super();
        this._name = name;
        this.resourceAmount = resCount;
        
        
    }

    isWeekFormat():boolean{
        var isWeek = false;
        const reg = /^(?:0?[1-9]|[12][0-9]|3[01])\s+[A-Za-z]+\s*-\s*(?:0?[1-9]|[12][0-9]|3[01])\s+[A-Za-z]+$/;
        reg.test(this._name) ? isWeek = true : isWeek = false;
        return isWeek;

    }

    

}
class Resource extends Base{

    constructor(name:string ){
        super();
        
        
    }

}

var stan = new Student();

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.question("Username: ", async function(username:string) {
//     rl.question("Password: ", async function(password:string) {
//         rl.close();
//         console.log(username);
//         if ((await stan.signin(username,password))){
//             console.log("Signed In");
//         }else{
//             console.log("Unsucessful")
//         }
        
       
//     });
// });  
if ((await stan.login("t00725466@mytru.ca"))){ //I already logged in so my session is still active
    console.log("Signed In");
    console.log( await stan.initialData(true));
    
}else{
    console.log("Unsucessful")
}
// if ((await stan.signin("t00725466@mytru.ca","Elowinnersoso4834$"))){
//     console.log("Signed In");
// }else{
//     console.warn("Wrong Username or Password!");
//     stan.release();
// }


//Doesnt save moodleSess for some reason
//stan.release();
export {Base,Student,Course,Week,Resource};
