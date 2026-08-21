function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080C1A]">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        
        <div>
          <p className="text-sm font-semibold tracking-widest text-white">
            ASTITVA
          </p>

          <p className="mt-1 text-xs text-slate-500">
            Your Creation. Your Proof. Forever Yours.
          </p>
        </div>

        <p className="text-xs text-slate-600">
          Built for creators who want proof.
        </p>
      </div>
    </footer>
  );
}

export default Footer;