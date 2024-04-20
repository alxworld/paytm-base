export default function InputBox({ placeholder, label }) {
  return (
    <div>
      <div className="text-sm text-left py-2">{label}</div>
      <input className="w-full px-2 py-1 border rounded border-slate-200" type="text" placeholder={placeholder} />
    </div>
  )
}
