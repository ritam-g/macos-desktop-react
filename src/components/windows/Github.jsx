import MacWindow from "./MacWindow"
import githubData from "../../assets/github.json"
import "./github.scss"

function Github({ windowname, windowBox, setwindowBox, zIndex, onFocus, onMinimize, minimized }) {
  return (
    <MacWindow
      windowname={windowname}
      windowBox={windowBox}
      setwindowBox={setwindowBox}
      zIndex={zIndex}
      onFocus={onFocus}
      onMinimize={onMinimize}
      minimized={minimized}
    >
      <div className="cards">
        {githubData.map((project, idx) => (
          <article
            className="card"
            key={project.id}
            style={{ "--i": idx }}   // ✅ FIX: stagger animation here
          >
            <img src={project.image} alt={`Screenshot of ${project.title}`} />

            <h2>{project.title}</h2>
            <p>{project.description}</p>

            <div className="tags">
              {project.tags.map((tag, i) => (
                <p className="tag" key={i}>
                  {tag}
                </p>
              ))}
            </div>

            <div className="urls">
              <a href={project.repoLink} target="_blank" rel="noreferrer" aria-label={`View ${project.title} repository`}>
                Repo
              </a>

              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noreferrer" aria-label={`View ${project.title} live demo`}>
                  Demo
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </MacWindow>
  )
}

export default Github
