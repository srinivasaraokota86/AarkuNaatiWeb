
    /*ing ArukuNaati.Server.Models;
    using global::ArukuNaati.Server.Models;
    using System.Net;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Text.Json;

    namespace ArukuNaati.Server.Services
    {
        public class AcumaticaService
        {
            private readonly HttpClient _httpClient;

            private const string BaseUrl = "http://localhost:80/Acumatica26R1/";

            private const string name = "admin";
            private const string password = "deepika!0512";
           // private const string tenant = "SalesDemo";

            public AcumaticaService()
            {
                var handler = new HttpClientHandler
                {
                    CookieContainer = new CookieContainer(),
                    UseCookies = true
                };

                _httpClient = new HttpClient(handler);
                _httpClient.BaseAddress = new Uri(BaseUrl);
                _httpClient.DefaultRequestHeaders.Accept.Add(
                    new MediaTypeWithQualityHeaderValue("application/json"));
            }

            public async Task CreateVendor(Farmers farmer)
            {
                await Login();

                var vendor = new
                {
                    VendorID = new
                    {
                        value = farmer.FarmerCode
                    },
                    VendorName = new
                    {
                        value = farmer.Name
                    },
                    VendorClass = new
                    {
                        value = "SUBCON"
                    }
                };

                var json = JsonSerializer.Serialize(vendor);

                var content = new StringContent(
                    json,
                    Encoding.UTF8,
                    "application/json");

                var response = await _httpClient.PutAsync(
                    "/entity/Default/25.200.001/Vendor",
                    content);

                if (!response.IsSuccessStatusCode)
                {
                    var error = await response.Content.ReadAsStringAsync();
                    throw new Exception(error);
                }

                await Logout();
            }

        private async Task Login()
        {
            var login = new
            {
                name = name, // Corrected to use the existing 'name' constant
                password = password, // Corrected to use the existing 'password' constant
                //tenant = tenant // Corrected to use the existing 'tenant' constant
            };

            var json = JsonSerializer.Serialize(login);

            var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json");

            var response = await _httpClient.PostAsync(
                "/entity/auth/login",
                content);

            response.EnsureSuccessStatusCode();
        }

            private async Task Logout()
            {
                await _httpClient.PostAsync(
                    "/entity/auth/logout",
                    null);
            }
        }
    }*/

