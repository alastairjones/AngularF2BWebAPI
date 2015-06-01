using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace APM.WebAPI.Controllers
{
    /// <summary>
    /// This is for MVC so the api can display a home page if required as it inherits from Controlller
    /// </summary>
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
