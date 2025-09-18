import React from 'react'
import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 opacity-50 pointer-events-none">
          <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-blue-200 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-cyan-200 blur-3xl" />
        </div>
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight ">
                Shape your future with secure, simple, and transparent voting
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Cast your vote in minutes. Real-time results, robust security, and a delightful
                experience on any device.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/candidate"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                >
                  Vote Now
                </Link>
                <Link
                  to="/results"
                  className="inline-flex items-center justify-center px-5 py-3 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50 font-medium"
                >
                  View Results
                </Link>
              </div>
              <div className="mt-6 flex items-center gap-6 text-sm text-slate-600">
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-500" />
                  Verified voters only
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Real-time tallying
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="mx-auto max-w-md md:max-w-none">
                <div className="rounded-xl border border-slate-200 shadow-sm bg-white p-4">
                  <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl">🗳️</div>
                      <div className="mt-2 text-slate-700 font-semibold">Secure Digital Ballot</div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 divide-x divide-slate-200 text-center">
                    <div className="py-2">
                      <div className="text-xl font-bold">2k+</div>
                      <div className="text-xs text-slate-500">Registered Voters</div>
                    </div>
                    <div className="py-2">
                      <div className="text-xl font-bold">99.9%</div>
                      <div className="text-xs text-slate-500">Uptime</div>
                    </div>
                    <div className="py-2">
                      <div className="text-xl font-bold"><span className="align-top">~</span>1s</div>
                      <div className="text-xs text-slate-500">Result Latency</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-10 md:py-14">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold">Why choose our platform?</h2>
          <p className="mt-2 text-slate-600">Built for trust, speed, and accessibility.</p>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 hover:shadow-sm transition">
              <div className="text-2xl">🔐</div>
              <h3 className="mt-2 font-semibold">End-to-end Security</h3>
              <p className="mt-1 text-sm text-slate-600">JWT-based auth, role controls, and server-side validation keep votes protected.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 hover:shadow-sm transition">
              <div className="text-2xl">⚡</div>
              <h3 className="mt-2 font-semibold">Real-time Results</h3>
              <p className="mt-1 text-sm text-slate-600">See live vote counts with instant updates after each ballot.</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 hover:shadow-sm transition">
              <div className="text-2xl">🧭</div>
              <h3 className="mt-2 font-semibold">Simple & Accessible</h3>
              <p className="mt-1 text-sm text-slate-600">Works beautifully on mobile and desktop with clean, readable UI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-10 md:py-14 bg-slate-50/60">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold">How it works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-500">Step 1</div>
              <h3 className="mt-1 font-bold">Create or Login</h3>
              <p className="mt-1 text-sm text-slate-600">Sign up or sign in securely to get your verified voter profile.</p>
              <Link to="/signup" className="inline-block mt-3 text-blue-600 hover:underline">Get Started →</Link>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-500">Step 2</div>
              <h3 className="mt-1 font-bold">Choose Candidate</h3>
              <p className="mt-1 text-sm text-slate-600">Browse all candidates, read their details, and cast your vote.</p>
              <Link to="/candidate" className="inline-block mt-3 text-blue-600 hover:underline">See Candidates →</Link>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="text-sm font-semibold text-slate-500">Step 3</div>
              <h3 className="mt-1 font-bold">Track Results</h3>
              <p className="mt-1 text-sm text-slate-600">View real-time results anytime, anywhere. Transparency by default.</p>
              <Link to="/results" className="inline-block mt-3 text-blue-600 hover:underline">View Results →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold">Ready to cast your vote?</h3>
              <p className="text-white/90 mt-1">Your voice matters. Make it count in under a minute.</p>
            </div>
            <div className="flex gap-3">
              <Link to="/candidate" className="px-4 py-2 rounded-md bg-white text-blue-700 font-semibold hover:bg-blue-50">Vote Now</Link>
              <Link to="/login" className="px-4 py-2 rounded-md ring-1 ring-white/70 hover:bg-white/10">Sign In</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>© {new Date().getFullYear()} Voting App. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <a className="hover:text-slate-700" href="#about">About</a>
            <a className="hover:text-slate-700" href="#privacy">Privacy</a>
            <a className="hover:text-slate-700" href="#terms">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home