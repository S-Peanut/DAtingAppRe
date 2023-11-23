using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class LikesController: BaseApiController
    {
                private readonly IUserRepository _userRepository;
                private readonly ILikesRepository _likesReposiory;


                public LikesController(IUserRepository userRepository, ILikesRepository likesReposiory)
        {
                        _userRepository = userRepository;
                        _likesReposiory = likesReposiory;
                }

                [HttpPost("{username}")]
                public async Task<ActionResult> AddLike(string username)
                {
                        var sourceUserId = User.GetUserId();
                        var likedUser = await _userRepository.GetUserByUsernameAsync(username);
                        var sourceUser = await _likesReposiory.GetUserWithLikes(sourceUserId);

                        if(likedUser == null) return NotFound();

                        if(sourceUser.UserName == username) return BadRequest("You cannot like yourself!");

                        var userLike = await _likesReposiory.GetUserLike(sourceUserId, likedUser.Id);

                        if(userLike != null) return BadRequest("You already liked this user!");

                        userLike = new UserLike
                        {
                            SourceUserId = sourceUserId,
                            TargetUserId = likedUser.Id
                        };

                        sourceUser.LikedUsers.Add(userLike);

                        if (await _userRepository.SaveAllAsync()) return Ok();

                        return BadRequest("Failed to like user!");
                }

                [HttpGet]
                public async Task<ActionResult<IEnumerable<LikeDto>>> GetUserLikes([FromQuery]LikesParams likesParams)
                {       
                        likesParams.UserId = User.GetUserId();
                        var users = await _likesReposiory.GetUserLikes(likesParams);

                        Response.AddPaginationHeader(new PaginationHeader(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages));
                        return Ok(users);
                }

    }
}