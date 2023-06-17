"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  $('#all-stories-list').children().remove() 
  hidePageComponents();
  putStoriesOnPage();
  // $('#favorited-stories').toggleClass('hidden')
}

$body.on("click", "#nav-all", function(){
  $('#favorited-stories').addClass('hidden')
  $('#user-stories').addClass('hidden')
  // $('#all-stories-list').children().remove() 
  $('#user-stories').children().remove()
   navAllStories()});

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();

  
}

$('#nav-submit').on('click', function(){
  console.log('click')
  $('#submit-wrap').toggleClass('hidden')
})


$('#submit-form').on('submit', async function(e){
e.preventDefault();
await storyList.addStory(currentUser, {
  "author": `${$('#author').val()}` ,
  "title": `${$('#title').val()}` ,
  "url":  `${$('#url').val()}` ,
})


putStoriesOnPage()

})


