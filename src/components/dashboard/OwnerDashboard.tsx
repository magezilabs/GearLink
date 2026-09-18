"use client";

import React, { useState } from "react";
import { LayoutGrid, ClipboardList, TrendingUp, Star, Plus, CheckCircle2, X, LogOut, Clock, Phone, MapPin, Calendar } from "lucide-react";
import { CATEGORIES, catByName, money } from "@/lib/equipment-data";
import { StatTile, PageHeader } from "@/components/ui/gear-primitives";
import type { EquipmentItem, BookingRequest } from "@/lib/types";

interface Props {
  equipmentList: EquipmentItem[];
  onAddEquipment: (e:EquipmentItem) => void;
  bookingRequests?: BookingRequest[];
  onSignOut?: () => void;
}

export function OwnerDashboard({ equipmentList, onAddEquipment, bookingRequests=[], onSignOut }: Props) {
  const [tab, setTab]                 = useState("listings");
  const [showModal, setShowModal]     = useState(false);
  const [successMsg, setSuccessMsg]   = useState("");
  const [eqName, setEqName]           = useState("");
  const [eqCat, setEqCat]             = useState("Agriculture");
  const [eqLoc, setEqLoc]             = useState("Fort Portal");
  const [eqPrice, setEqPrice]         = useState<number|string>(150000);
  const [eqDesc, setEqDesc]           = useState("");
  const [preview, setPreview]         = useState<string|null>(null);

  // Booking request actions
  const [requests, setRequests]       = useState<BookingRequest[]>(bookingRequests);
  React.useEffect(() => { setRequests(bookingRequests); }, [bookingRequests]);

  const approveRequest = (id:string) => setRequests(prev=>prev.map(r=>r.id===id?{...r,status:"Approved"}:r));
  const rejectRequest  = (id:string) => setRequests(prev=>prev.map(r=>r.id===id?{...r,status:"Rejected"}:r));

  const handleImg = (e:React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if(f){ const r=new FileReader(); r.onloadend=()=>setPreview(r.result as string); r.readAsDataURL(f); }
  };

  const handleCreate = (e:React.FormEvent) => {
    e.preventDefault();
    if(!eqName) return;
    onAddEquipment({ id:Date.now(), name:eqName, cat:eqCat, loc:eqLoc||"Fort Portal", price:Number(eqPrice)||150000, owner:"Sekajigo Equipment Ltd", rating:5.0, reviews:0, status:"Available" });
    setShowModal(false);
    setSuccessMsg(`"${eqName}" published to the GearLink Marketplace!`);
    setEqName(""); setEqLoc("Fort Portal"); setEqPrice(150000); setEqDesc(""); setPreview(null);
    setTimeout(()=>setSuccessMsg(""), 5000);
  };

  const TABS = [["listings","My Listings"],["requests",`Booking Requests${requests.length>0?` (${requests.length})`:""}` ],["earnings","Earnings"]];

  return (
    <div className="animate-fade-up">
      <PageHeader eyebrow="Owner Dashboard" title="Manage Your Equipment"
        subtitle="Sekajigo Equipment Ltd · Fort Portal"
        action={
          <div className="flex items-center gap-3">
            <button onClick={()=>setShowModal(true)}
              className="btn-primary flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold">
              <Plus size={16} />
              List New Equipment
            </button>
            <button onClick={onSignOut}
              className="btn-secondary flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all">
              <LogOut size={15}/> Sign Out
            </button>
          </div>
        }/>

      {successMsg && (
        <div className="mb-6 p-4 rounded-xl flex items-center justify-between text-sm font-semibold animate-slide-right professional-badge"
          style={{ background:"rgba(16,185,129,0.1)", border:"1px solid rgba(16,185,129,0.2)", color:"#059669" }}>
          <div className="flex items-center gap-2"><CheckCircle2 size={17} style={{ color:"#10B981" }}/>{successMsg}</div>
          <button onClick={()=>setSuccessMsg("")}><X size={15}/></button>
        </div>
      )}

      {/* Stats */}
      <div className="flex gap-4 mb-7 flex-wrap stagger">
        <StatTile label="Active Listings" value={equipmentList.length.toString()} icon={LayoutGrid} variant="premium"/>
        <StatTile label="Booking Requests" value={requests.length.toString()} icon={ClipboardList} accent="var(--c-a)" trend={requests.length>0?"+"+requests.length:undefined} variant="gradient"/>
        <StatTile label="Earnings This Month" value="UGX 1.4M" icon={TrendingUp} accent="var(--c-ok)" variant="premium"/>
        <StatTile label="Average Rating" value="4.7" icon={Star} accent="var(--c-warn)" variant="gradient"/>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 p-1.5 rounded-xl w-fit executive-card">
        {TABS.map(([k,l])=>(
          <button key={k} onClick={()=>setTab(k)}
            className="gl-body px-6 py-3 rounded-lg text-sm font-semibold transition-all"
            style={{
              background: tab===k ? "linear-gradient(135deg, #FF6B35 0%, #E85520 100%)" : "transparent",
              color: tab===k ? "#FFFFFF" : "#6B7280",
              boxShadow: tab===k ? "0 2px 8px rgba(255,107,53,0.2)" : "none",
              transform: tab===k ? "translateY(-1px)" : "none",
            }}>
            {l}
          </button>
        ))}
      </div>

      {/* Listings */}
      {tab==="listings" && (
        <div className="executive-card overflow-hidden">
          {equipmentList.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background:"rgba(255,107,53,0.1)", border:"1px solid rgba(255,107,53,0.2)" }}>
                <LayoutGrid size={28} style={{ color:"var(--c-p)" }}/>
              </div>
              <h3 className="gl-heading text-heading-lg mb-2 gradient-text">No equipment listed yet</h3>
              <p className="text-body-md text-gray-500 mb-4">Start earning by adding your first piece of equipment to the marketplace.</p>
              <button onClick={()=>setShowModal(true)} className="btn-primary px-6 py-3 rounded-xl text-sm font-semibold">
                <Plus size={16} className="mr-2"/>
                List Your First Equipment
              </button>
            </div>
          ) : (
            equipmentList.map((e,i)=>{
              const c=catByName(e.cat);
              return (
                <div key={e.id} className="flex items-center justify-between px-6 py-5 transition-all hover:bg-gray-50"
                  style={{ borderTop: i?"1px solid #F3F4F6":"none" }}>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background:c.color+"15", border: `1px solid ${c.color}30` }}>
                      <c.icon size={20} style={{ color:c.color }}/>
                    </div>
                    <div>
                      <div className="gl-heading text-heading-sm font-semibold mb-1" style={{ color:"#111827" }}>{e.name}</div>
                      <div className="text-body-sm text-gray-500">{money(e.price)}/day · {e.loc}</div>
                    </div>
                  </div>
                  <span className={`professional-badge text-xs font-semibold ${e.status==="Available" ? "badge-available" : "badge-booked"}`}>
                    {e.status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Booking requests */}
      {tab==="requests" && (
        <div>
          {requests.length===0 ? (
            <div className="executive-card p-12 text-center">
              <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                style={{ background:"rgba(255,107,53,0.1)", border:"1px solid rgba(255,107,53,0.2)" }}>
                <ClipboardList size={28} style={{ color:"var(--c-p)" }}/>
              </div>
              <h3 className="gl-heading text-heading-lg mb-2 gradient-text">No booking requests yet</h3>
              <p className="text-body-md text-gray-500">When renters book your equipment it will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {requests.map(req=>(
                <div key={req.id} className="executive-card overflow-hidden">
                  {/* Request header */}
                  <div className="flex items-center justify-between px-6 py-4"
                    style={{ 
                      background: req.status==="Pending" ? "rgba(245,158,11,0.08)" 
                                : req.status==="Approved" ? "rgba(16,185,129,0.08)" 
                                : "rgba(239,68,68,0.08)",
                      borderBottom:"1px solid #F3F4F6" 
                    }}>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white text-sm"
                        style={{ background:"linear-gradient(135deg,#FF6B35,#E85520)" }}>
                        {req.renterName.charAt(0)}
                      </div>
                      <div>
                        <div className="gl-heading text-heading-sm font-semibold mb-1" style={{ color:"#111827" }}>{req.renterName}</div>
                        <div className="text-body-sm text-gray-500">{req.renterPhone}</div>
                      </div>
                    </div>
                    <span className={`professional-badge text-xs font-semibold ${
                      req.status==="Pending" ? "badge-maintenance" 
                      : req.status==="Approved" ? "badge-available" 
                      : "badge-booked"
                    }`}>
                      {req.status}
                    </span>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Equipment */}
                    <div className="flex items-center gap-2 text-sm">
                      <LayoutGrid size={16} style={{ color:"var(--c-p)" }}/>
                      <span className="gl-heading font-semibold text-gray-900">{req.equipmentName}</span>
                      <span className="text-gray-400">·</span>
                      <span className="gl-heading font-bold gradient-text">{money(req.totalAmount)}</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="minimal-card p-4">
                        <div className="section-label mb-2 flex items-center gap-1"><Calendar size={12}/> Rental Days</div>
                        <div className="gl-heading text-heading-sm font-semibold text-gray-900">{req.rentalDays} days</div>
                      </div>
                      <div className="minimal-card p-4">
                        <div className="section-label mb-2 flex items-center gap-1"><MapPin size={12}/> Delivery Site</div>
                        <div className="text-body-sm font-medium text-gray-900 truncate">{req.siteAddress}</div>
                      </div>
                      <div className="minimal-card p-4">
                        <div className="section-label mb-2 flex items-center gap-1"><Clock size={12}/> Submitted</div>
                        <div className="text-body-sm font-medium text-gray-900">{req.submittedAt}</div>
                      </div>
                    </div>

                    <div className="minimal-card p-4">
                      <div className="section-label mb-2">Stated Purpose</div>
                      <div className="text-body-md text-gray-700">{req.purpose}</div>
                    </div>

                    {/* Actions */}
                    {req.status==="Pending" && (
                      <div className="flex gap-3">
                        <button onClick={()=>approveRequest(req.id)}
                          className="btn-primary flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold">
                          <CheckCircle2 size={16}/> Approve Booking
                        </button>
                        <button onClick={()=>rejectRequest(req.id)}
                          className="btn-outline flex-1 flex items-center justify-center gap-2 py-3 text-sm font-semibold">
                          <X size={16}/> Decline
                        </button>
                      </div>
                    )}
                    {req.status==="Approved" && (
                      <div className="flex items-center gap-3 p-4 rounded-xl professional-badge badge-available">
                        <CheckCircle2 size={16}/>
                        <span className="text-sm font-medium">Booking approved. Escrow funds will release on delivery.</span>
                      </div>
                    )}
                    {req.status==="Rejected" && (
                      <div className="flex items-center gap-3 p-4 rounded-xl professional-badge badge-booked">
                        <X size={16}/>
                        <span className="text-sm font-medium">Booking declined. Renter has been notified.</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {tab==="earnings" && (
        <div className="executive-card p-12 text-center">
          <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
            style={{ background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.2)" }}>
            <TrendingUp size={28} style={{ color:"#D97706" }}/>
          </div>
          <h3 className="gl-heading text-heading-lg mb-2 gradient-text-warm">Earnings breakdown</h3>
          <p className="text-body-md text-gray-500">Coming soon — full revenue analytics.</p>
        </div>
      )}

      {/* Add Equipment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="executive-card w-full max-w-lg my-8 overflow-hidden animate-scale-in">
            <div className="flex justify-between items-center p-6 pb-4"
              style={{ background:"linear-gradient(145deg,#1F2937,#111827)" }}>
              <div>
                <h3 className="gl-heading text-heading-lg font-bold text-white mb-1">List New Equipment</h3>
                <p className="text-body-sm text-gray-400">Share your machinery on GearLink</p>
              </div>
              <button onClick={()=>setShowModal(false)}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                style={{ background:"rgba(255,255,255,0.1)", color:"rgba(255,255,255,0.7)" }}>
                <X size={20}/>
              </button>
            </div>

            <form onSubmit={handleCreate} className="p-6 space-y-5">
              {/* Photo upload */}
              <div className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer relative transition-all hover:border-orange-300"
                style={{ borderColor:"#E5E7EB", background:"#FAFBFF" }}>
                <input type="file" accept="image/*" onChange={handleImg}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"/>
                {preview ? (
                  <div className="flex flex-col items-center">
                    <img src={preview} alt="preview" className="h-32 object-cover rounded-xl mb-3 shadow-md"/>
                    <span className="text-body-sm font-medium flex items-center gap-2 text-green-600">
                      <CheckCircle2 size={14}/> Photo uploaded. Click to change.
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-2"
                      style={{ background:"rgba(255,107,53,0.1)" }}>
                      <Plus size={26} style={{ color:"var(--c-p)" }}/>
                    </div>
                    <span className="gl-heading text-heading-sm font-semibold text-gray-900">Click to upload photo</span>
                    <span className="text-body-sm text-gray-500">PNG, JPG, WEBP (Max 5MB)</span>
                  </div>
                )}
              </div>

              <div className="form-field">
                <label className="form-label">Equipment Name *</label>
                <input type="text" required placeholder="e.g. John Deere 5075E Tractor" value={eqName}
                  onChange={e=>setEqName(e.target.value)}/>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="form-field">
                  <label className="form-label">Sector *</label>
                  <select value={eqCat} onChange={e=>setEqCat(e.target.value)}>
                    {CATEGORIES.map(c=><option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div className="form-field">
                  <label className="form-label">District *</label>
                  <select value={eqLoc} onChange={e=>setEqLoc(e.target.value)}>
                    {["Fort Portal","Kabarole","Kasese","Kyenjojo","Bundibugyo","Kamwenge"].map(d=><option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Daily Rate (UGX) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-4 text-sm font-semibold text-gray-500">UGX</span>
                  <input type="number" required min="10000" step="5000" placeholder="150000" value={eqPrice}
                    onChange={e=>setEqPrice(e.target.value)}
                    className="pl-16 font-semibold"/>
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Description & Specs</label>
                <textarea rows={3} placeholder="Excellent condition, serviced weekly. Operator available on request."
                  value={eqDesc} onChange={e=>setEqDesc(e.target.value)}
                  className="resize-none"/>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={()=>setShowModal(false)}
                  className="btn-secondary flex-1 py-3 text-sm font-semibold">
                  Cancel
                </button>
                <button type="submit"
                  className="btn-primary flex-[2] py-3 text-sm font-semibold">
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
