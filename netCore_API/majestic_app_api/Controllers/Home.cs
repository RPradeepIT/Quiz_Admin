using majestic_API.Models;
using majestic_app_api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace majestic_API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class Home : ControllerBase
    {
       
        private readonly ILogger<Home> _logger;

        public Home(ILogger<Home> logger)
        {
            _logger = logger;
        }

       
        [HttpGet]
        [Route("GetAllUser")]
        public IList<UserModel> GetAllUser()
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.GetAllUsers();
        }
        [HttpGet]
        [Route("GetUserById")]
        public IList<UserModel> GetUserById(string emailid, string password)
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.GetUserById(emailid, password);
        }
        [HttpGet]
        [Route("GetAllQuizList")]
        public IList<QuizModel> GetAllQuizList()
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.GetAllQuizList();
        }
        [HttpGet]
        [Route("GetByIdQuizList")]
        public IList<QuizModel> GetByIdQuizList(int id)
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.GetByIdQuizList(id);
        }
        [HttpDelete]
        [Route("DeleteByIdQuizList")]
        public bool DeleteByIdQuizList(int id)
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.DeleteByIdQuizList(id) ==1 ? true : false;
        }
        [HttpPatch]
        [Route("UpdateByIdQuizList")]
        public bool UpdateByIdQuizList(int id, QuizModel quizModel)
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.UpdateByIdQuizList( id, quizModel) == 1 ? true : false;
        }
        [HttpPost]
        [Route("InsertQuizList")]
        public bool InsertQuizList(QuizModel quizModel)
        {
            QuizStoreContext context = HttpContext.RequestServices.GetService(typeof(majestic_API.Models.QuizStoreContext)) as QuizStoreContext;

            return context.InsertQuizList(quizModel) == 1 ? true : false;
        }
    }
}
