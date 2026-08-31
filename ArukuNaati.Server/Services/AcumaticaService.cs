
    using ArukuNaati.Server.Models;
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

            private const string BaseUrl = "http://localhost/Acumatica26R1/";

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

        /*  public async Task CreateVendor(Farmers farmer)
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
          }*/
        public async Task<List<AcumaticaVendorDto>> GetVendors()
        {
            try
            {
                // Login first
                await Login();

                var url = "http://localhost/Acumatica26R1/entity/Default/25.200.001/Vendor";

                Console.WriteLine("Getting Vendors from Acumatica...");
                Console.WriteLine("URL: " + new Uri(_httpClient.BaseAddress!, url));

                var response = await _httpClient.GetAsync(url);

                var result = await response.Content.ReadAsStringAsync();

                Console.WriteLine("Vendor API Status: " + response.StatusCode);
                Console.WriteLine("Vendor API Response:");
                Console.WriteLine(result);

                response.EnsureSuccessStatusCode();

                var vendors =
                    JsonSerializer.Deserialize<List<AcumaticaVendorDto>>(
                        result,
                        new JsonSerializerOptions
                        {
                            PropertyNameCaseInsensitive = true
                        });

                return vendors ?? new List<AcumaticaVendorDto>();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Get Vendors Failed: " + ex.Message);
                throw;
            }
            finally
            {
                await Logout();
            }
        }
        public async Task CreateVendor(Farmers farmer)
        {
            try
            {
                await Login();
            }
            catch (Exception ex)
            {
                throw new Exception("Login Failed : " + ex.Message);
            }

            var vendor = new
            {
                VendorID = new { value = farmer.FarmerCode },
                VendorName = new { value = farmer.Name },
                VendorClass = new { value = "SUBCON" }
            };

            var json = JsonSerializer.Serialize(vendor);

            var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json");

            try
            {
                var url = "http://localhost/Acumatica26R1/entity/Default/25.200.001/Vendor";
                Console.WriteLine(BaseUrl);
                Console.WriteLine(url);
                var response = await _httpClient.PutAsync(url, content);

                var result = await response.Content.ReadAsStringAsync();
                Console.WriteLine("Status : " + response.StatusCode);
                Console.WriteLine("Response : ");
                Console.WriteLine(result);

                response.EnsureSuccessStatusCode();
            }
            catch (Exception ex)
            {
                throw new Exception("Create Vendor Failed : " + ex.Message);
                // throw;
            }
            finally
            {
                await Logout();
            }
        }

        /* private async Task Login()
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
         }*/
        private async Task Login()
        {
            var login = new
            {
                name = "admin",
                password = "deepika!0512"
            };

            var json = JsonSerializer.Serialize(login);

            var content = new StringContent(
                json,
                Encoding.UTF8,
                "application/json");

            var request = new HttpRequestMessage(
                HttpMethod.Post,
                "entity/auth/login");

            request.Content = content;

            Console.WriteLine("BaseAddress: " + _httpClient.BaseAddress);
            Console.WriteLine("Request URI: " + new Uri(_httpClient.BaseAddress!, request.RequestUri!));

            var response = await _httpClient.SendAsync(request);

            var result = await response.Content.ReadAsStringAsync();

            Console.WriteLine("Status: " + response.StatusCode);
            Console.WriteLine(result);

            response.EnsureSuccessStatusCode();
        }
        private async Task Logout()
            {
                await _httpClient.PostAsync(
                    "entity/auth/logout",
                    null);
            }
        }
    }

