import React, { useState, useEffect } from "react"

import { copy, linkIcon, loader, tick } from "../assets"

export default function Demo(): React.JSX.Element {
   const [article, setArticle] = useState({ url: "", summary: "" })

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      alert("Submitted")
   }

   return (
      <section className="w-full max-w-xl mt-16">
         {/* SEARCH */}
         <div className="flex flex-col w-full gap-2">
            <form onSubmit={handleSubmit} className="relative flex items-center justify-center">
               <img src={linkIcon} alt="search icon" className="absolute left-0 w-5 my-2 ml-3" />

               <input
                  type="url"
                  placeholder="Enter a URL"
                  value={article.url}
                  onChange={(event) => setArticle({ ...article, url: event.target.value })}
                  required
                  className="url_input peer"
               />
               <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                  Enter
               </button>
            </form>

            {/* BROWSER URL HISTORY */}
            <div className=""></div>
         </div>

         {/* DISPLAY RESULT */}
      </section>
   )
}
