import MacWindow from "./MacWindow"
import githubData from"../../assets/github.json"
import './github.scss'
function Github({windowname, windowBox, setwindowBox}) {
  return (
    <MacWindow windowname={windowname} windowBox={windowBox} setwindowBox={setwindowBox}>
      <div className="cards">
        {githubData.map((project) => (
          <div className="card" key={project.id}>
            <img src={project.image} alt="" />
            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <div className="tags">
              {project.tags.map(tag => (
                <p className="tag" key={tag}>{tag}</p>
              ))}
            </div>

            <div className="urls">
              <a href={project.repoLink}>Repo</a>
              {project.demoLink && <a href={project.demoLink}>Demo</a>}
            </div>
          </div>
        ))}
      </div>
    </MacWindow>
  )
}

export default Github