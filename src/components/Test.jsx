import {copy, linkIcon, loader, tick} from '../assets'
import { useState, useEffect } from 'react'
import useSWR from 'swr'

const rapidApiKey = import.meta.env.VITE_RAPID_API_ARTICLE_KEY



function Test() {
    useEffect(()=>{
        const articlesFromLocalStorage = JSON.parse(localStorage.getItem('articles'))
        
        if (articlesFromLocalStorage){
            setAllArticle(articlesFromLocalStorage)
        }

    }, [])
    const [article, setArticle] = useState({url : '', summary: null})
    const [allArticle, setAllArticle] = useState([])
    const [coppied, setCoppied] = useState("")
    const encodeUrl = article.url ? encodeURIComponent(article.url) : ''
    const endpoint = `https://article-extractor-and-summarizer.p.rapidapi.com/summarize?url=${encodeUrl}`
    const fetcher = async (url)=>{
        const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': rapidApiKey,
              'X-RapidAPI-Host': 'article-extractor-and-summarizer.p.rapidapi.com'
            }
          };
          const request = await fetch(url, options)
          return request.json()
          
    }



    const {data, error, isFetching} = useSWR(endpoint, fetcher)
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const newArticle = {...article, summary: data.summary}
        const allSearchedArticle = [...allArticle, newArticle]
        
        setArticle(newArticle)
        setAllArticle(allSearchedArticle)
        console.log(JSON.stringify(data))

        localStorage.setItem('articles', JSON.stringify(allSearchedArticle))
    }
    const handleCopy = (copyUrl) =>{
        setCoppied(copyUrl)
        navigator.clipboard.writeText(copyUrl)
        setTimeout(() => setCoppied(false), 3000)

    }
  return (
    <section className="mt-16 w-full max-w-xl">
        <p>{rapidApiKey}</p>
        <div className="flex flex-col w-full gap-2">
            <form action="" 
            className="relative flex justify-center items-center" onSubmit={handleSubmit}>
                <img src={linkIcon} alt="linkIcon"  
                className="absolute left-0 my-2 ml-3 w-5"/>
                <input type="url" placeholder="Enter a URL"
                value={article.url}
                onChange={(e) =>{setArticle({...article, url: e.target.value})}}
                required
                name="url"
                className="url_input peer"
                />
                <button type="submit" 
                className="submit_btn peer-focus:border-gray-700 peer-focus:text-gray-700">
                    Submit
                </button>

            </form>
        {/* Browse URL history */}
        <div className='flex flex-col gap-1 max-h-60 overflow-y-auto'>
            {allArticle.map((item, index) =>(
                <div key={`link-${index}`} onClick={() => setArticle(item)} className='link_card'>
                    <div className='copy_btn' onClick={() => handleCopy(item.url)}>
                        <img 
                        src={coppied === item.url ? tick : copy} 
                        alt="copy_icon" 
                        className='w-[40%] h-[40%] object-contain'
                        />
                    </div>
                    <p className='flex-1 font-satoshi text-blue-700 font-medium text-sm truncate'>
                        {item.url}
                    </p>

                    
                </div>
            ))}

        </div>
        </div>
        {/* Display Results */}
        <div className='my-10 max-w-full flex justify-center items-center'>
            {isFetching ? (
                <img src={loader} alt='loading...' className='w-20 h-20 object-contain'/>
            ): error ? (
            <p className='font-inter font-bold text-black text-center'>
                Ooops.....An error occurred. Ensure you are passing a url to an article or a readable website
                <br />
                <span className='font-satoshi font-normal text-gray-700'>
                    {error?.data?.error}
                </span>
            </p>
            ): (
                article.summary && 
                <div className='flex flex-col gap-3'>
                    <h2 className='font-satoshi font-bold text-gray-600 text-xl'>
                        Article <span className='blue_gradient'>Summary</span></h2>
                    <div className='summary_box'>
                        <p>{article.summary}</p>
                    </div>
                </div> 
                )
            
            }
        </div>

      
    </section>
  )
}

export default Test
