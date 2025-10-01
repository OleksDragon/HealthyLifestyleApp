using HealthyLifestyle.Application.Interfaces.Challenge;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace HealthyLifestyle.Api.Controllers
{
    [Route("api/challengeparticipants")]
    [ApiController]
    [Authorize]
    public class ChallengeParticipantsController : ControllerBase
    {
        private readonly IChallengeParticipantService _service;

        public ChallengeParticipantsController(IChallengeParticipantService service)
        {
            _service = service;
        }

        [HttpPost("{challengeId:guid}/join")]
        public async Task<IActionResult> Join(Guid challengeId)
        {
            var userId = GetUserId();
            var result = await _service.JoinChallengeAsync(userId, challengeId);
            return result != null ? Ok(result) : BadRequest("Не удалось присоединиться к челленджу.");
        }

        [HttpDelete("{challengeId:guid}/leave")]
        public async Task<IActionResult> Leave(Guid challengeId)
        {
            var userId = GetUserId();
            var success = await _service.LeaveChallengeAsync(userId, challengeId);
            return success ? NoContent() : NotFound();
        }

        [HttpPatch("{challengeId:guid}/complete")]
        public async Task<IActionResult> Complete(Guid challengeId)
        {
            var userId = GetUserId();
            var result = await _service.CompleteChallengeAsync(userId, challengeId);
            return result != null ? Ok(result) : BadRequest("Не удалось завершить челлендж.");
        }

        [HttpGet("{challengeId:guid}")]
        public async Task<IActionResult> Get(Guid challengeId)
        {
            var userId = GetUserId();
            var result = await _service.GetParticipationAsync(userId, challengeId);
            return result != null ? Ok(result) : NotFound();
        }

        private Guid GetUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c =>
                c.Type == ClaimTypes.NameIdentifier ||
                c.Type == "sub" ||
                c.Type == "id");

            if (userIdClaim == null)
                throw new UnauthorizedAccessException("User ID not found in token.");

            return Guid.Parse(userIdClaim.Value);
        }
    }
}
