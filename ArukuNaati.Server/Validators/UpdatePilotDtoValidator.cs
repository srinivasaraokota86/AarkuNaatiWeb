using FluentValidation;
using ArukuNaati.Server.DTOs;

namespace ArukuNaati.Server.Validators
{
    public class UpdatePilotDtoValidator : AbstractValidator<UpdatePilotDto>
    {
        public UpdatePilotDtoValidator()
        {
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.MobileNumber).NotEmpty();
            RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrEmpty(x.Email));
        }
    }
}
