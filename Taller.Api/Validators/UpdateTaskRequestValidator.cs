using FluentValidation;
using Taller.Api.Requests;

namespace Taller.Api.Validators;

public class UpdateTaskRequestValidator : AbstractValidator<UpdateTaskRequest>
{
    public UpdateTaskRequestValidator()
    {
        RuleFor(x => x.Completed)
            .NotNull().WithMessage("Completed status is required");
    }
}