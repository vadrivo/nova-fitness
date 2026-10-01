import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Check, Menu, X } from 'lucide-react';
import './styles.css';

const images = {
  hero: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2200&q=88',
  training: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1200&q=85',
  strength: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=1200&q=85',
  performance: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=85',
  experience: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1600&q=88'
};

const reveal = { hidden:{opacity:0,y:30}, show:{opacity:1,y:0,transition:{duration:.7,ease:[.22,1,.36,1]}} } as const;

function Reveal({children,className='',delay=0}:{children:React.ReactNode;className?:string;delay?:number}){
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.16}} transition={{delay}}>{children}</motion.div>;
}

function Counter({value,label}:{value:number;label:string}){
  const ref = useMotionValue(0); const spring = useSpring(ref,{duration:1400}); const [display,setDisplay]=useState(0);
  useEffect(()=>{ const u=spring.on('change',v=>setDisplay(Math.round(v))); ref.set(value); return u; },[spring,ref,value]);
  return <div className="stat"><strong>{display}{label.includes('Rating')?'': '+'}</strong><span>{label}</span></div>;
}

function App(){
  const [open,setOpen]=useState(false);
  const [sent,setSent]=useState(false);
  const nav=['Programs','About','Contact'];
  return <div className="site">
    <header className="nav"><a className="logo" href="#top">NOVA<span>®</span></a><nav>{nav.map(n=><a key={n} href={'#'+n.toLowerCase()}>{n}</a>)}</nav><a className="nav-cta" href="#contact">Book a session <ArrowRight size={15}/></a><button className="menu" onClick={()=>setOpen(!open)} aria-label="Toggle menu">{open?<X/>:<Menu/>}</button></header>
    <AnimatePresence>{open&&<motion.div className="mobile-nav" initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}} exit={{height:0,opacity:0}}>{nav.map(n=><a onClick={()=>setOpen(false)} key={n} href={'#'+n.toLowerCase()}>{n}</a>)}<a className="mobile-book" href="#contact" onClick={()=>setOpen(false)}>Book a free session <ArrowRight size={16}/></a></motion.div>}</AnimatePresence>

    <main id="top">
      <section className="hero"><div className="hero-bg" style={{backgroundImage:`url(${images.hero})`}}/><div className="hero-shade"/><div className="hero-content"><motion.div initial={{opacity:0,y:22}} animate={{opacity:1,y:0}} transition={{duration:.65}} className="eyebrow"><i/> PRIVATE FITNESS STUDIO · NAGPUR</motion.div><motion.h1 initial={{opacity:0,y:38}} animate={{opacity:1,y:0}} transition={{duration:.8,delay:.1}}><span>MOVE BETTER.</span><span>FEEL STRONGER.</span></motion.h1><motion.p initial={{opacity:0}} animate={{opacity:1}} transition={{duration:.7,delay:.28}}>Personal training and strength programs designed around you — your goals, your pace, your progress.</motion.p><motion.div className="hero-actions" initial={{opacity:0,y:15}} animate={{opacity:1,y:0}} transition={{duration:.6,delay:.4}}><a className="btn primary" href="#contact">Book a free session <ArrowRight/></a><a className="btn ghost" href="#programs">Explore programs</a></motion.div></div><div className="hero-trust"><span>500+ MEMBERS</span><b/> <span>4.9/5 RATING</span><b/> <span>PERSONAL TRAINING</span></div><a className="scroll" href="#proof">SCROLL TO EXPLORE <span>↓</span></a></section>

      <section className="proof" id="proof"><Reveal><p>TRUSTED BY PEOPLE WHO TAKE THEIR PROGRESS SERIOUSLY.</p></Reveal><div className="stats"><Reveal><Counter value={500} label="Members"/></Reveal><Reveal delay={.08}><Counter value={4.9} label="Rating"/></Reveal><Reveal delay={.16}><Counter value={8} label="Years Experience"/></Reveal><Reveal delay={.24}><div className="stat"><strong>100%</strong><span>Personalized Programs</span></div></Reveal></div></section>

      <section className="value" id="about"><div className="section-intro"><Reveal><div className="kicker">01 / THE APPROACH</div><h2>Your training should fit you.<br/><em>Not the other way around.</em></h2></Reveal><Reveal delay={.1}><p>Generic workouts are easy to start and hard to sustain. NOVA combines thoughtful coaching, structured programming and measurable progress to make training feel purposeful from day one.</p></Reveal></div><div className="benefits">{[['TRAIN WITH PURPOSE','Programs designed around your goals.'],['STAY CONSISTENT','Structured training that keeps you accountable.'],['SEE REAL PROGRESS','Track your strength, fitness and performance.']].map(([title,text],i)=><Reveal key={title} delay={i*.08}><article className="benefit"><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowRight size={20}/></article></Reveal>)}</div></section>

      <section className="programs" id="programs"><Reveal><div className="kicker">02 / PROGRAMS</div><h2>Built around <em>your goals.</em></h2></Reveal><div className="program-grid">{[[images.training,'PERSONAL TRAINING','1-on-1 coaching designed around your goals.','Explore Personal Training →'],[images.strength,'STRENGTH PROGRAM','Build strength, confidence and better movement.','View Program →'],[images.performance,'PERFORMANCE','Train smarter for sport, fitness and everyday life.','Explore Performance →']].map(([img,title,text,cta],i)=><Reveal key={title} delay={i*.1}><article className="program"><div className="program-img"><img src={img} alt=""/><span>0{i+1}</span></div><div className="program-copy"><h3>{title}</h3><p>{text}</p><a href="#contact">{cta}</a></div></article></Reveal>)}</div></section>

      <section className="experience"><div className="experience-img"><img src={images.experience} alt="NOVA training space"/></div><div className="experience-copy"><Reveal><div className="kicker">03 / THE NOVA EXPERIENCE</div><h2>More than a workout.<br/><em>A better way to train.</em></h2><p>Step into a space where every session has a reason. Personal coaching, modern equipment and a plan that evolves with you.</p><ul>{['Personal coaching','Modern equipment','Individual programs','Progress tracking','Supportive environment'].map(x=><li key={x}><Check size={16}/>{x}</li>)}</ul><a className="text-link" href="#contact">DISCOVER NOVA <ArrowRight size={17}/></a></Reveal></div></section>

      <section className="steps"><Reveal><div className="kicker">04 / HOW IT WORKS</div><h2>A simple start.<br/><em>A stronger you.</em></h2></Reveal><div className="step-grid">{[['01','START','Book your free introductory session.'],['02','PLAN','We understand your goals and create your training plan.'],['03','PROGRESS','Train consistently and track your results.']].map(([num,title,text],i)=><Reveal key={num} delay={i*.1}><div className="step"><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div></div></Reveal>)}</div></section>

      <section className="testimonials"><Reveal><div className="kicker">05 / WORD OF MOUTH</div><h2>Progress you can <em>feel.</em></h2></Reveal><div className="quotes">{[['“I finally found a training routine I actually enjoy. The difference has been huge.”','Aarav, Member'],['“The personal attention makes every session feel purposeful.”','Riya, Member'],['“I came in wanting to get stronger. I left with a completely different approach to fitness.”','Kunal, Member']].map(([q,n],i)=><Reveal key={n} delay={i*.1}><blockquote><span>“</span><p>{q}</p><footer>— {n}</footer></blockquote></Reveal>)}</div></section>

      <section className="offer"><div className="offer-inner"><Reveal><div className="kicker">READY TO START?</div><h2>Your first session<br/><em>is on us.</em></h2><p>Book a complimentary introductory session and discover a training plan built around you.</p><a className="btn light" href="#contact">Book my free session <ArrowRight/></a><small>No commitment. Just a conversation about your goals.</small></Reveal></div></section>

      <section className="contact" id="contact"><div className="contact-copy"><Reveal><div className="kicker">06 / LET'S GET STARTED</div><h2>Make your next<br/><em>move count.</em></h2><p>Tell us a little about what you're looking for. We'll take it from there.</p><div className="contact-details"><span>📍 Nagpur, Maharashtra</span><span>📞 +91 00000 00000</span><span>✉ hello@novafitness.example</span></div></Reveal></div><Reveal className="form-wrap" delay={.1}><form onSubmit={e=>{e.preventDefault();setSent(true)}}>{sent?<div className="success"><Check size={28}/><h3>Request received.</h3><p>This demo form is ready to connect to a real booking workflow.</p></div>:<><label>Name<input required placeholder="Your name"/></label><label>Email<input required type="email" placeholder="you@example.com"/></label><label>Phone<input required placeholder="+91"/></label><label>What are you looking for?<textarea required placeholder="Personal training, strength, performance..."/></label><button className="submit" type="submit">Request my session <ArrowRight/></button></>}</form></Reveal></section>
    </main>
    <footer><div><a className="logo" href="#top">NOVA<span>®</span></a><p>Modern Fitness Studio</p></div><div className="footer-links"><a href="#programs">Programs</a><a href="#about">About</a><a href="#contact">Contact</a><a href="#">Instagram</a></div><div className="footer-bottom"><span>© 2026 NOVA. Demo project.</span><a href="https://vadrivo.github.io/">Built by Vadrivo <ArrowRight size={14}/></a></div></footer>
  </div>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App/></StrictMode>);
