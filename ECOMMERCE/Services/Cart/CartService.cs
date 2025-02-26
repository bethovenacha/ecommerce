﻿using Amarket;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Components;

namespace ECOMMERCE.Services.Cart
{
    public class CartService : Icart
    {

        private readonly HttpClient httpClient;

        public CartService(HttpClient httpClient)
        {
            this.httpClient = httpClient;
        }

        public async Task<Amarket.Cart> create(Amarket.Cart cart)
        {
            return await httpClient.PostJsonAsync<Amarket.Cart>($"api/cart",cart);
        }



        public async Task delete(object id)
        {
             await httpClient.DeleteAsync($"api/cart/{id}");

        }

        public Task<IEnumerable<Amarket.Cart>> retrieve()
        {
            throw new NotImplementedException();
        }

        public async Task<IEnumerable<Amarket.Cart>> retrieveById(object id)
        {
            return await httpClient.GetJsonAsync<IEnumerable<Amarket.Cart>>($"api/cart/{id}");
            
        }

        public Task<Amarket.Cart> update(Amarket.Cart cart)
        {
            throw new NotImplementedException();
        }

    }
}
