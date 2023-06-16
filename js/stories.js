"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "★" : "☆";
  return `
      <span class="blank-star">${starType}</span>`;
}

function deleteBtn(boolean){
  let can = "&#x1f5d1;"
  if(boolean === "true"){
    return `<span class="trash">${can}</span>`;
  }else return ""
}

function generateStoryMarkup(story, binary) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  //boolean
  //if favorite load solid if not load blank
  //${deleteBtn(binary)}
  return $(`
      <li id="${story.storyId}">${deleteBtn(binary)}${getStarHTML(story, currentUser)} <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putFavoritesOnPage(){
  hidePageComponents()
  clearFaves()
  $('#favorited-stories').removeClass('hidden')
  for (let favorite of currentUser.favorites) {
    const $favorite = generateStoryMarkup(favorite);
    $("#favorited-stories").append($favorite);
    
  }

}

function clearFaves(){
  $('#favorited-stories').children().remove()

}

function UserStoriesOnPage(){
  hidePageComponents()
  clearUserStories()
  $('#user-stories').removeClass('hidden')
  for (let story of currentUser.ownStories) {
    const $story = generateStoryMarkup(story, "true");
    $("#user-stories").append($story);
    
  }

}

function clearUserStories(){
  $('#user-stories').children().remove()

}

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();
  console.log(storyList.stories)

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  // async function addFavorite(storyId, user){
  //   const response = await axios.post(`${BASE_URL}/users/${user}/favorites/${storyId}`, 
  //   {token: user.loginToken})
  //   console.log(response)
  // }

  $allStoriesList.show();

  $('.blank-star').on('click', function(evt){
    let e = evt.target;
    // console.log('click')
    // console.log(e.parentElement.id)
    console.log(e.innerHTML)
    if(e.innerHTML === "☆"){
      e.innerHTML = "&starf;"
      currentUser.addFavorite(e.parentElement.id, "add")
      console.log(currentUser.favorites)
      // ★
    } 
    else {
      e.innerHTML = "&star;"
      console.log(e.innerHTML)
      currentUser.addFavorite(e.parentElement.id, "remove")

    }
  
  })

  $('.trash').on('click', function(evt){
  let e = evt.target
    console.log('click')
    console.log(e.parentElement.id)
    // currentUser.deleteStory(e.parentElement.id)

  })

  $('#nav-favorites').on('click', function(){
    console.log('click')
    clearUserStories()
    putFavoritesOnPage();
    // console.log(e)
  })
  $('#nav-userStories').on('click', function(){
    console.log('click')
    clearFaves()
    UserStoriesOnPage();
    // console.log(e)
  })



}