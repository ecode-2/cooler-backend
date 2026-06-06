const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
res.send('Cooler Backend Running');
});

app.post('/create-order', (req, res) => {

console.log(req.body);

res.json({
success: true,
message: 'Create order route works'
});

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});
