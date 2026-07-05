const stripe = require('stripe');

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS' }, body: '' };
  }
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

  const headers = { 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Content-Type': 'application/json' };
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { statusCode: 500, headers, body: JSON.stringify({ error: 'STRIPE_SECRET_KEY not configured' }) };

  try {
    // Pin to latest API version that supports automatic_payment_methods
    const stripeClient = stripe(secretKey, { apiVersion: '2024-06-20' });
    const config = JSON.parse(event.body);
    const lineItems = [];

    lineItems.push({ price_data: { currency: 'usd', product_data: { name: `BuildSwift BaseBox ${config.size} — ${config.size === 72 ? 'Micro Unit' : 'Studio Unit'}`, description: [config.exteriorName ? `Exterior: ${config.exteriorName}` : null, config.frameName ? `Frame: ${config.frameName}` : null, config.floorName ? `Floor: ${config.floorName}` : null].filter(Boolean).join(' | ') }, unit_amount: config.basePrice * 100 }, quantity: 1 });

    if (config.hvac)    lineItems.push({ price_data: { currency: 'usd', product_data: { name: `HVAC Mini Split — ${config.hvacBTU || 6000} BTU` }, unit_amount: config.hvacBTU === 9000 ? 126900 : 94100 }, quantity: 1 });
    if (config.solar)   lineItems.push({ price_data: { currency: 'usd', product_data: { name: `Solar Package — ${config.solarMount === 'roof' ? 'Roof' : 'Ground'} Mount` }, unit_amount: 217500 }, quantity: 1 });
    if (config.battery) lineItems.push({ price_data: { currency: 'usd', product_data: { name: 'Battery Expansion Pack' }, unit_amount: 89900 }, quantity: 1 });
    if (config.install === 'preset') lineItems.push({ price_data: { currency: 'usd', product_data: { name: 'We Pre-Build' }, unit_amount: 210000 + (config.hvac ? 50000 : 0) + (config.solar ? 60000 : 0) }, quantity: 1 });
    if (config.shipping === 'deliver' && config.shipCustomer > 0) lineItems.push({ price_data: { currency: 'usd', product_data: { name: `Shipping to ${config.zip} (${config.shipMiles} mi)` }, unit_amount: config.shipCustomer * 100 }, quantity: 1 });

    const session = await stripeClient.checkout.sessions.create({
      automatic_payment_methods: { enabled: true, allow_redirects: 'always' },
      line_items: lineItems,
      mode: 'payment',
      success_url: 'https://buildswiftmodular.com/order-success',
      cancel_url: 'https://buildswiftmodular.com',
      customer_email: config.email || undefined,
      metadata: {
        size: String(config.size), exterior: config.exteriorName || '', frame: config.frameName || '',
        floor: config.floorName || '', install: config.install || '', shipping: config.shipping || '',
        zip: config.zip || '', customer_name: config.name || '', customer_phone: config.phone || '',
        hvac_btu: config.hvacBTU ? String(config.hvacBTU) : '', notes: config.notes || '',
      },
      shipping_address_collection: config.shipping === 'deliver' ? { allowed_countries: ['US'] } : undefined,
    });

    return { statusCode: 200, headers, body: JSON.stringify({ url: session.url }) };
  } catch (err) {
    console.error('Stripe error:', err.message);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message }) };
  }
};
