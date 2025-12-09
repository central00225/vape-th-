import React, { useMemo, useState } from 'react'
import { products as initialProducts } from './data/products'

function Header({ cartCount, onToggleCart, q, setQ }){
  return (
    <header className="header">
      <div className="brand">Vape Marketplace</div>
      <input className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)} />
      <button className="cartBtn" onClick={onToggleCart}>Panier ({cartCount})</button>
    </header>
  )
}

function ProductCard({ p, onView, onAdd }){
  return (
    <article className="card">
      <div className="thumb">{p.category}</div>
      <h4>{p.title}</h4>
      <div className="desc">{p.description}</div>
      <div className="row">
        <div className="price">€{p.price.toFixed(2)}</div>
        <div className="actions">
          <button className="btn ghost" onClick={()=>onView(p)}>Voir</button>
          <button className="btn primary" onClick={()=>onAdd(p)}>Ajouter</button>
        </div>
      </div>
    </article>
  )
}

function Cart({ cart, products, onClose, onRemove }){
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

export default function App(){
  const [q, setQ] = useState('')
  const [category, setCategory] = useState(null)
  const [cart, setCart] = useState({})
  const [view, setView] = useState(null)
  const [showCart, setShowCart] = useState(false)

  const categories = useMemo(()=>['Toutes', ...Array.from(new Set(initialProducts.map(p=>p.category)) )], [])

  const filtered = useMemo(()=> {
    return initialProducts.filter(p=>{
      if(category && category!=='Toutes' && p.category!==category) return false
      if(q && !(p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))) return false
      return true
    })
  }, [q, category])

  function addToCart(p){ setCart(s => ({ ...s, [p.id]: (s[p.id]||0)+1 })) }
  function removeFromCart(id){ setCart(s => { const copy = { ...s }; delete copy[id]; return copy }) }

  return (
    <div className="wrap">
      <Header cartCount={Object.values(cart).reduce((a,b)=>a+b,0)} onToggleCart={()=>setShowCart(true)} q={q} setQ={setQ} />
      <main className="container">
        <aside className="filters">
          <h4>Catégories</h4>
          {categories.map(c=> (
            <button key={c} className={c===category || (c==='Toutes' && !category) ? 'active':''} onClick={()=> setCategory(c==='Toutes'? null : c)}>{c}</button>
          ))}
        </aside>
        <section className="market">
          <div className="grid">
            {filtered.map(p=> <ProductCard key={p.id} p={p} onView={setView} onAdd={addToCart} />)}
          </div>
        </section>
      </main>

      {view && (
        <div className="modal" onClick={()=>setView(null)}>
          <div className="modalContent" onClick={e=>e.stopPropagation()}>
            <button className="close" onClick={()=>setView(null)}>×</button>
            <h3>{view.title}</h3>
            <p>{view.description}</p>
            <div className="price">€{view.price.toFixed(2)}</div>
            <button className="btn primary" onClick={()=>{ addToCart(view); setView(null) }}>Ajouter au panier</button>
          </div>
        </div>
      )}

      {showCart && (
        <div className="modal" onClick={()=>setShowCart(false)}>
          <div className="modalContent" onClick={e=>e.stopPropagation()}>
            <Cart cart={cart} products={initialProducts} onClose={()=>setShowCart(false)} onRemove={removeFromCart} />
          </div>
        </div>
      )}
    </div>
  )
}
