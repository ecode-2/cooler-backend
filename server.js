const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

const SHOPIFY_STORE = process.env.SHOPIFY_STORE;
const SHOPIFY_ADMIN_TOKEN = process.env.SHOPIFY_ADMIN_TOKEN;

/*
Health Check
Visit:
https://your-project.up.railway.app
*/
app.get('/', (req, res) => {
res.send('Cooler Backend Running');
});

/*
Create Shopify Draft Order
*/
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
    note: `
```

Custom Walk-In ${coolerType}

Doors: ${doors}
Depth: ${depth}ft
Height: ${height}ft
Entry Door: ${entry ? entryPosition : 'None'}

Quoted Price: $${price}
`,
        line_items: [
          {
            title: `Custom Walk-In ${coolerType}`,
quantity: 1,
price: Number(price)
}
]
}
};

```
const response = await fetch(
  `https://${SHOPIFY_STORE}/admin/api/2025-01/draft_orders.json`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN
    },
    body: JSON.stringify(draftOrderPayload)
  }
);

const data = await response.json();

if (!response.ok) {
  console.error(data);

  return res.status(500).json({
    error: 'Shopify draft order failed',
    details: data
  });
}

return res.json({
  success: true,
  invoiceUrl: data.draft_order.invoice_url
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
