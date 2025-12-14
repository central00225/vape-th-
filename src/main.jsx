import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles.css'
import { products } from './data/products'

// Inject basic structured data (ItemList) for SEO - helps search engines know product listing
const itemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": products.map((p,i)=>({
    "@type": "ListItem",
    "position": i+1,
    "name": p.title,
    "description": p.description,
    "url": window.location.href
  }))
}
const script = document.createElement('script')
script.type = 'application/ld+json'
script.text = JSON.stringify(itemList)
document.head.appendChild(script)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
