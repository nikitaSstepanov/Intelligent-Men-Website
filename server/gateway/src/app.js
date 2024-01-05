const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/posts.router");
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

const PORT = process.env.GATEWAY_PORT;
const gateway = express();

gateway.use(cors());
gateway.use(express.json());

gateway.use(postsRouter);

gateway.listen(PORT, () => {
    console.log(`Gateway is started on ${PORT}`);
});