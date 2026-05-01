import { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";

// ── tiny helpers ──────────────────────────────────────────────────────────────
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
    className={`w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all ${props.className ?? ""}`}
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2.5 text-sm text-gray-800 focus:border-orange-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all"
  >
    {children}
  </select>
);

const Btn = ({ children, variant = "primary", className = "", ...props }) => {
  const base = "inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all disabled:opacity-50 cursor-pointer";
  const variants = {
    primary: "bg-orange-500 text-white hover:bg-orange-600 shadow-sm shadow-orange-200",
    ghost: "bg-gray-100 text-gray-600 hover:bg-gray-200",
    danger: "bg-red-50 text-red-600 hover:bg-red-100",
    success: "bg-green-500 text-white hover:bg-green-600",
  };
  return <button {...props} className={`${base} ${variants[variant]} ${className}`}>{children}</button>;
};

const Toast = ({ msg, type }) =>
  msg ? (
    <div
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium shadow-lg transition-all ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      {type === "success" ? "✓" : "✕"} {msg}
    </div>
  ) : null;

// ── image upload tile ─────────────────────────────────────────────────────────
const ImageTile = ({ label, currentUrl, newFile, onFileChange, onRemoveCurrent, onCancelNew }) => (
  <div>
    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider block mb-2">{label}</label>
    {currentUrl && !newFile ? (
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3">
        <img src={currentUrl} className="h-14 w-20 object-cover rounded-md" alt="" />
        <span className="text-xs text-gray-400 flex-1">Current image</span>
        <Btn variant="danger" className="py-1 px-3 text-xs" onClick={onRemoveCurrent}>Remove</Btn>
      </div>
    ) : newFile ? (
      <div className="flex items-center gap-3 rounded-lg border border-orange-200 bg-orange-50 p-3">
        <img src={URL.createObjectURL(newFile)} className="h-14 w-20 object-cover rounded-md" alt="" />
        <span className="text-xs text-orange-600 flex-1 font-medium">New image selected ✓</span>
        <Btn variant="ghost" className="py-1 px-3 text-xs" onClick={onCancelNew}>Cancel</Btn>
      </div>
    ) : (
      <label className="flex items-center gap-3 rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 p-4 cursor-pointer hover:border-orange-300 hover:bg-orange-50 transition-all">
        <span className="text-2xl">🖼️</span>
        <span className="text-sm text-gray-400">Click to upload image</span>
        <input type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      </label>
    )}
  </div>
);

