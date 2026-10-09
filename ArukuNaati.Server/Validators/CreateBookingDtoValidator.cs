using FluentValidation;
using ArukuNaati.Server.DTOs;

namespace ArukuNaati.Server.Validators
{
    public class CreateBookingDtoValidator : AbstractValidator<CreateBookingDto>
    {
        public CreateBookingDtoValidator()
        {
            RuleFor(x => x.FarmerName).NotEmpty();
            RuleFor(x => x.MobileNumber).NotEmpty();
            RuleFor(x => x.State).NotEmpty();
            RuleFor(x => x.District).NotEmpty();
            RuleFor(x => x.Village).NotEmpty();
            RuleFor(x => x.LandArea).GreaterThan(0);
            RuleFor(x => x.ServiceRequired).NotEmpty();
            RuleFor(x => x.Crop).NotEmpty();
            RuleFor(x => x.PreferredDate).NotEmpty();
        }
    }
}
