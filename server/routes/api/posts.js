const express = require('express')
const mongodb = require('mongodb')

const router = express.Router();

router.get('/', async(req,res)=>{
   const posts = await loadPostCollection();
   res.send(await posts.find({}).toArray());
})
//Add

router.post('/', async(req,res)=>{
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    })
    res.status(201).send()
})

//Delete

router.delete('/:id', async(req,res)=>{
    const posts = await loadPostCollection();
    await posts.deleteOne({_id: new mongodb.ObjectId(req.params.id)})
    res.status(200).send()
})




async function loadPostCollection(){
    const client  = await mongodb.MongoClient.connect('mongodb+srv://admin:123456asd@cluster0.qto9p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
        useNewUrlParser: true
    })

    return client.db('Cluster0').collection('posts');
}

module.exports = router