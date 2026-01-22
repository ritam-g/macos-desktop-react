import MacWindow from "./MacWindow"
import githubData from "../../assets/github.json"
import "./github.scss"

function Github({ windowname, windowBox, setwindowBox }) {
  return (
    <MacWindow
      windowname={windowname}
      windowBox={windowBox}
      setwindowBox={setwindowBox}
    >
      <div className="cards">
        {githubData.map((project, idx) => (
          <div
            className="card"
            key={project.id}
            style={{ "--i": idx }}   // ✅ FIX: stagger animation here
          >
            <img src={project.image} alt={project.title} />

            <h1>{project.title}</h1>
            <p>{project.description}</p>

            <div className="tags">
              {project.tags.map((tag, i) => (
                <p className="tag" key={i}>
                  {tag}
                </p>
              ))}
            </div>

            <div className="urls">
              <a href={project.repoLink} target="_blank" rel="noreferrer">
                Repo
              </a>

              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noreferrer">
                  Demo
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </MacWindow>
  )
}

export default Github
