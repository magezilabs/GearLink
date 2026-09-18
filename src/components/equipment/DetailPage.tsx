"use client";

import React, { useState } from "react";
import { ArrowLeft, MapPin, Star, ShieldCheck, Clock, User, ChevronRight, Minus, Plus, CheckCircle2, MessageCircle, X } from "lucide-react";
import { catByName, money } from "@/lib/equipment-data";
import { CategoryChip, GearButton } from "@/components/ui/gear-primitives";
import type { EquipmentItem } from "@/lib/types";

interface Props { item: EquipmentItem; setPage:(p:string)=>void; }

const REVIEWS = [
  { name:"Aine Patrick",      role:"Renter", rating:5, comment:"Machine arrived on time and worked perfectly for two days of ploughing. Highly recommend!" },
  { name:"Turyahikayo Grace", role:"Renter", rating:4, comment:"Good condition. Owner communication could be faster but overall great service." },
  { name:"Mugisha Bernard",   role:"Renter", rating:5, comment:"Excellent — came with a skilled certified operator. Very professional." },
];

export function DetailPage({ item, setPage }: Props) {
  const [days, setDays] = useState(3);
  const [showContact, setShowContact] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  if (!item) return null;

  const c = catByName(item.cat);
  const rentalFee = item.price * days;
  const serviceFee = 25000;
  const total = rentalFee + serviceFee;

  return (
    <div className="animate-fade-up max-w-6xl mx-auto">
      {/* Back */}
      <button onClick={()=>setPage("marketplace")}
        className="gl-body inline-flex items-center gap-2 text-sm font-semibold mb-7 transition-colors group"
        style={{ color:"#8892AA" }}>
        <span className="w-8 h-8 rounded-xl border flex items-center justify-center transition-all group-hover:border-orange-400 group-hover:bg-orange-50"
          style={{ background:"#fff", borderColor:"var(--c-border)", boxShadow:"var(--s-xs)" }}>
          <ArrowLeft size={14}/>
        </span>
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
        {/* Left */}
        <div className="space-y-6">
          {/* Hero */}
          <div className="rounded-3xl overflow-hidden relative" style={{ height:280,
            background: item.img3d
              ? `radial-gradient(ellipse at 50% 55%, ${c.color}60 0%, #0B0F1E 85%)`
              : `linear-gradient(145deg, ${c.color}45 0%, #131A35 100%)` }}>
            {item.img3d ? (
              <img src={item.img3d} alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-8"
                style={{ filter:"drop-shadow(0 24px 36px rgba(13,17,23,0.70))", zIndex:2 }}/>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex:2 }}>
                <div className="w-32 h-32 rounded-3xl flex items-center justify-center border"
                  style={{ background:"rgba(255,255,255,0.10)", borderColor:"rgba(255,255,255,0.20)", backdropFilter:"blur(16px)" }}>
                  <c.icon size={60} color="rgba(255,255,255,0.85)"/>
                </div>
              </div>
            )}
            <span className={`absolute top-4 right-4 gl-body text-xs font-extrabold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg`}
              style={{ zIndex:3, background: item.status==="Available" ? "rgba(0,200,150,0.90)" : "rgba(255,77,106,0.90)", color:"#fff" }}>
              <span className={`w-2 h-2 rounded-full bg-white ${item.status==="Available"?"animate-pulse":""}`}/>
              {item.status}
            </span>
          </div>

          {/* Title */}
          <div>
            <CategoryChip name={item.cat} size="md"/>
            <h1 className="gl-display font-extrabold leading-tight mt-3 mb-2"
              style={{ fontSize:"clamp(28px,4vw,40px)", color:"var(--c-ink)" }}>
              {item.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm" style={{ color:"#8892AA" }}>
              <span className="flex items-center gap-1.5">
                <MapPin size={14} style={{ color:"var(--c-p)" }}/>
                <strong style={{ color:"var(--c-ink)" }}>{item.loc}</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <User size={14}/> {item.owner}
              </span>
              <span className="flex items-center gap-1.5">
                <Star size={14} fill="#FF6B35" color="#FF6B35"/>
                <strong style={{ color:"var(--c-ink)" }}>{item.rating}</strong>
                <span>({item.reviews} reviews)</span>
              </span>
            </div>
          </div>

          {/* About */}
          <div className="gl-card p-6">
            <h2 className="gl-display font-bold text-lg mb-3" style={{ color:"var(--c-ink)" }}>About this equipment</h2>
            <p className="gl-body text-sm leading-relaxed" style={{ color:"#5A6275" }}>
              Well-maintained {item.name.toLowerCase()}, serviced before every rental.
              Comes with a certified operator on request for heavy machinery. Fuel billed separately.
              Delivery available within the Rwenzori region for an additional logistics fee.
            </p>
          </div>

          {/* Specs */}
          <div className="gl-card p-6">
            <h2 className="gl-display font-bold text-lg mb-4" style={{ color:"var(--c-ink)" }}>Equipment Details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[["Condition","Excellent"],["Category",item.cat],["Owner",item.owner.split(" ").slice(0,2).join(" ")],["Status",item.status]].map(([k,v])=>(
                <div key={k} className="p-3.5 rounded-2xl" style={{ background:"var(--c-paper)", border:"1px solid var(--c-border)" }}>
                  <div className="section-label mb-1">{k}</div>
                  <div className="gl-body text-[13px] font-semibold" style={{ color:"var(--c-ink)" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon:ShieldCheck, title:"Escrow Protected",  desc:"Funds held until delivery confirmed", color:"var(--c-p)"  },
              { icon:Clock,       title:"24h Response",      desc:"Owner responds within one day",        color:"var(--c-a)"  },
              { icon:CheckCircle2,title:"GearLink Verified", desc:"Equipment inspected & certified",      color:"var(--c-ok)" },
            ].map(({icon:Icon,title,desc,color})=>(
              <div key={title} className="gl-card flex items-start gap-3 p-4">
                <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: color+"15" }}>
                  <Icon size={18} style={{ color }}/>
                </div>
                <div>
                  <div className="gl-body text-xs font-bold" style={{ color:"var(--c-ink)" }}>{title}</div>
                  <div className="text-[11px] mt-0.5 leading-snug" style={{ color:"#8892AA" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="gl-card p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="gl-display font-bold text-lg" style={{ color:"var(--c-ink)" }}>Reviews</h2>
              <div className="flex items-center gap-1.5">
                <Star size={16} fill="#FF6B35" color="#FF6B35"/>
                <span className="gl-body font-bold" style={{ color:"var(--c-ink)" }}>{item.rating}</span>
                <span className="text-sm" style={{ color:"#8892AA" }}>· {item.reviews} reviews</span>
              </div>
            </div>
            <div className="space-y-5">
              {REVIEWS.map(rv=>(
                <div key={rv.name} className="pb-5 last:pb-0" style={{ borderBottom:"1px solid var(--c-border)" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center text-xs font-extrabold text-white"
                        style={{ background:"linear-gradient(135deg,#FF8C60,#FF6B35)" }}>
                        {rv.name.charAt(0)}
                      </div>
                      <div>
                        <div className="gl-body text-sm font-bold" style={{ color:"var(--c-ink)" }}>{rv.name}</div>
                        <div className="text-[11px]" style={{ color:"#8892AA" }}>{rv.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({length:5}).map((_,i)=>(
                        <Star key={i} size={13} fill={i<rv.rating?"#FF6B35":"none"} color={i<rv.rating?"#FF6B35":"#E4E6F0"}/>
                      ))}
                    </div>
                  </div>
                  <p className="gl-body text-sm leading-relaxed" style={{ color:"#5A6275" }}>{rv.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Booking card */}
        <div>
          <div className="sticky top-24 gl-card overflow-hidden">
            {/* Price header */}
            <div className="p-6 pb-5" style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
              <div className="gl-display font-extrabold text-3xl text-white">{money(item.price)}</div>
              <div className="gl-body text-sm mt-0.5" style={{ color:"rgba(255,255,255,0.45)" }}>per day · escrow protected</div>
            </div>

            <div className="p-6 space-y-5">
              {/* Duration */}
              <div>
                <label className="section-label block mb-2">Rental Duration</label>
                <div className="flex items-center gap-4 p-3 rounded-2xl" style={{ background:"var(--c-paper)", border:"1px solid var(--c-border)" }}>
                  <button onClick={()=>setDays(Math.max(1,days-1))}
                    className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-orange-400"
                    style={{ background:"#fff", borderColor:"var(--c-border)", boxShadow:"var(--s-xs)" }}>
                    <Minus size={14}/>
                  </button>
                  <div className="flex-1 text-center">
                    <span className="gl-display font-extrabold text-2xl" style={{ color:"var(--c-ink)" }}>{days}</span>
                    <span className="gl-body text-sm ml-1.5" style={{ color:"#8892AA" }}>{days===1?"day":"days"}</span>
                  </div>
                  <button onClick={()=>setDays(days+1)}
                    className="w-9 h-9 rounded-xl border flex items-center justify-center transition-all hover:border-orange-400"
                    style={{ background:"#fff", borderColor:"var(--c-border)", boxShadow:"var(--s-xs)" }}>
                    <Plus size={14}/>
                  </button>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-2.5 text-sm">
                {[[`${money(item.price)} × ${days} ${days===1?"day":"days"}`, money(rentalFee)],
                  ["Service & insurance fee", money(serviceFee)]].map(([k,v])=>(
                  <div key={k} className="flex justify-between">
                    <span className="gl-body" style={{ color:"#8892AA" }}>{k}</span>
                    <span className="font-semibold" style={{ color:"var(--c-ink)" }}>{v}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold pt-3" style={{ borderTop:"1px solid var(--c-border)", color:"var(--c-ink)", fontSize:16 }}>
                  <span className="gl-body">Total</span>
                  <span className="gl-display text-xl">{money(total)}</span>
                </div>
              </div>

              {/* Escrow note */}
              <div className="flex items-start gap-2.5 p-3.5 rounded-2xl" style={{ background:"rgba(0,200,150,0.08)", border:"1px solid rgba(0,200,150,0.25)" }}>
                <ShieldCheck size={15} style={{ color:"var(--c-ok)", flexShrink:0, marginTop:1 }}/>
                <p className="gl-body text-xs leading-relaxed" style={{ color:"#1A6B50" }}>
                  Full amount held in <strong>GearLink Escrow</strong> — released only after confirmed delivery.
                </p>
              </div>

              <GearButton variant="primary"
                style={{ width:"100%", justifyContent:"center", padding:"14px 20px", fontSize:15, borderRadius:16 }}
                onClick={()=>setPage("booking")}>
                Request Booking <ChevronRight size={16}/>
              </GearButton>

              {/* Contact Owner */}
              <button onClick={()=>setShowContact(true)}
                className="gl-body w-full py-3 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background:"#fff", borderColor:"var(--c-border)", color:"var(--c-ink)" }}
                onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--c-p)";(e.currentTarget as HTMLElement).style.color="var(--c-p)";}}
                onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor="var(--c-border)";(e.currentTarget as HTMLElement).style.color="var(--c-ink)";}}>
                <MessageCircle size={15}/> Contact Owner First
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contact modal */}
      {showContact && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="gl-card w-full max-w-md animate-scale-in overflow-hidden">
            {/* Header */}
            <div className="p-6 pb-5 flex items-center justify-between"
              style={{ background:"linear-gradient(145deg,#1E2744,#0B0F1E)" }}>
              <div>
                <h3 className="gl-display font-bold text-lg text-white">Contact Owner</h3>
                <p className="gl-body text-sm mt-0.5" style={{ color:"rgba(255,255,255,0.50)" }}>
                  Send a message about {item.name}
                </p>
              </div>
              <button onClick={()=>{setShowContact(false);setMessageSent(false);setMessage("");}}
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
                style={{ background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.60)" }}>
                <X size={18}/>
              </button>
            </div>

            <div className="p-6 space-y-5">
              {messageSent ? (
                <div className="py-6 text-center">
                  <div className="w-16 h-16 rounded-3xl mx-auto mb-4 flex items-center justify-center"
                    style={{ background:"rgba(0,200,150,0.12)", border:"1px solid rgba(0,200,150,0.30)" }}>
                    <CheckCircle2 size={32} style={{ color:"var(--c-ok)" }}/>
                  </div>
                  <h4 className="gl-display font-bold text-xl mb-2" style={{ color:"var(--c-ink)" }}>Message Sent!</h4>
                  <p className="gl-body text-sm" style={{ color:"#8892AA" }}>
                    {item.owner} will respond within 24 hours via Mobile Money phone.
                  </p>
                  <div className="mt-4 p-3 rounded-2xl text-left" style={{ background:"var(--c-paper)", border:"1px solid var(--c-border)" }}>
                    <div className="section-label mb-1">Owner Contact</div>
                    <div className="gl-body text-sm font-semibold" style={{ color:"var(--c-ink)" }}>+256 772 *** ***</div>
                    <div className="text-xs mt-0.5" style={{ color:"#8892AA" }}>Available 7am – 8pm EAT</div>
                  </div>
                  <button onClick={()=>{setShowContact(false);setMessageSent(false);setMessage("");}}
                    className="btn-primary mt-5 w-full flex items-center justify-center gap-2 py-3 text-sm">
                    Done
                  </button>
                </div>
              ) : (
                <>
                  {/* Owner info */}
                  <div className="flex items-center gap-3 p-4 rounded-2xl" style={{ background:"var(--c-paper)", border:"1px solid var(--c-border)" }}>
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 font-extrabold text-white text-base"
                      style={{ background:"linear-gradient(135deg,#FF8C60,#FF6B35)" }}>
                      {item.owner.charAt(0)}
                    </div>
                    <div>
                      <div className="gl-body font-bold text-sm" style={{ color:"var(--c-ink)" }}>{item.owner}</div>
                      <div className="text-xs mt-0.5" style={{ color:"#8892AA" }}>{item.loc} · {item.cat}</div>
                      <div className="flex items-center gap-1 mt-1">
                        <Star size={12} fill="#FF6B35" color="#FF6B35"/>
                        <span className="text-xs font-bold" style={{ color:"var(--c-ink)" }}>{item.rating}</span>
                        <span className="text-xs" style={{ color:"#8892AA" }}>({item.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>

                  {/* Quick messages */}
                  <div>
                    <div className="section-label mb-2">Quick messages</div>
                    <div className="space-y-2">
                      {[
                        `Is the ${item.name} available for next week?`,
                        "What is the minimum rental duration?",
                        "Do you include a delivery/operator service?",
                        "Can I inspect the equipment before booking?",
                      ].map(q => (
                        <button key={q} onClick={()=>setMessage(q)}
                          className="gl-body w-full text-left text-xs px-3.5 py-2.5 rounded-xl border transition-all"
                          style={{
                            background: message===q ? "var(--c-p-bg)" : "#fff",
                            borderColor: message===q ? "var(--c-p)" : "var(--c-border)",
                            color: message===q ? "var(--c-p)" : "var(--c-ink)",
                          }}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Custom message */}
                  <div>
                    <div className="section-label mb-2">Or write your own</div>
                    <textarea rows={3} value={message} onChange={e=>setMessage(e.target.value)}
                      placeholder="Type your message to the owner…"
                      className="gl-body w-full px-4 py-3 text-sm rounded-2xl border resize-none focus:outline-none transition-all"
                      style={{ background:"var(--c-paper)", borderColor:"var(--c-border)", color:"var(--c-ink)" }}/>
                  </div>

                  <div className="flex gap-3">
                    <GearButton variant="outline" style={{ flex:1, justifyContent:"center" }}
                      onClick={()=>setShowContact(false)}>
                      Cancel
                    </GearButton>
                    <GearButton variant="primary"
                      style={{ flex:2, justifyContent:"center" }}
                      onClick={()=>{ if(message.trim()) setMessageSent(true); }}>
                      Send Message
                    </GearButton>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
