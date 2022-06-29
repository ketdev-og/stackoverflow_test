const questionModel = require("../models/question.model");;
const redis = require('redis');
const {promisify} = require("util");

//redis connection - url:redis://127.0.0.1:6379
const redisClient = () => {
  const client = redis.createClient({
    url:"redis://127.0.0.1:6379"
  })
  client.connect()
  return client
}


//load question datas from mongo db to redis
const loadRedis = async (key) => {
  const client = redisClient();
  const value = await questionModel.find();
  await client.set(key, value);
};


//get all questions from redis
const getRedis = async (key) =>{
  const client = redisClient();
  promisify(client.get).bind(client)
  const data = await client.get(key).then((data)=>{
    console.log(data);
    return data
  })
  return data
}


module.exports = { loadRedis, getRedis };
