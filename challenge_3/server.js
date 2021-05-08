const express = require('express')
const App = express();

App.use(express.static('./public'))

App.listen(5000)

