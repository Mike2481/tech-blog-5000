async function editFormHandler(event) {
    event.preventDefault();
  // title and text pulled from form
  // id pulled from url
    const title = document.querySelector('input[name="post-title"]').value.trim();
    const post_text = document.querySelector('input[name="post-text"]').value.trim();
    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_text
      },
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  // returns user to the dashboard
    if (response.ok) {
      document.location.replace('/dashboard/');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);