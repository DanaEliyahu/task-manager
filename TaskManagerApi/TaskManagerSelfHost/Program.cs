using Microsoft.Owin.Hosting;
using System;
using System.Configuration;
using TaskManagerApi;

namespace TaskManagerSelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = ConfigurationManager.AppSettings["ServerAddress"];

            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine($"Server is running at {baseAddress}");
                Console.ReadLine();
            }
        }
    }
}
