import { useState } from 'react';
import { Quote, Plus, Trash2, Search, Heart, Share2, X } from 'lucide-react';
const C='#fb923c';
interface Qte { id:string; text:string; author:string; tags:string[]; liked:boolean; createdAt:number; }
const SK='qk_quotes_v1';
const ld=():Qte[]=>{try{return JSON.parse(localStorage.getItem(SK)||'[]')}catch{return[]}};
const EXAMPLES=[
  {text:"The only way to do great work is to love what you do.",author:"Steve Jobs"},
  {text:"In the middle of every difficulty lies opportunity.",author:"Albert Einstein"},
  {text:"Life is what happens when you're busy making other plans.",author:"John Lennon"},
];

export default function App() {
  const [quotes,setQuotes]=useState<Qte[]>(ld);
  const [search,setSearch]=useState('');
  const [filter,setFilter]=useState<'all'|'liked'>('all');
  const [showAdd,setShowAdd]=useState(false);
  const [text,setText]=useState('');
  const [author,setAuthor]=useState('');
  const [tagInput,setTagInput]=useState('');
  const [tags,setTags]=useState<string[]>([]);

  const sv=(items:Qte[])=>{setQuotes(items);localStorage.setItem(SK,JSON.stringify(items))};
  const filtered=quotes.filter(q=>{
    const ms=!search||q.text.toLowerCase().includes(search.toLowerCase())||q.author.toLowerCase().includes(search.toLowerCase());
    const ml=filter==='all'||q.liked;
    return ms&&ml;
  });

  const add=()=>{
    if(!text.trim())return;
    sv([{id:crypto.randomUUID(),text:text.trim(),author:author.trim(),tags,liked:false,createdAt:Date.now()},...quotes]);
    setText('');setAuthor('');setTags([]);setTagInput('');setShowAdd(false);
  };

  const addExample=()=>{
    const ex=EXAMPLES[Math.floor(Math.random()*EXAMPLES.length)];
    sv([{id:crypto.randomUUID(),text:ex.text,author:ex.author,tags:['inspiration'],liked:false,createdAt:Date.now()},...quotes]);
  };

  const inp={width:'100%',background:'#080600',border:`1px solid ${C}20`,borderRadius:'10px',padding:'11px 14px',color:'white',fontSize:'14px',outline:'none',fontFamily:'Inter'};

  return (
    <div style={{minHeight:'100vh',background:'#080600',display:'flex',flexDirection:'column'}}>
      <header style={{padding:'16px 20px',borderBottom:`1px solid ${C}20`,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{display:'flex',alignItems:'center',gap:'10px'}}>
          <div style={{width:'36px',height:'36px',borderRadius:'10px',background:`linear-gradient(135deg,${C},#f97316)`,display:'flex',alignItems:'center',justifyContent:'center',boxShadow:`0 4px 14px ${C}30`}}><Quote size={16} color="white"/></div>
          <div><div style={{fontWeight:'700',fontSize:'16px',color:'white',lineHeight:1}}>QuoteKeeper Pro</div>
          <div style={{fontSize:'11px',color:`${C}60`,marginTop:'2px'}}>{quotes.length} quotes saved</div></div>
        </div>
        <button onClick={()=>setShowAdd(true)} style={{display:'flex',alignItems:'center',gap:'5px',padding:'8px 14px',borderRadius:'9px',background:C,border:'none',color:'white',fontSize:'13px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter',boxShadow:`0 4px 12px ${C}30`}}>
          <Plus size={13}/> Add
        </button>
      </header>
      <div style={{padding:'12px 20px',borderBottom:`1px solid ${C}15`,display:'flex',flexDirection:'column',gap:'8px'}}>
        <div style={{position:'relative'}}>
          <Search size={13} style={{position:'absolute',left:'11px',top:'50%',transform:'translateY(-50%)',color:`${C}60`}}/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search quotes..."
            style={{width:'100%',background:`${C}08`,border:`1px solid ${C}20`,borderRadius:'10px',padding:'9px 12px 9px 34px',color:'white',fontSize:'13px',outline:'none',fontFamily:'Inter'}}/>
        </div>
        <div style={{display:'flex',gap:'6px'}}>
          {([['all','All'],['liked','Liked']] as const).map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)} style={{padding:'5px 14px',borderRadius:'20px',border:`1px solid ${filter===v?C:C+'30'}`,background:filter===v?`${C}15`:'transparent',color:filter===v?C:`${C}60`,fontSize:'12px',cursor:'pointer',fontFamily:'Inter'}}>{l}</button>
          ))}
        </div>
      </div>
      <div style={{flex:1,overflow:'auto',padding:'14px 20px'}}>
        {filtered.length===0?(
          <div style={{textAlign:'center',padding:'60px 20px'}}>
            <div style={{fontSize:'52px',marginBottom:'16px'}}>💬</div>
            <h3 style={{fontSize:'20px',fontWeight:'700',color:'white',marginBottom:'8px'}}>{quotes.length===0?'Save your first quote':'No matches'}</h3>
            <p style={{color:`${C}60`,fontSize:'14px',lineHeight:'1.6',maxWidth:'240px',margin:'0 auto 24px'}}>{quotes.length===0?'Collect wisdom, inspiration, and memorable words.':''}</p>
            {quotes.length===0&&<div style={{display:'flex',gap:'8px',justifyContent:'center'}}>
              <button onClick={()=>setShowAdd(true)} style={{padding:'12px 20px',borderRadius:'10px',background:C,border:'none',color:'white',fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Add quote</button>
              <button onClick={addExample} style={{padding:'12px 20px',borderRadius:'10px',background:`${C}15`,border:`1px solid ${C}30`,color:C,fontSize:'14px',fontWeight:'600',cursor:'pointer',fontFamily:'Inter'}}>Try example</button>
            </div>}
          </div>
        ):(
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {[...filtered].sort((a,b)=>b.createdAt-a.createdAt).map(q=>(
              <div key={q.id} style={{background:`${C}06`,border:`1px solid ${C}20`,borderRadius:'14px',padding:'18px'}}>
                <div style={{fontSize:'28px',color:`${C}30`,lineHeight:1,marginBottom:'8px'}}>"</div>
                <p style={{color:'white',fontSize:'15px',lineHeight:'1.7',marginBottom:'10px',fontStyle:'italic'}}>{q.text}</p>
                {q.author&&<p style={{color:C,fontSize:'13px',fontWeight:'500',marginBottom:'8px'}}>— {q.author}</p>}
                {q.tags.length>0&&<div style={{display:'flex',gap:'5px',flexWrap:'wrap',marginBottom:'8px'}}>
                  {q.tags.map(t=><span key={t} style={{fontSize:'10px',padding:'2px 8px',borderRadius:'10px',background:`${C}15`,color:`${C}80`}}>#{t}</span>)}
                </div>}
                <div style={{display:'flex',justifyContent:'flex-end',gap:'6px'}}>
                  <button onClick={()=>{const updated=quotes.map(x=>x.id===q.id?{...x,liked:!x.liked}:x);sv(updated);}} style={{padding:'5px 10px',borderRadius:'8px',background:q.liked?'#ef444415':'transparent',border:`1px solid ${q.liked?'#ef4444':'#374151'}`,color:q.liked?'#f87171':'#6b7280',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',fontSize:'12px',fontFamily:'Inter'}}>
                    <Heart size={12} fill={q.liked?'#f87171':'none'}/> {q.liked?'Liked':'Like'}
                  </button>
                  <button onClick={()=>navigator.clipboard.writeText('"'+q.text+'"'+(q.author?' — '+q.author:''))} style={{padding:'5px 10px',borderRadius:'8px',background:'transparent',border:'1px solid #374151',color:'#6b7280',cursor:'pointer',display:'flex',alignItems:'center',gap:'4px',fontSize:'12px',fontFamily:'Inter'}}>
                    <Share2 size={12}/> Copy
                  </button>
                  <button onClick={()=>sv(quotes.filter(x=>x.id!==q.id))} style={{padding:'5px',borderRadius:'6px',background:'transparent',border:'none',cursor:'pointer',color:'#374151'}}><Trash2 size={13}/></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showAdd&&(
        <div style={{position:'fixed',inset:0,background:'#00000080',zIndex:50,display:'flex',alignItems:'flex-end'}} onClick={e=>e.target===e.currentTarget&&setShowAdd(false)}>
          <div style={{width:'100%',background:'#100a00',borderRadius:'20px 20px 0 0',border:`1px solid ${C}20`,padding:'24px',maxHeight:'80vh',overflowY:'auto'}}>
            <div style={{width:'36px',height:'3px',background:'#1a1000',borderRadius:'2px',margin:'0 auto 20px'}}/>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:'14px'}}>
              <h3 style={{color:'white',fontSize:'16px',fontWeight:'700',fontFamily:'Inter'}}>Add Quote</h3>
              <button onClick={()=>setShowAdd(false)} style={{background:'none',border:'none',cursor:'pointer',color:`${C}60`}}><X size={16}/></button>
            </div>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              <textarea value={text} onChange={e=>setText(e.target.value)} placeholder="Enter the quote..." rows={4} style={{...inp,resize:'none',lineHeight:'1.6'}} autoFocus/>
              <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author (optional)" style={inp}/>
              <div style={{display:'flex',gap:'8px',flexWrap:'wrap',alignItems:'center'}}>
                {tags.map(t=><span key={t} style={{padding:'3px 10px',borderRadius:'20px',background:`${C}15`,border:`1px solid ${C}30`,color:C,fontSize:'12px',display:'flex',alignItems:'center',gap:'5px'}}>
                  #{t}<button onClick={()=>setTags(tags.filter(x=>x!==t))} style={{background:'none',border:'none',cursor:'pointer',color:C,fontSize:'14px',lineHeight:1}}>×</button>
                </span>)}
                <input value={tagInput} onChange={e=>setTagInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&tagInput.trim()){setTags([...tags,tagInput.trim()]);setTagInput('');}}}
                  placeholder="+ tag (Enter)" style={{background:'transparent',border:'none',outline:'none',color:C,fontSize:'13px',width:'100px',fontFamily:'Inter'}}/>
              </div>
              <button onClick={add} disabled={!text.trim()} style={{padding:'14px',borderRadius:'12px',background:!text.trim()?'#1a1000':C,border:'none',color:'white',fontSize:'15px',fontWeight:'700',cursor:!text.trim()?'not-allowed':'pointer',fontFamily:'Inter',opacity:!text.trim()?0.5:1}}>Save Quote</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}