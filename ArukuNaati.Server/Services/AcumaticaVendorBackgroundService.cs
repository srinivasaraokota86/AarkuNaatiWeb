namespace ArukuNaati.Server.Services
{
    public class AcumaticaVendorBackgroundService : BackgroundService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public AcumaticaVendorBackgroundService(
            IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        protected override async Task ExecuteAsync(
            CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    using var scope =
                        _scopeFactory.CreateScope();

                    var syncService =
                        scope.ServiceProvider
                            .GetRequiredService<AcumaticaVendorSyncService>();

                    await syncService.SyncNewVendors();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(
                        "Background Vendor Sync Error: " +
                        ex.Message);
                }

                // Check Acumatica every 30 seconds
                await Task.Delay(
                    TimeSpan.FromSeconds(30),
                    stoppingToken);
            }
        }
    }
}