// ── main component ────────────────────────────────────────────────────────────
export default function Dashboard() {
  const [currentHeroUrl, setCurrentHeroUrl] = useState("");
  const [currentFounderUrl, setCurrentFounderUrl] = useState("");
  const [currentCommunityUrls, setCurrentCommunityUrls] = useState(["", "", ""]);
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("00");
  const [period, setPeriod] = useState("AM");
  const [location, setLocation] = useState("");
  const [entry, setEntry] = useState("Free");
  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [role, setRole] = useState("");
  const [testimonials, setTestimonials] = useState([]);
  const [editId, setEditId] = useState(null);
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [members, setMembers] = useState("1000+");
  const [meetups, setMeetups] = useState("10+");
  const [heroImgFile, setHeroImgFile] = useState(null);
  const [communityImgFiles, setCommunityImgFiles] = useState([null, null, null]);
  const [founderImgFile, setFounderImgFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [registrationLink, setRegistrationLink] = useState("");
  const [toast, setToast] = useState({ msg: "", type: "success" });

  const showToast = (msg, type = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast({ msg: "", type: "success" }), 3000);
  };

  useEffect(() => {
    onSnapshot(doc(db, "content", "main"), (snap) => {
      const d = snap.data();
      if (!d) return;
      setWhatsapp(d.links?.whatsapp ?? "");
      setInstagram(d.links?.instagram ?? "");
      setRegistrationLink(d.registrationLink ?? "");
      setMembers(d.stats?.members ?? "1000+");
      setMeetups(d.stats?.meetups ?? "10+");
      setCurrentHeroUrl(d.images?.hero ?? "");
      setCurrentFounderUrl(d.images?.founder ?? "");
      setCurrentCommunityUrls(d.images?.community ?? ["", "", ""]);
      // pre-fill event fields
      if (d.event) {
        setDate(d.event.date ?? "");
        setHour(String(d.event.time?.hour ?? ""));
        setMinute(String(d.event.time?.minute ?? "00").padStart(2, "0"));
        setPeriod(d.event.time?.period ?? "AM");
        setLocation(d.event.location ?? "");
        setEntry(d.event.entry ?? "Free");
      }
    });
    const unsub = onSnapshot(collection(db, "testimonials"), (snap) => {
      setTestimonials(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return unsub;
  }, []);

  async function uploadImage(file, path) {
    const storageRef = ref(storage, path);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  }

  const handleSave = async () => {
    await setDoc(
      doc(db, "content", "main"),
      { event: { date, entry, location, time: { hour: Number(hour), minute: Number(minute), period } } },
      { merge: true }
    );
    showToast("Event saved successfully!");
  };

  const handleSaveLinks = async () => {
    setUploading(true);
    try {
      let heroUrl = currentHeroUrl;
      let founderUrl = currentFounderUrl;
      if (heroImgFile) heroUrl = await uploadImage(heroImgFile, "images/hero");
      if (founderImgFile) founderUrl = await uploadImage(founderImgFile, "images/founder");
      const communityUrls = await Promise.all(
        communityImgFiles.map((file, i) =>
          file ? uploadImage(file, `images/community_${i}`) : Promise.resolve(currentCommunityUrls[i] || "")
        )
      );
      await setDoc(
        doc(db, "content", "main"),
        { links: { whatsapp, instagram }, stats: { members, meetups }, images: { hero: heroUrl, founder: founderUrl, community: communityUrls }, registrationLink },
        { merge: true }
      );
      setHeroImgFile(null);
      setFounderImgFile(null);
      setCommunityImgFiles([null, null, null]);
      showToast("Links, stats & images saved!");
    } catch {
      showToast("Something went wrong!", "error");
    } finally {
      setUploading(false);
    }
  };

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

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this testimonial?")) return;
    await deleteDoc(doc(db, "testimonials", id));
    showToast("Testimonial deleted!");
  };

  const cancelEdit = () => { setEditId(null); setName(""); setQuote(""); setRole(""); };

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
          <Btn variant="ghost" onClick={() => signOut(auth)}>
            <span>🚪</span> Logout
          </Btn>
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
              <Input type="text" placeholder="e.g. Vizag" value={location} onChange={(e) => setLocation(e.target.value)} />
            </Field>
            <Field label="Time">
              <div className="flex gap-2">
                <Input type="number" placeholder="Hour" value={hour} onChange={(e) => setHour(e.target.value)} className="w-20" />
                <Select value={minute} onChange={(e) => setMinute(e.target.value)}>
                  {["00","15","30","45"].map(m => <option key={m}>{m}</option>)}
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
          <div className="mt-5 flex justify-end">
            <Btn onClick={handleSave}>💾 Save Event</Btn>
          </div>
        </Section>

        {/* ── Links, Stats & Images ── */}
        <Section title="Links, Stats & Images" icon="🔗">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <Field label="WhatsApp Group Link">
              <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="https://chat.whatsapp.com/..." />
            </Field>
            <Field label="Instagram Profile Link">
              <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} placeholder="https://instagram.com/..." />
            </Field>
            <Field label="Registration Form Link">
              <Input value={registrationLink} onChange={(e) => setRegistrationLink(e.target.value)} placeholder="https://forms.google.com/..." />
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

          <div className="border-t border-gray-100 pt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <ImageTile
              label="Hero Image"
              currentUrl={currentHeroUrl}
              newFile={heroImgFile}
              onFileChange={(e) => setHeroImgFile(e.target.files[0])}
              onRemoveCurrent={() => setCurrentHeroUrl("")}
              onCancelNew={() => setHeroImgFile(null)}
            />
            <ImageTile
              label="Founder Image"
              currentUrl={currentFounderUrl}
              newFile={founderImgFile}
              onFileChange={(e) => setFounderImgFile(e.target.files[0])}
              onRemoveCurrent={() => setCurrentFounderUrl("")}
              onCancelNew={() => setFounderImgFile(null)}
            />
            {[0, 1, 2].map((i) => (
              <ImageTile
                key={i}
                label={`Community Image ${i + 1}`}
                currentUrl={currentCommunityUrls[i]}
                newFile={communityImgFiles[i]}
                onFileChange={(e) => {
                  const updated = [...communityImgFiles];
                  updated[i] = e.target.files[0];
                  setCommunityImgFiles(updated);
                }}
                onRemoveCurrent={() => {
                  const updated = [...currentCommunityUrls];
                  updated[i] = "";
                  setCurrentCommunityUrls(updated);
                }}
                onCancelNew={() => {
                  const updated = [...communityImgFiles];
                  updated[i] = null;
                  setCommunityImgFiles(updated);
                }}
              />
            ))}
          </div>

          <div className="mt-5 flex justify-end">
            <Btn onClick={handleSaveLinks} disabled={uploading}>
              {uploading ? "⏳ Saving..." : "💾 Save All"}
            </Btn>
          </div>
        </Section>

        {/* ── Testimonials ── */}
        <Section title="Testimonials" icon="💬">
          {/* Form */}
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
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all resize-none"
              />
            </Field>
            <div className="mt-3 flex gap-2 justify-end">
              {editId && <Btn variant="ghost" onClick={cancelEdit}>Cancel</Btn>}
              <Btn variant={editId ? "success" : "primary"} onClick={handleAddTestimonial}>
                {editId ? "✓ Update" : "+ Add"}
              </Btn>
            </div>
          </div>

          {/* List */}
          {testimonials.length === 0 ? (
            <p className="text-center text-sm text-gray-400 py-6">No testimonials yet.</p>
          ) : (
            <div className="flex flex-col gap-3">
              {testimonials.map((t) => (
                <div key={t.id} className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-4 hover:border-orange-200 transition-all">
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
                      onClick={() => { setEditId(t.id); setName(t.name); setRole(t.role); setQuote(t.quote); window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" }); }}>
                      ✏️
                    </Btn>
                    <Btn variant="danger" className="py-1 px-2 text-xs" onClick={() => handleDelete(t.id)}>🗑️</Btn>
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