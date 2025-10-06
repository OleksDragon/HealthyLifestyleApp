using HealthyLifestyle.Application.DTOs;
using HealthyLifestyle.Application.Interfaces;
using HealthyLifestyle.Application.Interfaces.ObjectStorage;
using HealthyLifestyle.Core.Entities;
using HealthyLifestyle.Core.Interfaces;
using HealthyLifestyle.Core.Interfaces.MealTracker;

namespace HealthyLifestyle.Application.Services
{
    public class RecipeService : IRecipeService
    {
        private readonly IRecipeRepository _repository;
        private readonly IObjectStorageService _objectStorageService;
        private readonly IUnitOfWork _unitOfWork;

        public RecipeService(IRecipeRepository repository, IObjectStorageService objectStorageService, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _objectStorageService = objectStorageService;
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<RecipeDto>> GetAllAsync()
        {
            var recipes = await _repository.GetAllAsync();
            return recipes.Select(r => new RecipeDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                Kkal = r.Kkal,
                Protein = r.Protein,
                Fat = r.Fat,
                Carbs = r.Carbs,
                ImageUrl = r.ImageUrl ?? string.Empty,
                VideoUrl = r.VideoUrl,
                Time = r.Time,
                Ingredients = r.Ingredients.Select(i => new IngredientDto { Name = i.Name, Amount = i.Amount }),
                Steps = r.Steps.OrderBy(s => s.Order).Select(s => s.StepText)
            });
        }

        public async Task<RecipeDto?> GetByIdAsync(Guid id)
        {
            var r = await _repository.GetByIdAsync(id);
            if (r == null) return null;

            return new RecipeDto
            {
                Id = r.Id,
                Name = r.Name,
                Description = r.Description,
                Kkal = r.Kkal,
                Protein = r.Protein,
                Fat = r.Fat,
                Carbs = r.Carbs,
                ImageUrl = r.ImageUrl ?? string.Empty,
                VideoUrl = r.VideoUrl,
                Time = r.Time,
                Ingredients = r.Ingredients.Select(i => new IngredientDto { Name = i.Name, Amount = i.Amount }),
                Steps = r.Steps.OrderBy(s => s.Order).Select(s => s.StepText)
            };
        }

        public async Task AddAsync(CreateRecipeDto dto)
        {
            string? imageUrl = null;
            if (dto.ImageFile != null)
            {
                imageUrl = await _objectStorageService.UploadFileAsync(
                    dto.ImageFile.OpenReadStream(),
                    $"recipe-{Guid.NewGuid()}{Path.GetExtension(dto.ImageFile.FileName)}",
                    dto.ImageFile.ContentType
                );
            }
            var recipeId = Guid.NewGuid();
            var recipe = new Recipe
            {
                Id = recipeId,
                Name = dto.Name,
                Description = dto.Description,
                Kkal = dto.Kkal,
                Protein = dto.Protein,
                Fat = dto.Fat,
                Carbs = dto.Carbs,
                Time = dto.Time,
                ImageUrl = imageUrl,
                VideoUrl = dto.VideoUrl,
                Ingredients = new List<Ingredient>(),
                Steps = new List<RecipeStep>()
            };

            if (dto.Ingredients != null && dto.Ingredients.Any())
            {
                foreach (var ingredientString in dto.Ingredients)
                {
                    var parts = ingredientString.Split(':', 2);

                    if (parts.Length == 2)
                    {
                        var name = parts[0].Trim();
                        var amount = parts[1].Trim();

                        recipe.Ingredients.Add(new Ingredient
                        {
                            Id = Guid.NewGuid(),
                            Name = name,
                            Amount = amount,
                            RecipeId = recipeId
                        });
                    }
                }
            }

            if (dto.Steps != null && dto.Steps.Any())
            {
                for (int i = 0; i < dto.Steps.Count; i++)
                {
                    recipe.Steps.Add(new RecipeStep
                    {
                        Id = Guid.NewGuid(),
                        StepText = dto.Steps[i],
                        Order = i,
                        RecipeId = recipeId
                    });
                }
            }

            await _repository.AddAsync(recipe);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task UpdateAsync(Guid id, UpdateRecipeDto dto)
        {
            var recipe = await _repository.GetByIdAsync(id);
            if (recipe == null) return;

            recipe.Name = dto.Name ?? recipe.Name;
            recipe.Description = dto.Description ?? recipe.Description;
            recipe.Kkal = dto.Kkal ?? recipe.Kkal;
            recipe.Protein = dto.Protein ?? recipe.Protein;
            recipe.Fat = dto.Fat ?? recipe.Fat;
            recipe.Carbs = dto.Carbs ?? recipe.Carbs;
            recipe.Time = dto.Time ?? recipe.Time;

            // Если новое изображение передано — загружаем в MinIO
            if (dto.ImageFile != null)
            {
                recipe.ImageUrl = await _objectStorageService.UploadFileAsync(
                    dto.ImageFile.OpenReadStream(),
                    "recipes",
                    dto.ImageFile.ContentType
                );
            }
            else
            {
                recipe.ImageUrl = dto.ImageUrl ?? recipe.ImageUrl;
            }

            recipe.VideoUrl = dto.VideoUrl ?? recipe.VideoUrl;

            await _repository.UpdateAsync(recipe);
            await _unitOfWork.SaveChangesAsync();
        }

        public async Task DeleteAsync(Guid id) => await _repository.DeleteAsync(id);
    }
}
