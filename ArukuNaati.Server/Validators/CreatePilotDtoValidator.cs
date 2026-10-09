using FluentValidation;
using ArukuNaati.Server.DTOs;

namespace ArukuNaati.Server.Validators
{
    public class CreatePilotDtoValidator : AbstractValidator<CreatePilotDto>
    {
        public CreatePilotDtoValidator()
        {
            RuleFor(x => x.FullName).NotEmpty();
            RuleFor(x => x.MobileNumber).NotEmpty();
            RuleFor(x => x.Email).EmailAddress().When(x => !string.IsNullOrEmpty(x.Email));
        }
    }
}
