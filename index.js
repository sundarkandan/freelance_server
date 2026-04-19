const express=require('express')
const mongoose=require('mongoose');
require('dotenv').config();
const app=express();
const cors=require('cors')
app.use(express.json()); 
const schema=mongoose.Schema( {
                name: String,
                img: String, 
                dis:String,
                tags:Array,
                status:{type:Boolean,default:false},
                category: String
            })
app.use(cors({
    origin:"*",
    methods:["POST","GET","DELETE"]
}))

const Projects=mongoose.model('projects',schema)

const mongodbUrl="mongodb://sundarkandan:Editor__sundar2006@ac-rtru7jy-shard-00-00.bxnagzt.mongodb.net:27017,ac-rtru7jy-shard-00-01.bxnagzt.mongodb.net:27017,ac-rtru7jy-shard-00-02.bxnagzt.mongodb.net:27017/?ssl=true&replicaSet=atlas-z7fgwk-shard-0&authSource=admin&appName=Cluster0"
mongoose.connect(mongodbUrl).then(()=>{
    console.log('DB connected')
})
app.post("/newProject",async (req,res)=>{
    const datas=req.body
    try{
        const createNew=new Projects(datas)
    await createNew.save();
    console.log('data added successfully');
    res.send("data add successfully")
    }
    catch(err){
        console.log(err)
    }
})
app.get('/',async(req,res)=>{
    const getting=await Projects.find();
    res.send(getting)
})

app.delete('/deleteProject/:id',async(req,res)=>{
    const ids=req.params.id;
    console.log(ids)
    const deleting = await Projects.findByIdAndDelete(ids);
    res.send('project removed successfully')

    
})
app.listen(3000, ()=>{
    console.log('app is running at port http://localhost:3000')
})


