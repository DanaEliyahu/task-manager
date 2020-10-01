using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using TaskManagerSelfHost.Models;
using TaskManagerSelfHost.ViewModels;
using TaskModel = TaskManagerSelfHost.Models.Task;

namespace TaskManagerSelfHost.Controllers
{
    // The usage of asynchronous actions is redundant in this case because there is no Db
    public class TasksController : ApiController
    {
        [HttpGet]
        public async Task<IHttpActionResult> Get()
        {
            return Ok(Data.Instance.Tasks.Select(x => new TaskViewModel(x)));
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetBySessionId(Guid id)
        {
            return Ok(Data.Instance.Tasks.Where(x => x.SessionId == id).Select(x => new TaskViewModel(x)));
        }

        [HttpPost]
        public IHttpActionResult Post([FromBody]TaskViewModel taskViewModel)
        {
            var newTask = new TaskModel() 
            { 
                Id = Guid.NewGuid(), 
                Description = taskViewModel.Description, 
                Image = taskViewModel.Image, 
                SessionId = taskViewModel.SessionId 
            };

            Data.Instance.Tasks.Add(newTask);
            
            return Content(System.Net.HttpStatusCode.Created, newTask);
        }
    }
}
