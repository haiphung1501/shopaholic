const app = require("./index");
const dotenv = require('dotenv');

dotenv.config({path:"config/.env"})

app.listen(process.env.PORT, () => {
    console.log(`Server is working on PORT: ${process.env.PORT}`);
})