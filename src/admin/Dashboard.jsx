import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// ── helpers ───────────────────────────────────────────────────────────────────

// Normalise community field: Firestore may return array OR map {0:..,1:..,2:..}
function normaliseCommunity(raw) {
  if (!raw) return ["", "", ""];
  if (Array.isArray(raw)) return [...raw, "", "", ""].slice(0, 3);
  // Firestore turned array into map when dot-notation was used
  return [raw["0"] ?? raw[0] ?? "", raw["1"] ?? raw[1] ?? "", raw["2"] ?? raw[2] ?? ""];
}

// Compress + convert to WebP before upload — fixes slow loading
async function compressImage(file, maxWidth = 1200, quality = 0.82) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const ratio = Math.min(maxWidth / img.width, 1);
      const canvas = document.createElement("canvas");
      canvas.width  = Math.round(img.width  * ratio);
      canvas.height = Math.round(img.height * ratio);
      canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
      canvas.toBlob(
        (blob) => resolve(blob ?? file), // fallback to original if toBlob fails
        "image/webp",
        quality,
      );
    };
    img.onerror = () => resolve(file); // fallback
    img.src = URL.createObjectURL(file);
  });
}

async function uploadImage(file, path) {
  const compressed = await compressImage(file);
  const uniquePath = `${path}_${Date.now()}.webp`;
  const storageRef = ref(storage, uniquePath);
  await uploadBytes(storageRef, compressed, { contentType: "image/webp" });
  return getDownloadURL(storageRef);
}

// ── tiny UI components ────────────────────────────────────────────────────────

const Section = ({ title, icon, children }) => (
  <div className="mb-8 rounded-2xl bg-white border border-gray-100 shadow-sm overflow-hidden">
    <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
      <span className="text-xl">{icon}</span>
      <h2 className="font-semibold text-gray-800 text-sm tracking-wide uppercase">{title}</h2>
    </div>
    <div className="px-6 py-5">{children}</div>
  </div>
);

