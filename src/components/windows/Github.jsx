import React from 'react'
import MacWindow from './MacWindow'
import githubData from"../../assets/github.json"
import "./github.scss"
function Github() {
  function Gitcard(data = { id:1, image: "", title: "", description: "", tags: [], repoLink: "", demoLink: ""},idx ) {
    return <div className="card" key={idx}>
      <img src={data.image} alt="" />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
      <div className="tags">
        {
          data.tags.map(tag=>{
            return <p className='tag'>{tag}</p>
          })
        }
      </div>
      <div className="urls">
        <a href={data.repoLink}> Repo</a>
        {data.demoLink&&<a  href={data.demoLink}>Demo</a>}
      </div>
    </div>
  }
  return (
    <MacWindow>
        <div className="cards">
          {githubData.map((project,idx)=>{
            return Gitcard(project)
          })}
        </div>
    </MacWindow>
  )
}
export default Github
