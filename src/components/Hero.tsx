import React from "react"

import { logo } from "../assets"

export default function Hero(): React.JSX.Element {
   return (
      <header className="flex flex-col items-center justify-center w-full">
         <nav className="flex items-center justify-between w-full pt-3 mb-10">
            <img src={logo} alt="summa logo" className="object-contain w-28" />

            <button type="button" onClick={() => window.open("https://github.com/nuhptr")} className="black_btn">
               Github
            </button>
         </nav>

         <h1 className="!leading-tight head_text">
            Summarize Articles with <br className="max-md:hidden" />
            <span className="orange_gradient">OpenAI GPT-4</span>
         </h1>
         <h2 className="!leading-relaxed desc">
            Simplify your reading with Summarapid, an open-source article summaerizer powered by OpenAI's GPT-4 into
            clear and concise summaries.
         </h2>
      </header>
   )
}
