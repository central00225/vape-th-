import React, { useMemo, useState, Suspense, useEffect } from 'react'
import Admin from './admin/Admin'

function Header({ cartCount, onToggleCart, q, setQ }){
  return (
    <header className="header">
      <div className="brand"><a href="/" aria-label="Accueil"><h1>Vape Abidjan</h1></a></div>
      <label htmlFor="search" className="visually-hidden">Rechercher</label>
      <input id="search" className="search" placeholder="Rechercher..." value={q} onChange={e=>setQ(e.target.value)} />
      <div style={{display:'flex',gap:8,alignItems:'center'}}>
        <button className="cartBtn" onClick={onToggleCart} aria-label={`Ouvrir le panier (${cartCount})`}>Panier ({cartCount})</button>
        <button className="btn ghost" onClick={()=>{ document.dispatchEvent(new CustomEvent('openAdmin')) }}>Admin</button>
      </div>
    </header>
  )
}

function AgeGate(){
  const [shown, setShown] = React.useState(()=>{
    try { return localStorage.getItem('ageVerified') === 'true' ? false : true } catch(e){ return true }
  })

  function confirm(){
    try{ localStorage.setItem('ageVerified','true') }catch(e){}
    setShown(false)
      {showAdmin && (
        <div className="modal" onClick={()=>setShowAdmin(false)}>
          <div className="modalContent" onClick={e=>e.stopPropagation()}>
            <button className="close" onClick={()=>setShowAdmin(false)}>×</button>
            <Admin onClose={()=>setShowAdmin(false)} />
          </div>
        </div>
      )}
  }
  function deny(){
    window.location.href = 'https://www.google.com'
  }

  if(!shown) return null
  return (
    <div className="ageGate" role="dialog" aria-modal="true">
      <div className="ageGateContent">
        <h2>Vérification d'âge</h2>
        <p>Vous devez avoir l'âge légal pour accéder à ce site. Confirmez que vous avez l'âge requis pour continuer.</p>
        <div style={{display:'flex',gap:8,justifyContent:'center',marginTop:12}}>
          <button className="btn ghost" onClick={deny}>Je n'ai pas l'âge</button>
          <button className="btn primary" onClick={confirm}>J'ai l'âge requis</button>
        </div>
      </div>
    </div>
  )
}

function ProductCard({ p, onView, onAdd }){
  return (
    <article className="card">
      <div className="thumb">
        {p.image ? (
          <img src={p.image} alt={p.title} loading="lazy" width="400" height="300" />
        ) : p.category}
      </div>
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

const LazyCart = React.lazy(()=>import('./components/Cart'))

export default function App(){
  const [q, setQ] = useState('')
  const [category, setCategory] = useState(null)
  const [cart, setCart] = useState({})
  const [view, setView] = useState(null)
  const [showCart, setShowCart] = useState(false)
  const [products, setProducts] = useState([])
  const [showAdmin, setShowAdmin] = useState(false)

    // Load products and poll periodically so that changes
    // pushed via the Admin interface propagate to other open
    // clients without a full rebuild or manual refresh.
    useEffect(()=>{
      let cancelled = false
      async function load(){
        try{
          const r = await fetch('/products.json')
          if(!r.ok) throw new Error('fetch failed')
          const j = await r.json()
          if(!cancelled) setProducts(j)
        }catch(e){ if(!cancelled) setProducts([]) }
      }
      load()
      const id = setInterval(load, 30_000)
      return ()=>{ cancelled = true; clearInterval(id) }
    },[])

  useEffect(()=>{
    const onOpen = ()=> setShowAdmin(true)
    document.addEventListener('openAdmin', onOpen)
    return ()=> document.removeEventListener('openAdmin', onOpen)
  },[])

    const categories = useMemo(()=>['Toutes', ...Array.from(new Set(products.map(p=>p.category)) )], [products])

    const filtered = useMemo(()=> {
      return products.filter(p=>{
      if(category && category!=='Toutes' && p.category!==category) return false
      if(q && !(p.title.toLowerCase().includes(q.toLowerCase()) || p.description.toLowerCase().includes(q.toLowerCase()))) return false
      return true
    })
    }, [q, category, products])

  function addToCart(p){ setCart(s => ({ ...s, [p.id]: (s[p.id]||0)+1 })) }
  function removeFromCart(id){ setCart(s => { const copy = { ...s }; delete copy[id]; return copy }) }

  return (
    <div className="wrap">
      <AgeGate />
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
              <Suspense fallback={<div className="modalInner">Chargement...</div>}>
                  <LazyCart cart={cart} products={products} onClose={()=>setShowCart(false)} onRemove={removeFromCart} />
              </Suspense>
            {showAdmin && <Admin onClose={()=>setShowAdmin(false)} />}
            </div>
        </div>
      )}
        <footer style={{textAlign:'center',padding:'18px 8px',color:'var(--muted)'}}>
          <a href="/legal.html" style={{color:'inherit',marginRight:12}}>Mentions légales</a>
          <a href="/privacy.html" style={{color:'inherit'}}>Politique de confidentialité</a>
        </footer>
    </div>
  )
}
