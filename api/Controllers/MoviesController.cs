using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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
            return _context.TitleBasics.ToList();
        }   
    }
}