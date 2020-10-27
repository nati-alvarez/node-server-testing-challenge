const server = require("./server.js");
const port = process.env.PORT || 5000;

server.listen(PORT, ()=> console.log(`server running on port ${PORT}`));