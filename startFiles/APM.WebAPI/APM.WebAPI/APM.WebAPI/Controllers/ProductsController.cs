using APM.WebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using System.Web.OData;

namespace APM.WebAPI.Controllers
{
    [EnableCorsAttribute("http://localhost:65238","*","*")]
    public class ProductsController : ApiController
    {
        /*
         *   OData examples
         *   
         *   Example request
         *   
         *  http://localhost:65238/api/products?$filter=Price+gt+5&$orderby=Price
         * 
         *  $top Returns the top n results e.g. $top:3
         *  $skip Skips n results          e.g. $skip:1
         *  $orderby Sorts the results    e.g. $orderby:"ProductName desc"
         *  $filter  Filter the results based on an expression    $filter: "Price gt 5"
         *  $select  Selects the properties to include in the response  $select: "ProductName, ProductCode"
         *
         * 
         * */


        // Also to validate the odata querys use

        // FilterQueryValidator


        /// OData query options
        /// 



        // Now with ODATA Enabled
        // GET: api/Products
        /// <summary>
        /// 
        /// </summary>
        /// <returns> Note the IHttpActionResult is new to web api2 and allows for improved error responses</returns>
        [EnableQuery(PageSize=100)]
        [ResponseType(typeof(Product))] // Since changing the return type to IHttpActionResult the api documentation needs this to continue working and know it is a product return type
        public IHttpActionResult Get()
        {
            var productRepository = new ProductRepository();
            return Ok(productRepository.Retrieve().AsQueryable());
        }
                
        // GET: api/Products/5
        [ResponseType(typeof(Product))] 
        public IHttpActionResult Get(int id)
        {
            try
            {
                Product product;
                var productRepository = new ProductRepository();

                if (id > 0)
                {
                    var products = productRepository.Retrieve();
                    product = products.FirstOrDefault(p => p.ProductId == id);

                    if (product == null)
                    {
                        // Use IHttpActionResult helper method to return not found response
                        return NotFound();
                    }
                }
                else
                {
                    product = productRepository.Create();
                }
                return Ok(product);
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        // POST: api/Products
        public IHttpActionResult Post([FromBody]Product product)
        {
            // Check the request is valid
            if (product == null)
            {
                return BadRequest("Product cannot be null");
            }

            // Now perform server side validation of the model
            // this is against the data annotations on the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productRepository = new Models.ProductRepository();
            var newProduct = productRepository.Save(product);

            // Is the product created?
            if (newProduct == null)
            {
                return Conflict();
            }
            

            // Now send back the created product with the Created built in web api helper method
            // Note the first argument is the location of the newly created product
            return Created<Product>(Request.RequestUri + newProduct.ProductId.ToString() , newProduct);
        }

        // PUT: api/Products/5
        public IHttpActionResult Put(int id, [FromBody]Product product)
        {
            if (product == null)
            {
                return BadRequest("Product cannot be null");
            }

            // Now perform server side validation of the model
            // this is against the data annotations on the model
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var productRepository = new Models.ProductRepository();
            var updatedProduct = productRepository.Save(id, product);


            if (updatedProduct == null)
            {
                return NotFound();
            }

            return Ok();

        }

        // DELETE: api/Products/5
        public void Delete(int id)
        {
        }


        //// GET: api/Products
        ///// <summary>
        ///// Allows product filter by query string paramerter search 
        ///// </summary>
        ///// <param name="Search">Passed in the query string</param>
        ///// <returns></returns>
        //public IEnumerable<Product> Get(string Search)
        //{
        //    var productRepository = new ProductRepository();
        //    var products = productRepository.Retrieve();

        //    return products.Where(p => p.ProductCode.Contains(Search));
        //}
    }
}
