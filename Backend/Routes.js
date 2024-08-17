const apiRoutes = require("express").Router();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// get all Data

apiRoutes.get("/allData", async (req, res) => {
  const allData = await prisma.mama.findMany();
  res.status(200).send(allData);
});

//GET ONE

apiRoutes.get("/one/:id", async (req, res) => {
  const id = +req.params.id;

  const checkId = await prisma.mama.findFirst({
    
    where: {
      id: id,
    },
  });

  if (!checkId) {
    return res.status(404).send({ msg: "Not found" });
  }
  const getOne = await prisma.mama.findUnique({
    where: {
      id: id,
    },
  });
  res.status(202).send(getOne);
});

apiRoutes.post("/create", async (req, res) => {
  const { title, complete } = req.body;

  if (!title) {
    return res.status(401).send({ message: "Emty Data" });
  }
  const createTodo = await prisma.mama.create({
    data: 
     req.body
    ,
  });
  res.status(200).send(createTodo);
});

//  update

apiRoutes.put("/updated/:id", async (req, res) => {
  const id = Number(req.params.id);

  const checkID = await prisma.mama.findFirst({
    where: {
      id: id,
    },
  });

  if (!checkID) {
    return res.status(404).send({ message: `Not Found ${id} ` });
  }

  const todo = await prisma.mama.update({
    where: {
      id: id,
    },
    data: {
      title: req.body.title,
      complete: req.body.complete,
    },
  });
  res.status(200).send(todo);
});

//delete

apiRoutes.delete("/delete/:id", async (req, res) => {
  const id = Number(req.params.id);

  const checkID = await prisma.mama.findUnique({
    where: {
      id: id,
    },
  });
  if (!checkID) {
    return res.status(404).send({ message: "Not found" });
  }
  const Delete = await prisma.mama.delete({
    where: {
      id: id,
    },
  });

  res.status(201).send(Delete);
});

module.exports = apiRoutes;
