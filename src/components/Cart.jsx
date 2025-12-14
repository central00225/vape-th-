import React from 'react'

export default function Cart({ cart, products, onClose, onRemove }){
  const items = Object.entries(cart).map(([id,qty])=>({ ...products.find(p=>p.id===+id), qty }))
  const total = items.reduce((s,i)=>s + i.price * i.qty, 0)
  return (
    <div className="modalInner">
      <button className="close" onClick={onClose}>×</button>
      <h3>Votre panier</h3>
      {items.length===0 ? <p>Panier vide.</p> : (
        <div>
          {items.map(it=> (
            <div key={it.id} className="cartRow">
              <div>{it.title} × {it.qty}</div>
              <div>€{(it.price*it.qty).toFixed(2)} <button className="btn ghost" onClick={()=>onRemove(it.id)}>Suppr</button></div>
            </div>
          ))}
          <div className="cartTotal">Total: €{total.toFixed(2)}</div>
          <div className="note">Checkout non intégré — voir README pour instructions Stripe.</div>
        </div>
      )}
    </div>
  )
}
