export default function Rostro() {
  return (
    <section className="container" style={{maxWidth:600, marginTop:32}}>
      <h1 style={{color:'#c026d3', fontWeight:900, fontSize:'2rem', marginBottom:12}}>Estilos de Rostro</h1>
      <p style={{color:'#7c3aed', fontSize:'1.1rem', marginBottom:24}}>
        Encuentra bases, correctores, rubores y tips para lograr un acabado perfecto en tu piel.
      </p>
      <div style={{display:'flex', gap:24, flexWrap:'wrap'}}>
        <div style={{background:'#fbeee6', borderRadius:12, padding:18, minWidth:220, boxShadow:'0 2px 12px #c026d322'}}>
          <h3 style={{color:'#c026d3', margin:'0 0 8px 0'}}>Bases</h3>
          <p style={{color:'#7c3aed', fontSize:'1rem'}}>Cobertura ligera a total, acabado natural y larga duración.</p>
        </div>
        <div style={{background:'#fbeee6', borderRadius:12, padding:18, minWidth:220, boxShadow:'0 2px 12px #c026d322'}}>
          <h3 style={{color:'#c026d3', margin:'0 0 8px 0'}}>Correctores</h3>
          <p style={{color:'#7c3aed', fontSize:'1rem'}}>Oculta imperfecciones y resalta tu belleza natural.</p>
        </div>
        <div style={{background:'#fbeee6', borderRadius:12, padding:18, minWidth:220, boxShadow:'0 2px 12px #c026d322'}}>
          <h3 style={{color:'#c026d3', margin:'0 0 8px 0'}}>Rubores</h3>
          <p style={{color:'#7c3aed', fontSize:'1rem'}}>Colores vibrantes para un look fresco y saludable.</p>
        </div>
      </div>
    </section>
  )
}
