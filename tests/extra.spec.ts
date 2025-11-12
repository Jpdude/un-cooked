import { test, expect } from '@playwright/test';
import {Base,student,course,week,resource} from "../Base.ts";

test('test', async ({ page,context }) => {
    // change everything to id's because when someone is using a different language you can't use english to query it.
    // await page.goto('https://login.microsoftonline.com/eb1c9d1a-e6e8-4097-87fe-bb01690935b7/saml2?SAMLRequest=jZLNbtswEIRfReCdEikrlkXYBtwYRQ2krRG7PeRSUOQyJiCSKpfqz9tXllI0OTTIjVjutzsz2DVK1%2FViN6SLv4fvA2DKfrnOo5g%2BNmSIXgSJFoWXDlAkJU67j3eizJnoY0hBhY48Q14nJCLEZIMn2WG%2FId%2BYacuWm7phFdd1vaxZpRZlJSsNRrNWal2teGNMZUj2FSKO5IaMg0YccYCDxyR9GkusvKGc0XJ15rWoFqLkDyTbj26sl2miLin1KIqiC4%2FW586qGDCYFHxnPeQquAJarhrNJYUlrGjFmpquagO0bRlfNqxZ3LR1cfVYkmz318ht8Dg4iCeIP6yCL%2Fd3%2F1a5EHQHeYpDrmQhx4xnvMB%2BflCpMO8v%2FctOkh2fgn1nvbb%2B8fVM27kJxYfz%2BUiPn09nsl1fx4spo7h9ixwHSWqZ5FXNunhOr%2BcL%2BTTuPeyPobPqd%2FY%2BRCfT%2F2XxnE8Vq6mZWsXgsQdljQU9htd14edtBJlgQ0Y5QIrtvPTlJW7%2FAA%3D%3D&RelayState=https%3A%2F%2Fmoodle.tru.ca%2Fmy%2F&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=kQedzdDEEY16Xi06T6inUZCvcKlWeijYpfXFMEUL2zNqMogSPb0iiPZ%2BSu%2BAZgIEWqbC7MPJCmDYBKY9bkr46au4qxI%2F6R12n85O0UIILgNHve6nKo81a%2FU7UfsPPaFLo35spV7Ef7eEs%2FuppOTUo%2Fum29zJ1IZUELv1cDnCN56NKwg2i7F9EgUAFUlXmcK0R5gR7CYOLQzTCMhxABkPmXSrzBfQqH19x7hoNDiDy1CbK26wtWqrbwseZATCwPOiZdhK%2FiP4V696KbG%2Fb7DXYnLsfSwxQLeo7d1B%2Fdwj0a2%2BHC6LUMfu%2FTmYx6uw00SpBEDbXnev%2BLh2KZljhbtA5w%3D%3D&sso_reload=true');
    // await page.getByRole('textbox', { name: 'someone@example.com' }).click();
    // await page.getByRole('textbox', { name: 'someone@example.com' }).fill('t00749160@mytru.ca');
    // await page.getByRole('button', { name: 'Next' }).click();
    // await page.locator('#i0118').fill('jepufamily#D1');
    // await page.getByRole('button', { name: 'Sign in' }).click();
    // await page.getByRole('button', { name: 'No' }).click();

    async function getCourses(){

        await page.waitForSelector('text=My courses',{state:'visible'});
        console.log("---------------------------",await page.getByRole('listitem').all());
        console.log(await page.getByRole('list').all());
        
        var count = await page.getByRole('listitem').count();
        console.log(count)
        count = 0;
        for (const row of await page.getByRole('listitem').all()){
            console.log("-------------------------------",count,"--------------------------------------------------");
            var data = await row.innerText();
            var dataList = data.split("\n");
    
            console.log(dataList[0]);
            console.log("-------------------------------",count,"--------------------------------------------------");
            count++;
        };


    }
    async function signin(username:String,password:String){
        await page.goto('https://login.microsoftonline.com/eb1c9d1a-e6e8-4097-87fe-bb01690935b7/saml2?SAMLRequest=jZLNbtswEIRfReCdEikrlkXYBtwYRQ2krRG7PeRSUOQyJiCSKpfqz9tXllI0OTTIjVjutzsz2DVK1%2FViN6SLv4fvA2DKfrnOo5g%2BNmSIXgSJFoWXDlAkJU67j3eizJnoY0hBhY48Q14nJCLEZIMn2WG%2FId%2BYacuWm7phFdd1vaxZpRZlJSsNRrNWal2teGNMZUj2FSKO5IaMg0YccYCDxyR9GkusvKGc0XJ15rWoFqLkDyTbj26sl2miLin1KIqiC4%2FW586qGDCYFHxnPeQquAJarhrNJYUlrGjFmpquagO0bRlfNqxZ3LR1cfVYkmz318ht8Dg4iCeIP6yCL%2Fd3%2F1a5EHQHeYpDrmQhx4xnvMB%2BflCpMO8v%2FctOkh2fgn1nvbb%2B8fVM27kJxYfz%2BUiPn09nsl1fx4spo7h9ixwHSWqZ5FXNunhOr%2BcL%2BTTuPeyPobPqd%2FY%2BRCfT%2F2XxnE8Vq6mZWsXgsQdljQU9htd14edtBJlgQ0Y5QIrtvPTlJW7%2FAA%3D%3D&RelayState=https%3A%2F%2Fmoodle.tru.ca%2Fmy%2F&SigAlg=http%3A%2F%2Fwww.w3.org%2F2001%2F04%2Fxmldsig-more%23rsa-sha256&Signature=kQedzdDEEY16Xi06T6inUZCvcKlWeijYpfXFMEUL2zNqMogSPb0iiPZ%2BSu%2BAZgIEWqbC7MPJCmDYBKY9bkr46au4qxI%2F6R12n85O0UIILgNHve6nKo81a%2FU7UfsPPaFLo35spV7Ef7eEs%2FuppOTUo%2Fum29zJ1IZUELv1cDnCN56NKwg2i7F9EgUAFUlXmcK0R5gR7CYOLQzTCMhxABkPmXSrzBfQqH19x7hoNDiDy1CbK26wtWqrbwseZATCwPOiZdhK%2FiP4V696KbG%2Fb7DXYnLsfSwxQLeo7d1B%2Fdwj0a2%2BHC6LUMfu%2FTmYx6uw00SpBEDbXnev%2BLh2KZljhbtA5w%3D%3D&sso_reload=true');
        await page.getByRole('textbox', { name: 'someone@example.com' }).click();
        await page.getByRole('textbox', { name: 'someone@example.com' }).fill('t00749160@mytru.ca');
        await page.getByRole('button', { name: 'Next' }).click();
        await page.locator('#i0118').fill('password');
        await page.getByRole('button', { name: 'Sign in' }).click();
        await page.getByRole('button', { name: 'No' }).click();
    }
    async function login(sessionId:String,sessionAuthToken:String) {

        context.addCookies([{name:"MDL_SSP_AuthToken", value:"_d390e9f701fd340816726c730b1a07ef6dd7fba141" , path:"/",domain:"moodle.tru.ca",httpOnly:true , secure:true},
            {name:"MDL_SSP_SessID", value:"f11aae8444123a97a063462fbeac9c21", path:"/",httpOnly:true , secure:true ,domain:"moodle.tru.ca"}])
        
        const cookies = await context.cookies();
        console.log(cookies);
        for (let i = 0 ;  i < cookies.length ; i++){
            if (cookies[i]["name"] == "MDL_SSP_SessID"){
                console.log(cookies[i]["name"],cookies[i]["value"]);


            }else if(cookies[i]["name"] == "MDL_SSP_AuthToken"){
                console.log(cookies[i]["name"],cookies[i]["value"]);
            }
        }
        await page.goto('https://moodle.tru.ca/');
        await page.locator('text=Log in').first().click();
        console.log(page.url());
        // if (page.url() != "https://moodle.tru.ca/"){
        //     //change everything to id's because when someone is using a different language you can't use english to query it.
        //     return false; 
        // }
        // const exp = new RegExp();

        var name = await page.getByRole('heading', { name: /^Hi,\s([A-Za-z'-]+)!\s👋$/ }).innerText();
        name = name.replace("👋","");
        name = name.replace("Hi,","");
        name = name.replace("!","");
        name = name.trim();
        console.log(name);
        await page.waitForSelector('text=My courses',{state:'visible'});
        // await page.getByRole('button', { name: 'My courses' }).click();
        await page.locator('text=My courses').first().click();
        var start = new Date().getTime();
        for (var i = 0; i < 1e7; i++) {
            if ((new Date().getTime() - start) > 1000){
            break;
            }
        }
        
    }

    
    await login("poop","poop");

    await getCourses();
});