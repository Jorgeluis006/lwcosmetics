import { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'

const stripeSecret = process.env.STRIPE_SECRET_KEY || ''
const stripe = new Stripe(stripeSecret, { apiVersion: '2022-11-15' })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const { priceId } = req.body || req.query

  const products: any = {
    p1: { name: 'Camiseta', price: 1999 },
    p2: { name: 'Taza', price: 999 }
  }

  const product = products[priceId]
  if (!product) return res.status(400).json({ error: 'Producto no encontrado' })

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price_data: { currency: 'usd', product_data: { name: product.name }, unit_amount: product.price }, quantity: 1 }],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/?canceled=1`
    })
    return res.redirect(303, session.url || '/')
  } catch (err: any) {
    console.error(err)
    return res.status(500).json({ error: err.message || 'Error' })
  }
}
