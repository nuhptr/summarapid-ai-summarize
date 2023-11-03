/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react"

import { copy, linkIcon, loader, tick } from "../assets"
import { useLazyGetSummaryQuery } from "../services/article"

export default function Demo(): React.ReactElement {
   const [article, setArticle] = useState({ url: "", summary: "" })
   const [allArticles, setAllArticles] = useState([{ url: "", summary: "" }])
   const [copied, setCopied] = useState("")

   // RTK LAZY QUERY
   const [getSummary, { error, isFetching }] = useLazyGetSummaryQuery()

   // LOAD DATA FROM LOCAL STORAGE
   useEffect(() => {
      const articlesFromLocalStorage = JSON.parse(localStorage.getItem("articles")!)

      if (articlesFromLocalStorage) setAllArticles(articlesFromLocalStorage)
   }, [])

   async function handleSubmit(event: any) {
      event.preventDefault()

      const existingArticle = allArticles.find((item) => item.url === article.url)
      if (existingArticle) return setArticle(existingArticle)

      const { data } = await getSummary({ articleUrl: article.url })
      if (data?.summary) {
         const newArticle = { ...article, summary: data.summary }
         const updatedAllArticles = [newArticle, ...allArticles]

         // UPDATE STATE AND LOCAL STORAGE
         setArticle(newArticle)
         setAllArticles(updatedAllArticles)

         localStorage.setItem("articles", JSON.stringify(updatedAllArticles))
      }
   }

   // COPY THE URL AND GIVE FEEDBACK TO THE USER
   function handleCopy(copyUrl: string) {
      setCopied(copyUrl)
      navigator.clipboard.writeText(copyUrl)

      setTimeout(() => setCopied(""), 3000)
   }

   // SUBMIT THE FORM WHEN THE USER PRESSES ENTER
   function handleKeyDown(event: any) {
      if (event.keyCode === 13) {
         handleSubmit(event)
      }
   }

   return (
      <section className="w-full max-w-xl mt-16">
         {/* SEARCH */}
         <div className="flex flex-col w-full gap-2">
            <form className="relative flex items-center justify-center" onSubmit={handleSubmit}>
               <img src={linkIcon} alt="link-icon" className="absolute left-0 w-5 my-2 ml-3" />

               <input
                  type="url"
                  placeholder="Paste the article link"
                  value={article.url}
                  onChange={(e) => setArticle({ ...article, url: e.target.value })}
                  onKeyDown={handleKeyDown}
                  required
                  className="url_input peer" // When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* modifiers to style the target element
               />

               <button type="submit" className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700 ">
                  <p>↵</p>
               </button>
            </form>

            {/* BROWSER HISTORY */}
            <div className="flex flex-col gap-1 overflow-y-auto max-h-60">
               {allArticles.reverse().map((item, index) => (
                  <div key={`link-${index}`} onClick={() => setArticle(item)} className="link_card">
                     <div className="copy_btn" onClick={() => handleCopy(item.url)}>
                        <img
                           src={copied === item.url ? tick : copy}
                           alt={copied === item.url ? "tick_icon" : "copy_icon"}
                           className="w-[40%] h-[40%] object-contain"
                        />
                     </div>

                     <p className="flex-1 text-sm font-medium text-blue-700 truncate font-satoshi">{item.url}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* DISPLAY URL */}
         <div className="flex items-center justify-center max-w-full my-10">
            {isFetching ? (
               <img src={loader} alt="loader" className="object-contain w-20 h-20" />
            ) : error ? (
               <p className="font-bold text-center text-black font-inter">Well, that wasn't supposed to happen...</p>
            ) : (
               article.summary && (
                  <div className="flex flex-col gap-3">
                     <h2 className="text-xl font-bold text-gray-600 font-satoshi">
                        Article <span className="blue_gradient">Summary</span>
                     </h2>
                     <div className="summary_box">
                        <p className="text-sm font-medium text-gray-700 font-inter">{article.summary}</p>
                     </div>
                  </div>
               )
            )}
         </div>
      </section>
   )
}
