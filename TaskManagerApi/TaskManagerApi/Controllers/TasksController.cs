using System;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManagerApi.Models;
using TaskManagerApi.ViewModels;
using TaskModel = TaskManagerApi.Models.Task;

namespace TaskManagerApi.Controllers
{
    // The usage of asynchronous actions is redundant in this case because there is no Db
    [RoutePrefix("api/tasks")]
    public class TasksController : ApiController
    {
        [HttpGet, Route]
        public async Task<IHttpActionResult> Get()
        {
            return Ok(Data.Instance.Tasks.Select(x => new TaskViewModel(x)));
        }

        [HttpGet, Route("{id}")]
        public async Task<IHttpActionResult> GetBySessionId(Guid id)
        {
            return Ok(Data.Instance.Tasks.Where(x => x.SessionId == id).Select(x => new TaskViewModel(x)));
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

            var cookie = Request.Headers.GetCookies("Session").FirstOrDefault();
            if (cookie != null)
            {
                newTask.SessionId = Guid.Parse(cookie["Session"].Value);
            }

            // TODO: If no cookie, exception

            return newTask;
        }

        private void EnsureTask(TaskViewModel taskViewModel)
        {
            if (string.IsNullOrWhiteSpace(taskViewModel.Description))
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, "Description is empty"));
            }

            if (string.IsNullOrWhiteSpace(taskViewModel.Image))
            {
                throw new HttpResponseException(
                    Request.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, "Image is empty"));
            }
        }
    }
}
