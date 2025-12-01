
import express from 'express';
import cors from 'cors';
import { Session } from 'inspector';
//import {Student} from '../Base.ts'


const app: express.Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port: number = 3000;


app.post('/login', async (req, res) => {
    console.log(req.body)

    //  var stan = new Student();
    //  await stan.signin("t00725466@mytru.ca","Elowinnersoso4834$");
    //  await stan.initialData(true);
    res.json({"session":"t49rp0enqh9tlmfaf5eonuu5s8"});
});


app.listen(port, () => {
    console.log(`TypeScript with Express 
         http://127.0.0.1:${port}/`);
});
//:t49rp0enqh9tlmfaf5eonuu5s8 bd0c930cfc840d35e035111bfd5ddcff  t49rp0enqh9tlmfaf5eonuu5s8