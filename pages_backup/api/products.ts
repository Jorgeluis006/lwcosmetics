import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const products = [
    { id: 'p1', name: 'Camiseta', description: 'Camiseta de algodón', price: 1999 },
    { id: 'p2', name: 'Taza', description: 'Taza cerámica', price: 999 }
  ]
  res.status(200).json(products)
}
