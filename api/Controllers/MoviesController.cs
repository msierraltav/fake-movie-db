using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Diagnostics;

namespace api.Controllers{
    [Route("api/[controller]")]
    [ApiController]

    public class MoviesController : ControllerBase{
        private readonly FakeDbContext _context;
        public MoviesController(FakeDbContext context){
            _context = context;
        }

        // get: api/movies
        [HttpGet]
        public ActionResult<IEnumerable<TitleBasics>> GetMovies(){
            return _context.TitleBasics.Take(10).ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<TitleBasics> GetMovieById(int id){
            var movie = _context.TitleBasics.Find(id);
            if(movie == null){
                return NotFound();
            }
            return movie;
        }

        [HttpGet]
        // get : api/movies/1/actors
        [Route("{id}/actors")]
        public ActionResult<object> GetActorsByMovie(
            int id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var stopwatch = Stopwatch.StartNew();
            
            // Validate and constrain page size
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 50) pageSize = 50;

            var movie = _context.TitleBasics.Find(id);
            if(movie == null){
                return NotFound();
            }

            // Calculate skip for pagination
            int skip = (page - 1) * pageSize;
            
            // Use ToList() to switch to client-side evaluation before performing the Split operation
            var actorsQuery = _context.NameBasics
                .Where(actor => actor.KnownForTitles != null)
                .AsNoTracking()  // For better performance in read-only scenario
                .ToList()
                .Where(actor => actor.KnownForTitles.Split(',').Contains(movie.Tconst))
                .AsQueryable();
                
            // Get total count
            var totalCount = actorsQuery.Count();
                
            // Execute the paged query
            var actors = actorsQuery
                .Skip(skip)
                .Take(pageSize)
                .ToList();
                
            // Calculate total pages
            int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            return new { 
                currentPage = page, 
                pageSize, 
                totalItems = totalCount, 
                totalPages,
                millisecondsTaken = stopwatch.ElapsedMilliseconds,
                items = actors 
            };
        }

        /// <summary>
        /// Retrieves a movie by its unique identifier or searches movies by title, year, genre, or actor.
        /// </summary>
        /// <param name="query">The search query for title, year, genre, or actor name.</param>
        /// <param name="page">The page number for pagination (default: 1).</param>
        /// <param name="pageSize">The number of results per page (default: 10, max: 50).</param>
        /// <returns>A paginated list of movies matching the search criteria.</returns>
        /// <response code="200">Returns the matching movies.</response>
        /// <remarks>
        /// Example usage:
        /// GET /api/movies/search?query=action&page=1&pageSize=10
        /// 
        /// This will return the first page of movies that have "action" in their title, year, genre, or related actor names.
        /// </remarks>
        [HttpGet]
        [Route("search")]
        public ActionResult<object> SearchMovies(
            [FromQuery] string query,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            var stopwatch = Stopwatch.StartNew();
            
            // Validate parameters
            if (string.IsNullOrWhiteSpace(query))
            {
                return BadRequest("Search query is required");
            }
            
            if (page < 1) page = 1;
            if (pageSize < 1) pageSize = 10;
            if (pageSize > 50) pageSize = 50;

            // Calculate skip for pagination
            int skip = (page - 1) * pageSize;
            
            // Create a more efficient lookup for actors matching the query
            var actorQuery = _context.NameBasics
                .Where(actor => actor.PrimaryName.Contains(query))
                .AsNoTracking(); // No tracking for better performance in read-only scenario
                
            // Get movie IDs from actors' KnownForTitles (more efficient approach)
            var movieIdsByActor = actorQuery
                .Select(actor => actor.KnownForTitles)
                .Where(knownFor => knownFor != null)
                .ToList()
                .SelectMany(knownFor => knownFor.Split(',', StringSplitOptions.RemoveEmptyEntries))
                .Distinct()
                .ToList();
            
            // Create base query for movies with all filter conditions
            var moviesQuery = _context.TitleBasics
                .Where(movie => 
                    (movie.PrimaryTitle != null && movie.PrimaryTitle.Contains(query)) ||
                    (movie.StartYear != null && movie.StartYear.Contains(query)) ||
                    (movie.Genres != null && movie.Genres.Contains(query)) ||
                    (movieIdsByActor.Contains(movie.Tconst)))
                .AsNoTracking(); // No tracking for better performance in read-only scenario
            
            // Get total count efficiently
            var totalCount = moviesQuery.Count();
            
            // Get the paged movies
            var movies = moviesQuery
                .Skip(skip)
                .Take(pageSize)
                .ToList();
            
            // Calculate total pages
            int totalPages = (int)Math.Ceiling(totalCount / (double)pageSize);
            
            stopwatch.Stop();
            
            return new { 
                currentPage = page, 
                pageSize, 
                totalItems = totalCount, 
                totalPages = totalPages,
                millisecondsTaken = stopwatch.ElapsedMilliseconds,
                items = movies  // Return movies directly without the actors
            };
        }
    }
}