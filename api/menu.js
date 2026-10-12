export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const menu = [
    { id: 1, name: "Kottu Roti", price: 750, category: "Mains", available: true },
    { id: 2, name: "Fried Rice", price: 850, category: "Mains", available: true },
    { id: 3, name: "Veg Sub", price: 600, category: "Snacks", available: false },
    { id: 4, name: "Watalappan", price: 350, category: "Dessert", available: true },
    { id: 5, name: "Iced Milo", price: 300, category: "Drinks", available: true }
  ];

  return res.status(200).json(menu);
}
