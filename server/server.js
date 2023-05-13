const express = require('express');
const cors = require('cors');
const data = require('./movies.json');
const bodyParser = require('body-parser')
const Joi = require('joi');
const fs = require('fs')


const schema = Joi.object({
 name: Joi.string().required(),
 rating: Joi.string().required(),
 releaseDate: Joi.date().required(),
})

const app = express();
const port = 8080;
app.use(cors())
app.use(express.json());


app.get('/', (req, res) => {
 res.send("called")
})

app.get('/getAllMovies', async (req, res) => {
 const movies = await data
 res.json(movies)
});

app.post("/addNewMovies", (req, res) => {
 console.log("body---------", req.body)
 const { error, value } = schema.validate(req.body)
 if (value) {
  console.log("-------", value)
  let updatedData = [...data, value]
  const stringfyData = JSON.stringify(updatedData);
  fs.writeFile('./movies.json', stringfyData, err => {
   // console.log("err", err, stringfyData)
  })
  res.json(value)
 }
 else {
  res.json(error)
 }
})


app.listen(port, () => {
 console.log(`app running on port ${port}`)
})