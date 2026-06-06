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

app.get('/test-shopify', async (req, res) => {

try {

```
const response = await fetch(
  `https://${SHOPIFY_STORE}/admin/api/2025-01/shop.json`,
  {
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json'
    }
  }
);

const data = await response.json();

res.json(data);
```

} catch (error) {

```
console.error(error);

res.status(500).json({
  error: error.message
});
```

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});
