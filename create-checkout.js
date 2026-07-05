const stripe = require('stripe');
const EMAILJS_SERVICE_ID = 'service_87pltoj';
const EMAILJS_PUBLIC_KEY = 'CzshW_6gUDUjvCuoT';
const TEMPLATE_INTERNAL = 'template_yukoo2f';
const TEMPLATE_CUSTOMER = 'template_33uevlt';

async function sendEmail(templateId, params) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ service_id: EMAILJS_SERVICE_ID, template_id: templateId, user_id: EMAILJS_PUBLIC_KEY, template_params: params }),
  });
  console.log(`EmailJS ${templateId}:`, res.status);
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return { statusCode: 500, body: 'STRIPE_SECRET_KEY not configured' };
  const stripeClient = stripe(secretKey);
  let stripeEvent;
  try {
    stripeEvent = process.env.STRIPE_WEBHOOK_SECRET
      ? stripeClient.webhooks.constructEvent(event.body, event.headers['stripe-signature'], process.env.STRIPE_WEBHOOK_SECRET)
      : JSON.parse(event.body);
  } catch (err) { return { statusCode: 400, body: `Webhook Error: ${err.message}` }; }

  const session = stripeEvent.data.object;
  const meta = session.metadata || {};
  const customerName = meta.customer_name || session.customer_details?.name || 'Unknown';
  const customerEmail = session.customer_email || '';
  const amountTotal = session.amount_total ? `$${(session.amount_total/100).toLocaleString()}` : 'Unknown';
  const unit = `BaseBox ${meta.size} (${meta.size == 72 ? 'Micro Unit' : 'Studio Unit'})`;
  const addOns = [meta.install !== 'self' ? `Setup: ${meta.install}` : null, meta.shipping === 'deliver' ? `Shipping to ${meta.zip}` : 'Local Pickup'].filter(Boolean).join('\n') || 'None';

  const baseParams = {
    customer_name: customerName, customer_email: customerEmail,
    customer_phone: meta.customer_phone || 'Not provided', customer_zip: meta.zip || 'N/A',
    unit, base_price: amountTotal, exterior_panel: meta.exterior || 'Not specified',
    frame_color: meta.frame || 'Not specified', floor_option: meta.floor || 'Not specified',
    add_ons: addOns, hvac_btu: meta.hvac_btu || 'N/A', notes: meta.notes || 'None',
    installation: meta.install || 'self', shipping: meta.shipping || 'pickup',
    estimated_total: amountTotal, submitted_at: new Date().toLocaleString(),
    exterior_swatch: '', floor_swatch: '',
  };

  if (stripeEvent.type === 'checkout.session.completed') {
    await sendEmail(TEMPLATE_INTERNAL, { ...baseParams, order_status: '✅ PAID — ORDER CONFIRMED', reply_to: customerEmail });
    if (customerEmail) await sendEmail(TEMPLATE_CUSTOMER, { ...baseParams, order_status: 'Thank You For Your Order!', message: 'Your payment is confirmed and your BuildSwift BaseBox is in the production queue.', next_steps: "We'll reach out within 1 business day to confirm site requirements and delivery timeline. Lead time is approximately 2–3 months including shipping.", reply_to: 'charles@buildswiftmodular.com' });
  } else if (stripeEvent.type === 'checkout.session.expired') {
    await sendEmail(TEMPLATE_INTERNAL, { ...baseParams, order_status: '⚠️ ABANDONED CHECKOUT — follow up recommended', reply_to: customerEmail || 'charles@buildswiftmodular.com' });
  }
  return { statusCode: 200, body: JSON.stringify({ received: true }) };
};
