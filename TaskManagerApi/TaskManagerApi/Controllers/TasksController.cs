using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManagerApi.Models;
using TaskManagerApi.ViewModels;
using TaskModel = TaskManagerApi.Models.Task;

namespace TaskManagerApi.Controllers
{
    // The usage of async here is redundant because there is no call to a database or a cache
    // but normally this is the expected usage
    [RoutePrefix("api/tasks")]
    public class TasksController : ApiController
    {
        [HttpGet, Route]
        public async Task<IHttpActionResult> Get()
        {
            return Ok(Data.Instance.Tasks.Select(x => new TaskViewModel(x)));
        }

        [HttpGet, Route("bySession")]
        public async Task<IHttpActionResult> GetBySessionId()
        {
            var cookie = GetCookie();
            
            var tasks = cookie == null 
                ? new List<TaskViewModel>()
                : Data.Instance.Tasks.Where(x => x.SessionId == Guid.Parse(cookie["Session"].Value))
                .Select(x => new TaskViewModel(x)).ToList();

            return Ok(tasks);
        }

        [HttpPost, Route]
        public IHttpActionResult Post([FromBody]TaskViewModel taskViewModel)
        {
            EnsureTask(taskViewModel);
            
            var newTask = CreateTask(taskViewModel);

            Data.Instance.Tasks.Add(newTask);

            return Content(System.Net.HttpStatusCode.Created, newTask);
        }

        private TaskModel CreateTask(TaskViewModel taskViewModel)
        {
            var newTask = new TaskModel()
            {
                Id = Guid.NewGuid(),
                Description = taskViewModel.Description,
                Image = taskViewModel.Image,
            };

            var cookie = GetCookie();
            if (cookie == null)
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(System.Net.HttpStatusCode.BadRequest, "User has no session"));
            }

            newTask.SessionId = Guid.Parse(cookie["Session"].Value);

            return newTask;
        }

        private CookieHeaderValue GetCookie()
        {
            return Request.Headers.GetCookies("Session").FirstOrDefault();
        }

        private void EnsureTask(TaskViewModel taskViewModel)
        {
            if (string.IsNullOrWhiteSpace(taskViewModel.Description))
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(System.Net.HttpStatusCode.BadRequest, "Description is empty"));
            }

            if (string.IsNullOrWhiteSpace(taskViewModel.Image))
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(System.Net.HttpStatusCode.BadRequest, "Image is empty"));
            }
        }
    }
}
