const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

app.get('/', (req, res) => {
res.send('Cooler Backend Running');
});

app.post('/create-order', async (req, res) => {
try {

```
const {
  price,
  doors,
  depth,
  height,
  freezer,
  entry,
  entryPosition
} = req.body;

const coolerType = freezer ? 'Freezer' : 'Cooler';

const draftOrderPayload = {
  draft_order: {
    note: `Custom Walk-In ${coolerType}
```

Doors: ${doors}
Depth: ${depth}ft
Height: ${height}ft
Entry Door: ${entry ? entryPosition : 'None'}

Quoted Price: $${price}`,

```
    line_items: [
      {
        title: `Custom Walk-In ${coolerType}`,
        quantity: 1,
        price: Number(price)
      }
    ]
  }
};

console.log('Draft order payload:', draftOrderPayload);

return res.json({
  success: true,
  payload: draftOrderPayload
});
```

} catch (error) {

```
console.error(error);

return res.status(500).json({
  error: error.message
});
```

}
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});
