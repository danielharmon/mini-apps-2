const express = require('express')
const App = express();


App.use(express.static('./public'))

App.listen(4001, () => console.log(`Server is listening on port 4001`))


