﻿using Microsoft.Owin.Hosting;
using System;

namespace TaskManagerSelfHost
{
    class Program
    {
        static void Main(string[] args)
        {
            string baseAddress = "http://localhost:9000/";

            // Start OWIN host 
            using (WebApp.Start<Startup>(url: baseAddress))
            {
                Console.WriteLine("Server is running, Press any key to quit");
                Console.ReadLine();
            }
        }
    }
}
