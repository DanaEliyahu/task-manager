using Microsoft.Owin.Hosting;
using System;
using TaskManagerApi;

namespace TaskManagerSelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9000/";

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine("Server is running, Press any key to quit");
                Console.ReadLine();
            }
        }
    }
}
