import { Timestamp } from 'mongodb';
import {connectToDatabase} from '../../../utils/mongodb';
//THE ABOVE FILE CONTAINS A METHOD THAT RETURNS US THE CONNECTED MONGO CLIENT AND THE DATABASE

//API FUNCTION SHULD ALWASY BR DEAULT EXPORTS
export default async function handler(req,res) {

    //GET THE METHOD AND THE BODY OBJECT FROM THE USER REQ
    const {method,body} = req;
    //GET THE DATABASE NAME FROM THE CONNECTTODATABASE UTIL FUNCTION
    const {db} = await connectToDatabase();
    //CHECK IF THE METHOD IS "POST"
    //IF IT IS POST THEN CREATE A COLLECTION WITH YOUR REQ BODY DATA
    if(method === "GET"){

        try {

            const posts = await db.collection('posts').find().sort({timestamp:-1}).toArray()

            if(posts.length !== 0){

                res.status(200).json(posts);

            }else{

                res.status(200).send("No Posts Avaialable");
            }
            
        } catch (error) {

            res.status(500);

            throw new Error('Failed to fetch posts');
            
        }
    }


    if(method === "POST") {

        try {
            //THIS CREATES A COLLECTION IF THERE IS NO COLLECTION NAMED POSTS
            const post = await db.collection('posts').insertOne({...body,timestamp:new Timestamp()});

            res.status(201).json(post)
            
        } catch (error) {

            res.status(500);

            throw new Error('Failed to create post');
            
        }
    }
}