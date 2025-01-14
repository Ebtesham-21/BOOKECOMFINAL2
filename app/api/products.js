import clientPromise from "../lib/mongodb";

export default function handle(req, res) {
    const {method} = req;
    mongoose.Promise = clientPromise;
    if(method === 'POST'){
        res.json('post');
    }
}