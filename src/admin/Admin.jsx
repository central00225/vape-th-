import React, { useEffect, useState } from 'react'

const OWNER = 'central00225'
const REPO = 'vape-th-'
const BRANCH = 'main'

function b64Encode(str){ return btoa(unescape(encodeURIComponent(str))) }
function b64Decode(b){ return decodeURIComponent(escape(atob(b))) }

async function getFile(token, path){
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}?ref=${BRANCH}`,{
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' }
  })
  if(!res.ok) throw new Error('Cannot fetch file')
  return res.json()
}

async function putFile(token, path, contentBase64, message, sha){
  const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${path}`,{
    method:'PUT',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' , 'Content-Type':'application/json'},
    body: JSON.stringify({ message, content: contentBase64, branch: BRANCH, sha })
  })
  if(!res.ok) throw new Error('Cannot put file')
  return res.json()
}

export default function Admin({onClose}){
  const [token, setToken] = useState(localStorage.getItem('gh_token')||'')
  const [products, setProducts] = useState([])
  const [sha, setSha] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=>{ if(token) loadProducts() },[token])

  async function loadProducts(){
    setLoading(true)
    try{
      const file = await getFile(token,'products.json')
      setSha(file.sha)
      const content = b64Decode(file.content)
      setProducts(JSON.parse(content))
    }catch(e){ console.error(e); alert('Échec chargement products.json — vérifiez le token') }
    setLoading(false)
  }

  async function saveProducts(){
    setLoading(true)
    try{
      const content = b64Encode(JSON.stringify(products, null, 2))
      await putFile(token,'products.json', content, 'admin: update products.json', sha)
      setMessage('Modifications poussées — GitHub Pages va déployer le site (quelques secondes).')
      // reload sha
      await loadProducts()
    }catch(e){ console.error(e); alert('Échec commit — vérifiez le token et permissions') }
    setLoading(false)
  }

  function updateProduct(i, key, value){
    const copy = [...products]; copy[i] = {...copy[i], [key]: value}; setProducts(copy)
  }

  async function uploadImage(file){
    if(!token) return alert('Entrez votre token GitHub avec scope repo')
    const fname = `${Date.now()}-${file.name}`
    const reader = new FileReader()
    reader.onload = async ()=>{
      const base64 = reader.result.split(',')[1]
      try{
        await putFile(token, `images/${fname}`, base64, `admin: add image ${fname}`)
        // image URL on GitHub Pages will be available at /images/{fname} after build
        const url = `https://${OWNER}.github.io/${REPO}/images/${fname}`
        setMessage(`Image uploadée: ${url} (attendre déploiement Pages)`)
        // insert url into first product image by default (developer can change)
        setProducts(p=> p.map((it,idx)=>(idx===0? {...it, image: url}: it)))
      }catch(e){ console.error(e); alert('Erreur upload image — vérifiez token/permissions') }
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="modal" onClick={onClose}>
      <div className="modalContent" onClick={e=>e.stopPropagation()} style={{minWidth:760}}>
        <button className="close" onClick={onClose}>×</button>
        <h3>Admin — modification produits</h3>
        <p>Mode simple: fournissez un token GitHub (scope <code>repo</code>), modifiez, puis cliquez <strong>Push</strong>.</p>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <input type="password" value={token} onChange={e=>setToken(e.target.value)} placeholder="Personal access token" style={{flex:1}} />
          <button className="btn primary" onClick={()=>{ localStorage.setItem('gh_token', token); loadProducts() }}>Charger</button>
        </div>

        {loading && <p>Chargement…</p>}

        {!loading && products.length>0 && (
          <div>
            <h4>Produits</h4>
            {products.map((p,i)=> (
              <div key={p.id} style={{border:'1px solid #233',padding:8,marginBottom:8}}>
                <div style={{display:'flex',gap:8}}>
                  <input style={{flex:1}} value={p.title} onChange={e=>updateProduct(i,'title',e.target.value)} />
                  <input style={{width:100}} value={p.price} onChange={e=>updateProduct(i,'price',e.target.value)} />
                </div>
                <div style={{display:'flex',gap:8,marginTop:8}}>
                  <input style={{flex:1}} value={p.category} onChange={e=>updateProduct(i,'category',e.target.value)} />
                  <input style={{flex:1}} value={p.image} onChange={e=>updateProduct(i,'image',e.target.value)} />
                </div>
                <textarea style={{width:'100%',marginTop:8}} value={p.description} onChange={e=>updateProduct(i,'description',e.target.value)} />
              </div>
            ))}

            <div style={{marginTop:8}}>
              <label>Uploader une image (sera ajoutée dans <code>/images</code>)</label>
              <input type="file" accept="image/*" onChange={e=>uploadImage(e.target.files[0])} />
            </div>

            <div style={{marginTop:12,display:'flex',gap:8}}>
              <button className="btn primary" onClick={saveProducts}>Push</button>
              <button className="btn ghost" onClick={loadProducts}>Recharger</button>
              <div style={{flex:1}}>{message}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
