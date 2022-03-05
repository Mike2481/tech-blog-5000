
async function editFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('input[name="comment-text"]').value.trim();
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch (`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
        
    });
// this will take the user back to the post page that had the comment
// must still refresh the page to see updated info
    if (response.ok && history.length > 0) {
        window.history.back(-2);


    } else {
        alert(response.statusText);
    }
}

document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);