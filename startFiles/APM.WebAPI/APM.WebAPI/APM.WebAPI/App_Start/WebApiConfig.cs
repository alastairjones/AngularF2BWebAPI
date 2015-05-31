using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json.Serialization;
using System.Web.Http.Cors;

namespace APM.WebAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Now to allow Cross Origin Requests from AngularJS on another site to this page we need to enable CORS

            var cors = new EnableCorsAttribute("*http://localhost:65238", "*", "*");
            config.EnableCors(cors);

           // config.EnableCors();

            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            // This will change the C# model property names e.g. ProductName to productName in the JSON
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver =
                 new CamelCasePropertyNamesContractResolver();

        


            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
