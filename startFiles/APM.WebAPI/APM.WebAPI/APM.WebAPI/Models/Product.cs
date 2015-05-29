using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace APM.WebAPI.Models
{
    public class Product
    {
        public string Description { get; set; }
        public decimal Price { get; set; }


        [Required()]
        [MinLength(6, ErrorMessage="Product Code min length is 6 characters")]
        public string ProductCode { get; set; }
        public int ProductId { get; set; }
         

        [Required()]
        [MinLength(10)]
        [MaxLength(12)]
        public string ProductName { get; set; }


        public DateTime ReleaseDate { get; set; }


        // JSON Formatter settings

        [JsonIgnore]
        public string JsonIgnoreExample { get; set; }

        // DateTimeZoneHandling // default format 2009-03-19T00:00:00
    }
}