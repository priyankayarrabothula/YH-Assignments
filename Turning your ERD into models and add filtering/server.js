const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

/*
--------------------------------
POST PRODUCT (req.body)
--------------------------------
*/
app.post("/products", async (req, res) => {
  try {
    const product = await prisma.product.create({
      data: req.body
    });

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
--------------------------------
GET PRODUCTS (req.query)
--------------------------------
*/
app.get("/products", async (req, res) => {
  try {
    const { category, minPrice, maxPrice } = req.query;

    const products = await prisma.product.findMany({
      where: {
        price: {
          gte: minPrice ? Number(minPrice) : undefined,
          lte: maxPrice ? Number(maxPrice) : undefined
        },

        category: category
          ? {
              name: String(category)
            }
          : undefined
      },
      include: {
        category: true
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
--------------------------------
PATCH PRODUCT (req.params)
--------------------------------
*/
app.patch("/products/:productId", async (req, res) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        id: Number(req.params.productId)
      },
      data: req.body
    });

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
});

/*
--------------------------------
DELETE ORDER (req.params)
--------------------------------
*/
app.delete("/orders/:orderId", async (req, res) => {
  try {
    const orderId = Number(req.params.orderId);

    await prisma.orderItem.deleteMany({
      where: {
        orderId
      }
    });

    await prisma.order.delete({
      where: {
        id: orderId
      }
    });

    res.json({
      message: "Order deleted successfully"
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});