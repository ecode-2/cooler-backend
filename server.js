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
const price = Number(req.body.price || 0);
const doors = req.body.doors || '';
const depth = req.body.depth || '';
const height = req.body.height || '';
const freezer = req.body.freezer || false;
const entry = req.body.entry || false;
const entryPosition = req.body.entryPosition || 'None';

const coolerType = freezer ? 'Freezer' : 'Cooler';

const note =
  'Custom Walk-In ' + coolerType + '\n\n' +
  'Doors: ' + doors + '\n' +
  'Depth: ' + depth + 'ft\n' +
  'Height: ' + height + 'ft\n' +
  'Entry Door: ' + (entry ? entryPosition : 'None') + '\n\n' +
  'Quoted Price: $' + price;

const payload = {
  draft_order: {
    note: note,
    line_items: [
      {
        title: 'Custom Walk-In ' + coolerType,
        quantity: 1,
        price: price.toFixed(2)
      }
    ]
  }
};

const response = await fetch(
  'https://' +
  SHOPIFY_STORE +
  '/admin/api/2025-01/draft_orders.json',
  {
    method: 'POST',
    headers: {
      'X-Shopify-Access-Token': SHOPIFY_ADMIN_TOKEN,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  }
);

const data = await response.json();

if (!response.ok) {
  console.error(data);

  return res.status(500).json({
    success: false,
    shopifyError: data
  });
}

return res.json({
  success: true,
  invoiceUrl: data.draft_order.invoice_url,
  draftOrderId: data.draft_order.id
});
```

} catch (error) {

```
console.error(error);

return res.status(500).json({
  success: false,
  error: error.message
});
```

}

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
console.log('Server running on port ' + PORT);
});
