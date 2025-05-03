"use client"

import { useEffect, useState } from "react"
import { Loader2, AlertCircle, Calendar, ExternalLink } from "lucide-react"

const News = () => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("https://api.spaceflightnewsapi.net/v4/articles/?limit=18")
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des actualités")
        }
        const data = await response.json()
        setArticles(data.results)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()

    return () => {
      // Cleanup function
    }
  }, [])

  if (loading) {
    return (
      <div className="news-loading">
        <Loader2 className="news-loading-icon" size={40} />
        <p className="news-loading-text">Chargement des actualités spatiales...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="news-error">
        <AlertCircle className="news-error-icon" size={40} />
        <p className="news-error-text">❌ {error}</p>
        <button onClick={() => window.location.reload()} className="news-retry-button">
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <>
      <style jsx>{`
        /* Base styles */
        .news-section {
          padding: 3rem 1rem;
        }
        
        .news-container {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        
        .news-title {
          font-size: 2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.75rem;
          color: #ffcc70;
        }
        
        .news-subtitle {
          text-align: center;
          color: #F0FFFF;
          max-width: 42rem;
          margin: 0 auto 2.5rem auto;
          font-size: 1rem;
        }
        
        /* Grid layout */
        .news-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
        }
        
        /* Loading state */
        .news-loading {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          padding: 1.5rem;
          background: linear-gradient(to bottom right, #f8fafc, #fff5e0);
          border-radius: 0.5rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .news-loading-icon {
          color: #ffcc70;
          margin-bottom: 1rem;
          animation: spin 1s linear infinite;
        }
        
        .news-loading-text {
          font-size: 1.125rem;
          color: #374151;
          font-weight: 500;
          animation: pulse 2s infinite;
        }
        
        /* Error state */
        .news-error {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          padding: 1.5rem;
          background-color: #fef2f2;
          border-radius: 0.5rem;
          border: 1px solid #fee2e2;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .news-error-icon {
          color: #dc2626;
          margin-bottom: 1rem;
        }
        
        .news-error-text {
          font-size: 1.125rem;
          color: #dc2626;
          font-weight: 500;
        }
        
        .news-retry-button {
          margin-top: 1rem;
          padding: 0.5rem 1.25rem;
          background-color: #fee2e2;
          color: #b91c1c;
          border-radius: 9999px;
          font-weight: 500;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }
        
        .news-retry-button:hover {
          background-color: #fecaca;
        }
        
        /* Card styles */
        .news-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          overflow: hidden;
          border-radius: 0.5rem;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          background-color: white;
          border: 1px solid #f3f4f6;
          text-decoration: none;
        }
        
        .news-card:hover {
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          border-color: #ffe5b0;
          transform: translateY(-2px);
        }
        
        .news-card-image-container {
          position: relative;
          height: 10rem;
          overflow: hidden;
        }
        
        .news-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        
        .news-card:hover .news-card-image {
          transform: scale(1.05);
        }
        
        .news-card-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent);
          opacity: 0.7;
        }
        
        .news-card-tag-container {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 0.75rem;
        }
        
        .news-card-tag {
          display: inline-block;
          padding: 0.25rem 0.5rem;
          background-color: #ffcc70;
          color: #333;
          font-size: 0.75rem;
          font-weight: 600;
          border-radius: 9999px;
        }
        
        .news-card-content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex-grow: 1;
          padding: 1rem;
        }
        
        .news-card-title {
          font-size: 1.125rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 0.5rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          transition: color 0.3s ease;
        }
        
        .news-card:hover .news-card-title {
          color: #ffcc70;
        }
        
        .news-card-summary {
          font-size: 0.875rem;
          color: #4b5563;
          margin-bottom: 0.75rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .news-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 0.75rem;
          border-top: 1px solid #f3f4f6;
          margin-top: auto;
        }
        
        .news-card-date {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          color: #6b7280;
        }
        
        .news-card-date-icon {
          margin-right: 0.25rem;
          color: #ffcc70;
        }
        
        .news-card-read-more {
          display: flex;
          align-items: center;
          font-size: 0.75rem;
          font-weight: 500;
          color: #ffcc70;
          transition: color 0.3s ease;
        }
        
        .news-card:hover .news-card-read-more {
          color: #e6b85c;
        }
        
        .news-card-read-more-icon {
          margin-left: 0.25rem;
          transition: transform 0.3s ease;
        }
        
        .news-card:hover .news-card-read-more-icon {
          transform: translateX(0.25rem);
        }
        
        /* More news button */
        .news-more-container {
          margin-top: 2rem;
          text-align: center;
        }
        
        .news-more-button {
          display: inline-flex;
          align-items: center;
          padding: 0.5rem 1.25rem;
          background-color: #ffcc70;
          color: #333;
          font-size: 0.875rem;
          font-weight: 500;
          border-radius: 9999px;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          text-decoration: none;
        }
        
        .news-more-button:hover {
          background-color: #e6b85c;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        
        .news-more-button-icon {
          margin-left: 0.5rem;
        }
        
        /* Animations */
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
        
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        /* Media queries */
        @media (min-width: 640px) {
          .news-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .news-title {
            font-size: 2.25rem;
          }
        }
        
        @media (min-width: 1024px) {
          .news-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          
          .news-title {
            font-size: 2.5rem;
          }
        }
      `}</style>

      <section className="news-section">
        <div className="news-container">
          <h1 className="news-title">🚀 Dernières Actualités Spatiales</h1>

          <p className="news-subtitle">
            Découvrez les dernières nouvelles et avancées dans le domaine de l'exploration spatiale
          </p>

          <div className="news-grid">
            {articles.map((article) => (
              <a
                key={article.id}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="news-card"
                aria-label={`Lire l'article: ${article.title}`}
              >
                <div className="news-card-image-container">
                  <img
                    src={article.image_url || "/placeholder.svg?height=200&width=400"}
                    alt={article.title}
                    className="news-card-image"
                    loading="lazy"
                  />
                  <div className="news-card-image-overlay"></div>
                  <div className="news-card-tag-container">
                    <span className="news-card-tag">Espace</span>
                  </div>
                </div>

                <div className="news-card-content">
                  <div>
                    <h2 className="news-card-title">{article.title}</h2>
                    <p className="news-card-summary">{article.summary}</p>
                  </div>

                  <div className="news-card-footer">
                    <p className="news-card-date">
                      <Calendar className="news-card-date-icon" size={12} />
                      {new Date(article.published_at).toLocaleDateString("fr-FR", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <span className="news-card-read-more">
                      Lire plus
                      <ExternalLink className="news-card-read-more-icon" size={12} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {articles.length > 0 && (
            <div className="news-more-container">
              <a
                href="https://www.spaceflightnewsapi.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="news-more-button"
              >
                Plus d'actualités
                <ExternalLink className="news-more-button-icon" size={16} />
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default News