const Field = ({ label, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{label}</label>
    {children}
  </div>
);

const Input = (props) => (
  <input
    {...props}
    className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm
      text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:bg-white
      focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all ${props.className ?? ""}`}
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm
      text-gray-800 focus:border-orange-400 focus:bg-white focus:outline-none
      focus:ring-2 focus:ring-orange-100 transition-all"
  >
    {children}
  </select>
);

const Btn = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-200",
    ghost:   "bg-gray-100 text-gray-600 hover:bg-gray-200",
    danger:  "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-green-500 text-white hover:bg-green-600",
  };
  return <button {...props} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

const Toast = ({ msg, type }) =>
  msg ? (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-5 py-3
      text-sm font-medium shadow-lg ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}>
      {type === "success" ? "✓" : "✕"} {msg}
    </div>
  ) : null;

// ImageTile — shows blur placeholder while loading, no "newFile" state needed
// (images auto-upload on select, so we only need currentUrl + uploading state)
const ImageTile = ({ label, currentUrl, uploading, onFileChange, onRemove }) => {
  const [loaded, setLoaded] = useState(false);

  // Reset loaded when URL changes
  useEffect(() => setLoaded(false), [currentUrl]);

  return (
    <div>
      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">
        {label}
      </label>

      {uploading ? (
        <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-4 animate-pulse">
          <div className="h-14 w-20 rounded-md bg-orange-100" />
          <span className="text-sm text-orange-500 font-medium">Uploading & compressing…</span>
        </div>
      ) : currentUrl ? (
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
          {/* Blur placeholder until image loads */}
          <div className="relative h-14 w-20 rounded-md overflow-hidden bg-gray-200 flex-shrink-0">
            <img
              src={currentUrl}
              alt=""
              loading="lazy"
              onLoad={() => setLoaded(true)}
              className={`h-full w-full object-cover transition-all duration-500
                ${loaded ? "blur-0 scale-100" : "blur-sm scale-105"}`}
            />
          </div>
          <span className="text-xs text-gray-400 flex-1">Current image</span>
          <Btn variant="danger" className="py-1 px-3 text-xs" onClick={onRemove}>
            Remove
          </Btn>
        </div>
      ) : (
        <label className="flex items-center gap-3 rounded-lg border-2 border-dashed
          border-gray-200 bg-gray-50 p-4 cursor-pointer hover:border-orange-300
          hover:bg-orange-50 transition-all">
          <span className="text-2xl">🖼️</span>
          <span className="text-sm text-gray-400">Click to upload image</span>
          <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
        </label>
      )}
    </div>
  );
};

// ── main component ────────────────────────────────────────────────────────────
export default function Dashboard() {
  // ── state ─────────────────────────────────────────────────────────────────
  const [currentHeroUrl,      setCurrentHeroUrl]      = useState("");
  const [currentFounderUrl,   setCurrentFounderUrl]   = useState("");
  const [currentCommunityUrls,setCurrentCommunityUrls]= useState(["","",""]);

  // Per-image uploading flags so each tile shows its own spinner
  const [uploadingHero,    setUploadingHero]    = useState(false);
  const [uploadingFounder, setUploadingFounder] = useState(false);
  const [uploadingComm,    setUploadingComm]    = useState([false, false, false]);

  const [date,     setDate]     = useState("");
  const [hour,     setHour]     = useState("");
  const [minute,   setMinute]   = useState("00");
  const [period,   setPeriod]   = useState("AM");
  const [location, setLocation] = useState("");
  const [entry,    setEntry]    = useState("Free");

  const [name,  setName]  = useState("");
  const [quote, setQuote] = useState("");
  const [role,  setRole]  = useState("");
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);

  const [whatsapp,          setWhatsapp]          = useState("");
  const [instagram,         setInstagram]         = useState("");
  const [members,           setMembers]           = useState("1000+");
  const [meetups,           setMeetups]           = useState("10+");
  const [registrationLink,  setRegistrationLink]  = useState("");
  const [savingLinks,       setSavingLinks]       = useState(false);

  const [toast, setToast] = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  // ── Firestore listeners ───────────────────────────────────────────────────
  useEffect(() => {
    const unsubMain = onSnapshot(doc(db, "content", "main"), (snap) => {
      const d = snap.data();
      if (!d) return;
      setWhatsapp(d.links?.whatsapp ?? "");
      setInstagram(d.links?.instagram ?? "");
      setRegistrationLink(d.registrationLink ?? "");
      setMembers(d.stats?.members ?? "1000+");
      setMeetups(d.stats?.meetups ?? "10+");
      setCurrentHeroUrl(d.images?.hero ?? "");
      setCurrentFounderUrl(d.images?.founder ?? "");
      // ✅ normalise: handles both array AND map (Firestore dot-notation side-effect)
      setCurrentCommunityUrls(normaliseCommunity(d.images?.community));
      if (d.event) {
        setDate(d.event.date ?? "");
        setHour(String(d.event.time?.hour ?? ""));
        setMinute(String(d.event.time?.minute ?? "00").padStart(2, "0"));
        setPeriod(d.event.time?.period ?? "AM");
        setLocation(d.event.location ?? "");
        setEntry(d.event.entry ?? "Free");
      } else {
        setDate(""); setHour(""); setMinute("00");
        setPeriod("AM"); setLocation(""); setEntry("Free");
      }
    });

    const unsubTest = onSnapshot(collection(db, "testimonials"), (snap) => {
      setTestimonials(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => { unsubMain(); unsubTest(); };
  }, []);

  // ── Event handlers ────────────────────────────────────────────────────────
  const handleSaveEvent = async () => {
    await setDoc(
      doc(db, "content", "main"),
      { event: { date, entry, location, time: { hour: Number(hour), minute: Number(minute), period } } },
      { merge: true },
    );
    showToast("Event saved!");
  };

  const handleDeleteEvent = async () => {
    if (!window.confirm("Remove this event? It will hide event sections from the website.")) return;
    await setDoc(doc(db, "content", "main"), { event: null }, { merge: true });
    showToast("Event removed from website!");
  };

  // ── Image upload — each image independent, no race condition ─────────────
  //
  // KEY FIX: community images write the FULL array (not dot notation index)
  // Dot notation like "images.community.0" converts the Firestore array to a
  // map object {0:.., 1:.., 2:..} which breaks Array.isArray() and iteration.
  //
  const handleUploadHero = async (file) => {
    if (!file) return;
    setUploadingHero(true);
    try {
      const url = await uploadImage(file, "images/hero");
      await updateDoc(doc(db, "content", "main"), { "images.hero": url });
      setCurrentHeroUrl(url);
      showToast("Hero image updated! ✓");
    } catch { showToast("Upload failed!", "error"); }
    finally { setUploadingHero(false); }
  };

  const handleUploadFounder = async (file) => {
    if (!file) return;
    setUploadingFounder(true);
    try {
      const url = await uploadImage(file, "images/founder");
      await updateDoc(doc(db, "content", "main"), { "images.founder": url });
      setCurrentFounderUrl(url);
      showToast("Founder image updated! ✓");
    } catch { showToast("Upload failed!", "error"); }
    finally { setUploadingFounder(false); }
  };

  const handleUploadCommunity = async (file, i) => {
    if (!file) return;
    setUploadingComm((prev) => { const u = [...prev]; u[i] = true; return u; });
    try {
      const url = await uploadImage(file, `images/community_${i}`);
      // ✅ Write full array — never use dot notation for array index
      const updated = [...currentCommunityUrls];
      updated[i] = url;
      await updateDoc(doc(db, "content", "main"), { "images.community": updated });
      setCurrentCommunityUrls(updated);
      showToast(`Community image ${i + 1} updated! ✓`);
    } catch { showToast("Upload failed!", "error"); }
    finally { setUploadingComm((prev) => { const u = [...prev]; u[i] = false; return u; }); }
  };

  // ── Remove handlers ───────────────────────────────────────────────────────
  const handleRemoveHero = async () => {
    setCurrentHeroUrl("");
    await updateDoc(doc(db, "content", "main"), { "images.hero": "" });
    showToast("Hero image removed!");
  };

  const handleRemoveFounder = async () => {
    setCurrentFounderUrl("");
    await updateDoc(doc(db, "content", "main"), { "images.founder": "" });
    showToast("Founder image removed!");
  };

  const handleRemoveCommunity = async (i) => {
    // ✅ Write full array — keeps other community images intact
    const updated = [...currentCommunityUrls];
    updated[i] = "";
    setCurrentCommunityUrls(updated);
    await updateDoc(doc(db, "content", "main"), { "images.community": updated });
    showToast(`Community image ${i + 1} removed!`);
  };

  // ── Links & Stats ─────────────────────────────────────────────────────────
  const handleSaveLinks = async () => {
    setSavingLinks(true);
    try {
      await setDoc(
        doc(db, "content", "main"),
        { links: { whatsapp, instagram }, stats: { members, meetups }, registrationLink },
        { merge: true },
      );
      showToast("Links & stats saved!");
    } catch { showToast("Something went wrong!", "error"); }
    finally { setSavingLinks(false); }
  };

  // ── Testimonials ──────────────────────────────────────────────────────────
  const handleAddTestimonial = async () => {
    if (!name || !quote || !role) { showToast("Fill all fields!", "error"); return; }
    if (editId) {
      await updateDoc(doc(db, "testimonials", editId), { name, quote, role });
      setEditId(null);
      showToast("Testimonial updated!");
    } else {
      await addDoc(collection(db, "testimonials"), { name, quote, role, createdAt: new Date() });
      showToast("Testimonial added!");
    }
    setName(""); setQuote(""); setRole("");
  };

  const handleDeleteTestimonial = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    await deleteDoc(doc(db, "testimonials", id));
    showToast("Testimonial deleted!");
  };

  const cancelEdit = () => { setEditId(null); setName(""); setQuote(""); setRole(""); };

  // ── render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-bold text-sm">FR</div>
            <div>
              <p className="text-sm font-bold text-gray-900">Founders Roof</p>
              <p className="text-xs text-gray-400">Admin Dashboard</p>
            </div>
          </div>
          <Btn variant="ghost" onClick={() => signOut(auth)}>🚪 Logout</Btn>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">

        {/* ── Event ── */}
        <Section title="Upcoming Event" icon="📅">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Date">
              <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
            <Field label="Location">
              <Input placeholder="e.g. Vijayawada" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Field>
            <Field label="Time">
              <div className="flex gap-2">
                <Input type="number" placeholder="Hour" value={hour}
                  onChange={(e) => setHour(e.target.value)} className="w-20" />
                <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
                  {["00","15","30","45"].map((m) => <option key={m}>{m}</option>)}
                </Select>
                <Select value={period} onChange={(e) => setPeriod(e.target.value)}>
                  <option>AM</option><option>PM</option>
                </Select>
              </div>
            </Field>
            <Field label="Entry Type">
              <Select value={entry} onChange={(e) => setEntry(e.target.value)}>
                <option value="Free">Free</option>
                <option value="Paid">Paid</option>
              </Select>
            </Field>
          </div>
          <div className="mt-5 flex justify-between items-center">
            {date && (
              <Btn variant="danger" onClick={handleDeleteEvent}>🗑️ Delete Event</Btn>
            )}
            <div className="ml-auto">
              <Btn onClick={handleSaveEvent}>💾 Save Event</Btn>
            </div>
          </div>
        </Section>

        {/* ── Links, Stats & Images ── */}
        <Section title="Links, Stats & Images" icon="🔗">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Field label="WhatsApp Group Link">
              <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="https://chat.whatsapp.com/..." />
            </Field>
            <Field label="Instagram Profile Link">
              <Input value={instagram} onChange={(e) => setInstagram(e.target.value)}
                placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Registration Form Link">
              <Input value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)}
                placeholder="https://forms.google.com/..." />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Members Stat">
                <Input value={members} onChange={(e) => setMembers(e.target.value)} placeholder="1000+" />
              </Field>
              <Field label="Meetups Stat">
                <Input value={meetups} onChange={(e) => setMeetups(e.target.value)} placeholder="10+" />
              </Field>
            </div>
          </div>

          {/* Images — auto-upload on select */}
          <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageTile
              label="Hero Image"
              currentUrl={currentHeroUrl}
              uploading={uploadingHero}
              onFileChange={(e) => handleUploadHero(e.target.files[0])}
              onRemove={handleRemoveHero}
            />
            <ImageTile
              label="Founder Image"
              currentUrl={currentFounderUrl}
              uploading={uploadingFounder}
              onFileChange={(e) => handleUploadFounder(e.target.files[0])}
              onRemove={handleRemoveFounder}
            />
            {[0, 1, 2].map((i) => (
              <ImageTile
                key={i}
                label={`Community Image ${i + 1}`}
                currentUrl={currentCommunityUrls[i]}
                uploading={uploadingComm[i]}
                onFileChange={(e) => handleUploadCommunity(e.target.files[0], i)}
                onRemove={() => handleRemoveCommunity(i)}
              />
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4">
            <p className="text-xs text-gray-400">
              💡 Images auto-save and compress on upload. Save below for links & stats only.
            </p>
            <Btn onClick={handleSaveLinks} disabled={savingLinks}>
              {savingLinks ? "⏳ Saving..." : "💾 Save Links & Stats"}
            </Btn>
          </div>
        </Section>

        {/* ── Testimonials ── */}
        <Section title="Testimonials" icon="💬">
          <div className="rounded-xl bg-gray-50 border border-gray-100 p-4 mb-6">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {editId ? "✏️ Editing Testimonial" : "➕ Add New Testimonial"}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <Field label="Name">
                <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} />
              </Field>
              <Field label="Role">
                <Input placeholder="Founder @ Startup" value={role} onChange={(e) => setRole(e.target.value)} />
              </Field>
            </div>
            <Field label="Quote">
              <textarea
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="What they said about Founders Roof..."
                rows={3}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm
                  text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:outline-none
                  focus:ring-2 focus:ring-orange-100 transition-all resize-none"
              />
            </Field>
            <div className="mt-3 flex gap-2 justify-end">
              {editId && <Btn variant="ghost" onClick={cancelEdit}>Cancel</Btn>}
              <Btn variant={editId ? "success" : "primary"} onClick={handleAddTestimonial}>
                {editId ? "✓ Update" : "+ Add"}
              </Btn>
            </div>
          </div>

          {testimonials.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-6">No testimonials yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {testimonials.map((t) => (
                <div key={t.id}
                  className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:border-orange-200 transition-all">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm flex-shrink-0">
                    {t.name?.[0]?.toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{t.name}</p>
                    <p className="text-xs text-orange-500 mb-1">{t.role}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">"{t.quote}"</p>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Btn variant="ghost" className="py-1 px-2 text-xs"
                      onClick={() => {
                        setEditId(t.id); setName(t.name); setRole(t.role); setQuote(t.quote);
                        window.scrollTo({ top: 0, behavior: "smooth" });
                      }}>✏️</Btn>
                    <Btn variant="danger" className="py-1 px-2 text-xs"
                      onClick={() => handleDeleteTestimonial(t.id)}>🗑️</Btn>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>
      </main>

      <Toast msg={toast.msg} type={toast.type} />
    </div>
  );
}