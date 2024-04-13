const express = require("express");
const app = express();
const mongoose = require('mongoose');
const Food = require('./model/Food')

app.use(express.json());
app.use(express.urlencoded({extended: true}))

require('dotenv').config();

//Rotas
app.get("/", (req,res)=>{
		res.send("Home Page");
});

mongoose.connect(process.env.DB_CONNECTION)
    .then(() => {
        console.log('Connected to DataBase');
        
        // Servidor
        app.listen(3001, () => {
            console.log("Server is running");
        });
    })
    .catch((err) => {
        console.log(err);
    });



app.post("/", (req,res)=>{
    console.log(req.body) // Imprimir corpo da requisição
});

app.get("/api/foods", async(req,res)=>{
	try {
		const food = await Food.find();
    	res.json(food);
	} catch (error) {
		console.log(error)
	}
    
});

app.get("/api/foods/:id", async(req,res)=>{

    const food = await Food.findById(req.params.id);
    res.json(food);

});

app.post("/api/foods", async(req,res)=>{
    try {
		const food = new Food({
		  name: req.body.name,
		  category: req.body.category,
		  quantity: req.body.quantity,
		  expirationDate: req.body.expirationDate,
		  price: req.body.price,
		});
		await food.save();
		res.status(200).send({ mensage: 'Alimento cadastrado', food });
	  } catch (error) {
		console.log(error);
		res.status(500).send({ mensage: 'Erro de requisicao' });
	  }
})

app.put("/api/foods/:id", async(req,res)=>{
    try {
		
		const newFood = await Food.findByIdAndUpdate(
		  req.params.id,
		  req.body,
		  {new:true}
		);

		if(newFood == null){
			return res.status(404).json({ mensage: 'food nao encontrado' });
		}
		
		res.json(newFood);
		
	  } catch (error) {
		return res.status(400).json({ message: 'Erro no servidor' });
	  }
});

app.delete("/api/foods/:id", async(req,res)=>{
	try {
		const id = req.params.id;
		const foodDelete = await Food.findByIdAndDelete(id);
  
		if (!foodDelete)
		  return res.status(404).json({ message: 'Alimento nao encontrado' });
		res.status(200).json({ message: 'Alimento deletado com sucesso' });
	  } catch (error) {
		console.log(error);
		return res.status(500).json({ message: 'Erro de requisicao' });
	  }
});