// WHEN I enter a comment and click on the submit button while signed in
// THEN the comment is saved and the post is updated to display the comment,
// the comment creator’s username, and the date created
async function commentFormHandler(event) {
    event.preventDefault();
  // get comment_text from the form
    const comment_text = document
      .querySelector('textarea[name="comment-body"]')
      .value.trim();
  // get id from url
    const post_id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
  // conditional ensures comment text and passes that text and post_id to the POST method
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
  // refreshes the page to show updated post with comment
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
  }
  
  document
    .querySelector(".comment-form")
    .addEventListener("submit", commentFormHandler);
  