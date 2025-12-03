using FluentValidation;
using Taller.Api.Requests;

namespace Taller.Api.Validators;

public class CreateTaskRequestValidator : AbstractValidator<CreateTaskRequest>
{
    public CreateTaskRequestValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty().WithMessage("Title is required")
            .MaximumLength(30).WithMessage("Title cannot exceed 30 characters");
    }
}